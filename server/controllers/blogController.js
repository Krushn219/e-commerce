const mongoose = require('mongoose');
const Blog = require("../model/Blog");
const fs = require("fs");
const errorhandaler = require("../utils/errorhandaler");
const uploadToCloudinary = require("../services/uploadCloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const path = require('path');


// create blogs

module.exports.createblogs = catchAsyncErrors(async (req, res) => {
  var locaFilePath = req.file.path;
  var result = await uploadToCloudinary(locaFilePath);
  const blogs = await Blog.create({
    image: result.url,
    title: req.body.title,
    createdAt: req.body.createdAt,
    description: req.body.description,
    avatar: result.result.secure_url,
    cloudinary_id: result.result.public_id,
  });
  if (!blogs) {
    return res.status(500).send('blogs cannot be created')
  }
  res.status(200).json({
    success: true,
    blogs,
    // result
  });
})

//get all Blog
module.exports.getallblogs = catchAsyncErrors(async (req, res) => {
  const blogs = await Blog.find();
  const total = await Blog.countDocuments();
  res.status(200).json({
    success: true,
    total: total,
    blogs,
  });
})

//getSingle Blog
module.exports.getsingleblogs = catchAsyncErrors(async (req, res, next) => {

  let blog = await Blog.findById(req.query.id);
  if (!blog) {
    return next(new errorhandaler("blogs not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      blog,
    });
  }
})

//Update Blog
module.exports.updateblogs = catchAsyncErrors(async (req, res) => {
  let id = req.query.id;
  let blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Cannot found blogs.." });
  }
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(blog.cloudinary_id);
  // Upload image to cloudinary
  var locaFilePath = req.file.path;
  var result = await uploadToCloudinary(locaFilePath);
  const data = {
    title: req.body.name || blog.name,
    description: req.body.description || blog.content,
    image: result.url,
    avatar: result.secure_url || blog.image,
    cloudinary_id: result.public_id || blog.cloudinary_id,
  };
  const updateBlog = await Blog.findByIdAndUpdate(id, data, {
    new: true
  });
  res.status(200).json({
    success: true,
    msg: "Updated successfully...",
    updateBlog
  })
})

//Delete Blog
module.exports.deleteblogs = catchAsyncErrors(async (req, res) => {
  let id = req.query.id;

  // Find user by id
  let blogs = await Blog.findById(id);

  // Delete image from cloudinary
  await cloudinary.uploader.destroy(blogs.cloudinary_id);

  try {
    const data = await Blog.findByIdAndDelete(req.query.id)
    if (!data) {
      return res.status(400).json({ message: 'blogs not found' })
    }
    return res.status(200).json({ message: 'blogs deleted successfully' })
  }
  catch (err) {
    return res.status(500).json({ err })
  }
})