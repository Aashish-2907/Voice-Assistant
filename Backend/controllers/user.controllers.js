import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
// import {getCurrentUser,updateAssistant} from ''

export const getCurrentUser=async (req, res) => {
    try {
        const userId = req.userId; // Assuming userID is set by the isAuth middleware
        const user = await User.findById(userId).select('-password');
        console.log("User fetched:", user);
        console.log("Token userId:", req.userId);
        // const user = await User.findById(req.userId);
        console.log("User fetched:", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
}


export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    console.log("req.file:", req.file);
  console.log("req.body:", req.body);

    if (req.file) {
      // Upload file to Cloudinary
      try {
        assistantImage = await uploadOnCloudinary(req.file.path);
        console.log("Uploaded to Cloudinary:", assistantImage);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }
    } else if (imageUrl) {
      assistantImage = imageUrl; // Use selected local image URL
    } else {
      assistantImage = null; // No image provided
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Update Assistant error:", error);
    return res.status(500).json({ message: `Update Assistant error: ${error.message}` });
  }
};



// import User from "../models/user.model.js";
// import uploadOnCloudinary from "../config/cloudinary.js";

// export const getCurrentUser=async (req, res) => {
//     try {
//         const userId = req.userId; // Assuming userID is set by the isAuth middleware
//         const user = await User.findById(userId).select('-password');
//         console.log("User fetched:", user);
//         console.log("Token userId:", req.userId);
//         // const user = await User.findById(req.userId);
//         console.log("User fetched:", user);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: `Error fetching user: ${error.message}` });
//     }
// // }

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     // If a file was uploaded
//     if (req.file) {
//       try {
//         assistantImage = await uploadOnCloudinary(req.file.path);
//         console.log("Uploaded to Cloudinary:", assistantImage);
//       } catch (err) {
//         console.error("Cloudinary upload failed:", err);
//         return res.status(500).json({ message: "Cloudinary upload failed" });
//       }
//     } else if (imageUrl) {
//       // Use selected local image URL
//       assistantImage = imageUrl;
//     } else {
//       assistantImage = null;
//     }

//     // Update user in DB
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true }
//     ).select("-password");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("Update Assistant error:", error);
//     return res.status(500).json({ message: `Update Assistant error: ${error.message}` });
//   }
// };
