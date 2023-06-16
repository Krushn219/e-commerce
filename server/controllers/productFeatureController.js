const productfeature = require('../model/ProductFeature')
const Product = require('../model/Product')

const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create productfeature
exports.createproductfeature = catchAsyncErrors(async (req, res, next) => {
  try {

    const Productfeature = await productfeature.findOne({ productId: req.body.productId });
    const Products = await Product.findOne({ _id: req.body.productId });


    if (Productfeature) {

      let itemIndex = Productfeature.feature.findIndex(p => p.featureId == req.body.featureId);
      if (itemIndex > -1) {
        let featurelength = Productfeature.feature.length;
        const featureId = [];
        for (let i = 0; i < featurelength; i++) {
          featureId.push(Productfeature.feature[i].featureId)
        }
        for (let i = 0; i < featurelength; i++) {
          if (featureId[i] == req.body.featureId) {

            const featurevalue = Productfeature.feature[i].featurevalueId;
            const indexOfThree = featurevalue.indexOf(req.body.featurevalueId)
            if (indexOfThree < 0) {
              Productfeature.feature[i].featurevalueId.push(
                req.body.featurevalueId
              );
            }
            else {
              return next(new ErrorHander("featurevalue already exists", 404))
            }
            Productfeature.save();
            return res.status(200).send(Productfeature);
          }
        }
      } else {
        //product does not exists in Productfeature, add new item
        Productfeature.feature.push({
          featureId: req.body.featureId,
          featurevalueId: req.body.featurevalueId,

        });
        // Productfeature = await Productfeature.save();
        Productfeature.save();
        return res.status(200).send(Productfeature);
      }
    }
    else {
      const newProductfeature = await productfeature.create({
        productId: req.body.productId,
        feature: [{
          featureId: req.body.featureId,
          featurevalueId: req.body.featurevalueId,

        }]
      });
      Products.productDetails.push(newProductfeature._id);
      Products.save()
      return res.status(201).json({
        // newProduct,
        newProductfeature
      })
    }

  }
  catch (err) {
    return res.status(404).json({
      err: err
    })
  }
});
// Get All productfeature 

exports.getallproductfeature = catchAsyncErrors(async (req, res, next) => {

  let count = await productfeature.countDocuments();
  const productfeatures = await productfeature.find().populate("productId").populate('feature.featureId').populate('feature.featurevalueId');

  res.status(200).json({
    success: true,
    Total: count,
    productfeatures,
  });
});

// get single productfeature

exports.getsingleproductfeature = catchAsyncErrors(async (req, res, next) => {
  let productfeatures = await productfeature.findById(req.query.id);

  if (!productfeatures) {
    res.status(404).json({
      success: false,
      msg: "Cannot Fond productfeatures"
    })
  }
  else {
    res.status(200).json({
      success: true,
      productfeatures,
    });
  }
});

// Update productfeature 

exports.updateproductfeature = catchAsyncErrors(async (req, res, next) => {
  let productfeatures = await productfeature.findById(req.query.id);

  if (!productfeatures) {
    res.status(404).json({
      success: false,
      msg: "Cannot Fond productfeatures"
    })
  }

  try {
    const updatedproductfeature = await productfeature.findByIdAndUpdate(req.query.id, req.query, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedproductfeature,
    });

  } catch (error) {
    res.status(200).json({
      success: false,
      error,
    });
  }
});

// Delete productfeature 

exports.deleteproductfeature = catchAsyncErrors(async (req, res, next) => {
  const productfeatures = await productfeature.findById(req.query.id);

  if (!productfeatures) {
    res.status(404).json({
      success: false,
      msg: "Cannot Fond productfeatures or Already Deleted..."
    })
  }
  else {

    try {

      await productfeatures.remove();
      res.status(200).json({
        success: true,
        message: "productfeature Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
});