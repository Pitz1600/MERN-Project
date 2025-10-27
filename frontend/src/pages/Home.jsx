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
import tips from '../context/tips';

const Home = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, isLoggedIn } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const autoAdvanceRef = React.useRef(null);

  const startAutoAdvance = React.useCallback(() => {
    if (!tips || tips.length === 0) return;
    // clear any existing interval
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(() => {
      setCurrentTipIndex((idx) => (idx + 1) % tips.length);
    }, 30000);
  }, []);

  const resetAutoAdvance = React.useCallback(() => {
    // restart the timer so user gets full interval after manual interaction
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    startAutoAdvance();
  }, [startAutoAdvance]);

  // Start auto-advance on mount and when tips length changes
  React.useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [startAutoAdvance, tips.length]);

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
            <h1>PureText</h1>
            <h1>Bias Text Detector</h1>
            <h2>App for Identifying Biased Language</h2>
            <br/>
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
                Welcome, <span>{userData ? userData.name : 'User'}</span>!
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
                  <div className="tip-content">
                    <p>{tips && tips.length ? tips[currentTipIndex] : 'No tips available.'}</p>
                  </div>

                  <div className="tips-pagination">
                    <button
                      className="tip-nav left"
                      onClick={() => {
                        setCurrentTipIndex((idx) => {
                          const next = (idx - 1 + tips.length) % tips.length;
                          return next;
                        });
                        resetAutoAdvance();
                      }}
                      aria-label="Previous tip"
                    >
                      ‹
                    </button>

                    <div className="tip-dots">
                      {tips.map((_, idx) => (
                        <button
                          key={idx}
                          className={`tip-dot ${currentTipIndex === idx ? 'active' : ''}`}
                          onClick={() => { setCurrentTipIndex(idx); resetAutoAdvance(); }}
                          aria-label={`Go to tip ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      className="tip-nav right"
                      onClick={() => {
                        setCurrentTipIndex((idx) => {
                          const next = (idx + 1) % tips.length;
                          return next;
                        });
                        resetAutoAdvance();
                      }}
                      aria-label="Next tip"
                    >
                      ›
                    </button>
                  </div>
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
