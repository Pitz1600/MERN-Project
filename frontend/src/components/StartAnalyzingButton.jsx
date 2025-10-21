import React from "react";
import "../styles/components/StartAnalyzingButton.css";

const StartAnalyzingButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="start-analyzing-btn">
      Start<br />Analyzing
    </button>
  );
};

export default StartAnalyzingButton;
