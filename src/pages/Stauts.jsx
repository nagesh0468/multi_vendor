import React, { useEffect, useState } from "react";
import axios from "axios";

function Status() {
  const [email, setEmail] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    if (!email) return alert("Please enter an email");
    setLoading(true);
    try {
      const res = await axios.post("customer/get", {email});
      const {enquiries} = res.data
      setEnquiries(enquiries);
      console.log("res", res)
       setLoading(false);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      alert("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-start p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Track Your Enquiries
      </h1>

      {/* Email Input */}
      <div className="w-full max-w-md flex gap-2 mb-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          onClick={fetchStatus}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          {loading ? "Loading..." : "Check"} 
        </button>
      </div>

      {/* Enquiries List */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {enquiries.length > 0 ? (
          enquiries.map((enq) => (
            <div
              key={enq._id}
              className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform"
            >
              <h2 className="text-lg font-semibold mb-2">
                Vendor: {enq.vendor?.name || "Unknown"}
              </h2>
              <p className="text-sm mb-1">
                <b>Message:</b> {enq.message}
              </p>
              <p className="text-sm">
                <b>Status:</b> {enq.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No enquiries found. Enter your email to track.
          </p>
        )}
      </div>
    </div>
  );
}

export default Status;
