import mongoose from "mongoose";


const {ObjectId} = mongoose.Schema.Types

const carSchema= new mongoose.Schema({
    owner : {type :ObjectId , ref: 'User'},
    brand : {type :String , ref: true},
    model : {type :String , ref: true},
    image : {type :String , ref: true},
    year : {type :Number , ref: true},
    category : {type :String , required:true},
    brand : {type :String , ref: true},
    seating_capacity:{type:Number, required:true},
    fuel_type:{type:string, required:true},
    transmission:{type:String, required:true},
    pricePerDay:{type:Number, required:true},
    location:{type:String, required:true},
    description:{type:String, required:true},
    isAvaliable:{type:Boolean, default:true},
},{timestamps:true})


const Car = mongoose.model('Car', carSchema)

export default Car;