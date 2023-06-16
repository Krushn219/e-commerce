const fs = require('fs');
const path = require('path');
const cloudinary = require("cloudinary").v2;

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_Secret,
});


const uploadToCloudinary =  async (locaFilePath)=> {
  var mainFolderName = "main";
  var filePathOnCloudinary =
    mainFolderName + "/" + locaFilePath;

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {

      // Remove file from local uploads folder

      fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
        result
      };
    })
    .catch((error) => {

      // Remove file from local uploads folder
      // fs.unlinkSync(locaFilePath);
      return { message: "Fail" , error};
    });
}

module.exports = uploadToCloudinary;