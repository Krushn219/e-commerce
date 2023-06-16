const express = require("express");
const router = express.Router();
const {
  filtersUserall,
  filtersUser,
  filtersUseryear,
  filtersUserweek,
  getadmindata,
  getUser,
} = require("../controllers/userControllers");
const userControllers = require("../controllers/userControllers");
const { verifyToken, verifyTokenAndAdmin } = require("../jwt/jsonwebtoken");
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

router.get("/", userControllers.home);

// User register
router.post("/register", userControllers.register);

// User Verify
router.post("/verifyOTP", userControllers.verifyotp);

// LOG In
router.post("/login", userControllers.login);

router.post("/add-address", userControllers.createUserAddress);

// User update
router.put("/update", isAuthenticatedUser, userControllers.updateuser);

// User LogOut
router.get("/logout", isAuthenticatedUser, userControllers.logout);

// Get All Users
router.get("/users", userControllers.getAllUsers);

// Get single user
router.get("/singleUser", isAuthenticatedUser, userControllers.getSingleUser);

// Delete User
router.delete("/:id", userControllers.deleteUser);

//upload image
router.post("/upload", upload.single("image"), userControllers.image);

//get all users -- filter
router.get("/filterUsers", userControllers.getFilterUsers);

//get selected Address
router.get("/select/:id", isAuthenticatedUser, userControllers.selectedAddress);

router.route("/single/:id").get(getUser);

router.route("/admin/role").get(getadmindata);

// all User
router.route("/data/all").get(filtersUserall);

//  User(month)
router.route("/data/month").get(filtersUser);

//  User (year)
router.route("/data/allyear").get(filtersUseryear);

// User(week)
router.route("/data/week").get(filtersUserweek);

module.exports = router;
