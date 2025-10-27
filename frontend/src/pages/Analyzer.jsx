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
  const [results, setResults] = useState([]); // State to store analysis results

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(value.length);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setShowPopup(true); // Show the popup while processing

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send the input text to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json(); // Parse the JSON response
      setResults(data ? [data] : []); // Wrap the data in an array if it exists, otherwise empty array
      // Try to save the analysis result to the app backend (optional; requires authenticated user cookie)
      (async () => {
        try {
          const saveResp = await fetch("http://localhost:3001/api/user/analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          if (!saveResp.ok) {
            // log response but don't block showing the result
            console.warn('Save analysis responded with status', saveResp.status);
          }
        } catch (saveErr) {
          console.warn('Failed to save analysis:', saveErr);
        }
      })();
      console.log("Response status:", response.status);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setShowPopup(false); // Hide the popup after processing
    }
  };

  const labelClass = (category) => {
    if (!category) return "neutral";
    const cat = category.toLowerCase();
    if (cat.includes("neutral")) return "Neutral";
    if (cat.includes("biased")) return "Biased";
    if (cat.includes("review")) return "Reviewable";
    return "neutral";
  };

  const useCorrection = (correction) => {
    setText(correction);
    const trimmed = (correction || "").trim();
    setWordCount(trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0);
    setCharCount(correction ? correction.length : 0);
  }

  return (
    <div className="analyzer-page">
      <Navbar />
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
              <span className="word-count">{wordCount} word(s), {charCount} character(s)</span>
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
                    Category:{" "}
                    <span className={`label ${labelClass(res.category)}`}>
                      {res.category || "N/A"}
                    </span>
                  </p>
                  {res.words_detected && res.words_detected !== "None" && res.words_detected !== null && (
                  <p className="suggestion">Word(s) Detected: {res.words_detected}</p>)}
                  <p className="suggestion">
                    Original: {res.original_text || res.text || "—"}
                  </p>
                  {res.correction && res.correction !== "None" && res.correction !== null && (                  
                  <p className="suggestion" value={res.correction}>
                    Correction: {res.correction}</p>)}
                  {res.sentiment_score && <p className="suggestion">
                    Sentiment Score: {res.sentiment_score}</p>}
                  <p className="suggestion">Reason: {res.reason_of_correction || res.reason || "—"}</p>
                  {res.date && <p className="date">{res.date}</p>}
                  {res.correction && res.correction !== "None" && res.correction !== null && (
                    <div className="result-actions">
                      <button
                        className="icon-btn"
                        title="Copy"
                        onClick={() => navigator.clipboard.writeText(res.correction)}
                      >
                        <img
                          src="/src/assets/icon_copy.png"
                          alt="Copy Icon"
                          className="icon"
                        />
                      </button>

                      <button
                        className="use-correction-btn"
                        title="Use Correction"
                        onClick={() => {useCorrection(res.correction);}}
                      >
                        Use Correction
                      </button>
                    </div>
                  )}
                </div>
              ))}
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