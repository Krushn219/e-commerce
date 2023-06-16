const Attribute = require('../model/Attribute')
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create Attribute

exports.createAttribute = catchAsyncErrors(async (req, res, next) => {

  const AttributeDetail = await Attribute.create(req.body);
  res.status(201).json({
    success: true,
    AttributeDetail,
  });
});

// Get All Attribute 

exports.getallAttribute = catchAsyncErrors(async (req, res, next) => {
  const Attributes = await Attribute.find();
  let count = Attributes.length;

  res.status(200).json({
    success: true,
    TotalAttribute: count,
    Attributes,
  });
});

// get single Attribute

exports.getsingleAttribute = catchAsyncErrors(async (req, res, next) => {
  let Attributes = await Attribute.findById(req.params.id);

  if (!Attributes) {
    return next(new ErrorHander("Attribute not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      Attributes,
    });
  }
});

// Update Attribute 

exports.updateAttribute = catchAsyncErrors(async (req, res, next) => {
  let Attributes = await Attribute.findById(req.params.id);

  if (!Attributes) {
    return next(new ErrorHander("Attribute not found", 404));
  }

  try {
    const updatedAttribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedAttribute,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete Attribute 

exports.deleteAttribute = catchAsyncErrors(async (req, res, next) => {
  const Attributes = await Attribute.findById(req.params.id);

  if (!Attributes) {
    return next(new ErrorHander("Attribute not found", 404));
  }
  else {

    try {

      await Attributes.remove();
      res.status(200).json({
        success: true,
        message: "Attribute Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});