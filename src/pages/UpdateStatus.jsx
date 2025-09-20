import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UpdateStatus() {
  const location = useLocation();
  const { id } = location.state;

  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!status) return alert("Please select a status");

    try {
      await axios.put(`customer/update/${id}`, {
        status,
        note,
      });

      alert("Status updated!");
      navigate("/vendor");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Enquiry Status
        </h1>

        {/* Status Dropdown */}
        <label className="block mb-2 font-medium text-gray-700">
          Select Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Select status --</option>
          <option value="Contacting">Contacting</option>
          <option value="Accepted">Accepted</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Note Input */}
        <label className="block mb-2 font-medium text-gray-700">
          Add Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="3"
          placeholder="Enter note about this status update..."
          className="w-full p-2 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

export default UpdateStatus;
