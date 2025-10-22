import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';


const app = express();

const port = process.env.PORT || 5000;
app.set('trust proxy', 1);
app.use(cors({
    origin: ["http://localhost:5173", 
        "https://voice-assistant-xbs8.onrender.com"
    ],
    credentials: true,
}))


app.use(express.json());
app.use(cookieParser());
// app.use((req, _res, next) => {
//   console.log('REQ', req.method, req.url);
//   next();
// });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);



app.listen(port, () => {
    connectDb();
    console.log("Server Started");
    console.log(`🚀 Server running on http://localhost:${port}`);
})


// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);

