import React from "react";

const SuggestionPopup = ({ show, onClose, children }) => {
  if (!show) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        onClick={handleOutsideClick}
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "600px",
          height: "650px",
          left: "calc(50% - 300px)", // 600px / 2
          top: "calc(50% - 325px)", // 650px / 2
          background: "#00B4D8",
          border: "1px solid #000000",
          boxShadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "50px",
          padding: "20px",
        }}
        className="flex flex-col items-center justify-start"
      >
        {/* You can put suggestions or other content here */}
        {children || (
          <p className="text-white text-xl font-semibold">
            Suggestion content goes here.
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestionPopup;
