const express = require("express");
const router = express.Router();

const {
  createSubCaregory,
  getAllSubCaregory,
  deleteSingleSubCaregory,
  SingleSubCaregory,
  getSingleSubCaregory,
  updateSubCaregory,
} = require("../controllers/subCategory");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

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

// create
router.route("/create").post(upload.single("image"), createSubCaregory);

// get all
router.route("/all").get(getAllSubCaregory);

// get single

router.route("/single/:id").get(SingleSubCaregory);

//Update single

router.route("/update/:id").put(upload.single("image"), updateSubCaregory);

//Delete single

router.route("/delete/:id").delete(deleteSingleSubCaregory);

router.route("/category/:id").get(getSingleSubCaregory);

module.exports = router;
