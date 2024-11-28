
// import userModel from "./userModel.js";

import { validationResult } from "express-validator";
import userModel from "./userModel.js";
import { generateAuthToken, hashPassword, registerUserinDb } from "./userServices.js";

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

export {createUser}