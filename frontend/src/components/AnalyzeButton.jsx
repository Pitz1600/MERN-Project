import React from "react";
import "../styles/components/AnalyzeButton.css";

const AnalyzeButton = ({ onClick, disabled }) => {
  return (
    <button
      className="analyze-button"
      onClick={onClick}
      disabled={disabled}
    >
      Analyze
    </button>
  );
};

export default AnalyzeButton;
