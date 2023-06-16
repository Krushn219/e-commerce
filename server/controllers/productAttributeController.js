const productattributes = require('../model/ProductAttribute')
const mongoose = require('mongoose');
const fs = require("fs");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const errorhandaler = require("../utils/errorhandaler");

// create productattributes

exports.createProductAttributes = catchAsyncErrors(async (req, res, next) => {

  const productattributesDetail = await productattributes.create(req.body);
  res.status(201).json({
    success: true,
    productattributesDetail,
  });
});

// Get All productattributes 

exports.getAllProductAttributes = catchAsyncErrors(async (req, res, next) => {
  const productattributess = await productattributes.find().populate('Product');

  const count = productattributess.length;

  res.status(200).json({
    success: true,
    Total: count,
    productattributess,
  });
});

// get single productattributes

exports.getSingleProductAttributes = catchAsyncErrors(async (req, res, next) => {
  let productattributess = await productattributes.findById(req.params.id);

  if (!productattributess) {
    return next(new errorhandaler("Cannot found ProductAttribute..", 404));
  }
  else {
    res.status(200).json({
      success: true,
      productattributess,
    });
  }
});

// Update productattributes 

exports.updateProductAttributes = catchAsyncErrors(async (req, res, next) => {
  let productattributess = await productattributes.findById(req.params.id);

  if (!productattributess) {
    return next(new errorhandaler("Cannot found ProductAttribute..", 404));
  }

  try {
    const updatedproductattributes = await productattributes.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedproductattributes,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete productattributes 

exports.deleteProductAttributes = catchAsyncErrors(async (req, res, next) => {
  const productattributess = await productattributes.findById(req.params.id);

  if (!productattributess) {
    return next(new errorhandaler("Cannot found ProductAttribute or Already deleted...", 404));
  }
  else {

    try {

      await productattributess.remove();
      res.status(200).json({
        success: true,
        message: "productattributes Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});