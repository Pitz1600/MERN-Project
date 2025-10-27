import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Navbar.css"; 
import logo from "../assets/logo_transparent.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedIn, isLoggedIn } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Analyzer", path: "/analyzer" },
    { name: "History", path: "/history" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-left">
        <div
          onClick={() => { navigate("/"); setMenuOpen(false); }}
          className="nav-logo"
        >
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

      {!userData.isAccountVerified ? (<></>) : (
          <div className="nav-links">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => { navigate(item.path); setMenuOpen(false); }}
                  className={isActive ? "active" : ""}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          )}
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            userData ? (
              <span onClick={() => { navigate("/profile-settings"); setMenuOpen(false); }}>
                <div className="profile-circle">              
                  {userData.name[0].toUpperCase()}            
                </div>
              </span>
            ) : null
          ) : (
            <button
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="nav-login-btn"
            >
              Login
            </button>
          )}
        </div>

        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className={isActive ? "active" : ""}
              >
                {item.name}
              </button>
            );
          })}

          {isLoggedIn ? (
            userData ? (
              <div className="mobile-divider">
                <button onClick={() => { navigate("/profile-settings"); setMenuOpen(false); }}>Profile Settings</button>
              </div>
            ) : null
          ) : (
            <button onClick={() => { navigate("/"); setMenuOpen(false); }}>Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
