import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/LoadingModal";
import Container from "../components/Container";
import AnalyzeButton from "../components/AnalyzeButton";
import "../styles/Analyzer.css";
import chevronRight from "../assets/arrow.png";
import { toast } from "react-toastify";

const Analyzer = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [usedCorrections, setUsedCorrections] = useState(new Set()); 

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
        headers: { "Content-Type": "application/json" },
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

      // Save to backend (optional)
      (async () => {
        try {
          const payload = {
            prompt: text,
            results: parsedResults,
          };
          const saveResp = await fetch("http://localhost:3001/api/user/analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });

          if (saveResp.ok) {
            toast.success("Analysis saved successfully!");
          } else {
            console.warn("Save analysis responded with status", saveResp.status);
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
  if (cat.includes("biased")) return "biased";
  if (cat.includes("review")) return "reviewable";
  if (cat.includes("neutral")) return "neutral";
  return "neutral";
};


  const useCorrection = (original, correction) => {
    const textarea = document.querySelector(".analyzer-textarea");
    if (!textarea) return;

    const currentText = textarea.value;

    // ✅ Check if the original text still exists
    if (!currentText.includes(original)) {
      toast.warn("Original text has already been changed or removed.");
      return;
    }

    // ✅ Replace the first occurrence
    const updatedText = currentText.replace(original, correction);
    textarea.value = updatedText;
    setText(updatedText);

    const trimmed = updatedText.trim();
    setWordCount(trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0);
    setCharCount(updatedText.length);

    // ✅ Mark this correction as used
    setUsedCorrections((prev) => new Set(prev).add(original));
  };

  // ✅ Count results per category
  const counts = {
    All: results.length,
    Biased: results.filter(
      (r) => r.category?.toLowerCase().includes("biased")
    ).length,
    Reviewable: results.filter(
      (r) => r.category?.toLowerCase().includes("review")
    ).length,
    Neutral: results.filter(
      (r) => r.category?.toLowerCase().includes("neutral")
    ).length,
  };

  // ✅ Filter results based on active tab
  const filteredResults =
    activeTab === "All"
      ? results
      : results.filter((r) =>
          r.category?.toLowerCase().includes(activeTab.toLowerCase())
        );
  
  useEffect(() => {
    const storedText = sessionStorage.getItem("analyzer_text");
    if (storedText) {
      setText(storedText);
      setWordCount(storedText.trim().split(/\s+/).filter(Boolean).length);
      setCharCount(storedText.length);
      sessionStorage.removeItem("analyzer_text"); // ✅ clear after load
    }
  }, []);


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
              <div className="results-tabs">
                <img src={chevronRight} alt="Chevron Right" className="chevron-right" />

                {["All", "Biased", "Reviewable", "Neutral"].map((tab) => (
                  <span
                    key={tab}
                    className={`tab ${tab.toLowerCase()} ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}{" "}
                    <span className={`count ${tab.toLowerCase()}-count`}>
                      {counts[tab]}
                    </span>
                  </span>
                ))}
              </div>

              <div className="results-divider"></div>
            </div>

            {/* Result List */}
            <div className="results-list">
              {filteredResults.length === 0 ? (
                <div className="no-results-box">
                  <p>No results found for "{activeTab}".</p>
                  {activeTab === "All" && (
                    <p className="subtext">
                      Nothing to analyze yet.<br/>
                      Get started by adding text to the editor.
                    </p>
                  )}
                </div>
              ) : (
                filteredResults.map((res, idx) => (
                  <div key={idx} className="result-card">
                    <p>
                      <span className={`label ${labelClass(res.category)}`}>
                        {res.category.toUpperCase() || "N/A"}
                      </span>
                    </p>
                    {res.words_detected &&
                      res.words_detected !== "None" &&
                      res.words_detected !== null && (
                        <p className="suggestion">
                          <strong>Word(s) Detected:</strong> <em>{res.words_detected}</em>
                        </p>
                      )}
                    <p className="suggestion">
                      <strong>Original:</strong> {res.original_text || res.text || "—"}
                    </p>
                    {res.correction &&
                      res.correction !== "None" &&
                      res.correction !== null && (
                        <p className="suggestion" value={res.correction}>
                          <strong>Correction:</strong> {res.correction}
                        </p>
                      )}
                    {res.sentiment_score && (
                      <p className="suggestion">
                        <strong>Sentiment Score:</strong> {res.sentiment_score}
                      </p>
                    )}
                    <p className="suggestion">
                      <strong>Reason:</strong> {res.reason_of_correction || res.reason || "—"}
                    </p>
                    {res.date && <p className="date">{res.date}</p>}

                    {res.correction &&
                      res.correction !== "None" &&
                      res.correction !== null && (
                        <div className="result-actions">
                          <button
                            className="use-correction-btn"
                            title={
                              usedCorrections.has(res.original_text)
                                ? "Correction already applied"
                                : "Use Correction"
                            }
                            disabled={
                              usedCorrections.has(res.original_text) ||
                              !text.includes(res.original_text)
                            } // ✅ disable if already used or original text changed
                            onClick={() => useCorrection(res.original_text, res.correction)}
                          >
                            {usedCorrections.has(res.original_text)
                              ? "Used"
                              : "Use Correction"}
                          </button>
                                                    
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
                        </div>
                      )}
                  </div>
                ))
              )}
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