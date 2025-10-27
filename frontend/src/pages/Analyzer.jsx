import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
import Container from "../components/Container";
import AnalyzeButton from "../components/AnalyzeButton";
import "../styles/Analyzer.css";

const Analyzer = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(value.length);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setShowPopup(true);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      setResults(data);
      console.log("Response status:", response.status);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="analyzer-page">
      <Navbar />

      {/* Version Buttons Section */}
      <div className="version-buttons">
        <button className="version-btn">Version 1</button>
        <button className="version-btn">Version 2</button>
      </div>

      <Container>
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
              <span className="word-count">
                {wordCount} word(s), {charCount} character(s)
              </span>
              <div className="divider"></div>

              <div className="analyzer-actions">
                <div className="icon-buttons">
                  <button
                    className="icon-btn"
                    title="Clear"
                    onClick={() => {
                      setText("");
                      setWordCount(0);
                      setCharCount(0);
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
            {/* Header with Tabs */}
            <div className="results-header">
              <div className="results-tabs">
              <span className="tab all">
      All <span className="count all-count">0</span>
</span>
<span className="tab biased">
  Biased <span className="count biased-count">0</span>
</span>
<span className="tab reviewable">
  Reviewable <span className="count reviewable-count">0</span>
</span>
              </div>
            </div>

            <div className="results-list">
              {results.length === 0 ? (
                <div className="no-results-box">
                  <p>Nothing to analyze yet!</p>
                  <p className="subtext">
                    Get started by adding text to the editor
                  </p>
                </div>
              ) : (
                results.map((res, idx) => (
                  <div key={idx} className="result-card">
                    <p>
                      Result:{" "}
                      <span className={`label ${res.labelColor}`}>
                        {res.sentiment}
                      </span>
                    </p>
                    <p className="suggestion">{res.text}</p>
                    <p className="date">{res.date}</p>
                  </div>
                ))
              )}
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
