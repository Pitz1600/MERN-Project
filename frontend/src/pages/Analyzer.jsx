import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
import Container from "../components/Container"; 
import AnalyzeButton from "../components/AnalyzeButton";


const Analyzer = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleAnalyze = () => {
    setShowPopup(true);
  };

  const results = [
    {
      label: "BIASED",
      suggestion: "This is 51% accurate",
      date: "Oct 1, 2025 | 12:55am",
      labelColor: "text-yellow-700 font-bold",
    },
    {
      label: "NEUTRAL",
      suggestion: "Good response...",
      date: "Oct 1, 2025 | 01:23am",
      labelColor: "text-green-900 font-bold",
    },
    {
      label: "UNCLEAR",
      suggestion: "Please clarify...",
      date: "Oct 1, 2025 | 02:06pm",
      labelColor: "text-gray-800 font-bold",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#001F3F] flex flex-col overflow-x-hidden relative">
      <Navbar />

      <Container>
        {/* Versions */}
        <div className="flex justify-center sm:justify-end flex-wrap gap-2 w-full mt-2 px-2">
          <button className="min-w-[100px] h-[36px] bg-[#69D84F] rounded-[20px] text-black text-sm font-semibold shadow h hover:bg-green-700  transition">
            Version 1
          </button>
          <button className="min-w-[100px] h-[36px] bg-[#69D84F] rounded-[20px] text-black text-sm font-semibold shadow  hover:bg-green-700  transition">
            Version 2
          </button>
        </div>

        {/* Main Input/Result Box */}
        <div className="mx-auto bg-[#00B4D8] rounded-[20px] shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-full">
          <div className="flex flex-col md:flex-row gap-6 h-auto">
            {/* Left Input */}
            <div className="bg-white p-6 flex flex-col justify-between shadow-md flex-grow md:flex-[3] min-h-[300px]">
              <textarea
                className="resize-none rounded-md w-full h-48 md:h-auto p-4 text-black min-h-[150px]"
                placeholder="Enter text here..."
                value={text}
                onChange={handleChange}
              ></textarea>

              <div className="flex flex-col gap-4 mt-4">
                <span className="text-black text-sm">{wordCount} words</span>
                <div className="w-full border-t border-black" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div className="flex gap-4">
    <button
      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      title="Clear"
      onClick={() => {
        setText("");
        setWordCount(0);
      }}
    >
      <img
        src="/src/assets/icon_trash.png"
        alt="Trash Icon"
        className="w-5 h-5"
      />
    </button>

    <button
      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      title="Copy"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <img
        src="/src/assets/icon_copy.png"
        alt="Copy Icon"
        className="w-5 h-5"
      />
    </button>
  </div>

  {/* Replace this button: */}
  <AnalyzeButton onClick={handleAnalyze} disabled={!text.trim()} />
</div>
              </div>
            </div>

            {/* Right Results */}
            <div className="bg-cyan-300 rounded-lg p-6 flex-shrink-0 md:flex-[2] h-auto overflow-auto text-black shadow-md max-w-full">
              <h3 className="font-bold mb-4 border-b border-cyan-400 pb-2">Results</h3>
              <div className="space-y-5 max-h-[calc(100%-3rem)] overflow-y-auto">
                {results.map((res, idx) => (
                  <div key={idx} className="bg-white rounded p-4 shadow-sm">
                    <p>
                      Result:{" "}
                      <span className={`${res.labelColor} px-2 rounded font-bold`}>
                        {res.label}
                      </span>
                    </p>
                    <p className="text-sm mb-3">{res.suggestion}</p>
                    <p className="text-xs text-gray-600">{res.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Popup Modal */}
      <PopupModal show={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="text-xl font-bold mb-4">Analyzing...</h2>
        <p className="text-base">Your input is being processed.</p>
      </PopupModal>
    </div>
  );
};

export default Analyzer;
