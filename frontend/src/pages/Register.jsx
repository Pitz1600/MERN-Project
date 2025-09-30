import React, { useContext, useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();

    const {backendUrl, getUserData} = useContext(AppContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitRegister = async (e) => {
    try {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        if (password === confirmPassword) {
            const {data} = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
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
    <div>
      <div className="card">
        <div className="logo">Logo</div>
        <h2 className="title">PureText</h2>
        <h4 className="subtitle">Register</h4>
        <form onSubmit={onSubmitRegister}>
          <div className="inputGroup">
            <label className="label">Full Name:</label>
            <input
              type="text"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Email address:</label>
            <input
              type="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Confirm your password"
            />
          </div>
          <a href="/" className="authLink">Already have an account? Login</a>
          <div className="buttonContainer">
            <button type="submit" className="button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
