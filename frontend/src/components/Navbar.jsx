import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Analyzer", path: "/analyzer" },
    { name: "History", path: "/history" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="w-full bg-cyan-400 shadow-md">
<div className="w-full px-6 py-3 flex items-center justify-between">
  {/* Left side: Logo + nav */}
  <div className="flex items-center gap-6">
    {/* Logo */}
    <div
      onClick={() => {
        navigate("/");
        setMenuOpen(false);
      }}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-black cursor-pointer"
    >
      💧
    </div>

    {/* Desktop nav links */}
    <div className="hidden md:flex items-center gap-4 text-black font-medium">
      {!userData.isAccountVerified ? (<></>) : (<>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={index}
            onClick={() => {
              navigate(item.path);
              setMenuOpen(false);
            }}
            className={`relative px-5 py-2 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-white text-cyan-600"
                : "hover:bg-white hover:text-cyan-600"
            }`}
          >
            {item.name}
          </button>
        );
      })}
      </>)}
    </div>
  </div>

  {/* Right side: Profile/Login (Desktop) */}
  <div className="hidden md:flex items-center">
    {userData ? (
      <div className="relative group">
        <div
          onClick={() => {
            navigate("/profile-settings");
            setMenuOpen(false);
          }}
          className="w-9 h-9 flex justify-center items-center bg-white text-black rounded-full cursor-pointer"
          title="Profile Settings"
        >
          {userData.name[0].toUpperCase()}
        </div>
      </div>
          ) : (
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
     {menuOpen && (
  <div className="md:hidden bg-cyan-300 text-black px-4 py-3 space-y-2 text-sm max-h-[50vh] overflow-y-auto rounded-b-lg shadow-lg">
    {navItems.map((item, index) => {
      const isActive = location.pathname === item.path;
      return (
        <button
          key={index}
          onClick={() => {
            navigate(item.path);
            setMenuOpen(false);
          }}
          className={`block w-full text-left px-3 py-1.5 rounded-md transition duration-200 ${
            isActive
              ? "bg-white text-cyan-600"
              : "hover:bg-white hover:text-cyan-600"
          }`}
        >
          {item.name}
        </button>
      );
    })}

    {userData ? (
      <div className="border-t border-cyan-400 pt-2">
        <button
          onClick={() => {
            navigate("/profile-settings");
            setMenuOpen(false);
          }}
          className="w-full text-left px-3 py-1.5 rounded-md text-black text-sm mb-2"
        >
          Profile Settings
        </button>
        <button
          onClick={() => {
            logout();
            setMenuOpen(false);
          }}
          className="w-full text-left px-3 py-1.5 rounded-md hover:bg-white hover:text-cyan-600 text-sm"
        >
          Logout
        </button>
      </div>
    ) : (
      <button
        onClick={() => {
          navigate("/");
          setMenuOpen(false);
        }}
        className="w-full text-left px-3 py-1.5 rounded-md border border-gray-500 hover:bg-white hover:text-cyan-600 text-sm"
      >
        Login
      </button>
    )}
  </div>
)}
    </nav>
  );
};

export default Navbar;
