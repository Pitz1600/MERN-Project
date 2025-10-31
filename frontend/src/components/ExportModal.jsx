import React from "react";
import "../styles/components/ExportModal.css";
import logo from "../assets/logo_transparent.png";

const ExportModal = ({ show, onClose, onExport }) => {
  if (!show) return null;

  return (
    <div className="export-modal-overlay" onClick={onClose}>
      <div
        className="export-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="export-modal-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="export-modal-title">Export Data</h2>
        <p className="export-modal-message">
          Would you like to export your dashboard data as a CSV file?
        </p>
        <div className="export-modal-buttons">
          <button className="export-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="export-modal-confirm" onClick={onExport}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;