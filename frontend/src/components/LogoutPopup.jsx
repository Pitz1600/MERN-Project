import React from "react";
import "../styles/components/LogoutPopup.css";
import logoImg from "../assets/logo.png"; 

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
          <div className="popup-logo">
          <img src={logoImg} alt="Logo" />
          </div>
        <h2 className="popup-title">PureText</h2>
        <p className="popup-message">Are you sure you want to log out?</p>

        <div className="popup-buttons">
          <button className="popup-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="popup-btn logout" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
