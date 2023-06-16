const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_Secret,
});

const uploadToCloudinary = async (localFilePath) => {
  var mainFolderName = "main";
  var filePathOnCloudinary = mainFolderName + "/" + localFilePath;

  return cloudinary.uploader
    .upload(localFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      return {
        message: "Success",
        url: result.url,
        result,
      };
    })
    .catch((error) => {
      return { message: "Fail", error };
    });
};

module.exports = uploadToCloudinary;
