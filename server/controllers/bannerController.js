const banner = require("../model/banner");
const fs = require("fs");
const ApiFeatures = require("../utils/apifeatures");
const errorhandaler = require("../utils/errorhandaler");
const uploadToCloudinary = require("../services/uploadCloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const path = require('path');


// create banners

module.exports.createbanners = catchAsyncErrors(async (req, res) => {
  var locaFilePath = req.file.path;
  var result = await uploadToCloudinary(locaFilePath);
  const banners = await banner.create({
    image: result.url,
    offer: req.body.offer,
    description: req.body.description,
    avatar: result.result.secure_url,
    cloudinary_id: result.result.public_id,
  });
  if (!banners) {
    return res.status(500).send('banners cannot be created')
  }
  res.status(200).json({
    success: true,
    banners,
  });
})

// //get all banner


module.exports.getallbanners = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit);

  let totalbanner = await banner.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.banner) {
    sort[req.query.sortBy] = req.query.banner === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(banner.find().sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let banners = await apiFeature.query;
  let filteredbannerCount = banners.length;

  res.status(200).json({
    success: true,
    totalbanner,
    filteredbanner: filteredbannerCount,
    page: req.query.page,
    limit: resultPerPage,
    banners
  })
})
// module.exports.getallbanners = catchAsyncErrors(async (req, res) => {
//   const banners = await banner.find();
//   const total = await banner.countDocuments();
//   res.status(200).json({
//     success: true,
//     total: total,
//     banners,
//   });
// })


//getSingle banner
module.exports.getsinglebanners = catchAsyncErrors(async (req, res, next) => {

  let banners = await banner.findById(req.params.id);
  if (!banners) {
    return next(new errorhandaler("banners not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      banners,
    });
  }
})

//Update banner
module.exports.updatebanners = catchAsyncErrors(async (req, res) => {
  let id = req.params.id;
  let banners = await banner.findById(id);
  if (!banners) {
    return res.status(404).json({ msg: "Cannot found banners.." });
  }
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(banners.cloudinary_id);
  // Upload image to cloudinary
  var locaFilePath = req.file.path;
  var result = await uploadToCloudinary(locaFilePath);
  const data = {
    offer: req.body.name || banner.name,
    description: req.body.description || banner.content,
    avatar: result.secure_url || banner.image,
    cloudinary_id: result.public_id || banner.cloudinary_id,
    image: result.url,
  };
  const updatebanner = await banner.findByIdAndUpdate(id, data, {
    new: true
  });
  res.status(200).json({
    success: true,
    msg: "Updated successfully...",
    updatebanner
  })
})

//Delete banner
module.exports.deletebanners = catchAsyncErrors(async (req, res) => {
  let id = req.params.id;

  // Find user by id
  let banners = await banner.findById(id);

  // Delete image from cloudinary
  await cloudinary.uploader.destroy(banners.cloudinary_id);

  try {
    const data = await banner.findByIdAndDelete(req.params.id)
    if (!data) {
      return res.status(400).json({ message: 'banners not found' })
    }
    return res.status(200).json({ message: 'banners deleted successfully' })
  }
  catch (err) {
    return res.status(500).json({ err })
  }
})