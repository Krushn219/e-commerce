const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const {verifyToken,verifyTokenAndAdmin} =require('../jwt/jsonwebtoken')
const path= require('path');
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

router.post('/create',upload,testimonialController.creatTestimonial);

//getAllTestimonials
router.get('/all',testimonialController.getallTestimonials)

// get single Testimonials
router.get('/single',testimonialController.getsingleTestimonials)

//Delete 
router.delete('/',testimonialController.deleteTestimonial);

//Update
router.put('/',upload,testimonialController.updateTestimonials);

module.exports = router;