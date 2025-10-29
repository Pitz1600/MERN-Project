import React, { useState } from "react";
import "../styles/components/ChangePasswordPopup.css";
import { Save } from "lucide-react";

const ChangePasswordPopup = ({ onCancel, onSave }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSave(newPassword);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">Change password</h2>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="popup-btn save">
            Save Changes <Save size={18} />
          </button>
        </form>

        <button className="popup-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
