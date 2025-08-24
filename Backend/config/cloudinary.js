import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary = async (filePath) => {
      cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath); // Remove the file after upload
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath); // Remove the file even if upload fails
        return res.status(500).json({ message: 'Cloudinary Error' });
    }
}

export default uploadOnCloudinary;




// import cloudinary from "cloudinary";

// console.log("Cloudinary config:", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(filePath);
//     console.log("Uploaded to Cloudinary:", result.secure_url); // Debug
//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload failed:", error);
//     throw error;
//   }
// };

// export default uploadOnCloudinary;
