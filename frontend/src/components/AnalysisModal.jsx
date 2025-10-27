import React from "react";
import "../styles/components/AnalysisModal.css";

const AnalysisModal = ({ show, onClose, analysis }) => {
  if (!show || !analysis) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="analysis-modal-overlay" onClick={onClose}>
      <div className="analysis-modal-container" onClick={handleOutsideClick}>
        <div className="analysis-modal-header">
          <h2>Analysis Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="analysis-modal-body">
          <p><strong>Category:</strong> {analysis.category || analysis.type || '—'}</p>
          <p><strong>Original:</strong> {analysis.original_text || analysis.text || '—'}</p>
          {analysis.correction && (
            <p><strong>Correction:</strong> {analysis.correction}</p>
          )}
          {analysis.words_detected && (
            <p><strong>Words Detected:</strong> {analysis.words_detected}</p>
          )}
          {analysis.sentiment_score && (
            <p><strong>Sentiment Score:</strong> {analysis.sentiment_score}</p>
          )}
          <p><strong>Reason:</strong> {analysis.reason_of_correction || analysis.reason || '—'}</p>
          {analysis.date && (
            <p><strong>Date:</strong> {new Date(analysis.date).toLocaleString()}</p>
          )}

          {/* Show full raw JSON for debugging */}
          <div className="analysis-raw">
            <h4>Raw JSON</h4>
            <pre>{JSON.stringify(analysis, null, 2)}</pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisModal;
