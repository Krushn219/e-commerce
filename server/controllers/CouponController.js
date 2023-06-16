const Coupon = require('../model/Coupon')
const moment = require('moment')
const User = require('../model/user')
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create Coupon

exports.createCoupon = catchAsyncErrors(async (req, res, next) => {

  // const start = moment(req.body.start_date).utc().format('DD/MM/YYYY')
  // const end = moment(req.body.end_date).utc().format('DD/MM/YYYY')
  // console.log("start", start);
  // console.log("end", end);
  // req.body.start_date = start;
  // req.body.start_date = end;

  const CouponDetail = await Coupon.create(req.body);

  if (!CouponDetail) {
    res.status(404).json({
      success: false,
      msg: "Cannot Creat Coupon"
    })
  }
  res.status(201).json({
    success: true,
    CouponDetail,
    msg: "Coupon Created successfully..."
  });
});

// Get All Coupon 

// exports.getallCoupon = catchAsyncErrors(async (req, res, next) => {
//   const Coupones = await Coupon.find().populate("user").populate("product");
//   let Total = await Coupon.countDocuments();

//   res.status(200).json({
//     success: true,
//     TotalCoupon: Total,
//     Coupones,
//   });
// });


module.exports.getallCoupon = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit) || 10;

  let totalCoupon = await Coupon.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.CouponBy) {
    sort[req.query.sortBy] = req.query.CouponBy === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(Coupon.find().populate("user").populate("product").sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let Coupones = await apiFeature.query;
  let filteredCouponCount = Coupones.length;

  res.status(200).json({
    success: true,
    totalCoupon: totalCoupon,
    filteredCoupon: filteredCouponCount,
    page: req.query.page,
    limit: resultPerPage,
    Coupones
  })
})


// get single Coupon

exports.getsingleCoupon = catchAsyncErrors(async (req, res, next) => {

  let Coupones = await Coupon.findById(req.params.id).populate("user").populate("product");
  if (!Coupones) {
    return next(new ErrorHander("Coupon not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      Coupones,
    });
  }
});

// Update Coupon 

exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  try {

    const CouponUpdate = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!CouponUpdate) {
      return next(new ErrorHander("Coupon not found", 404));

    }

    return res.status(200).json({
      success: true,
      CouponUpdate,
      message: "Coupon Updated Successfully",
    });

  }
  catch (err) {
    return res.status(404).json({ err })
  }
});

// Delete Coupon 

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {

  const Coupones = await Coupon.findById(req.params.id);

  if (!Coupones) {
    return next(new ErrorHander("Coupon not found", 404));
  }

  else {
    try {
      await Coupones.remove();
      res.status(200).json({
        success: true,
        message: "Coupon Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});

