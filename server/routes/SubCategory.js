const express = require('express');

const {
  createSubCaregory,
  getAllSubCaregory,
  deleteSingleSubCaregory,
  SingleSubCaregory,
  getSingleSubCaregory,
  updateSubCaregory
} = require('../controllers/subCategory');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express();

// image

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

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
// create
router
  .route("/create")
  .post(upload, createSubCaregory);

// get all 
router
  .route("/all")
  .get(getAllSubCaregory);

// get single 

router
  .route('/single/:id')
  .get(SingleSubCaregory);


//Update single 

router
  .route('/update/:id')
  .put(upload, updateSubCaregory);

//Delete single

router
  .route('/delete/:id')
  .delete(deleteSingleSubCaregory);


router
  .route('/category/:id')
  .get(getSingleSubCaregory);

module.exports = router;


