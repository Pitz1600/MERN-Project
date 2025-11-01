import React, {useState} from "react";
import "../styles/components/PopupModal.css";
import tips from "../context/tips";

const PopupModal = ({ show, onClose }) => {
  const [currentTip, setCurrentTip] = useState("");

  React.useEffect(() => {
    if (!show) return; // only run while modal is shown

    // pick an initial random tip
    if (tips && tips.length > 0) {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    } else {
      setCurrentTip("");
    }

    // rotate tip every 10 seconds
    const interval = setInterval(() => {
      if (tips && tips.length > 0) {
        setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container" onClick={handleOutsideClick}>
        <div className="popup-inner-box">
          {/* Loading Spinner */}
          <div className="spinner">
            <div className="spinner-track"></div>
            <div className="spinner-active"></div>
          </div>

          {/* Text */}
          <p className="popup-text">Analyzing...</p>
          <br/>
          <p className="tip-content">{currentTip}</p>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;