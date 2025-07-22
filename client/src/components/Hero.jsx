import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { motion } from "framer-motion";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/cars?pickupLocation=' + pickupLocation + "&pickupDate=" + pickupDate + '&returnDate=' + returnDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl md:text-5xl font-semibold'
      >
        Luxury Cars on Rent
      </motion.h1>

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'
      >
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8'>
          <div className='flex flex-col items-start gap-2'>
            <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
              <option value=''>Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            <p className='px-1 text-sm text-gray-500'>
              {pickupLocation ? pickupLocation : 'Please select location'}
            </p>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              name="pickup-date"
              min={today}
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              required
              className='text-sm text-gray-500'
            />
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              name="return-date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              required
              className='text-sm text-gray-500'
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'
        >
          <img src={assets.search_icon} alt="search" className='brightness-300' />
          Search
        </motion.button>
      </motion.form>

      <motion.img
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="Main Car"
        className='max-h-74'
      />
    </motion.div>
  );
};

export default Hero;
