import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analyzer from "./pages/Analyzer.jsx";  
import History from "./pages/History.jsx";
import ProfileSettings from "./pages/ProfileSetting.jsx"; 
import AboutUs from "./pages/AboutUs.jsx"; 
import Dictionary from "./pages/Dictionary.jsx"; 
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

import { AppContext } from "./context/AppContext.jsx";

const App = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Default route: always go to home */}
        <Route path="/" element={<Home />} />

        {/* Auth-related routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/analyzer"
          element={isLoggedIn ? <Analyzer /> : <Navigate to="/" />}
        />
        <Route
          path="/dictionary"
          element={isLoggedIn ? <Dictionary /> : <Navigate to="/" />}
        />
        <Route
          path="/history"
          element={isLoggedIn ? <History /> : <Navigate to="/" />}
        />
        <Route
          path="/profile-settings"
          element={isLoggedIn ? <ProfileSettings /> : <Navigate to="/" />}
        />
        
        <Route path="/about-us" element={<AboutUs />} />  

         <Route path="/dictionary" element={<Dictionary />} /> 

         <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
