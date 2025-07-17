
import  jwt  from 'jsonwebtoken';
import User from '../models/User.js';


export const protect= async (req,res ,next )=>{
const token = req.headers.authorization;
if(!token){
    return res.json ({succes:false , messasge: ' not authorized'})
}
try {
const userId = jwt.decode(token, process.env.JWT_SECRET)

if(!userId){
    return res.json ({sucess:false, message:'not authorized'})
}
req.user= await User.findById(userId).select('-password')
next();






}
catch(erorr){

    return res.json({succes:false, message: 'not authorized'})
}
}