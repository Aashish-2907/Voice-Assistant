import express from "express";
import { Login, logout, signUp } from "../controllers/auth.controllers.js";
// import {current} from "../controllers/user.controllers.js";
import getCurrentUser from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
 
const userRouter =express.Router();

userRouter.get("/current",isAuth,getCurrentUser);



export default userRouter;