const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const fs = require("fs");

const uploadToCloudinary = async file => {
  try {
    if (!file || Object.keys(file).length === 0) {
      return console.log("No files were uploaded.");
    }

    const uploadPath = file.image.tempFilePath;

    const { secure_url } = await cloudinary.uploader.upload(uploadPath);

    fs.unlink(uploadPath, error => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`File successfully removed.`);
    });

    return secure_url;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = uploadToCloudinary;
