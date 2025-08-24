import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';


const app = express();

const port=process.env.PORT || 5000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// app.get('/',(req,res)=>{
//     res.send("HYY");
// })

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
 
app.listen(port,()=>{
    connectDb();
    console.log("Server Started");
    console.log(`🚀 Server running on http://localhost:${port}`);
})

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);

