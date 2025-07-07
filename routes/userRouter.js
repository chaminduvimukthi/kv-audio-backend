import express from "express";
import { loginUser, registerUser } from "../controllers/userControlle.js";


const userRouter = express.Router();

userRouter.post("/register",registerUser)

userRouter.post("/login",loginUser)



export default userRouter;

// "email": "danindu@gmal.com",
//     "password": "123",