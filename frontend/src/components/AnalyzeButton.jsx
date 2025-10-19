    // components/AnalyzeButton.jsx
import React from "react";

const AnalyzeButton = ({ onClick, disabled }) => {
  return (
    <button
      className="bg-green-400 rounded px-6 py-2 text-black font-semibold hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      Analyze
    </button>
  );
};

export default AnalyzeButton;
