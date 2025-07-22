import { useEffect, useState } from "react";
import { assets} from "../../assets/assets";
import OwnerTitle from "../../components/owner/OwnerTitle";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
const {axios, isOwner}= useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedbookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Booking",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedbookings,
      icon: assets.carIconColored,
    },
  ];

  const fetchDashboardData=async()=>{
    try {
      const {data}= await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }
  useEffect(() => {
    if(isOwner){
      fetchDashboardData()
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-bordercolor"
            key={index}
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 ">
                <img src={card.icon} alt="" className="h-4 w-4"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
