import React from 'react';
import '../styles/components/DeleteModal.css';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-container">
        <h2 className="delete-modal-title">Delete Analysis</h2>
        <p className="delete-modal-message">Are you sure you want to delete this analysis? This action cannot be undone.</p>
        <div className="delete-modal-buttons">
          <button className="delete-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-modal-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;