const express = require("express");
const router = express.Router();
const {
  createbanners,
  getallbanners,
  getsinglebanners,
  updatebanners,
  deletebanners,
} = require("../controllers/bannerController");

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

//Create
router.route("/create").post(upload.single("image"), createbanners);

//Get All
router.route("/all").get(getallbanners);

//Get Single
router.route("/single/:id").get(getsinglebanners);

// Update banners
router.route("/update/:id").put(upload.single("image"), updatebanners);

// Delete Single banner
router.route("/delete/:id").delete(deletebanners);

module.exports = router;
