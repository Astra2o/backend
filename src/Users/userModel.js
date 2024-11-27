import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { conf } from '../config/config.js';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name at least 3 characters length'],

        },
        lastname:{
            type:String,

        },
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
        
    },
    socketID:{
        type:String,
    }

})

// create methods in schema for hash password /compare password /generate token
    userSchema.methods.hashPassword = async (password)=>{
        return await bcrypt.hash(password,10)
    }

    userSchema.methods.comparePassword = async (password)=>{
        return await bcrypt.compare(password,this.password)
    }

    userSchema.methods.generateAuthToken =  ()=>{
        return token = jwt.sign({_id:this.id },conf.jwtSecret)
    }



 const  userModel = mongoose.model('user',userSchema)
 export default  userModel 
