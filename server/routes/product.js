// const express = require("express");
// const router = express.Router();
const {
  filtersProductsall,
  filtersProducts,
  filtersProductsyear,
  filtersProductsweek,
} = require("../controllers/productControllers");
// const productControllers = require("../controllers/productControllers");
// const { verifyToken, verifyTokenAndAdmin } = require("../jwt/jsonwebtoken");
// const path = require("path");
// const fs = require("fs");
// // const upload = require('../services/multer');
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const uploads = "../";

// //cloudinary

// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;

// if (!fs.existsSync("./uploads")) {
//   fs.mkdirSync("./uploads");
// }

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// // const upload = multer({ storage: storage }).single("image");
// const uploadMultiple = multer({ storage: storage }).array("image", 6);

const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const { isAuthenticatedUser } = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer storage configuration
const storage = multer.diskStorage({});

// Multer upload instance
const upload = multer({ storage });

router.post("/image", upload.array("image", 6), productControllers.image);
router.post(
  "/addProduct",
  upload.array("image", 6),
  productControllers.addProduct
);

// router.post("/image", uploadMultiple, productControllers.image);
// router.post("/addProduct", uploadMultiple, productControllers.addProduct);

// router.post('/multipleImages',uploadMultiple,productControllers.addProduct)

//Get All products
router.get("/all", productControllers.productList);

//Delete Product
router.delete("/", productControllers.deleteProduct);

//Update Product
// router.put("/update/:id", uploadMultiple, productControllers.updateProduct);
router.put(
  "/update/:id",
  upload.array("image", 6),
  productControllers.updateProduct
);

//Get single Product
router.get("/single/:id", productControllers.getSingleProduct);

//Create Review for Product
router.put(
  "/review",
  isAuthenticatedUser,
  productControllers.createProductReview
);

//Update Product
router.put("/:id", upload.single("image"), productControllers.updateProduct);

//Get All Review of a product
router.get("/productReview", productControllers.getProductReviews);

//Delete review
router.delete("/reviews", productControllers.deleteReview);

router.post("/filter", productControllers.findProduct);

//  product by main category
router.get(
  "/maincategory/:maincategory",
  productControllers.getmainCategoryProduct
);

//  product by category
router.get("/category/:category", productControllers.getcategoryProduct);

// product by subCategory
router.get(
  "/subCategory/:subcategories",
  productControllers.getsubCategoryProduct
);

// group by product
router.get("/group/:group", productControllers.getgroupProduct);

//product by main category & category
router.get(
  "/maincategory/:maincategory/category/:category",
  productControllers.getfiltercategoryP
);

// product by maincategory & category & subCategory
router.get(
  "/maincategory/:maincategory/category/:category/subcategories/:subcategories",
  productControllers.getfilterSubCategoryP
);

// product  by maincategory & category & subCategory & group
router.get(
  "/maincategory/:maincategory/category/:category/subcategories/:subcategories/group/:group",
  productControllers.getfiltergroupp
);

// all products
router.route("/data/all").get(filtersProductsall);

//  products(month)
router.route("/data/month").get(filtersProducts);

//  products (year)
router.route("/data/allyear").get(filtersProductsyear);

// products(week)
router.route("/data/week").get(filtersProductsweek);

module.exports = router;
