const attributevalue = require('../model/AttributeValue')
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create attributevalue

exports.createAttributevalue = catchAsyncErrors(async (req, res, next) => {

  const createAttributevalue = await attributevalue.create(req.body);
  res.status(201).json({
    success: true,
    createAttributevalue,
  });
});

// Get All attributevalue 

exports.getallAttributevalue = catchAsyncErrors(async (req, res, next) => {

  let count = await attributevalue.countDocuments();
  const attributevalues = await attributevalue.find();

  res.status(200).json({
    success: true,
    Total: count,
    attributevalues,
  });
});

// get single attributevalue

exports.getsingleAttributevalue = catchAsyncErrors(async (req, res, next) => {
  let attributevalues = await attributevalue.findById(req.params.id);

  if (!attributevalues) {
    return next(new ErrorHander("attributevalue not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      attributevalues,
    });
  }
});

// Update attributevalue 

exports.updateAttributevalue = catchAsyncErrors(async (req, res, next) => {
  let attributevalues = await attributevalue.findById(req.params.id);

  if (!attributevalues) {
    return next(new ErrorHander("attributevalue not found", 404));
  }

  try {
    const updatedattributevalue = await attributevalue.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedattributevalue,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete attributevalue 

exports.deleteAttributevalue = catchAsyncErrors(async (req, res, next) => {
  const attributevalues = await attributevalue.findById(req.params.id);

  if (!attributevalues) {
    return next(new ErrorHander("attributevalue not found", 404));
  }
  else {

    try {

      await attributevalues.remove();
      res.status(200).json({
        success: true,
        message: "attributevalue Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
});