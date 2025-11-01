import React from "react";
import "../styles/components/AllPopup.css";
import logo from "../assets/logo_transparent.png";

const ExportModal = ({ show, onClose, onExport }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="popup-title">Export Data</h2>
        <p className="popup-message">
          Would you like to export your dashboard data as a CSV file?
        </p>
        <div className="popup-buttons">
          <button className="popup-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="popup-btn logout" onClick={onExport}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;