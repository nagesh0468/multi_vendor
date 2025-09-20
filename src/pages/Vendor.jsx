import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Vendor() {
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  console.log("vendor id", vendor)
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch vendor enquiries
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `customer/getrequest/${vendor.id}`
      );
      setRequests(res.data.response || []);
      console.log("vendor response", res)
    } catch (err) {
      console.error("Error fetching vendor requests:", err);
    }
  };

  useEffect(() => {
    if (vendor?.id) fetchRequests();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("vendor");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Navigate to update status page
  const handleUpdate = (id) => {
    navigate(`/updatestatus`, {
      state : {
        id
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome, {vendor?.name}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((req, index) => (
            <div
              key={req._id}
              onClick={() => handleUpdate(req._id)}
              className={`cursor-pointer p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform text-white ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                  : "bg-gradient-to-r from-pink-500 to-rose-600"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">
                Customer: {req.name}
              </h2>
              <p className="text-sm mb-1">
                <b>Email:</b> {req.email}
              </p>
              <p className="text-sm mb-1">
                <b>Message:</b> {req.message}
              </p>
              <p className="text-sm">
                <b>Status:</b>{" "}
                <span className="font-bold">{req.status}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No requests found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Vendor;
