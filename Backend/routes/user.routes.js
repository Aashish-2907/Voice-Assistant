import express from "express";
import { Login, logout, signUp } from "../controllers/auth.controllers.js";
import getCurrentUser from "../controllers/user.controllers.js";
 
const userRouter =express.Router();

userRouter.get("/current",getCurrentUser);

export default userRouter;