import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

axios.defaults.baseURL= import.meta.env.VITE_BASE_URL


export const AppContext = createContext();

export const AppProvider=({children})=>{

    const navigate=useNavigate()

    const [user,setUser]=useState(null)
    const [token,setToken]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [pickupDate,setPickupDate]=useState('')
    const [returnDate,setReturnDate]=useState('')

const [cars,setCars] =useState([])

const fetchUser=async()=>{
    try {
        const {data}=await axios.get('/api/user/data')
        if(data.success){
            setUser(data.user)
            setIsOwner(data.user.role==='owner')
        }else{
            navigate('/')
        }
    } catch (error) {
        toast.error(error.message)
    }
}
// fecth car
const fetchCars= async()=>{
    try {
        const {data} = await axios.get('/api/user/cars')
        data.success ? setCars(data.cars) : toast.error(data.message)
    } catch (error) {
        toast.error(error.message)
    }
}

const logout=()=>{
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common['Authorization'] =''
toast.success('You have been logged Out')
}
// retrive token from localstorage
useEffect(()=>{
    const token =localStorage.getItem('token')
    setToken(token)
    fetchCars()
},[])
// fecth user data when token is available

useEffect(()=>{
if(token){
    axios.defaults.headers.common['Authorization'] =`${token}`
    fetchUser();
    fetchCars();
}

},[token])



const value ={navigate, axios, user,setUser,token,setToken,isOwner,setIsOwner,fetchCars,fetchUser,showLogin,setShowLogin,logout,cars,setCars,pickupDate,setPickupDate,returnDate,setReturnDate

}

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext=()=>{
    return useContext(AppContext)
}