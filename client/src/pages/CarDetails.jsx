import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets} from "../assets/assets";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
const {cars,axios,pickupDate,setPickupDate,returnDate,setReturnDate} =useAppContext()
const handleSubmit=async (e)=>{
e.preventDefault();
try {
 const {data} =await axios.post('/api/bookings/create',{
    car:id ,pickupDate,returnDate
  })
  if(data.success){
    toast.success(data.message)
    navigate('/my-bookings')
  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}


  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars,id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img className="rotate-180 opacity-65" src={assets.arrow_icon} alt="" />
        Back to all Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* left car image and details */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} .{car.year}
              </p>
            </div>
            <hr className="border-bordercolor my-6 " />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>
            {/* description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            {/* Features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <ul className="grid grid-cols1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "Gps",
                  "Heated Seats",
                  "Rear View",
                  "Mirror",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* right booking form */}
        <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 ">
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            ${car.pricePerDay}
            <span className="text-base text-gray-500 font-normal">
              {" "}
              per day
            </span>
          </p>
          <hr className="border border-bordercolor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
            value={pickupDate}
            onChange={e=>setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              required
              className="border border-bordercolor px-3 py-2 rounded-lg"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date </label>
            <input
            value={returnDate}
            onChange={e=>setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              className="border border-bordercolor px-3 py-2 rounded-lg"
              
            />
          </div>
          <button type="submit" class="w-full py-3 active:scale-95 transition-all text-sm text-white rounded-lg bg-primary hover:bg-primary-dull cursor-pointer"><p class="mb-0.5">Book Now</p></button>
          <p className=" text-center text-gray-500 font-normal">No credit card required to reserve</p>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CarDetails;
