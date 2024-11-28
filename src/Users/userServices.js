import userModel from "./userModel.js";
import bcrypt from 'bcrypt'
import { conf } from '../config/config.js';
import jwt from 'jsonwebtoken'

// register services 

const registerUserinDb = async ({firstname,lastname,email,password})=>{
    if (!firstname || !email || !password) {
        throw new Error("All field required");
            
    }

    const userAlready =await userModel.findOne({email})
    
    if (!userAlready) {
        
        const user =  userModel.create({fullname:{firstname,lastname},email,password})
        return user ;
        
    }else{
        // console.log(user);
        console.log(userAlready);

        const result={ alreadyRegister: true,msg:'user is already register'}
        return result
    }

}


const hashPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}



const generateAuthToken = (_id)=>{
    
    const token = jwt.sign({_id },conf.jwtSecret)
    // console.log(token);
    return token
    
}





const comparePassword = async (password,userpassword)=>{
    return await bcrypt.compare(password,userpassword)
}



export {registerUserinDb,hashPassword,generateAuthToken,comparePassword}