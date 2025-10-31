import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/AnalysisModal.css";
import DeleteModal from "../components/DeleteModal";
import deleteIcon from "../assets/icon_delete.png";
import { toast } from "react-toastify";

const AnalysisModal = ({ show, onClose, analysis, onDeleteSuccess }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const navigate = useNavigate();

  // 🧩 Fetch the selected analysis details from backend
  useEffect(() => {
    if (!show || !analysis) return;
    const fetchAnalysisDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/user/analysis/${analysis._id}`, {
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
  }, [analysis]);

  const handleExportCSV = () => {
    if (!analysisData || !analysisData.results) {
      alert("No analysis data to export.");
      return;
    }

    const { prompt, date, results, _id } = analysisData;
    const headers = [
      "category",
      "type",
      "original_text",
      "correction",
      "reason_of_correction",
      "sentiment_score",
      "words_detected",
    ];

    const csvRows = results.map((r) =>
      headers
        .map((header) => {
          const val = r[header] !== undefined ? String(r[header]) : "";
          return `"${val.replace(/"/g, '""')}"`
        })
        .join(",")
    );

    const csvContent =
      `Prompt,"${prompt.replace(/"/g, '""')}"\nDate,"${new Date(date).toISOString()}"\nID,"${_id}"\n\n` +
      headers.join(",") +
      "\n" +
      csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analysis_${_id || "export"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/user/analysis/${analysis._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");

      toast.success("Analysis deleted successfully!");
      onDeleteSuccess(analysis._id);
      onClose();
    } catch (err) {
      console.error("Error deleting analysis:", err);
      toast.error(err.message || "Error deleting analysis");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (textToEdit) => {
    // ✅ Save the text temporarily in sessionStorage
    sessionStorage.setItem("analyzer_text", textToEdit);
    navigate("/analyzer");
  };

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
  const allCorrections = results
    .map((r) =>
      r.correction && r.correction.trim() !== "" && r.correction !== "None"
        ? r.correction
        : r.original_text || ""
    )
    .join(" ");

  return (
    <div className="analysis-modal-overlay">
      <div className="analysis-modal-container">
        <div className="analysis-modal-header">
          <h2>Analysis Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="analysis-modal-body">
          <div className="modal-actions">
            <button className="action-btn export" onClick={handleExportCSV}>Export</button>
            <button className="action-btn delete-btn" onClick={() => setShowDeleteModal(true)}>
              <img src={deleteIcon} alt="Delete" /> Delete
            </button>
          </div>

          {/* PROMPT SECTION */}
          <div className="analysis-field">
            <label>Prompt:</label>
            <div className="field-content">
              {prompt || "—"}
              <div className="field-buttons">
                <button onClick={() => handleEdit(prompt)} className="small-btn">Edit</button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(prompt);
                    toast.success("Prompt copied!");
                  }}
                  className="small-btn"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* ALL CORRECTIONS SECTION */}
          <div className="analysis-field">
            <label>All Corrections:</label>
            <div className="field-content">
              {results && results.length > 0 ? (
                results.map((r, i) => {
                  const correctionText =
                    r.correction && r.correction.trim() !== "" && r.correction !== "None"
                      ? r.correction
                      : r.original_text || "—";
                  return (
                    <span key={i} className="correction-item">
                      {correctionText}{" "}
                    </span>
                  );
                })
              ) : (
                <div>—</div>
              )}
              <div className="field-buttons">
                <button onClick={() => handleEdit(allCorrections)} className="small-btn">Edit</button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(allCorrections);
                    toast.success("All corrections copied!");
                  }}
                  className="small-btn"
                >
                  Copy
                </button>
              </div>
            </div>
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

          {/* Raw JSON */}
          <h2 className="section-title">Detected Results</h2>
          <div className="results-list">
            {results && results.length > 0 ? (
              results.map((r, index) => (
                <div key={index} className="result-card">
                  <div className="result-header">
                    <strong>{r.category || "Unknown"}</strong>
                  </div>
                  <div className="result-field">
                    <label>Original Text:</label>
                    <div>{r.original_text || "—"}</div>
                  </div>
                  {r.correction && (
                    <div className="result-field">
                      <label>Correction:</label>
                      <div>{r.correction || "—"}</div>
                    </div>
                  )}
                  {r.sentiment_score && (
                    <div className="result-field">
                      <label>Sentiment Score:</label>
                      <div>{r.sentiment_score || "—"}</div>
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
            <div className="raw-json-controls">
              <button className="toggle-json-btn" onClick={() => setShowJson((prev) => !prev)}>
                {showJson ? "Hide JSON" : "Show JSON"}
              </button>
              <button
                className="copy-json-btn"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(analysisData, null, 2));
                  toast.success("JSON copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>

            {showJson && (
              <textarea
                className="raw-json"
                readOnly
                value={JSON.stringify(analysisData, null, 2)}
              />
            )}
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