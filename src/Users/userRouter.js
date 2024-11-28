import { Router } from "express";
import { body } from "express-validator";
import { createUser,loginUser,getUserProfile,logoutUser } from "./userController.js";
import authUser from "../middleware/auth_middleware.js";

const userRouter = Router();

userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstname').isLength({min:3}).withMessage('first name should be 3 char long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 char long')
],createUser)



userRouter.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 char long')
], loginUser)

userRouter.get('/profile',authUser,getUserProfile)

userRouter.get('/logout',authUser,logoutUser)


export default userRouter

