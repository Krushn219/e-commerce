const Enquiry = require("../model/Enquiry");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create Enquiry

exports.createEnquiry = catchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;

  //Validate user input
  if (!email) {
    return next(new ErrorHander("Email is required...", 404));
  }
  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await Enquiry.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  const EnquiryDetail = await Enquiry.create(req.body);

  if (!EnquiryDetail) {
    res.status(404).json({
      success: false,
      msg: "Cannot Creat Enquiry"
    })
  }
  res.status(201).json({
    success: true,
    EnquiryDetail,
    msg: "Enquiry Created successfully..."
  });
});

// Get All Enquiry 

// exports.getallEnquiry = catchAsyncErrors(async (req, res, next) => {
//   const enquiries = await Enquiry.find().populate("user").populate("product");
//   let Total = await Enquiry.countDocuments();

//   res.status(200).json({
//     success: true,
//     TotalEnquiry: Total,
//     enquiries,
//   });
// });


module.exports.getallEnquiry = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit) || 10;

  let totalEnquiry = await Enquiry.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.EnquiryBy) {
    sort[req.query.sortBy] = req.query.EnquiryBy === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(Enquiry.find().sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let enquiries = await apiFeature.query;
  let filteredEnquiryCount = enquiries.length;

  res.status(200).json({
    success: true,
    totalEnquiry: totalEnquiry,
    filteredEnquiry: filteredEnquiryCount,
    page: req.query.page,
    limit: resultPerPage,
    enquiries
  })
})


// get single Enquiry

exports.getsingleEnquiry = catchAsyncErrors(async (req, res, next) => {

  let enquiries = await Enquiry.findById(req.params.id);
  if (!enquiries) {
    return next(new ErrorHander("Enquiry not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      enquiries,
    });
  }
});

// Update Enquiry 

exports.updateEnquiry = catchAsyncErrors(async (req, res, next) => {
  try {
    const email = req.body.email;

    //Validate user input
    if (!email) {
      return next(new ErrorHander("Email is required...", 404));
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Enquiry.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const EnquiryUpdate = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!EnquiryUpdate) {
      return next(new ErrorHander("Enquiry not found", 404));

    }

    return res.status(200).json({
      success: true,
      EnquiryUpdate,
      message: "Enquiry Updated Successfully",
    });

  }
  catch (err) {
    return res.status(404).json({ err })
  }
});

// Delete Enquiry 

exports.deleteEnquiry = catchAsyncErrors(async (req, res, next) => {

  const enquiries = await Enquiry.findById(req.params.id);

  if (!enquiries) {
    return next(new ErrorHander("Enquiry not found", 404));
  }

  else {
    try {
      await enquiries.remove();
      res.status(200).json({
        success: true,
        message: "Enquiry Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});

