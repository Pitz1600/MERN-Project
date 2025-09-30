import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx' 
import ResetPassword from './pages/ResetPassword.jsx'
import Register from './pages/Register.jsx'
import { AppContext } from './context/AppContext.jsx';

const App = () => {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App
