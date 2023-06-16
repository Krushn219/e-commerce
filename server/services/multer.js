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

module.exports.upload = multer({
    storage: storage 
})