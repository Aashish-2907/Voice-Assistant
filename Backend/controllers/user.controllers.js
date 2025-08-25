import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
import { response } from 'express';
import moment from 'moment';
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

// export const askToAssistant=async(req,res)=>{
//   try {
//   console.log("Incoming body:", req.body);
//   const{command}=req.body
//   if (!command || typeof command !== "string") {
//       return res.status(400).json({ response: "Command is required" });
//     }
//   const user=await User.findById(req.userId)
//   const userName=user.name
//   const assistantName=user.assistantName
//   const result=await geminiResponse(command,assistantName,userName)

//   const jsonMatch=result.match(/{[\s\s]*}/)
//   // if(!jsonMatch){
//   //   return res.status(400).json({response:"Sorry, i couldn't understand"})
//   // }
//   if (!jsonMatch) {
//   // fallback: just send Gemini's raw response
//   return res.json({
//     type: "general",
//     userInput: command,
//     response: result,
//   });
// }
//   const gemResult=JSON.parse(jsonMatch[0])
//   const type=gemResult.type

//   let gemResult;
//     try {
//       // Try extracting JSON if Gemini wrapped it
//       const jsonMatch = result.match(/{[\s\S]*}/);
//       if (jsonMatch) {
//         gemResult = JSON.parse(jsonMatch[0]);
//       } else {
//         gemResult = { type: "general", userInput: command, response: result };
//       }
    

//   switch(type){
//     case 'get-date':
//       return res.json({
//         type,
//         userInput:gemResult.userInput,
//         response:`current date is ${moment().format("YYYY-MM-DD")}`
//       })
    
//     case 'get-time':
//       return res.json({
//         type,
//         userInput:gemResult.userInput,
//         response:`current time is ${moment().format("hh:mm A")}`
//       })

//     case 'get-day':
//       return res.json({
//         type,
//         userInput:gemResult.userInput,
//         response:`Today is ${moment().format("dddd")}`
//       })
//     case 'get-month':
//       return res.json({
//         type,
//         userInput:gemResult.userInput,
//         response:`current month is ${moment().format("MMMMM")}`
//       })
//      case 'google_search':
//      case 'youtube_search':
//      case 'youtube_play':
//      case 'general':
//      case 'calculator_open':
//      case 'instagram_open':
//      case 'facebook_open':
//      case 'weather-show':
//       return res.json({
//         type,
//         userInput:gemResult.userInput,
//         response:gemResult.response
//       })
//       default:
//         return res.status(400).json({response:"I don't understand that command"})
//   }
// }catch (error) {
//         return res.status(500).json({response:"Ask assistant error"})
//   }
//   }

export const askToAssistant = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { command } = req.body;

    if (!command || typeof command !== "string") {
      return res.status(400).json({ response: "Command is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }

    const userName = user.name;
    const assistantName = user.assistantName;

    // ✅ Call Gemini
    const result = await geminiResponse(command, assistantName, userName);
    console.log("Gemini raw result:", result);

    let gemResult;
    try {
      // Try extracting JSON from Gemini's response
      const jsonMatch = result.match(/{[\s\S]*}/);
      if (jsonMatch) {
        gemResult = JSON.parse(jsonMatch[0]);
      } else {
        gemResult = { type: "general", userInput: command, response: result };
      }
    } catch (err) {
      console.error("JSON parse error:", err.message);
      gemResult = { type: "general", userInput: command, response: result };
    }

    const type = gemResult.type || "general";

    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get-time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm A")}`,
        });

      case "get-day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get-month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather-show":
        return res.json({
          type,
          userInput: gemResult.userInput || command,
          response: gemResult.response || result,
        });

      default:
        return res.json({
          type: "general",
          userInput: command,
          response: result || "I don't understand that command",
        });
    }
  } catch (error) {
    console.error("Ask assistant error:", error);
    return res.status(500).json({ response: "Ask assistant error" });
  }
};



// 





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


