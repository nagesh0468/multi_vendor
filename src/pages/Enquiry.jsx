import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Enquiry() {
  const location = useLocation()
  const navigate = useNavigate()
  const {vendorId} = location.state
  console.log("location", vendorId)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("customer/enquire", {
        name: form.name,
        email: form.email,
        message: form.message,
        vendor: vendorId, 
      });
      alert("Enquiry sent successfully!");
      setForm({ name: "", email: "", message: "" });
      navigate(-1)
    } catch (err) {
      alert("Failed to send enquiry: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Send Enquiry
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your requirement..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Enquiry
          </button>
        </form>

        {/* Back to vendors */}
        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/customer" className="text-indigo-600 font-semibold hover:underline">
            ← Back to Vendors
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Enquiry;
