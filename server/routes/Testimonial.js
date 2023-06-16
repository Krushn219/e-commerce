const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { verifyToken, verifyTokenAndAdmin } = require("../jwt/jsonwebtoken");

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

router.post(
  "/create",
  upload.single("image"),
  testimonialController.creatTestimonial
);

//getAllTestimonials
router.get("/all", testimonialController.getallTestimonials);

// get single Testimonials
router.get("/single", testimonialController.getsingleTestimonials);

//Delete
router.delete("/", testimonialController.deleteTestimonial);

//Update
router.put(
  "/",
  upload.single("image"),
  testimonialController.updateTestimonials
);

module.exports = router;
