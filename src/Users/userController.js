
// import userModel from "./userModel.js";

import { validationResult } from "express-validator";
import userModel from "./userModel.js";
import { comparePassword, generateAuthToken, hashPassword, registerUserinDb } from "./userServices.js";
import BlacklistedTokenModel from "./blacklistedTokenModel.js";

/// user create


const createUser = async (req,res)=>{
    try {
       const errors =validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
            
        }

        const {firstname,lastname,email,password} = req.body;
        
        const hashedPassword= await hashPassword(password);
        // console.log(hashedPassword);
        
   
        const user = await registerUserinDb({firstname,lastname,email,password:hashedPassword})
        if (user.alreadyRegister) {
            return res.status(400).json({res:user})
        }
        // console.log(user);
        
        const token = generateAuthToken(user._id);
        res.status(201).json({token,user})
         

        
    } catch (error) {
        console.log('soem error :' +error);
        
        
    }

}


const loginUser =async (req,res)=>{
    try {

        const errors =validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
            
        }

        const {email,password} =req.body;

 //       // find user is present in db
        const user = await userModel.findOne({email}).select('+password');
// if user is not present then return error
        if (!user) {
            return res.status(401).json({msg:'invalid email and password'})
            
        }
// if user present  --->  password  match    
        const isMatch = await comparePassword(password,user.password);
        // console.log(isMatch);
        
        if (!isMatch) {
            return res.status(401).json({msg:'invalid email and password'})
            
        }
//    generate token and send token in res
        const token = generateAuthToken(user._id);
         delete user.password;
        console.log(user);
        
        res.status(201).json({token,user})  

    } catch (error) {
        console.log('some error in login : '+error);
        
    }

}



const getUserProfile=(req,res)=>{

    res.status(200).json(req.user)
}

const logoutUser= async (req,res)=>{

    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token 
        const tokenBlack= await BlacklistedTokenModel.create({token})
    res.clearCookie('token').status(200).json({msg:'you are logout sucessfully'});

}

export {createUser,loginUser,getUserProfile,logoutUser}