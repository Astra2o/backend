import userModel from "./userModel.js";
import bcrypt from 'bcrypt'
import { conf } from '../config/config.js';
import jwt from 'jsonwebtoken'

// register services 

const registerUserinDb = ({firstname,lastname,email,password})=>{
    if (!firstname || !email || !password) {
        throw new Error("All field required");
            
    }

    const user =  userModel.create({fullname:{firstname,lastname},email,password})
    return user ;

}


const hashPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}



const generateAuthToken = (_id)=>{
    
    const token = jwt.sign({_id },conf.jwtSecret)
    // console.log(token);
    return token
    
}





const comparePassword = async (password)=>{
    return await bcrypt.compare(password,this.password)
}



export {registerUserinDb,hashPassword,generateAuthToken}