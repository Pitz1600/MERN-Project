import React from "react";
import '../styles/components/DictionaryPopup.css';

const DictionaryPopup = ({ show, onClose, wordData }) => {
  if (!show || !wordData) return null;

  return (
    <div className="d-popup-overlay" onClick={onClose}> 
      <div
        className="d-popup-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-white">
        

        <h2 className="d-popup-title">{wordData.word}</h2>

        <div className="d-popup-message">
          <p>
            <strong>Sentiment Score:</strong> {wordData.score / 5}
          </p>
          <p>
            <strong>Definition:</strong> {wordData.meaning}
          </p>          
        </div>
          {/* More Info with Icon */}
          <p className="more-info">
            <div className="info-icon"> <img src="src\assets\icon_bulb.png"/>
            </div>
            <strong>More Info</strong>
          </p>
        <button className="d-popup-btn cancel" onClick={onClose}>
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPopup;
