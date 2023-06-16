const express = require('express')
const router = express.Router();
const {
  filtersUserall, filtersUser, filtersUseryear, filtersUserweek, getadmindata, getUser
} = require("../controllers/userControllers");
const userControllers = require('../controllers/userControllers')
const { verifyToken, verifyTokenAndAdmin } = require('../jwt/jsonwebtoken')
// const { upload } = require("../services/multer");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const multer = require("multer");
// const { route } = require('./product');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + Date.now() + ".jpg");
  }
})

const upload = multer({ storage: storage }).single("image");

router.get('/', userControllers.home)

// User register
router.post('/register', userControllers.register)

// User Verify
router.post('/verifyOTP', userControllers.verifyotp)

// LOG In
router.post('/login', userControllers.login)

router.post('/add-address', userControllers.createUserAddress)

// User update
router.put("/update", isAuthenticatedUser, userControllers.updateuser);

// User LogOut
router.get('/logout', isAuthenticatedUser, userControllers.logout);

// Get All Users
router.get('/users', userControllers.getAllUsers);

// Get single user
router.get('/singleUser', isAuthenticatedUser, userControllers.getSingleUser);

// Delete User
router.delete('/:id', userControllers.deleteUser);


//upload image
router.post("/upload", upload, userControllers.image)
// router.post("/uploads",upload("image",2),users_controllers.image)

//get all users -- filter
router.get("/filterUsers", userControllers.getFilterUsers);

//get selected Address 
router.get("/select/:id", isAuthenticatedUser, userControllers.selectedAddress);


router
  .route("/single/:id")
  .get(getUser);

router
  .route("/admin/role")
  .get(getadmindata);

// all User
router
  .route("/data/all")
  .get(filtersUserall);

//  User(month)
router
  .route("/data/month")
  .get(filtersUser);

//  User (year)
router
  .route("/data/allyear")
  .get(filtersUseryear);

// User(week)
router
  .route("/data/week")
  .get(filtersUserweek)

module.exports = router