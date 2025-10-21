import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
import Container from "../components/Container"; 
import AnalyzeButton from "../components/AnalyzeButton";
import "../styles/Analyzer.css"; 

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
      labelColor: "biased",
    },
    {
      label: "NEUTRAL",
      suggestion: "Good response...",
      date: "Oct 1, 2025 | 01:23am",
      labelColor: "neutral",
    },
    {
      label: "UNCLEAR",
      suggestion: "Please clarify...",
      date: "Oct 1, 2025 | 02:06pm",
      labelColor: "unclear",
    },
  ];

  return (
    <div className="analyzer-page">
      <Navbar />

      {/* Version Buttons Section */}
      <div className="version-buttons">
        <button className="version-btn">Version 1</button>
        <button className="version-btn">Version 2</button>
      </div>

      <Container>
        <div className="analyzer-box">
          <div className="analyzer-content">
            {/* Left Section */}
            <div className="analyzer-input-box">
              <textarea
                className="analyzer-textarea"
                placeholder="Enter text here..."
                value={text}
                onChange={handleChange}
              ></textarea>

              <div className="analyzer-footer">
                <span className="word-count">{wordCount} words</span>
                <div className="divider"></div>

                <div className="analyzer-actions">
                  <div className="icon-buttons">
                    <button
                      className="icon-btn"
                      title="Clear"
                      onClick={() => {
                        setText("");
                        setWordCount(0);
                      }}
                    >
                      <img
                        src="/src/assets/icon_trash.png"
                        alt="Trash Icon"
                        className="icon"
                      />
                    </button>

                    <button
                      className="icon-btn"
                      title="Copy"
                      onClick={() => navigator.clipboard.writeText(text)}
                    >
                      <img
                        src="/src/assets/icon_copy.png"
                        alt="Copy Icon"
                        className="icon"
                      />
                    </button>
                  </div>

                  <AnalyzeButton onClick={handleAnalyze} disabled={!text.trim()} />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="analyzer-results">
              <h3 className="results-title">Results</h3>
              <div className="results-list">
                {results.map((res, idx) => (
                  <div key={idx} className="result-card">
                    <p>
                      Result:{" "}
                      <span className={`label ${res.labelColor}`}>{res.label}</span>
                    </p>
                    <p className="suggestion">{res.suggestion}</p>
                    <p className="date">{res.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Popup Modal */}
      <PopupModal show={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="popup-title">Analyzing...</h2>
        <p className="popup-message">Your input is being processed.</p>
      </PopupModal>
    </div>
  );
};

export default Analyzer;