const Order = require("../model/order");
const Product = require("../model/Product");
const Cart = require("../model/cart");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require("uuid");

// gettotal

const gettotal = (item) => {
  const discount = item?.productId?.withDiscount;
  const quantity = item?.quantity;
  const totalprice = discount * quantity;
  return Math.round(totalprice);
};

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const cartDetails = await Cart.findOne({ user: req.user.id }).populate(
    "products.productId"
  );
  if (!cartDetails) {
    return next(new ErrorHander("user not found with this Id", 404));
  }
  let cartTotal;
  cartDetails?.products?.map((item, index) => {
    const total = gettotal(item);
    cartTotal = (Number(cartTotal) || 0) + Number(total);
  }) || [];
  const { orderStatus, orderref, totalPrice, commonId } = req.body;
  req.body.user = req.user.id;
  if (req.body.totalPrice != cartTotal) {
    return res.send({ message: `Order creation error ${cartTotal}` });
  }
  if (req.body.totalPrice == cartTotal) {

    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const options = {
        // amount: cartTotal * 100, // amount in smallest currency unit
        amount: cartTotal, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
      };
      const order = await instance.orders.create(options);

      // orderdetails
      const orderdetails = await Order.create(req.body);
      orderdetails.cartdetails.push(cartDetails.products);
      orderdetails.save();
      cartDetails.remove();


      if (!order) return res.status(500).send("Some error occured");
      else {
        res.status(200).json({
          success: true,
          order,
          // orderdetails
        });
      }
    }
    catch (error) {
      return res.status(500).send({ error });
    }
  }
});

// get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user")
  // .populate('productDetail.productId')

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  //   const orders = await Order.findById({ user: req.params.id});

  res.status(200).json({
    success: true,
    orders,
  });
});

// single order 
exports.singleOrders = catchAsyncErrors(async (req, res, next) => {

  var user = { createdAt: -1 };
  const orders = await Order.find({ user: req.params.user }).sort(user);
  //   const orders = await Order.findById({ user: req.params.id});

  res.status(200).json({
    success: true,
    orders,
  });
});
// get all Orders -- Admin

// exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
//   const orders = await Order.find().populate("user");
//   const count = orders.length;

//   let totalAmount = 0;

//   orders.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     Total: count,
//     orders,
//   });
// });

module.exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit);

  let totalorder = await Order.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.order) {
    sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(Order.find().populate("user").sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let orders = await apiFeature.query;
  let filteredorderCount = orders.length;

  res.status(200).json({
    success: true,
    totalorder,
    filteredorder: filteredorderCount,
    page: req.query.page,
    limit: resultPerPage,
    orders
  })
})

// get order Shipped

exports.getShippedstatus = catchAsyncErrors(async (req, res, next) => {

  var orderStatus = "Shipped";

  let allorder = await Order.find({ orderStatus }).populate("user");

  if (!allorder) {
    return next(new ErrorHander("order not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      allorder,
    });
  }
});


// get order Delivered

exports.getDeliveredstatus = catchAsyncErrors(async (req, res, next) => {

  var orderStatus = "Delivered";

  let allorder = await Order.find({ orderStatus }).populate("user");

  if (!allorder) {
    return next(new ErrorHander("order not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      allorder,
    });
  }
});

// update Order Status -- Admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await (await Order.findById(req.params.id));

  if (!orders) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (orders.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  // if (req.body.status === "Shipped") {

  // }
  orders.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orders.deliveredAt = Date.now();
  }

  await orders.save({ validateBeforeSave: false });
  res.status(200).json({
    orders,
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.countInStock -= quantity;

  await product.save({
    validateBeforeSave: false,
    msg: "Updated successfully...",
  });
}

// delete Order -- Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    msg: "delete successfully...",
  });
});

// Order month

exports.filtersOrder = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month || 12;
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $group: {
          _id: { month: { $month: { $toDate: "$createdAt" } } },
          Order: { $count: {} }, // or { $sum: 1 } prior to Mongo 5
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

exports.filtersOrderall = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month;
  const lastMonth = new Date(date.setMonth(date.getMonth() - month));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      // {
      //     $group: {
      //         _id: {
      //             DateTime: "$DateTime",
      //             myID: "$myID",
      //         },
      //         Order: { $count: {} }, // or { $sum: 1 } prior to Mongo 5
      //         data: { $push: "$$ROOT" },
      //     },
      // },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $sort: { _id: 1 } },
    ]).exec(function (err, invites) {
      if (err) {
        next(err);
      }

      // res.json(invites);
      res.status(200).json({
        success: true,
        Order: invites,
      });
    });
  } catch (err) {
    res.status(500).json(
      err
    );
  }
});

// Order  year

exports.filtersOrderyear = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  year = req.query.year;
  const lastyear = new Date(
    new Date().setFullYear(new Date().getFullYear() - year)
  );
  const previousyear = new Date(
    new Date().setFullYear(lastyear.getFullYear() - year)
  );

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousyear } } },

      {
        $group: {
          _id: { year: { $year: { $toDate: "$createdAt" } } },

          Order: { $count: {} },
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

//Order week

exports.filtersOrderweek = catchAsyncErrors(async (req, res) => {
  var today = new Date();
  var first = today.getDate() - today.getDay();
  var lastDayWeek = new Date(today.setDate(first - 6));
  var firstDayWeek = new Date();

  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gt: lastDayWeek,
            $lt: firstDayWeek,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $sort: { _id: 1 } },
    ]).exec(function (err, invites) {
      if (err) {
        next(err);
      }

      // res.json(invites);
      res.status(200).json({
        success: true,
        start: firstDayWeek,
        end: lastDayWeek,
        count: data?.length,
        Order: invites,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
