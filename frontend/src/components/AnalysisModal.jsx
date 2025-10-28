import React, { useState, useEffect } from "react";
import "../styles/components/AnalysisModal.css";
import DeleteModal from "../components/DeleteModal";
import deleteIcon from "../assets/icon_delete.png";
import { toast } from "react-toastify";

const AnalysisModal = ({ show, onClose, analysis, onDeleteSuccess }) => { 
  const [historyData, setHistoryData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (!show || !analysis) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteClick = (e, analysis) => {
    e.stopPropagation();
    console.log('Analysis to delete:', analysis._id);
    setAnalysisToDelete(analysis);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!analysisToDelete._id || !analysisToDelete) {
      toast.error('No valid analysis to delete');
    return;
  }

    try {
      const response = await fetch(`http://localhost:3001/api/user/analysis/${analysisToDelete._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete analysis: ${response.status}`);
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to delete analysis');
      }

      // Update local state
      const updated = historyData.filter((item) => item.id !== analysisToDelete.id);
      setHistoryData(updated);
      
      // Update pagination if needed
      if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      onDeleteSuccess(analysisToDelete._id);

      // Reset delete modal state
      onClose();
      setShowDeleteModal(false);
      setAnalysisToDelete(null);
      toast.success('Analysis deleted successfully');
    } catch (err) {
      console.error('Error deleting analysis:', err);
      // You might want to show an error message to the user here
      setError(err.message || 'Error deleting analysis');
      toast.error(err.message || 'Error deleting analysis');
    }
  };

  return (
    <div className="analysis-modal-overlay">
      <div className="analysis-modal-container" onClick={handleOutsideClick}>        
        <div className="analysis-modal-header">
          <h2>Analysis Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="analysis-modal-body">
          <div className="modal-actions">
            <button className="action-btn edit">Edit</button>
            <button className="action-btn export">Export</button>
            <button className="action-btn delete-btn" onClick={(e) => handleDeleteClick(e, analysis)}>
              <img src={deleteIcon} alt="Delete" />Delete</button>
          </div>

          <div className="analysis-fields-grid">
            <div className="analysis-field">
              <label>Category:</label>
              <div className="field-content">{analysis.category || analysis.type || '—'}</div>
            </div>

            <div className="analysis-field">
              <label>Original Text:</label>
              <div className="field-content">{analysis.original_text || analysis.text || '—'}</div>
            </div>

            {analysis.correction && (
              <div className="analysis-field">
                <label>Correction Text:</label>
                <div className="field-content">{analysis.correction}</div>
              </div>
            )}

            {analysis.sentiment_score && (
              <div className="analysis-field">
                <label>Sentiment Score:</label>
                <div className="field-content">{analysis.sentiment_score}</div>
              </div>
            )}

            <div className="analysis-field">
              <label>Reason for Correction:</label>
              <div className="field-content">{analysis.reason_of_correction || '—'}</div>
            </div>

            <div className="analysis-field">
              <label>Word(s) Detected:</label>
              <div className="field-content">{analysis.words_detected || '—'}</div>
            </div>

            <div className="analysis-field">
              <label>ID:</label>
              <div className="field-content">{analysis._id || '—'}</div>
            </div>

            <div className="analysis-field">
              <label>Date/Time:</label>
              <div className="field-content">
                {analysis.date ? new Date(analysis.date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  }).replace(',', '') : (analysis.date || '')}
              </div>
            </div>
          </div>

          <div className="analysis-field full-width">
            <label>Raw JSON:</label>
            <textarea 
              className="raw-json" 
              readOnly 
              value={JSON.stringify(analysis, null, 2)}
            />
          </div>          
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAnalysisToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AnalysisModal;
