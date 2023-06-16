const Testimonial = require('../model/Testimonial')
const fs = require("fs");
const ErrorHander = require("../utils/errorhandaler");
const uploadToCloudinary = require("../services/uploadCloudinary");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require("cloudinary").v2;
const path = require('path');

// create Testimonials
module.exports.creatTestimonial = catchAsyncErrors(async (req, res, next) => {
    var locaFilePath = req.file.path;

    var result = await uploadToCloudinary(locaFilePath);
    const Testimonials = await Testimonial.create({

        image: result.url,
        name: req.body.name,
        content: req.body.content,
        avatar: result.result.secure_url,
        cloudinary_id: result.result.public_id,
    });

    if (!Testimonials) {
        return next(new ErrorHander("Testimonials cannot be created...", 404));
    }

    res.status(200).json({
        success: true,
        Testimonials,
        // result
    });

})

//get all Testimonials
module.exports.getallTestimonials = catchAsyncErrors(async (req, res) => {
    const Testimonials = await Testimonial.find();

    res.status(200).json({
        success: true,
        Testimonials,
    });
})

//getsingleTestimonials
module.exports.getsingleTestimonials = catchAsyncErrors(async (req, res, next) => {
    let id = req.query.id;

    const Testimonials = await Testimonial.find({ _id: id });

    if (!Testimonials) {
        return next(new ErrorHander("Testimonials not found", 404));
    }
    else {
        res.status(200).json({
            success: true,
            Testimonials,
        });
    }
})

//Delete Testimonial
module.exports.deleteTestimonial = catchAsyncErrors(async (req, res, next) => {
    let id = req.query.id;

    // Find user by id
    let Testimonials = await Testimonial.findById(id);

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(Testimonials.cloudinary_id);
    try {
        const data = await Testimonial.findByIdAndDelete(req.query.id)
        if (!data) {
            return next(new ErrorHander("Testimonials not found", 404));
        }
        return res.status(200).json({ message: 'Testimonials deleted successfully' })
    }
    catch (err) {
        return res.status(500).json({ err })
    }
})

// Update Testimonial
module.exports.updateTestimonials = catchAsyncErrors(async (req, res, next) => {
    let id = req.query.id;

    let Testimonials = await Testimonial.findById(id);

    if (!Testimonials) {
        return next(new ErrorHander("Cannot found Testimonials..", 404));
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(Testimonials.cloudinary_id);

    // Upload image to cloudinary
    var locaFilePath = req.file.path;

    var result = await uploadToCloudinary(locaFilePath);

    const data = {
        name: req.body.name || Testimonials.name,
        image: result.url,
        avatar: result.secure_url || Testimonials.image,
        cloudinary_id: result.public_id || Testimonials.cloudinary_id,
    };

    const updateTestimonial = await Testimonial.findByIdAndUpdate(id, data, {
        new: true
    });

    res.status(200).json({
        success: true,
        msg: "Updated successfully...",
        updateTestimonial
    })
})