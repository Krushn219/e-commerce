const Products = require("../model/Product");
const uploadToCloudinary = require("../services/uploadCloudinary");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhandaler");
const cloudinary = require("cloudinary").v2;

module.exports.image = catchAsyncErrors(async (req, res, next) => {
  var locaFilePath = req.files.path;
  var imageUrlList = [];
  var avtarList = [];
  var cloudinary_idList = [];

  for (var i = 0; i < req.files.length; i++) {
    var locaFilePath = req.files[i].path;

    // Upload the local image to Cloudinary
    // and get image url as response
    var result = await uploadToCloudinary(locaFilePath);
    imageUrlList.push(result.url);
    avtarList.push(result.result.secure_url);
    cloudinary_idList.push(result.result.public_id);
  }

  var result = await uploadToCloudinary(locaFilePath);
  const product = await Products.create({
    title: req.body.title,
    withDiscount: req.body.withDiscount,
    image: imageUrlList,
    originalPrice: req.body.originalPrice,
    isAvailable: req.body.isAvailable,
    countInStock: req.body.countInStock || 0,
    attributes: req.body.attributes,
    category: req.body.category,
    subCategory: req.body.subCategory,
    // avatar: result.result.secure_url,
    avatar: avtarList,
    // cloudinary_id: result.result.public_id,
    cloudinary_id: cloudinary_idList,
  });
  res.status(200).json({
    success: true,
    product,
    // result
  });
});

module.exports.addProduct = catchAsyncErrors(async (req, res, next) => {

  if (req.files.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "Please provide an image"
    })
  }
  var locaFilePath = req.files.path;

  var imageUrlList = [];
  var avtarList = [];
  var cloudinary_idList = [];
  for (var i = 0; i < req.files.length; i++) {
    var locaFilePath = req.files[i].path;

    // Upload the local image to Cloudinary
    // and get image url as response
    var result = await uploadToCloudinary(locaFilePath);
    imageUrlList.push(result.url);
    avtarList.push(result.result.secure_url);
    cloudinary_idList.push(result.result.public_id);
  }

  const {
    title,
    withDiscount,
    originalPrice,
    isAvailable,
    countInStock,
    attributes,
    category,
    subcategories,
    isTrending,
    isSpecial,
    isBestSeller,
    isFeatured,
    content,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
  } = req.body;
  req.body.image = imageUrlList;
  req.body.avatar = avtarList;
  req.body.cloudinary_id = cloudinary_idList;
  const product = await Products.create(req.body);


  if (!product) {
    return next(new ErrorHander("Product cannot created...", 404));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

module.exports.productList = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = Number(req.query.limit) || 10;

  let totalproducts = await Products.countDocuments();
  const sort = {};

  if (req.query.sortBy && req.query.ProductsBy) {
    sort[req.query.sortBy] = req.query.ProductsBy === 'desc' ? -1 : 1
  }
  const apiFeature = new ApiFeatures(Products.find().populate('maincategory').populate('category').populate('subcategories').populate({
    path: 'productDetails',
    model: 'productfeature',
    populate: {
      path: "feature.featurevalueId",
      model: "featurevalue",
    },
  })
    .populate({
      path: "productDetails",
      model: "productfeature",
      populate: {
        path: 'feature.featureId',
        model: 'feature'
      }
    }).populate('reviews.user').populate('productAttributes').sort(sort), req.query)
    .filter()
    .search()
    .pagination(resultPerPage);
  let productlist = await apiFeature.query;
  let filteredProductsCount = productlist.length;

  res.status(200).json({
    success: true,
    totalProducts: totalproducts,
    filteredProducts: filteredProductsCount,
    page: req.query.page,
    limit: resultPerPage,
    productlist
  })
})
// delete product
module.exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let id = req.query.id;
  let product = await Products.findById(id);
  var ids = [];
  for (let i = 0; i < product.cloudinary_id.length; i++) {
    ids.push(product.cloudinary_id[i]);
  }
  if (!product) {
    return next(new ErrorHander("Cannot found product..", 404));
  }
  // Delete image from cloudinary
  cloudinary.api.delete_resources(ids, function (error, result) {
    console.log(result, error);
  });
  try {
    const data = await Products.findByIdAndDelete(req.query.id);
    if (!data) {
      return next(new ErrorHander("Cannot found product..", 404));
    }
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
// module.exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
//     let id = req.query.id;
//     // Find product by id
//     let product = await Products.findById(id);
//     if (!product) {
//         // return res.status(404).json({ msg: "Cannot found product.." });
//         return next(new ErrorHander("Cannot found product..", 404));
//     }

//     // Delete image from cloudinary
//     // await cloudinary.uploader.destroy(product.cloudinary_id);

//     try {
//         const data = await Products.findByIdAndDelete(req.query.id)

//         if (!data) {
//             // return res.status(400).json({ message: 'product not found' })
//             return next(new ErrorHander("Cannot found product..", 404));
//         }
//         return res.status(200).json({ message: 'product deleted successfully' })
//     }
//     catch (err) {
//         return res.status(500).json({ err })
//     }
// })

//Update Product
module.exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  let product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Cannot found product.." });
  }
  // Delete image from cloudinary
  var ids = [];
  for (let i = 0; i < product.cloudinary_id.length; i++) {
    ids.push(product.cloudinary_id[i]);
  }
  await cloudinary.api.delete_resources(ids, function (error, result) {
  });
  var locaFilePath = req.files.path;

  var imageUrlList = [];
  var avtarList = [];
  var cloudinary_idList = [];
  for (var i = 0; i < req.files.length; i++) {
    var locaFilePath = req.files[i].path;

    // Upload the local image to Cloudinary
    // and get image url as response
    var result = await uploadToCloudinary(locaFilePath);
    imageUrlList.push(result.url);
    avtarList.push(result.result.secure_url);
    cloudinary_idList.push(result.result.public_id);
  }
  // Upload image to cloudinary
  // var locaFilePath = req.file.path;
  // var result = await uploadToCloudinary(locaFilePath);

  const data = {
    title: req.body.title || product.name,
    withDiscount: req.body.withDiscount || product.withDiscount,
    image: imageUrlList,
    originalPrice: req.body.originalPrice || product.originalPrice,
    isAvailable: req.body.isAvailable || product.isAvailable,
    countInStock: req.body.countInStock || product.countInStock,
    attributes: req.body.attributes || product.attributes,
    category: req.body.category || product.category,
    subcategories: req.body.subcategories || product.subcategories,
    avatar: avtarList || product.image,
    cloudinary_id: cloudinary_idList || product.cloudinary_id,
  };
  const updateProduct = await Products.findByIdAndUpdate(id, data, {
    new: true
  });
  res.status(200).json({
    success: true,
    msg: "Updated successfully...",
    updateProduct
  })
})

//Get Single Product
module.exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;

  let product = await Products.findById({ _id: id }).populate("maincategory").populate('category').populate('subcategories').populate('group').populate({
    path: 'productDetails',
    model: 'productfeature',
    populate: {
      path: 'feature.featurevalueId',
      model: 'featurevalue'
    }
  }).populate({
    path: 'productDetails',
    model: 'productfeature',
    populate: {
      path: 'feature.featureId',
      model: 'feature'
    }
  }).populate('reviews.user').populate('productAttributes');

  res.status(200).json({
    success: true,
    product
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Create Product Review
module.exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewTitle, reviewDescription, rating, productId } = req.body;
  req.body.user = req.user.id;
  const user = req.user.id;

  const product = await Products.findById(productId);

  const review = {
    user,
    reviewTitle,
    reviewDescription,
    rating: Number(rating),
  };
  const isReviewed = product.reviews.find(
    (rev) => rev?.user?.toString() === user.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev?.user?.toString() === user.toString())
        (rev.rating = rating),
          (rev.reviewDescription = reviewDescription),
          (rev.reviewTitle = reviewTitle);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    msg: "Reviewed successfully...",
  });
}
);

//Get All Reviews of a product
module.exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Products.findById(req.query.id).populate(
      "reviews.user"
    );
    const reviews = product.reviews;
    const count = reviews.length;

    return res.status(200).json({
      success: true,
      Count: count,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//Delete Review
module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  let id = req.query.productId;

  const product = await Products.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    msg: "Review/reviews deleted successfully...",
  });
});

module.exports.findProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let productList;
    if (req.query.category) {
      productList = await Products.find({
        categories: { $in: [req.query.category] },
      });
    }

    if (req.query.name) {
      productList = await Products.find({ title: { $regex: req.query.name } });
    }

    if (!(req.query.category || req.query.name)) {
      productList = await Products.find();
    }

    return res.status(200).json({ productList });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// product by  main category

module.exports.getmainCategoryProduct = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const maincategories = await Products.find({
        maincategory: req.params.maincategory,
      })
        .populate("category")
        .populate("maincategory")
        .populate("group")
        .populate("subcategories")
        .populate("productDetails");

      const count = maincategories.length;
      if (maincategories.length === 0) {
        return next(new ErrorHander("maincategory not found", 404));
      }
      res.status(200).json({
        success: true,
        total: count,
        maincategories,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error,
      });
    }
  }
);

// product by category
module.exports.getcategoryProduct = catchAsyncErrors(async (req, res, next) => {

  try {
    const categories = await Products.find({ category: req.params.category }).populate("subcategories").populate("category").populate("maincategory").populate("group");
    const count = categories.length;
    if (categories.length === 0) {
      return next(new ErrorHander("category not found", 404));
    }
    res.status(200).json({
      success: true,
      Total: count,
      categories,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }

});

// product by subCategory
module.exports.getsubCategoryProduct = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const subcategories = await Products.find({ subcategories: req.params.subcategories }).populate("subcategories").populate("category").populate("maincategory").populate("group");
      const count = subcategories.length;

      if (subcategories.length === 0) {
        return next(new ErrorHander("subCategory not found", 404));
      }
      res.status(200).json({
        success: true,
        Total: count,
        subcategories,
      });

    } catch (error) {
      res.status(404).json({
        success: false,
        error,
      });
    }
  }
);

// product by group

module.exports.getgroupProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const group = await Products.find({ group: req.params.group }).populate("subcategories").populate("category").populate("maincategory").populate("group");

    let count = group.length;

    if (group.length === 0) {
      return next(new ErrorHander("group not found", 404));
    }
    res.status(200).json({
      success: true,
      Total: count,
      group,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// product by maincategory & category

module.exports.getfiltercategoryP = catchAsyncErrors(async (req, res, next) => {

  try {
    const products = await Products.find({ maincategory: req.params.maincategory, category: req.params.category }).populate("subcategories").populate("category").populate("maincategory").populate("group");

    const count = products.length;

    if (products.length === 0) {
      return next(new ErrorHander("products not found", 404));
    }

    res.status(200).json({
      success: true,
      Total: count,
      products,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      msg: "Something went wrong..",
      error,
    });
  }
}
);

// product by  maincategory & category & subCategory

module.exports.getfilterSubCategoryP = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Products.find({ maincategory: req.params.maincategory, category: req.params.category, subcategories: req.params.subcategories }).populate("subcategories").populate("category").populate("maincategory").populate("group");

    const count = products.length;

    if (products.length === 0) {
      return next(new ErrorHander("product not found", 404));
    }
    res.status(200).json({
      success: true,
      Total: count,
      products,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
}
);

// product by maincategory & category & subCategory & group

module.exports.getfiltergroupp = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Products.find({ maincategory: req.params.maincategory, category: req.params.category, subcategories: req.params.subcategories, group: req.params.group }).populate("subcategories").populate("category").populate("maincategory").populate("group");

    const count = products.length;

    if (products.length === 0) {
      return next(new ErrorHander("group not found", 404));
    }
    res.status(200).json({
      success: true,
      Total: count,
      products
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
});

// Products month

exports.filtersProducts = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month || 12;
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await Products.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $group: {
          _id: { month: { $month: { $toDate: "$createdAt" } } },
          Products: { $count: {} },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all data

exports.filtersProductsall = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  month = req.query.month;
  const lastMonth = new Date(date.setMonth(date.getMonth() - month));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - month)
  );

  try {
    const data = await Products.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $group: {
          _id: {
            DateTime: "$DateTime",
            myID: "$myID",
          },
          Products: { $count: {} },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Products  year

exports.filtersProductsyear = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  year = req.query.year;
  const lastyear = new Date(
    new Date().setFullYear(new Date().getFullYear() - year)
  );
  const previousyear = new Date(
    new Date().setFullYear(lastyear.getFullYear() - year)
  );

  try {
    const data = await Products.aggregate([
      { $match: { createdAt: { $gte: previousyear } } },

      {
        $group: {
          _id: { year: { $year: { $toDate: "$createdAt" } } },

          Products: { $count: {} },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Products week

exports.filtersProductsweek = catchAsyncErrors(async (req, res) => {
  var today = new Date();
  var first = today.getDate() - today.getDay();
  var firstDayWeek = today;
  var lastDayWeek = new Date(today.setDate(first - 6));

  try {
    const data = await Products.aggregate([
      {
        $match: {
          createdAt: {
            $gt: lastDayWeek,
            $lt: firstDayWeek,
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json({
      success: true,
      start: firstDayWeek,
      end: lastDayWeek,
      count: data?.length,
      Products: data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
