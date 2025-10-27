import React from 'react';
import '../styles/components/LogoutModal.css';
import logo from '../assets/logo_transparent.png';

const LogoutModal = ({ show, onClose, onLogout }) => {
  if (!show) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="logout-modal-title">PureText</h2>
        <p className="logout-modal-message">Are you sure you want to log out?</p>
        <div className="logout-modal-buttons">
          <button className="logout-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="logout-modal-confirm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;