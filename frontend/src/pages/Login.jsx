import React, { useContext, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left panel */}
        <div className="login-left">
          <div className="logo-circle">
            <img src="/src/assets/logo.png" alt="Logo" className="logo-icon" />
          </div>
          <h2 className="app-name">PureText</h2>
          <p className="app-desc">App for Identifying Biased Language</p>
          <p className="login-note">Login to Continue</p>
        </div>

        {/* Right panel */}
        <div className="login-right">
          <form onSubmit={onSubmitLogin}>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-row">
              <a href="/reset-password">Forgot Password?</a>
            </div>

            <div className="button-group">
              <button type="submit" className="btn-login">
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="btn-register"
              >
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
