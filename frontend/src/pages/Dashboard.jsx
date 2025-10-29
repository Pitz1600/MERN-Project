import React, { useState } from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import PieChart from "../components/PieChartElement.jsx";
import PopModal from "../components/PopupModal.jsx"; // ✅ modal component

const Dashboard = () => {
  const [showData, setShowData] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ✅ for popup visibility

  const chartData = [
    { name: "Biased", value: 50 },
    { name: "Neutral", value: 30 },
    { name: "Unclear", value: 20 },
  ];

  // ✅ Function triggered when "Start Analyzing" is clicked
  const handleStartAnalyzing = async () => {
    setShowPopup(true); // show popup

    // simulate analyzing for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setShowPopup(false); // hide popup
    setShowData(true); // switch to "With Data" view after analyzing
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />

      {/* Toggle Buttons */}
      <div className="data-toggle">
        <button
          className={`data-btn ${!showData ? "active" : ""}`}
          onClick={() => setShowData(false)}
        >
          Empty
        </button>
        <button
          className={`data-btn ${showData ? "active" : ""}`}
          onClick={() => setShowData(true)}
        >
          With Data
        </button>
      </div>

      <Container>
        {!showData ? (
          // ===== EMPTY PAGE =====
          <div className="empty-page">
            <div className="empty-wrapper">
              <div className="empty-card">
                <div className="empty-left">
                  <p className="usage-text">Usage statistics is empty.</p>

                  {/* ✅ Start Analyzing Button with popup trigger */}
                  <button className="start-btn" onClick={handleStartAnalyzing}>
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
          // ===== WITH DATA PAGE =====
          <div className="data-page">
            <div className="data-card">
              <div className="overview-left">
                <h2>OVERVIEW</h2>
                <div className="overview-row">
                  <span>Total Text Analyzed:</span>
                  <span className="data-number">50</span>
                </div>
                <div className="overview-row">
                  <span>Biased Inputs:</span>
                  <span>25</span>
                </div>
                <div className="overview-row">
                  <span>Neutral Inputs:</span>
                  <span>15</span>
                </div>
                <div className="overview-row">
                  <span>Pending Inputs:</span>
                  <span>10</span>
                </div>
                <div className="overview-row">
                  <span>Most Common Result:</span>
                  <span><b>BIASED</b></span>
                </div>
                <div className="overview-row">
                  <span>Average Accuracy:</span>
                  <span>76%</span>
                </div>
                <div className="overview-row">
                  <span>Highest Accuracy:</span>
                  <span>90%</span>
                </div>

                <div className="filter-row">
                  <label>Filter:</label>
                  <select>
                    <option>Select Date</option>
                    <option>October 2025</option>
                    <option>September 2025</option>
                  </select>
                </div>
              </div>

              {/* ✅ Divider Line */}
              <div className="vertical-divider"></div>

              <div className="overview-right">
                <PieChart data={chartData} />
                <p className="result-text">
                  <strong>Results</strong>
                  <br />
                  50% Biased
                  <br />
                  30% Neutral
                  <br />
                  20% Unclear
                </p>
                <p className="lorem">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* ✅ Popup Modal */}
      <PopModal show={showPopup} onClose={() => setShowPopup(false)}>
        <h2>Analyzing...</h2>
        <p>Your text is being processed. Please wait...</p>
      </PopModal>
    </div>
  );
};

export default Dashboard;