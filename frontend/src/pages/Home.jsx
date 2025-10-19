import React from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#023E8A] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="bg-white text-black w-full max-w-6xl rounded-3xl p-8 shadow-lg">
          <h2 className="text-center text-xl font-semibold mb-8">
            Welcome back,{" "}
            <span className="text-[#023E8A]">&lt;Full Name&gt;</span>!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600 mb-6">No analyzed text yet?</p>
              </div>
              <button className="bg-[#023E8A] hover:bg-[#0077B6] text-white font-semibold py-2 rounded-full transition-all">
                Start Analyzing
              </button>
            </div>

            {/* Usage Statistics */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6 text-center flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Usage Statistics
              </h3>
              <div className="w-40 h-40 bg-[#90E0EF] rounded-full mb-4"></div>
              <p className="text-gray-600">No statistics yet.</p>
              <p className="text-gray-500 mt-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Additional Tips */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Tips
              </h3>
              <p className="text-gray-600 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;