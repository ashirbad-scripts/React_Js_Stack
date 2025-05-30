import React from "react";

function RealAPIDashboard({ onLogout }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">✅ Logged in via Real API</h2>
      <p className="text-gray-600 mt-2">You are authenticated!</p>
      <button
        onClick={onLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default RealAPIDashboard;
