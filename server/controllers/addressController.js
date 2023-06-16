const address = require('../model/Address')
const User = require('../model/user')
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { count } = require('console');

// create address

exports.createaddress = catchAsyncErrors(async (req, res, next) => {

  const users = await User.findById(req.user.id)
  req.body.user = req.user.id
  const addressDetail = await address.create(req.body);

  if (!addressDetail) {
    res.status(404).json({
      success: false,
      msg: "Cannot Creat Address"
    })
  }

  if (addressDetail) {
    users.address.push(addressDetail)
    users.save()

  }
  res.status(201).json({
    success: true,
    msg: "Address Created successfully..."
  });
});



// Get All address 

exports.getalladdress = catchAsyncErrors(async (req, res, next) => {
  const addresses = await address.find();
  let Total = await address.countDocuments();

  res.status(200).json({
    success: true,
    TotalAddress: Total,
    addresses,
  });
});

// get single address

exports.getsingleaddress = catchAsyncErrors(async (req, res, next) => {

  let addresses = await address.findById(req.params.id).populate("user");

  if (!addresses) {
    return next(new ErrorHander("address not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      addresses,
    });
  }
});

// Update address 

exports.updateaddress = catchAsyncErrors(async (req, res, next) => {
  try {

    let result = await address.find({ user: req.user.id })

    //address update in address collection
    const addressUpdate = await address.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!addressUpdate) {
      return next(new ErrorHander("address not found", 404));

    }
    let data = await User.findById(req.user.id).populate('address');
    return res.status(200).json({
      success: true,
      data,
      message: "Address Updated Successfully",

    });

  }
  catch (err) {
    return res.status(404).json({ err })
  }
});



// Delete address 

exports.deleteaddress = catchAsyncErrors(async (req, res, next) => {

  const addresses = await address.findById(req.params.id);

  const user = await address.find({ user: req.user.id }).populate("user");

  if (!addresses) {
    return next(new ErrorHander("address not found", 404));
  }
  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }
  else {

    try {

      await addresses.remove();
      res.status(200).json({
        success: true,
        message: "address Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});

// find address by user id 

exports.getuseraddress = catchAsyncErrors(async (req, res) => {
  try {
    const user = await address.find({ user: req.user.id });
    let count = user.length;
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
    else {
      return res.status(200).json({
        success: true,
        Count: count,
        user,
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});



exports.getselectaddress = catchAsyncErrors(async (req, res) => {
  try {
    const user = await address.find({ user: req.user.id });
    let count = user.length;
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
    else {
      return res.status(200).json({
        success: true,
        Count: count,
        user,
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// address_id/user_id by address

exports.getaddress = async (req, res, next) => {
  let addresses = await address.find({ _id: req.params.id, user: req.user._id });
  if (addresses.length === 0) {
    return res.status(200).json({
      success: false,
    });
  }
  else {
    res.status(200).json({
      success: true,
      addresses,
    });
  }
};

//Delete address of user

module.exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {

    let result = await address.find({ user: req.user.id })

    let addressdelete = await address.findByIdAndDelete(req.params.id)

    if (!addressdelete) {
      return res.status(404).json({
        success: false,
        message: "Cannot found address in database",
      });
    }

    let addressID = [];

    for (let i = 0; i < result.length; i++) {
      addressID.push(result[i]._id)
    }


    for (let i = 0; i < addressID.length; i++) {
      if (addressID[i] == req.params.id) {
        let address = await User.updateOne(
          { _id: req.user.id },
          { $pull: { addresses: { _id: req.params.id } } }

        )
        let data = await User.findById(req.user.id);
        return res.status(200).json({
          success: true,
          data,
          message: "product Delete Successfully",

        });
      }
    }
    return res.status(404).json({
      success: false,
      message: "Cannot found address",
    });

  }
  catch (err) {
    return res.status(404).json({ err })
  }
})