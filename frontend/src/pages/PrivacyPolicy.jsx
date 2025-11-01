import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PrivacyPolicy.css";
import Container from "../components/Container.jsx";
import logo from "../assets/logo.png";
import backIcon from "../assets/icon_back.png";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-container">
      <Container>
        {/* Header */}
        <div className="privacy-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Back" className="back-icon" />
          </button>
          <h1 className="privacy-title">Privacy Policy</h1>
        </div>

     
        {/* Content Card */}
        <div className="privacy-card">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.</h2>
          
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
