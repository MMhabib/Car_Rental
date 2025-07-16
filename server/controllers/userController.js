import { jwt } from "jsonwebtoken";
import User from "../modals/User.js"
import bcrypt from 'bcrypt'

// 
const generateToken= (userId)=>{
    const playload =userId;
    return jwt.sign(playload, process.env.JWT_SECRET)

}
// register user
export const registerUser= async(req,res)=>{

try{
    const {name,email,password} =req.body
    if(!name || !email || !password || password.length <8){
        return res.json({succes:false, message: 'Fill all the fields'})
    }
    const userExists= await User.findOne({email})
    if (userExists){
        return res.json({succes:false, message:'User Already exists'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.cretae({name, email,password: hashedPassword})
const token=generateToken(user._id.toString())
res.json({succes:true .token})
} catch(error){
console.log(error.message);
res.json({succes:false, message: error.message})
}
}


// log in user

export const loginUser= async (req,res)=>{

try{
const {email,password} =req.body
const user= await User.findOne({email})
if(!user ){
return res.json({succes:false, message:'User not Found'})
}
const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.json({succes:false, message:'Invalid Credentials'})
}
const token =generateToken(user._id.toString())
res.json({succes:true,token})

}catch(error){
console.log(error.message);
res.json({succes:false, message: error.message})
}


}


export const getUserData= async (req,res)=>{
    try{
        const {user}=req;
        res.json({succes:true, user})
    }catch(error){
        console.log(error.message)
        res.json ({succes:false, message:error.message})
    }
}