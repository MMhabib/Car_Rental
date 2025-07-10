import { useEffect, useState } from "react";
import {  dummyMyBookingsData } from "../assets/assets";
import Title from "../components/Title";
import BookingCard from "../components/BookingCard";


const MyBookings = () => {

    const [bookings,setBookings] = useState([])

    const fetchBookingData= async()=>{
        setBookings(dummyMyBookingsData)
    }

    useEffect(()=>{
        fetchBookingData()
    },[])

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