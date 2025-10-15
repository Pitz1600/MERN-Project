import React from "react";

const PopupModal = ({ show, onClose }) => {
  if (!show) return null;

  const handleOutsideClick = (e) => {
    // Prevent closing if clicking inside the modal
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onClose} // Close when clicking outside the modal
    >
      <div
        onClick={handleOutsideClick} // Prevent closing when clicking inside the modal
        style={{
          boxSizing: "border-box",
          width: "300px",
          height: "300px",
          backgroundColor: "#00B4D8",
          border: "1px solid #000",
          boxShadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "50px",
        }}
        className="relative flex flex-col justify-center items-center"
      >
        {/* White box (Rectangle 12) */}
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #000000",
            boxSizing: "border-box",
          }}
          className="flex flex-col justify-center items-center rounded-lg"
        >
          {/* Loading Spinner */}
          <div className="relative w-10 h-10 mb-2">
            {/* Track */}
            <div className="absolute inset-0 rounded-full border-4 border-[#E8DEF8]"></div>
            {/* Active Segment */}
            <div className="absolute inset-0 rounded-full border-4 border-t-[#6750A4] border-transparent animate-spin"></div>
          </div>

          {/* Analyzing Text */}
          <p className="text-black text-sm font-semibold">Analyzing...</p>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
