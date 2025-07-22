import { useEffect, useState } from "react";

import Title from "../components/Title";
import BookingCard from "../components/BookingCard";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


const MyBookings = () => {
    const {axios, user} =useAppContext()

    const [bookings,setBookings] = useState([])

    const fetchBookingData= async()=>{
        try {
            const {data}= await axios.get('/api/bookings/user')
            if(data.success){
                setBookings(data.bookings)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        user && fetchBookingData()
    },[user])

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
            <Title title='My Bookings' subTitle={'View and manage your car bookings'}/>

            <div >
                {
                    bookings.map((booking,index)=><BookingCard  key={booking._id} booking={booking} index={index}/>)
                }
            </div>
        </div>
    );
};

export default MyBookings;