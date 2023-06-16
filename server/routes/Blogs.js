const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {
  createblogs,
  getallblogs,
  getsingleblogs,
  updateblogs,
  deleteblogs,
} = require("../controllers/blogController");

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
router.route("/create").post(upload.single("image"), createblogs);

//Get All
router.route("/all").get(getallblogs);

//Get Single
router.route("/single/:blogID").get(getsingleblogs);

// Update blogs
router.route("/:blogID").put(upload.single("image"), updateblogs);

// Delete Single Blog
router.route("/:blogID").delete(deleteblogs);

module.exports = router;
