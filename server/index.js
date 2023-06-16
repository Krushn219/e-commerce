const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
require("dotenv").config();

const path = require("path");
const fs = require("fs");
const db = require("./config/database");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/error");

app.use(morgan("tiny"));
app.use(cors());
// setup bodyparser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

// route connection

app.use("/user", require("./routes/users"));
app.use("/products", require("./routes/product"));

// MainCategory
app.use("/mainCategory", require("./routes/mainCategory"));

//category
app.use("/category", require("./routes/Category"));

//subCategory
// app.use("/admin/subcategory", require("./routes/SubCategory"));

//Group
app.use("/group", require("./routes/group"));

// // Testimonial
app.use("/testimonial", require("./routes/Testimonial"));

// //Blogs
app.use("/blogs", require("./routes/Blogs"));

// // Banner
app.use("/banner", require("./routes/banner"));

// //Feature
app.use("/feature", require("./routes/Feature"));

// //Feature Value
app.use("/featurevalue", require("./routes/FeatureValue"));

// //Product Feature Value
app.use("/productfeature", require("./routes/ProductFeature"));

// //Address
app.use("/address", require("./routes/Address"));

// //coupon
app.use("/coupon", require("./routes/Coupon"));

// //Enquiry
app.use("/enquiry", require("./routes/Enquiry"));

// //attribute
app.use("/attribute", require("./routes/Attribute"));

// //attribute Value
app.use("/attributevalue", require("./routes/AttributeValue"));

// //Product Attribute Value
app.use("/productattributes", require("./routes/ProductAttribute"));

// // Cart
app.use("/cart", require("./routes/cart"));

// //order
app.use("/order", require("./routes/Order"));

// //payment
app.use("/payment", require("./routes/paymentRoute"));

// //wishlist
app.use("/wishlist", require("./routes/wishlist"));

// server connection
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}!`);
});
