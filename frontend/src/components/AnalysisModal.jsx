import React, { useEffect, useState } from "react";
import "../styles/components/AnalysisModal.css";
import DeleteModal from "../components/DeleteModal";
import deleteIcon from "../assets/icon_delete.png";
import { toast } from "react-toastify";

const AnalysisModal = ({ show, onClose, analysisId, onDeleteSuccess }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!show || !analysisId) return null;

  // 🧩 Fetch the selected analysis details from backend
  useEffect(() => {
    const fetchAnalysisDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/user/analysis/${analysisId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Error fetching analysis: ${res.status}`);
        const json = await res.json();

        if (!json.success) throw new Error(json.message || "Failed to load analysis details");

        setAnalysisData(json.analysis);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError(err.message || "Failed to load analysis details");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisDetails();
  }, [analysisId]);

  // 🧩 Delete selected analysis
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/user/analysis/${analysisId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");

      toast.success("Analysis deleted successfully!");
      onDeleteSuccess(analysisId);
      onClose();
    } catch (err) {
      console.error("Error deleting analysis:", err);
      toast.error(err.message || "Error deleting analysis");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleOutsideClick = (e) => e.stopPropagation();

  if (loading) {
    return (
      <div className="analysis-modal-overlay">
        <div className="analysis-modal-container">
          <h2>Loading analysis details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-modal-overlay">
        <div className="analysis-modal-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!analysisData) return null;

  const { prompt, date, results } = analysisData;

  return (
    <div className="analysis-modal-overlay" onClick={onClose}>
      <div className="analysis-modal-container" onClick={handleOutsideClick}>
        <div className="analysis-modal-header">
          <h2>Analysis Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="analysis-modal-body">
          <div className="modal-actions">
            <button className="action-btn export">Export</button>
            <button
              className="action-btn delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <img src={deleteIcon} alt="Delete" /> Delete
            </button>
          </div>

          <div className="analysis-field">
            <label>Submitted Text:</label>
            <div className="field-content">{prompt || "—"}</div>
          </div>

          <div className="analysis-field">
            <label>Date/Time:</label>
            <div className="field-content">
              {new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>

          <h3 className="section-title">Detected Results</h3>
          <div className="results-list">
            {results && results.length > 0 ? (
              results.map((r, index) => (
                <div key={index} className="result-card">
                  <div className="result-header">
                    <strong>{r.category || "Unknown"}</strong>
                    <span>({r.type || "N/A"})</span>
                  </div>

                  <div className="result-field">
                    <label>Original Text:</label>
                    <div>{r.original_text || "—"}</div>
                  </div>

                  {r.correction && (
                    <div className="result-field">
                      <label>Correction:</label>
                      <div>{r.correction}</div>
                    </div>
                  )}

                  {r.sentiment_score && (
                    <div className="result-field">
                      <label>Sentiment Score:</label>
                      <div>{r.sentiment_score}</div>
                    </div>
                  )}

                  <div className="result-field">
                    <label>Reason of Correction:</label>
                    <div>{r.reason_of_correction || "—"}</div>
                  </div>

                  <div className="result-field">
                    <label>Words Detected:</label>
                    <div>{r.words_detected || "—"}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No detailed results found.</p>
            )}
          </div>

          <div className="analysis-field full-width">
            <label>Raw JSON:</label>
            <textarea
              className="raw-json"
              readOnly
              value={JSON.stringify(analysisData, null, 2)}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AnalysisModal;