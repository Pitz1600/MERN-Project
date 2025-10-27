import React, { useContext, useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Home.css';
import '../index.css';
import StartAnalyzingButton from '../components/StartAnalyzingButton.jsx';
import PieChartElement from '../components/PieChartElement.jsx';
import Container from '../components/Container.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, isLoggedIn } = useContext(AppContext);
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

      {/* Intro page if not logged in */}
      {!isLoggedIn ? (
        <Container>
          <div className="intro-section">
            <img src='/src/assets/logo_transparent.png' alt="App Logo" style={{ width: 120, marginBottom: 24 }} />
            <h1>Welcome to Bias & Sentiment Analyzer!</h1>
            <p>
              Instantly analyze your text for bias, sentiment, and tone. Get actionable feedback and improve your writing with AI-powered insights.
            </p>
            <ul style={{ textAlign: 'left', margin: '24px auto', maxWidth: 400 }}>
              <li>• Detect bias and neutrality in your text</li>
              <li>• Get sentiment scores and suggestions</li>
              <li>• Review your analysis history</li>
              <li>• Secure, private, and easy to use</li>
            </ul>
            <button className="nav-login-btn" style={{ marginTop: 24 }} onClick={() => navigate("/login")}>Login to Get Started</button>
          </div>
        </Container>
      ) : (
        // ...existing code for verified/unverified user...
        !userData.isAccountVerified ? (
          <Container>
            <div>
              <div className="verify-email-section">
                <img src='/src/assets/logo_transparent.png' alt="App Logo" />
                <h1>Hey {userData ? userData.name : 'User'}!</h1>
                <p>Please verify your email to continue.</p>
                <button onClick={sendVerificationOtp} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Verify Email'}
                </button>
              </div>
            </div>
          </Container>
        ) : (
          <Container>
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
                  ) : (<>
                    <p >No analyzed text yet?<br />
                      {!hasData && (
                        <StartAnalyzingButton onClick={() => navigate("/analyzer")} />
                      )}</p>
                  </>
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
          </Container>
        )
      )}
    </div>
  );
};

export default Home;
