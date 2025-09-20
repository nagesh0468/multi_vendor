import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Customer() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const fetchData = async() => {
    try {
      const response = await axios.get("vendor/vendors")
      const {vendors} = response.data
      console.log("resPonse", vendors)
      setVendors(vendors)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch vendors from backend
  useEffect(() => {
   fetchData()
    

  }, []);

  const handleClick = (id) => {
  navigate("/enquire", {
    state: { vendorId: id },
  });
};

const handleStatus = () => {
  navigate("/status")
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6  ">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
        Available Vendors
      </h1>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {vendors.map((vendor, index) => (
          <div
            key={vendor._id}
            onClick={() => handleClick(vendor._id)}
            className={`cursor-pointer rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform text-white ${
              index % 2 === 0
                ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                : "bg-gradient-to-r from-pink-500 to-rose-600"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
            <p className="text-sm opacity-90">{vendor.email}</p>
            <p className="text-sm mt-2 italic">{vendor.vendorType || "Service Provider"}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-amber-400 shadow-lg cursor-pointer" onClick={handleStatus} >
     <h4 className="text-xs sm:text-sm md:text-base font-bold">Status</h4>
</div>

    </div>
  );
}

export default Customer;
