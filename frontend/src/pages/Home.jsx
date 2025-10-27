import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar.jsx';
import Container from '../components/Container.jsx';
import { AppContext } from '../context/AppContext.jsx';

import '../styles/Home.css';
import '../styles/components/PieChartElement.css';
import '../index.css';

const Home = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasData] = useState(true); // replace later with real data state

  // ✅ Send email verification OTP
  const sendVerificationOtp = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        userId: userData.id,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Render content
  return (
    <div className="home-container">
      <Navbar />

      {!userData.isAccountVerified ? (
        // ✅ Email Verification Section
        <div className="verify-email-section">
          <img src="/src/assets/logo_transparent.png" alt="App Logo" className="verify-logo" />
          <div className="verify-content">
            <h1>Hey {userData?.name || 'User'}!</h1>
            <p>Please verify your email to continue.</p>
            <button onClick={sendVerificationOtp} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Verify Email'}
            </button>
          </div>
        </div>
      ) : (
        // ✅ Dashboard Section
        <Container>
          <div className="dashboard-wrapper">
            <h2>
              Welcome back, <span>{userData?.name || 'User'}</span>!
            </h2>

            <div className="dashboard-grid">
              {/* ✅ Recent Activity */}
              {hasData && (
                <div className="dashboard-card recent-activity">
                  <h3>Recent Activity</h3>
                  <p>Analyzed text: "The new policy may have unintended effects."</p>
                  <p>Bias detected: 45%</p>
                  <p>Date: Oct 26, 2025</p>
                </div>
              )}

              {/* ✅ Usage Statistics */}
              {hasData && (
                <div className="dashboard-card usage-stats">
                  <h3>Usage Statistics</h3>
                  <div className="usage-pie">
                    <div className="pie-chart"></div>
                    <div className="pie-labels">
                      <div><span className="color biased"></span> Biased</div>
                      <div><span className="color neutral"></span> Neutral</div>
                      <div><span className="color unclear"></span> Unclear</div>
                    </div>
                  </div>
                  <p>50% Biased</p>
                  <p>30% Neutral</p>
                  <p>20% Unclear</p>
                </div>
              )}

              {/* ✅ Tips Card */}
              <div className="dashboard-card tips-card">
                <h3>Additional Tips</h3>
                <p>Review your text results carefully — aim for neutral and balanced writing.</p>
                <p>Try analyzing multiple samples to improve bias detection accuracy.</p>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Home;
