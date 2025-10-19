import React from "react";

const StartAnalyzingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-lg text-center text-base leading-tight"
    >
      Start<br />Analyzing
    </button>
  );
};

export default StartAnalyzingButton;