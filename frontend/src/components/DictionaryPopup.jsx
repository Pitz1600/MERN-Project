import React from "react";

const DictionaryPopup = ({ show, onClose, wordData }) => {
  if (!show || !wordData) return null;

  return (
    <div className="dictionary-popup-overlay" onClick={onClose}>
      <div
        className="dictionary-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="popup-word">{wordData.word}</h2>

        <div className="popup-details">
          <p>
            <strong>Sentiment Score:</strong> {wordData.score / 5}
          </p>
          <p>
            <strong>Definition:</strong> {wordData.meaning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPopup;
