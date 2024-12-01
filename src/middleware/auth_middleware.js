import  jwt  from "jsonwebtoken";
import { conf } from "../config/config.js";
import userModel from "../Users/userModel.js";
import blacklistedTokenModel from "../Users/blacklistedTokenModel.js";
import captainModel from "../captain/captain_model.js";

const authUser = async(req,res,next)=>{

    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token 
    if (!token) {
        console.log('token not present');
        
        return res.status(401).json({msg:'unauthorized'})
        
    }
    // console.log({token});

    const isBlackListed = await blacklistedTokenModel.findOne({token});
    if (isBlackListed) {
        return res.status(401).json({msg:'unauthorized'})

        
    }
    
    try {
        
        const decoded = jwt.verify(token,conf.jwtSecret);
        const user = await userModel.findById(decoded._id);

        req.user=user;
        return next()

    } catch (error) {
           return res.status(401).json({msg:'unauthorized'})

    }

}

const authCaptain = async(req,res,next)=>{

    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token 
    if (!token) {
        console.log('token not present');
        
        return res.status(401).json({msg:'unauthorized'})
        
    }
    // console.log({token});

    const isBlackListed = await blacklistedTokenModel.findOne({token});
    if (isBlackListed) {
        return res.status(401).json({msg:'unauthorized'})

        
    }
    
    try {
        
        const decoded = jwt.verify(token,conf.jwtSecret);
        const captain = await captainModel.findById(decoded._id);

        req.captain=captain;
        return next()

    } catch (error) {
           return res.status(401).json({msg:'unauthorized'})

    }

}

export { authUser,authCaptain}