import React from "react";
import { Pencil, Moon, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfileSettings = () => {
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    // 1️⃣ Remove auth token (or user data)
    localStorage.removeItem("token"); // or whatever key you use

    // 2️⃣ Optionally clear other saved info
    localStorage.removeItem("user");
    sessionStorage.clear();

    // 3️⃣ Redirect to login page
    navigate("/login");
  };


return (
  <div className="min-h-screen w-full bg-[#001F3F] flex flex-col overflow-x-hidden">
    {/* Navbar */}
    <Navbar />

      {/* Main Container */}
      <div className="flex-grow flex justify-center items-start pt-24 pb-10 px-4">
        <div className="bg-[#00B4D8] rounded-[20px] shadow-xl text-black flex flex-col items-center p-8 w-full max-w-[1350px] min-h-[800px]">
          {/* Profile Info */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center text-gray-400 text-4xl">
              👤
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-center">
              Full Name Long Example
            </h2>
            <p className="text-base text-gray-800 text-center">
              example@email.com
            </p>
          </div>

          <hr className="border-t border-gray-300 w-full my-6" />

          {/* Settings Section */}
          <div className="w-full px-4 sm:px-10 md:px-20">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              <span className="text-gray-700 font-medium">Profile</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              <button className="bg-[#B6FF80] text-black py-3 rounded-lg font-semibold hover:bg-[#A3FF60] transition">
                About Us
              </button>
              <button className="bg-[#B6FF80] text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#A3FF60] transition">
                Change Password <Pencil size={18} />
              </button>
              <button className="bg-[#B6FF80] text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#A3FF60] transition">
                Dark Mode <Moon size={18} />
              </button>
              <button className="bg-[#B6FF80] text-black py-3 rounded-lg font-semibold hover:bg-[#A3FF60] transition">
                Privacy Policy
              </button>
              <button className="bg-[#FF4D4D] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#FF2E2E] transition">
                Delete Account <Trash2 size={18} />
              </button>
                <button
                onClick={handleLogout}
                className="bg-[#FF4D4D] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#FF2E2E] transition"
              >
                Logout <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
