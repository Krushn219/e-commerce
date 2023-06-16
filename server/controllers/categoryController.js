const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhandaler");
const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");
const ApiFeatures = require("../utils/apifeatures");

module.exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  let category = new Category(req.body);

  // Save Category
  await category.save();

  res.status(201).json({
    success: true,
    msg: "Category created successfully..",
    category,
  });
});

module.exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = Number(req.query.limit);

  const sort = {};

  if (req.query.sortBy && req.query.OrderBy) {
    sort[req.query.sortBy] = req.query.OrderBy === "desc" ? -1 : 1;
  }

  const total = await Category.countDocuments();

  const apiFeature = new ApiFeatures(
    Category.find()
      .populate("maincategory")
      .populate("subCategories.subcategory")
      .sort(sort),
    req.query
  )
    .filter()
    .search()
    .pagination(resultPerPage);

  let categories = await apiFeature.query;
  let filteredCategoryCount = categories.length;

  res.status(200).json({
    success: true,
    totalCategories: total,
    filteredCategories: filteredCategoryCount,
    page: req.query.page,
    limit: resultPerPage,
    categories,
  });
});

module.exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .populate("maincategory")
    .populate("subCategories.subcategory");

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  res.status(200).json({
    status: true,
    category,
  });
});

// Update Categoryes

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let Category = await Category.findById(req.params.id);

  if (!Category) {
    return next(new ErrorHander("Categoryes not found", 404));
  }
  try {
    const Category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      msg: "Updated Success...",
      Category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// subCategory by categoryID

module.exports.getCategory = catchAsyncErrors(async (req, res) => {
  let id = req.query.id;

  const subCategory = await SubCategory.find({ category: id });
  const count = subCategory.length;

  res.status(200).json({
    status: true,
    count: count,
    subCategory,
  });
});

module.exports.deleteSingleCategory = catchAsyncErrors(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    res.status(404).json({
      success: true,
      msg: "Not found or already Deleted...",
    });
  }

  res.status(200).json({
    success: true,
    msg: "Deleted Successfully..",
  });
});
