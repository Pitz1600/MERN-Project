import React, { useContext, useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Home.css';
import StartAnalyzingButton from '../components/StartAnalyzingButton.jsx';
import PieChartElement from '../components/PieChartElement.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        userId: userData.id,
      });

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* ✅ Data Toggle Buttons */}
      <div className="data-toggle">
        <button
          className={`toggle-btn ${!hasData ? 'active' : ''}`}
          onClick={() => setHasData(false)}
        >
          Empty
        </button>
        <button
          className={`toggle-btn ${hasData ? 'active' : ''}`}
          onClick={() => setHasData(true)}
        >
          With Data
        </button>
      </div>

      {/* ✅ If not verified */}
      {!userData.isAccountVerified ? (
        <div className="verify-email-section">
          <img alt="App Logo" />
          <h1>Hey {userData ? userData.name : 'User'}!</h1>
          <p>Please verify your email to continue.</p>
          <button onClick={sendVerificationOtp} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Verify Email'}
          </button>
        </div>
      ) : (
        <main className="dashboard-main">
          <div className="dashboard-wrapper">
            <h2>
              Welcome back, <span>{userData ? userData.name : 'User'}</span>!
            </h2>

            <div className="dashboard-grid">
              <div className="dashboard-card recent-activity">
                <h3>Recent Activity</h3>
                {hasData ? (
                  <>
                    <p>Sample prompt 1...</p>
                    <p>Sample prompt 2...</p>
                    <p>Sample prompt 3...</p>
                  </>
                ) : (
                  <p>No analyzed text yet?</p>
                )}
                {/* ✅ Start Analyzing button opens popup */}
                {!hasData && (
                  <StartAnalyzingButton onClick={() => navigate("/analyzer")} />
                )}
              </div>

              <div className="dashboard-card usage-stats">
                <h3>Usage Statistics</h3>
                {hasData ? (
                  <>
                    <div className="circle"></div>
                    <p>50% Biased</p>
                    <p>30% Neutral</p>
                    <p>20% Unclear</p>
                  </>
                ) : (
                  <>
                    <div className="circle"></div>
                    <p>No statistics yet.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </>
                )}
              </div>

              <div className="dashboard-card tips-card">
                <h3>Additional Tips</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
