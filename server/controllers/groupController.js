const group = require('../model/group')
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create group

exports.creategroup = catchAsyncErrors(async (req, res, next) => {

  const groupDetail = await group.create(req.body);

  if (!groupDetail) {
    res.status(404).json({
      success: false,
      msg: "Cannot Creat group"
    })
  }

  res.status(201).json({
    success: true,
    groupDetail,
    msg: "group Created successfully..."
  });

});

// Get All group 

// exports.getallgroup = catchAsyncErrors(async (req, res, next) => {
//   const groups = await group.find().populate("subcategory").populate("category").populate("maincategory");
//   const count = groups.length;

//   res.status(200).json({
//     success: true,
//     Total: count,
//     groups,
//   });
// });

module.exports.getallgroup = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit);

  let totalgroup = await group.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.groupBy) {
    sort[req.query.sortBy] = req.query.groupBy === 'desc' ? -1 : 1
  }

  const apiFeature = new ApiFeatures(group.find().populate("subcategory").populate("category").populate("maincategory").sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let groups = await apiFeature.query;
  let filteredgroupCount = groups.length;

  res.status(200).json({
    success: true,
    totalgroup: totalgroup,
    filteredgroup: filteredgroupCount,
    page: req.query.page,
    limit: resultPerPage,
    groups
  })
})
// get single group

exports.getsinglegroup = catchAsyncErrors(async (req, res, next) => {
  let groupes = await group.findById(req.params.id).populate("subcategory").populate("category").populate("maincategory");

  if (!groupes) {
    return next(new ErrorHander("group not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      groupes,
    });
  }
});


// get single state

exports.getsubcategory = catchAsyncErrors(async (req, res, next) => {
  let subcategories = await group.find({ subcategory: req.params.subcategory });

  if (!subcategories) {
    return next(new ErrorHander("subcategories not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      subcategories,
    });
  }
});

// Update group 

exports.updategroup = catchAsyncErrors(async (req, res, next) => {
  let groupes = await group.findById(req.params.id);

  if (!groupes) {
    return next(new ErrorHander("group not found", 404));
  }
  try {
    const updatedgroup = await group.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedgroup,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Delete group 

exports.deletegroup = catchAsyncErrors(async (req, res, next) => {
  const groupes = await group.findById(req.params.id);

  if (!groupes) {
    return next(new ErrorHander("group not found or has already deleted..", 404));
  }
  else {

    try {
      await groupes.remove();
      res.status(200).json({
        success: true,
        message: "group Delete Successfully",
      });
    }
    catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
});

