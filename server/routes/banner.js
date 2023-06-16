const express = require('express');
const router = express.Router();
const {
  createbanners,
  getallbanners,
  getsinglebanners,
  updatebanners,
  deletebanners
} = require("../controllers/bannerController");
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
  .post(upload, createbanners);

//Get All
router
  .route("/all")
  .get(getallbanners);

//Get Single
router
  .route("/single/:id")
  .get(getsinglebanners);

// Update banners
router
  .route("/update/:id")
  .put(upload, updatebanners)

// Delete Single banner
router
  .route("/delete/:id")
  .delete(deletebanners);




module.exports = router;