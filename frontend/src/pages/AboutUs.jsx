import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AboutUs.css";
import Container from "../components/Container.jsx"; // ✅ container component
import logo from "../assets/logo.png"; // ✅ your logo
import backIcon from "../assets/icon_back.png"; // ✅ your back arrow image

const AboutUs = () => {
const navigate = useNavigate();

return (
<div className="aboutus-container">
<Container>
{/* Back Button inside container */}
<div className="aboutus-header">
<button className="back-btn" onClick={() => navigate(-1)}>
<img src={backIcon} alt="Back" className="back-icon" />
</button>
<h1 className="aboutus-title">About Us</h1>
</div>

    {/* Logo Section */}
    <div className="aboutus-logo">
      <img src={logo} alt="PureText Logo" />
    </div>

    {/* Main Content Card */}
    <div className="aboutus-card">
      <h2>About PureText</h2>
      <p>
        PureText is a platform that simplifies and enhances your text-based
        workflow. Our mission is to empower users to transform how they
        handle writing and communication tasks.
      </p>

      <h2>Our Purpose</h2>
      <p>
        We aim to provide users with tools that make writing, editing, and
        organization effortless and enjoyable.
      </p>

      <h2>Contact Us</h2>
      <p>Reach out to us at example@email.com</p>
    </div>
  </Container>
</div>


);
};
export default AboutUs; // ✅ required!
