import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Cars = () => {
  const [input, setInput] = useState("");
  // search params
  const [seacrhParams]= useSearchParams()
  const pickupLocation= seacrhParams.get('pickupLocation')
  const pickupDate= seacrhParams.get('pickupDate')
  const returnDate= seacrhParams.get('returnDate')
  const {cars,axios}= useAppContext()

  const isSearchData= pickupLocation && pickupDate && returnDate
const [filterCars,setFilterCars]=useState([])

const applyFilter=async()=>{
  if(input ===''){
    setFilterCars(cars)
    return null
  }
  const filtered= cars.slice().filter((car)=>{
    return car.brand.toLowerCase().includes(input.toLowerCase())
    || car.model.toLowerCase().includes(input.toLowerCase())
    || car.category.toLowerCase().includes(input.toLowerCase())
    || car.transmission.toLowerCase().includes(input.toLowerCase())
  })
  setFilterCars(filtered)
}

const searchCarAvailability=async()=>{
  const {data} = await axios.post('/api/bookings/check-availability',{location: pickupLocation, pickupDate,returnDate})
if(data.success){
  setFilterCars(data.availableCars)
  if(data.availableCars.length ===0){
    toast('No Cars Available')
  }
  return null
}

}
useEffect(()=>{
  isSearchData && searchCarAvailability()
},[])

useEffect(()=>{
  cars.length > 0 && !isSearchData && applyFilter()
},[input,cars])

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:pax-4">
        <Title
          title="Available Cars"
          subTitle={
            "Browse our selection of premium vehicles available for your next adventure"
          }
        />
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30  rounded-full overflow-hidden max-w-140 w-full h-12">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2" />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
<p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">Showing {filterCars.length} Cars</p>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
{
    filterCars.map((car)=><CarCard key={car._id}  car={car}/>)
}
</div>
      </div>
    </div>
  );
};

export default Cars;
