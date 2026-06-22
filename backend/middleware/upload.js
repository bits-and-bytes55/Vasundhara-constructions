import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import cloudinary from "cloudinary";
import pkg from "multer-storage-cloudinary";

const { v2: cloudinaryV2 } = cloudinary;
const CloudinaryStorage = pkg.CloudinaryStorage || pkg.default || pkg;

// 🔍 Debug (remove later)
console.log("Cloudinary API KEY:", process.env.CLOUDINARY_API_KEY);

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: "blog_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
