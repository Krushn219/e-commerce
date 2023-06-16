const featurevalue = require('../model/FeatureValue')
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create featurevalue

exports.createfeaturevalue = async (req, res, next) => {

  const featurevalueDetail = await featurevalue.create(req.body);
  res.status(201).json({
    success: true,
    featurevalueDetail,
  });
};

// Get All featurevalue 

exports.getallfeaturevalue = catchAsyncErrors(async (req, res, next) => {

  let count = await featurevalue.countDocuments();
  const featurevalues = await featurevalue.find();

  res.status(200).json({
    success: true,
    Total: count,
    featurevalues,
  });
});

// get single featurevalue

exports.getsinglefeaturevalue = catchAsyncErrors(async (req, res, next) => {
  let featurevalues = await featurevalue.findById(req.params.id);

  if (!featurevalues) {
    return next(new ErrorHander("featurevalue not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      featurevalues,
    });
  }
});

// Update featurevalue 

exports.updatefeaturevalue = catchAsyncErrors(async (req, res, next) => {
  let featurevalues = await featurevalue.findById(req.params.id);

  if (!featurevalues) {
    return next(new ErrorHander("featurevalue not found", 404));
  }

  try {
    const updatedfeaturevalue = await featurevalue.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedfeaturevalue,
    });

  } catch (error) {
    res.status(200).json({
      success: false,
      error,
    });
  }
});

// Delete featurevalue 

exports.deletefeaturevalue = catchAsyncErrors(async (req, res, next) => {
  const featurevalues = await featurevalue.findById(req.query.id);

  if (!featurevalues) {
    return next(new ErrorHander("featurevalue not found", 404));
  }
  else {

    try {

      await featurevalues.remove();
      res.status(200).json({
        success: true,
        message: "featurevalue Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});