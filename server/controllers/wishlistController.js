const wishlist = require('../model/wishlist')
const User = require("../model/user");
const mongoose = require('mongoose');
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create wishlist

exports.createwishlist = catchAsyncErrors(async (req, res, next) => {

    try {
        const wishlistDetail = await wishlist.findOne({ user: req.user.id });

        if (wishlistDetail && wishlistDetail.name == req.body.name) {
            let itemIndex = wishlistDetail.directlink.findIndex(p => p.product == req.body.product);

            if (itemIndex > -1) {

                //product exists in the wishlistDetail, update the quantity
                let productItem = wishlistDetail.directlink[itemIndex];

                productItem.quantity = req.body.quantity || productItem.quantity + 1;

                wishlistDetail.directlink[itemIndex] = productItem;


            } else {
                //product does not exists in wishlistDetail, add new item
                wishlistDetail.directlink.push({
                    product: req.body.product,
                    quantity: req.body.quantity || 1,
                    priority: req.body.priority,
                });

            }

            wishlistDetail.save();
            return res.status(201).send(wishlistDetail);
        }


        else {

            const newwishlistDetail = await wishlist.create({
                user: req.user.id,
                name: req.body.name,
                quantities: req.body.quantities || 1,
                viewed: req.body.viewed,
                Default: req.body.Default,
                directlink: [{
                    product: req.body.product,
                    quantity: req.body.quantity || 1,
                    priority: req.body.priority,

                }]
            });
            return res.status(201).json({
                success: true,
                newwishlistDetail
            })
        }
    }
    catch (err) {
        return res.status(404).json({
            err: err
        })
    }
});

// Get All wishlist 

exports.getallwishlist = catchAsyncErrors(async (req, res, next) => {
    const wishlistDetail = await wishlist.find();

    const count = wishlistDetail.length;

    res.status(200).json({
        success: true,
        Total: count,
        wishlistDetail,
    });
});

// get single wishlist

exports.getsinglewishlist = catchAsyncErrors(async (req, res, next) => {
    let wishlistDetail = await wishlist.findById(req.params.id).populate("user");

    if (!wishlistDetail) {
        return next(new ErrorHander("wishlist not found", 404));
    }
    else {
        res.status(200).json({
            success: true,
            wishlistDetail,
        });
    }
});

//  wishlist by user id 

exports.getuserwishlist = catchAsyncErrors(async (req, res) => {
    try {
        const user = await wishlist.find({ user: req.user.id }).populate("user").populate("directlink.product", "title image");


        const count = user.length;

        if (!user) {
            return next(new ErrorHander("User not found", 404));
        }
        else {
            return res.status(200).json({
                success: true,
                Total: count,
                userWishlist: user,
            });
        }

    } catch (error) {
        return res.status(404).json({
            success: false,
            error
        });
    }
});

// Update wishlist 

exports.updatewishlist = catchAsyncErrors(async (req, res, next) => {
    let wishlistDetail = await wishlist.findById(req.params.id);

    if (!wishlistDetail) {
        return next(new ErrorHander("wishlist not found", 404));
    }
    try {
        const updatedwishlist = await wishlist.findByIdAndUpdate(req.params.id, req.body, {

            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            updatedwishlist,
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        });
    }
});

// Delete wishlist 

exports.deletewishlist = catchAsyncErrors(async (req, res, next) => {
    const wishlistDetail = await wishlist.findById(req.params.id);

    if (!wishlistDetail) {
        return next(new ErrorHander("wishlist not found", 404));
    }
    else {

        try {
            await wishlistDetail.remove();
            res.status(200).json({
                success: true,
                message: "wishlist Delete Successfully",
            });
        }
        catch (err) {
            // handle the error
            return res.status(404).send(err);
        }
    }
});

//  wishlist by wishlist_id/user_id 

exports.getwishlist = catchAsyncErrors(async (req, res, next) => {
    let wishlistDetail = await wishlist.find({ _id: req.params.id, user: req.user.id });
    if (wishlistDetail.length === 0) {
        return res.status(404).json({
            success: false,
        });
    }
    else {
        res.status(200).json({
            success: true,
            wishlistDetail,
        });
    }
});