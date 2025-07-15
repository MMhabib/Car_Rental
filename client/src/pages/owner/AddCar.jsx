import { useState } from "react";
import OwnerTitle from "../../components/owner/OwnerTitle";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    locatiion: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <OwnerTitle
        title="Add New Car"
        subtitle={
          "Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        }
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* car image */}
        <div>
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        {/* car brand and model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g BMW, Mercedes,Audi...."
              required
              className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.brand} onChange={e=>setCar({...car,brand:e.target.value})}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g X5, E-Class,M4...."
              required
              className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.model} onChange={e=>setCar({...car,model:e.target.value})}
            />
          </div>
          
        </div>
        {/* car year price and category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.year} onChange={e=>setCar({...car,year:e.target.value})}
            />
          </div>
  <div className="flex flex-col w-full">
            <label>Daily Price $</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.pricePerDay} onChange={e=>setCar({...car,pricePerDay:e.target.value})}
            />
          </div>
  <div className="flex flex-col w-full">
            <label>Category</label>
            <select className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.category} onChange={e=>setCar({...car,category:e.target.value})}>

              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="VAN">VAN</option>

            </select>
          </div>
        </div>
        {/* transmission,fuel type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.transmission} onChange={e=>setCar({...car,transmission:e.target.value})}>

              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>

            </select>
          </div>
  <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.fuel_type} onChange={e=>setCar({...car,fuel_type:e.target.value})}>

              <option value="">Select a Fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>

            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.seating_capacity} onChange={e=>setCar({...car,seating_capacity:e.target.value})}
            />
          </div>
        </div>
        {/* car location */}
        <div className="flex flex-col w-full">
            <label>Location</label>
            <select className="px-3 py-2 mt-1 border border-bordercolor rounded-md outline-none" value={car.fuel_type} onChange={e=>setCar({...car,fuel_type:e.target.value})}>

              <option value="">Select a Location</option>
              <option value="New York">New York</option>
              <option value="Chicago">Chicago</option>
              <option value="Kansas">Kansas</option>
              <option value="Los Angelos">Los Angelos</option>
              

            </select>
            </div>
            {/* description */}
            <div className="flex flex-col w-full">
                <label className="text-black/70" htmlFor="name">Description</label>
                <textarea value={car.description} onChange={e=>setCar({...car, description:e.target.value})} rows={5} className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" required></textarea>
            </div>
        
            <button type="submit" className="mt-5 bg-primary text-white h-12 w-42 px-4 rounded active:scale-95 transition">List your car</button>
      </form>
    </div>
  );
};

export default AddCar;
