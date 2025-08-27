import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp=async(req,res)=>{
    try{
        console.log("Signup request body:", req.body);
        const{name,email,password}=req.body;
        const existEmail=await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already exists"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters!"})
        }

        const hashedPasssword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,password:hashedPasssword,email
        })
         
        const token = await genToken(user._id);
        res.cookie("token",token,{httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            path: "/",
            secure:true
        })
        return res.status(201).json(user);
    }
    catch(error){
        return res.status(500).json({message:`signup error ${error}`});
    }
}

export const Login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Email doesnot exists"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters!"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"});
        }
         
        const token = await genToken(user._id);
        res.cookie("token",token,{httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            secure:true
        })
        // console.log("User logged in:", user);
        return res.status(201).json(user);
    }
    catch(error){
        return res.status(500).json({message:`Login error ${error}`});
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logged out Successfully"});
    }
    catch(error){
        return res.status(500).json({message:`Logout error ${error}`});
    }
}
