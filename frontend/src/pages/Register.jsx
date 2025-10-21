import React, { useContext, useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import logoDrop from '../assets/logo_transparent.png'; 
import eyeOpen from '../assets/eye_on.png';
import eyeClosed from '../assets/eye_off.png';

function Register() {
  const navigate = useNavigate();
  const { backendUrl, getUserData } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (password === confirmPassword) {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('Passwords do not match!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="logo-circle">
          <img src={logoDrop} alt="logo" />
        </div>
        <div className="register-logo">PureText</div>
        <h4 className="register-title">Register</h4>

        <form onSubmit={onSubmitRegister}>
          <div className="input-group">
            <label>Full Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Email address:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
<div className="input-group password-wrapper">
  <label>Password:</label>
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="toggle-icon"
    onClick={() => setShowPassword(!showPassword)} 
  >
    <img
      src={showPassword ? eyeClosed : eyeOpen} 
      alt="toggle password visibility"
      className="eye-icon"
    />
  </span>
</div>

<div className="input-group password-wrapper">
  <label>Confirm Password:</label>
  <input
    type={showConfirm ? 'text' : 'password'}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <span
    className="toggle-icon"
    onClick={() => setShowConfirm(!showConfirm)} 
  >
    <img
      src={showConfirm ? eyeClosed : eyeOpen}
      alt="toggle confirm password visibility"
      className="eye-icon"
    />
  </span>
</div>

          <a href="/" className="auth-link">
            Already have an account? Login
          </a>

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
