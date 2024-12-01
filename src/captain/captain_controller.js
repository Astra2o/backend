
// import captainModel from "./captainModel.js";

import { validationResult } from "express-validator";
import captainModel from "./captain_model.js";
import BlacklistedTokenModel from "../Users/blacklistedTokenModel.js";
import { createCaptain } from "./captainService.js";

/// captain create


const registerCaptain = async (req,res)=>{
    try {
       const errors =validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
            
        }

        const {firstname,lastname,email,password,vehicleColor,vehiclePlate,vehicleCapacity,vehicleType} = req.body;
        const hashedPassword= await captainModel.hashPassword(password);

        console.log(hashedPassword);
        
   
        const captain = await createCaptain({firstname,lastname,email,password:hashedPassword,vehicleColor,vehiclePlate,vehicleCapacity,vehicleType})
        if (captain.alreadyRegister) {
            return res.status(400).json({res:captain})
        }
        // console.log(captain);
        
        const token = captain.generateAuthToken(captain._id);
        res.status(201).json({token,captain})
         

        
    } catch (error) {
        console.log('some error :' +error);
        
        
    }

}


const loginCaptain =async (req,res)=>{
    try {

        const errors =validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
            
        }

        const {email,password} =req.body;

 //       // find captain is present in db
        const captain = await captainModel.findOne({email}).select('+password');
// if captain is not present then return error
        if (!captain) {
            return res.status(401).json({msg:'invalid email and password'})
            
        }
// if captain present  --->  password  match    
        const isMatch = await captain.comparePassword(password);
        // console.log(isMatch);
        
        if (!isMatch) {
            return res.status(401).json({msg:'invalid email and password'})
            
        }
//    generate token and send token in res
        const token = captain.generateAuthToken(captain._id);
        //  delete captain.password;
        // console.log(captain);
        
        res.status(201).json({token,captain})  

    } catch (error) {
        console.log('some error in login : '+error);
        
    }

}



const getCaptainProfile=(req,res)=>{

    res.status(200).json(req.captain)
}

const logoutCaptain= async (req,res)=>{

    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token 
        const tokenBlack= await BlacklistedTokenModel.create({token})
    res.clearCookie('token').status(200).json({msg:'you are logout sucessfully'});

}

export {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain}