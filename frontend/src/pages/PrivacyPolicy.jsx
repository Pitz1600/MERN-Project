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
            <h2>Privacy Policy</h2>
            <p>
              At PureText, we value your privacy and are committed to protecting
              your personal information. This policy explains how we collect, use,
              and safeguard your data when using our services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect limited personal information (such as name and email)
              to provide better user experiences and maintain account security.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use collected information solely to enhance platform functionality,
              personalize your experience, and ensure service reliability.
            </p>

            <h2>Your Consent</h2>
            <p>
              By using PureText, you consent to this privacy policy. You can request
              data removal anytime by contacting us at privacy@puretext.com.
            </p>
          </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
