const mainCategory = require('../model/mainCategory')
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhandaler");
const uploadToCloudinary = require("../services/uploadCloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create mainCategoryes

module.exports.createmainCategory = catchAsyncErrors(async (req, res, next) => {

  const mainCategories = await mainCategory.create(req.body);

  if (!mainCategories) {

    return next(new ErrorHander("mainCategories not found", 404));
  }
  res.status(201).json({
    success: true,
    mainCategories,
    // result
  });

})

// Get All mainCategoryes 

// exports.getallmainCategory = catchAsyncErrors(async (req, res, next) => {
//   const mainCategories = await mainCategory.find();
//   const count = mainCategory.length;

//   res.status(200).json({
//     success: true,
//     Total: count,
//     mainCategories,
//   });
// });

module.exports.getallmainCategory = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit);

  let totalmainCategory = await mainCategory.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.mainCategoryBy) {
    sort[req.query.sortBy] = req.query.mainCategoryBy === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(mainCategory.find().sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let mainCategories = await apiFeature.query;
  let filteredmainCategoryCount = mainCategories.length;

  res.status(200).json({
    success: true,
    totalmainCategory: totalmainCategory,
    filteredmainCategory: filteredmainCategoryCount,
    page: req.query.page,
    limit: resultPerPage,
    mainCategories
  })
})


// get single mainCategoryes

exports.getsinglemainCategory = catchAsyncErrors(async (req, res, next) => {
  let maincategory = await mainCategory.findById(req.params.id);

  if (!maincategory) {
    return next(new ErrorHander("mainCategory not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      maincategory
    });
  }
});


// Update mainCategoryes 

exports.updatemainCategory = catchAsyncErrors(async (req, res, next) => {
  let mainCategory = await mainCategory.findById(req.params.id);

  if (!mainCategory) {
    return next(new ErrorHander("mainCategoryes not found", 404));
  }
  try {
    const mainCategory = await mainCategory.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      msg: "Updated Success...",
      mainCategory,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete mainCategory 

exports.deletemainCategory = catchAsyncErrors(async (req, res, next) => {
  const deletemainCategory = await mainCategory.findById(req.params.id);

  if (!deletemainCategory) {
    return next(new ErrorHander("mainCategory not found or already deleted..", 404));
  }
  else {

    try {
      await deletemainCategory.remove();
      res.status(200).json({
        success: true,
        message: "mainCategory Deleted Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(404).send(err);
    }
  }
});