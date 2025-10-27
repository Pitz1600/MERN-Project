import React, { useContext, useState } from "react";
import { Pencil, Moon, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import LogoutModal from "../components/LogoutModal";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


return (
  <div className="min-w-screen min-h-screen w-full bg-[#001F3F] flex flex-col overflow-x-hidden">
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
              {userData ? userData.name : 'Full Name Long Example'}
            </h2>
            <p className="text-base text-gray-800 text-center">
              {userData ? userData.email : 'example@email.com'}              
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
                onClick={() => setShowLogoutModal(true)}
                className="bg-[#FF4D4D] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#FF2E2E] transition"
              >
                Logout <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout Modal */}
      <LogoutModal 
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default ProfileSettings;
