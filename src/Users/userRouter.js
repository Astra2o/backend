import { Router } from "express";
import { body } from "express-validator";
import { createUser } from "./userController.js";

const userRouter = Router();

userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstname').isLength({min:3}).withMessage('first name should be 3 char long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 char long')
],createUser)




export default userRouter
