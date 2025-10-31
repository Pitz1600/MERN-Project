import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import LogoutModal from "../components/LogoutModal";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/ProfileSetting.css";
import userIcon from "../assets/user.png";
import Container from "../components/Container.jsx";
import LogoutPopup from "../components/LogoutPopup.jsx"; 
import ChangePasswordPopup from "../components/ChangePasswordPopup.jsx"; 
import aboutIcon from "../assets/icon_about.png";
import changeIcon from "../assets/icon_change.png";
import darkIcon from "../assets/icon_dark.png";
import privacyIcon from "../assets/icon_privacy.png";
import deleteIcon from "../assets/icon_delete.png";
import logoutIcon from "../assets/icon_logout.png";



const ProfileSettings = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

   const handlePasswordChange = async (newPassword) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/change-password`, { newPassword });
      if (data.success) {
        toast.success("Password changed successfully!");
        setShowChangePasswordPopup(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <Container>
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-left">
              <img src={userIcon} alt="User" className="profile-avatar" />
              <div className="profile-info">
                <h2>{userData ? userData.name : "Full Name"}</h2>
                <p>{userData ? userData.email : "example@email.com"}</p>
              </div>
            </div>
            <h3 className="profile-label">Profile</h3>
          </div>

          <hr className="profile-divider" />

         
          <div className="profile-settings">
            <h3 className="profile-setting">Settings</h3>
            <div className="settings-grid">
<button className="settings-btn about" onClick={() => navigate("/about-us")}>
  <img src={aboutIcon} alt="About" className="btn-icon" /> About Us
</button>


  <button className="settings-btn change" onClick={() => setShowChangePasswordPopup(true)}>
    <img src={changeIcon} alt="Change" className="btn-icon" /> Change Password
  </button>

  <button className="settings-btn dark">
    <img src={darkIcon} alt="Dark" className="btn-icon" /> Dark Mode
  </button>

  <button className="settings-btn privacy">
    <img src={privacyIcon} alt="Privacy" className="btn-icon" /> Privacy Policy
  </button>

  <button className="settings-btn delete">
    <img src={deleteIcon} alt="Delete" className="btn-icon" /> Delete Account
  </button>

  <button className="settings-btn logout" onClick={() => setShowPopup(true)}>
    <img src={logoutIcon} alt="Logout" className="btn-icon" /> Logout
  </button>
</div>
          </div>
        </div>
      </Container>

    
      {showPopup && (
        <LogoutPopup
          onConfirm={handleLogout}
          onCancel={() => setShowPopup(false)}
        />
      )}

      {showChangePasswordPopup && (
        <ChangePasswordPopup
          onCancel={() => setShowChangePasswordPopup(false)}
          onSave={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
