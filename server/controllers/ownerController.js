import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'


// api to change owner 
export const changeRoleOwner = async (req,res)=>{

    try{

        const {_id}= req.user;
        await User.findByIdAndUpdate(_id, {role:'owner'})
        res.json({sucess:true, message: 'Now you can list your cars'})
    }
    catch(error){

        console.log(error.message);
        res.json({sucess:false , message:error.message})
    }
}


// api to list car

export const addCar= async (req,res)=>{

try{
const {_id}= req.user;
let car = JSON.parse(req.body.carData);
const imageFile= req.file;

// upload image to imagekit

const fileBuffer =fs.readFileSunc(imageFile.path)
await imagekit.upload({

    file: fileBuffer,
    fileName: imageFile.originalname,
    folder:'/cars'
})
// optimize thorughimagkkeit url transmission
 var optimizedImageUrl =imagekit.url({
path: response.filePath,
transmission:[{width:'1280'},
    {quality:'auto'},{format:'webp'}


]

 });

 const image =optimizedImageUrl;
 await Car.create({...car,owner:_id, image})

 res.json({succes:true, message:'Car Added'})

}catch(error){
    console.log(error.message)
    res.json ({succes: false, message: error.message})
}


}


// api to list owner cars

export const getOwnerCars= async (req,res)=>{
try{
const {_id}= req.user;
const cars= await Car.find({owner:_id})
res.json({succes:true, cars})
}
catch(error){
    console.log(error.message)
    res.json ({succes: false, message: error.message})
}
}


// api to toggle car availability

export const toggleCarAvailability = async (req,res)=>{
    try{
const {_id}= req.user;
const {carId} = req.body;
const car = await Car.findById(carId)

// checkig is car belong to owner

if (car.owner.toString() !== _id.toString()){
    return res.json ({succes: false, message: 'Unauthorized'})
}
car.isAvaliable=!car.isAvaliable;
await car.save()

res.json({succes:true, message:'Availability Toggled'})
}
catch(error){
    console.log(error.message)
    res.json ({succes: false, message: error.message})
}
}

// api to delete a car
export const deleteCar = async (req,res)=>{
    try{
const {_id}= req.user;
const {carId} = req.body;
const car = await Car.findById(carId)

// checkig is car belong to owner

if (car.owner.toString() !== _id.toString()){
    return res.json ({succes: false, message: 'Unauthorized'})
}
car.owner= null;
car.isAvaliable=false;
await car.save()

res.json({succes:true, message:'Car removed'})
}
catch(error){
    console.log(error.message)
    res.json ({succes: false, message: error.message})
}
}


// get dashboard data

export const getDashboardData = async (req,res)=>{

    try {
        const {_id, role} = req.user

        if(role!=='owner'){
            return res.json ({succes: false, message: 'Unauthorized'})
        }
const cars =await Car.find({owner: _id})
    } catch (error) {
         console.log(error.message)
    res.json ({succes: false, message: error.message})
    }
}