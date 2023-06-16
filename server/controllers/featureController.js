const feature = require('../model/Feature')
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create feature

exports.createfeature = async (req, res, next) => {

  const featureDetail = await feature.create(req.body);
  res.status(201).json({
    success: true,
    featureDetail,
  });
};

// Get All feature 

exports.getallfeature = catchAsyncErrors(async (req, res, next) => {
  const features = await feature.find();
  const count = features.length;

  res.status(200).json({
    success: true,
    Total: count,
    features,
  });
});

// get single feature

exports.getsinglefeature = catchAsyncErrors(async (req, res, next) => {
  let features = await feature.findById(req.params.id);

  if (!features) {
    return next(new ErrorHander("feature not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      features,
    });
  }
});

// Update feature 

exports.updatefeature = catchAsyncErrors(async (req, res, next) => {
  let features = await feature.findById(req.params.id);

  if (!features) {
    return next(new ErrorHander("feature not found", 404));
  }

  try {
    const updatedfeature = await feature.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedfeature,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete feature 

exports.deletefeature = catchAsyncErrors(async (req, res, next) => {
  const features = await feature.findById(req.params.id);

  if (!features) {
    return next(new ErrorHander("feature not found", 404));
  }
  else {

    try {

      await features.remove();
      res.status(200).json({
        success: true,
        message: "feature Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});