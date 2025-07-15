import React, { useEffect, useState } from 'react';
import { assets, dummyMyBookingsData } from '../../assets/assets';
import OwnerTitle from './../../components/owner/OwnerTitle';

const ManageBookings = () => {
const [bookings,setBookings] =useState([])

const fetchOwnerBookings=async()=>{
    setBookings(dummyMyBookingsData)
}
useEffect(()=>{
    fetchOwnerBookings()
},[])

    return (
        <div className="px-4 pt-10 md:px-10 w-full">
            <OwnerTitle  title={'Manage Bookings'} subtitle={'Track all customer bookings, approve or cancel requests, and manage booking statuses'}/>
        
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-bordercolor mt-6">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                  <thead className="text-gray-500">
                    <tr>
                      <th className="p-3 font-medium">Car</th>
                      <th className="p-3 font-medium max-md:hidden">Date Range</th>
                      <th className="p-3 font-medium">Total</th>
                      <th className="p-3 font-medium max-md:hidden">Status</th>
                      <th className="p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index} className="border-t border-bordercolor">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={booking.car.image}
                            alt=""
                            className="h-12 w-12 aspect-square rounded-md object-cover"
                          />
                          <div className="max-md:hidden">
                            <p className="font-medium">
                              {booking.car.brand} {booking.car.model}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.car.seating_capacity} .  {booking.car.transmission}
                            </p>
                          </div>
                        </td>
                        <td className="max-md:hidden p-3">
                            {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T'[0])}
                        </td>
                        <td className="p-3">
                           ${booking.price}
                        </td>
                        <td className="p-3 max-md:hidden">
                            <span className={`px-3 py-1 rounded-full text-xs  ${
      booking.status === 'confirmed'
        ? 'bg-green-100 text-green-500'
        : booking.status === 'pending'
          ? 'bg-yellow-100 text-yellow-500'
          : 'bg-blue-100 text-blue-500'
    }`}>
        {booking.status}
                            </span>
                        </td>
                        <td className=" p-3">
  {booking.status === 'confirmed' ? (
    <span className="px-3 py-1 rounded-full text-xs text-green-500 bg-green-100">
      confirmed
    </span>
  ) : booking.status === 'pending' ? (
    <select
      className="px-2 py-1 rounded border text-gray-700 bg-white"
      defaultValue=""
    >
      <option value="" disabled>
        Choose
      </option>
      <option value="confirmed">Confirm</option>
      <option value="cancelled">Cancel</option>
    </select>
  ) : null}
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        
        
        </div>
    );
};

export default ManageBookings;