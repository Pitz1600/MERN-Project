import React, { useContext, useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitLogin = async (e) => {
    try {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
            setIsLoggedIn(true);
            getUserData();
            navigate('/');   
        } else {
            toast.error(data.message + 'else');
        }
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="card">
        <img className="logo" alt='Logo'/>
        <h2 className="title">PureText</h2>
        <h4 className="subtitle">Login</h4>
        <form onSubmit={onSubmitLogin}>
          <div className="inputGroup">
            <label className="label">Email address:</label>
            <input
              type="email"
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <a href="/reset-password" className="authLink">Forgot Password?</a>
          <div className="buttonContainer">
            <button type="submit">Login</button>
            <button onClick={() => navigate('/register')} type="button">Create New Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
