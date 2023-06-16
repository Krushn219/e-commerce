const User = require("../model/user");
const otps = require("../model/otp");
const Address = require("../model/Address");
const ApiFeatures = require("../utils/apifeatures");
const Features = require("../utils/features");
const shortid = require("shortid");
const generateOTPFunc = require("../utils/otp");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
require("dotenv").config();

module.exports.home = async (req, res) => {
  return res.status(200).send("sign up page");
};

// register

module.exports.register = catchAsyncErrors(async (req, res, next) => {
  try {
    const email = req.body.email;

    //Validate user input
    if (!email) {
      return next(new ErrorHander("Email is required...", 404));
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //generate OTP
    const generate6digitOTp = generateOTPFunc();
    const _id = `otp_${shortid.generate()}`;

    const otpData = new otps({
      _id,
      email,
      otp: generate6digitOTp,
      expiresIn: new Date(Date.now() + 5 * 60 * 1000).getTime(),
    });
    await otpData.save();
    await sendEmail(email, generate6digitOTp);

    res.status(200).json({
      success: true,
      msg: "Email send to your mail...plese check",
      otpData,
    });
  } catch (error) {
    res.status(404).json({
      msg: "something went wrong..",
      error,
    });
  }
});

// verifyotp

module.exports.verifyotp = catchAsyncErrors(async (req, res, next) => {
  // Get user input
  const { firstname, lastname, email, password, phone, otp } = req.body;

  // Validate user input
  if (!(email && password && firstname && lastname && phone)) {
    return next(new ErrorHander("All inputs are required...", 404));
  }
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(password, 10);
  if (!(email && otp)) {
    return res.status(400).json({ message: "Email address or OTP not found" });
  }
  const userOtp = await otps.findOne({ email, otp });
  if (!userOtp) {
    return res.status(400).json({ message: "Invalid email or otp" });
  } else {
    // Create user in our database
    const user = await User.create({
      // _id: `user_${shortid.generate()}`,
      firstname,
      lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phone,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email, admin: false },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({
      msg: "User verified and created successfully...",
      user,
    });
  }
});

// update user

exports.updateuser = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, birthday, phone, email } = req.body;
  if (req.body.password) {
    return next(new ErrorHander("cannot change password..", 404));
  }

  let userDetail = await User.findById(req.user._id);

  if (!userDetail) {
    return next(new ErrorHander("user not found", 404));
  }

  try {
    const updateduser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updateduser,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error,
    });
  }
});

// login

module.exports.login = catchAsyncErrors(async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return next(new ErrorHander("All input are required...", 404));
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }).select("email _id  password");
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(404).send("Invalid Credentials");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// logout
module.exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
  next();
});

// getAllUsers

module.exports.getAllUsers = catchAsyncErrors(async (req, res) => {
  const resultPerPage = Number(req.query.limit) || 10;
  let totalUsers = await User.countDocuments();

  const apiFeature = new ApiFeatures(User.find().populate("address").sort(), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let users = await apiFeature.query;

  let filteredUsersCount = users.length;

  res.status(200).json({
    success: true,
    totalUsers: totalUsers,
    filterUsers: filteredUsersCount,
    page: req.query.page,
    limit: resultPerPage,
    users,
  });
});

//  get single user (token)

module.exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("address");
  res.status(200).json({
    success: true,
    user,
  });
});

// get single user

module.exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('address');
  res.status(200).json({
    success: true,
    user
  })
})

// deleteUser

module.exports.deleteUser = catchAsyncErrors(async (req, res) => {
  let id = req.query.id;
  const user = await User.findByIdAndDelete({ _id: id });
  res.status(200).json({
    success: true,
    msg: "User Deleted Successfully...",
  });
});

//get users -- filter

module.exports.getFilterUsers = catchAsyncErrors(async (req, res) => {
  const resultPerPage = Number(req.query.limit) || 10;

  const usersCount = await User.countDocuments();

  const sort = {};

  if (req.query.sortBy && req.query.OrderBy) {
    sort[req.query.sortBy] = req.query.OrderBy === "desc" ? -1 : 1;
  }
  const apiFeature = new ApiFeatures(User.find().populate("address"), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let users = await apiFeature.query;
  let filteredUsersCount = users.length;

  res.status(200).json({
    success: true,
    total: usersCount,
    limit: resultPerPage,
    Count: filteredUsersCount,
    page: req.query.page,
    sort,
    users,
  });
});

//Create Address
module.exports.createUserAddress = catchAsyncErrors(async (req, res) => {
  const userId = req.body.user;

  // const user = await User.findById({_id :userId})
  const { user, address, addressComplement, city, state, country, postcode } =
    req.body;
  const userDetail = await User.findById({ _id: userId });

  const addressDetail = {
    user,
    address,
    addressComplement,
    city,
    state,
    country,
    postcode: Number(postcode),
  };

  // const addressDetail = await address.create(req.body);
  if (!addressDetail) {
    res.status(404).json({
      success: false,
      msg: "Cannot Creat Address",
    });
  }

  userDetail.Address.push(addressDetail);
  userDetail.save();

  res.status(200).json({
    success: true,
    userDetail,
  });
});

module.exports.selectedAddress = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  let address = await Address.findOne({ _id: id });

  if (!address) {
    return next(new ErrorHander("address not found", 404));
  }

  const user = await User.findById(address.user);

  let result = await Address.find({ user: req.user.id });

  let selectID = [];

  for (let i = 0; i < result.length; i++) {
    selectID.push(result[i]._id);
  }

  for (let i = 0; i < selectID.length; i++) {
    if (selectID[i] == req.params.id) {
      const user = await User.updateOne(
        { _id: req.user.id },
        { $set: { selectedAddress: { _id: req.params.id } } }
      );
    }
  }

  const data = await User.findById(address.user);

  res.status(200).json({
    msg: "Address Selected Successfully..",
    user: data,
  });
});

// Image Upload

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports.image = async (req, res, next) => {
  let file = req.files;

  res.status(200).json({
    success: true,
    file: file,
  });
};

// get admin

exports.getadmindata = catchAsyncErrors(async (req, res, next) => {

  var role = "admin";

  let alladmin = await User.find({ role });

  if (!alladmin) {
    return next(new ErrorHander("admin not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      alladmin,
    });
  }
});

//User week 
exports.filtersUserweek = catchAsyncErrors(async (req, res) => {
  var today = new Date();
  var first = today.getDate() - today.getDay();
  var firstDayWeek = today;
  var lastDayWeek = new Date(today.setDate(first - 6));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gt: lastDayWeek,
            $lt: firstDayWeek,
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json({
      success: true,
      start: firstDayWeek,
      end: lastDayWeek,
      count: data?.length,
      User: data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// User month
exports.filtersUser = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month || 12;
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $group: {
          _id: { month: { $month: { $toDate: "$createdAt" } } },
          User: { $count: {} }, // or { $sum: 1 } prior to Mongo 5
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// User  year
exports.filtersUseryear = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  year = req.query.year;
  const lastyear = new Date(
    new Date().setFullYear(new Date().getFullYear() - year)
  );
  const previousyear = new Date(
    new Date().setFullYear(lastyear.getFullYear() - year)
  );

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: previousyear } } },

      {
        $group: {
          _id: { year: { $year: { $toDate: "$createdAt" } } },

          User: { $count: {} },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all data
exports.filtersUserall = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month;
  const lastMonth = new Date(date.setMonth(date.getMonth() - month));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $group: {
          _id: {
            DateTime: "$DateTime",
            myID: "$myID",
          },
          User: { $count: {} },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
