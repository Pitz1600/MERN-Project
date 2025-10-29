import React from "react";
import "../styles/components/PopupModal.css";

const PopupModal = ({ show, onClose }) => {
  if (!show) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={handleOutsideClick}>
        <div className="popup-inner-box">
          {/* Loading Spinner */}
          <div className="spinner">
            <div className="spinner-track"></div>
            <div className="spinner-active"></div>
          </div>

          {/* Text */}
          <p className="popup-text">Analyzing...</p>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;