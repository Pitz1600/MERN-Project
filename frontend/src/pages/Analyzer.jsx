import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/LoadingModal";
import Container from "../components/Container";
import AnalyzeButton from "../components/AnalyzeButton";
import "../styles/Analyzer.css";
import chevronRight from "../assets/arrow.png"; // ✅ Add this import at the top
import { toast } from "react-toastify";

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
        toast.error("Failed to analyze text.");
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      const parsedResults = data.map((item) =>
        typeof item === "string" ? JSON.parse(item) : item
      );

      setResults(parsedResults); 
      // Parse the JSON response
      // if (Array.isArray(data)) {
      //   setResults(data);
      // } else if (data) {
      //   setResults([data]);
      // } else {
      //   setResults([]);
      // }
      // setResults(data ? [data] : []); 
      // Wrap the data in an array if it exists, otherwise empty array
      // Try to save the analysis result to the app backend (optional; requires authenticated user cookie)
      (async () => {
        try {
          const payload = {
            prompt: text,         // ✅ the full textarea input
            results: parsedResults // ✅ the analyzer output array
          };

          const saveResp = await fetch("http://localhost:3001/api/user/analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });

          if (!saveResp.ok) {
            console.warn("Save analysis responded with status", saveResp.status);
          } else {
            console.log("Analysis saved successfully!");
            toast.success("Analysis saved successfully!");
          }
        } catch (saveErr) {
          console.warn("Failed to save analysis:", saveErr);
          toast.error("Failed to save analysis.");
        }
      })();

      console.log("Response status:", response.status);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setShowPopup(false);
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

  const useCorrection = (original, correction) => {
  const textarea = document.querySelector(".analyzer-textarea");
  if (!textarea) return;

  // Get the current text
  const currentText = textarea.value;

  // Replace the first occurrence of the original text with the correction
  const updatedText = currentText.replace(original, correction);

  // Update both the textarea and React state
  textarea.value = updatedText;
  setText(updatedText);

  // Update counts
  const trimmed = updatedText.trim();
  setWordCount(trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0);
  setCharCount(updatedText.length);
};

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
  {/* Tabs + Chevron */}
  <div className="results-tabs">
    {/* 👇 Chevron on the left of All 0 */}
    <img
      src={chevronRight}
      alt="Chevron Right"
      className="chevron-right"
    />

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

  {/* Divider */}
  <div className="results-divider"></div>
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
                        onClick={() => useCorrection(res.original_text, res.correction)}
                      >
                        Use Correction
                      </button>
                    </div>
                  )}
                </div>
              )))}
            </div>
          </div>
        </div>
      </Container>

      {/* Popup Modal */}
      <PopupModal show={showPopup}>
        <h2 className="popup-title">Analyzing...</h2>
        <p className="popup-message">Your input is being processed.</p>
      </PopupModal>
    </div>
  );
};

export default Analyzer;
