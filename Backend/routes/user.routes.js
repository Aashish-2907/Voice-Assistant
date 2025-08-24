import express from "express";
import { Login, logout, signUp } from "../controllers/auth.controllers.js";
import upload from "../middlewares/multer.js";
// import {current} from "../controllers/user.controllers.js";
import { getCurrentUser,  updateAssistant } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
 
const userRouter =express.Router();

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)



export default userRouter;