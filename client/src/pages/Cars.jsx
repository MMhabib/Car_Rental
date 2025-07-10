import { useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [input, setInput] = useState("");

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
            onClick={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2" />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
<p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">Showing {dummyCarData.length} Cars</p>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
{
    dummyCarData.map((car,index)=><CarCard key={index}  car={car}/>)
}
</div>
      </div>
    </div>
  );
};

export default Cars;
