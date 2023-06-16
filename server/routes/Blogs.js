const express = require('express');
const router = express.Router();
const {
  createblogs,
  getallblogs,
  getsingleblogs,
  updateblogs,
  deleteblogs
} = require("../controllers/blogController");
const path = require('path');
const fs = require('fs');
const uploads = '../'

//cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})
const upload = multer({ storage: storage }).single("image");

//Create
router
  .route("/create")
  .post(upload, createblogs);

//Get All
router
  .route("/all")
  .get(getallblogs);

//Get Single
router
    .route("/single")
    .get(getsingleblogs);

// Update blogs
router
    .route("/")
    .put( upload,updateblogs)

// Delete Single Blog
router
    .route("/")
    .delete( deleteblogs);




module.exports = router;