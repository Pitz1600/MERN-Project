import React from "react";
import Navbar from "../components/Navbar.jsx";
import PieChartElement from "../components/PieChartElement.jsx";

const Dashboard = () => {
  return (
    <div className="min-w-screen min-h-screen w-full bg-[#001F3F] flex flex-col overflow-x-hidden">
      {/* Navbar at top */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="bg-white text-black w-full min-w-200 min-h-200 rounded-3xl p-10 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to your dashboard! Here you can monitor your account
            activities, view reports, and track performance.
          </p>

          {/* Example Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 min-h-150">
            <div className="bg-blue-100 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">120</p>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Active Sessions</h3>
              <p className="text-2xl font-bold text-gray-800">45</p>
              <PieChartElement />
            </div>

            <div className="bg-yellow-100 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">Tasks Completed</h3>
              <p className="text-2xl font-bold text-gray-800">86%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;