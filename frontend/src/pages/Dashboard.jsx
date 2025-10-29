import React, { useState } from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar.jsx";
import PieChartElement from "../components/PieChartElement.jsx";
import Container from "../components/Container.jsx";

const Dashboard = () => {
  const [historyData, setHistoryData] = useState([]);
  
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />

      {/* ✅ Wrap main content inside Container */}
      <Container>
        {/* {historyData.length === 0 ? ( */}
        {!historyData.length === 0 ? (
          // Testing code for empty state
        <div className="empty-page">
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
        ) : (
        <div className="dashboard-content">
          <h2 className="dashboard-title">Usage Statistics</h2>
          <div className="charts-container">
            <PieChartElement />
          </div>
        </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
