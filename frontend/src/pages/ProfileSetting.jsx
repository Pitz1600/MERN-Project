import React, { useContext } from "react";
import { Pencil, Moon, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/ProfileSetting.css';
import userIcon from "../assets/icon_user.png";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

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
    <div className="profile-settings-container">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="profile-settings-main">
        <div className="profile-settings-card">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-left">
              <div className="profile-avatar">
                <img src={userIcon} alt="User" />
              </div>
              <div className="profile-texts">
                <h2 className="profile-name">
                  {userData ? userData.name : "Full Name Long Example"}
                </h2>
                <p className="profile-email">
                  {userData ? userData.email : "example@email.com"}
                </p>
              </div>
            </div>
            <div className="section-title-right">Profile</div>
          </div>

          <hr className="profile-divider" />

          {/* Settings Section */}
          <div className="settings-section">
            <div className="section-title-right">Settings</div>

            <div className="settings-grid">
              <button className="settings-btn">About Us</button>
              <button className="settings-btn">
                Change Password <Pencil size={18} />
              </button>
              <button className="settings-btn">
                Dark Mode <Moon size={18} />
              </button>
              <button className="settings-btn">Privacy Policy</button>
              <button className="settings-btn settings-btn-red">
                Delete Account <Trash2 size={18} />
              </button>
              <button
                onClick={handleLogout}
                className="settings-btn settings-btn-red"
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