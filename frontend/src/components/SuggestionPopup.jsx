import React from "react";
import "../styles/components/SuggestionPopup.css"; 

const SuggestionPopup = ({ show, onClose, children }) => {
  if (!show) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={handleOutsideClick}>
        {children || (
          <p className="popup-text">Suggestion content goes here.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestionPopup;
