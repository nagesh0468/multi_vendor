import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
        Welcome to All Your Needs
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Customer Card */}
        <div
          onClick={() => navigate("/customer")}
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold mb-2">For Customer</h2>
          <p className="text-sm opacity-90">
            Browse vendors, send enquiries, and track your service requests in real-time.
          </p>
        </div>

        {/* Vendor Card */}
        <div
          onClick={() => navigate("/login")}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold mb-2">For Vendor</h2>
          <p className="text-sm opacity-90">
            Manage customer enquiries, update statuses, and grow your service business.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
