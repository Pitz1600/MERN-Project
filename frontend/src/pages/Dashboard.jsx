import React from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />
{/* Buttons above container */}
      <div className="data-toggle">
        <button className="data-btn active">Empty</button>
        <button className="data-btn">With Data</button>
      </div>
     
   <div className="empty-page">
  <div className="empty-container">
    <div className="empty-wrapper">
      <div className="empty-card">
        <div className="empty-left">
          <p className="usage-text">Usage statistics is empty.</p>
          <button className="start-btn">
            Start <br /> Analyzing
          </button>
        </div>
        <div className="empty-right">
          <div className="circle"></div>
          <p className="no-stats">No statistics yet</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
