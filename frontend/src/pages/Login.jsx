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
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-[#023E8A] to-black">
      
<div className="card w-[400px] text-white rounded-2xl shadow-lg p-8 text-center" style={{ backgroundColor: '#00B4D8' }}>
        <img className="logo mx-auto mb-4" alt="Logo" />
        <h2 className="title text-2xl font-bold mb-1 text-black">PureText</h2>
        <h4 className="subtitle text-black mb-6">Login</h4>

        <form onSubmit={onSubmitLogin}>
          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-gray-700">Email address:</label>
           <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
    placeholder=""
  />
          </div>

          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-gray-700">Password:</label>
           <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
    placeholder=""
  />
          </div>

<div className="w-full text-right mb-4">
  <a
    href="/reset-password"
    className="authLink text-blue-700 font-bold hover:underline text-sm"
  >
    Forgot Password?
  </a>
</div>

          <div className="buttonContainer flex flex-col gap-3 mt-4">
            <button type="submit" className="bg-green-600 hover:bg-green-500 text-black font-medium py-2 rounded-lg">
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              type="button"
              className="bg-green-500 hover:bg-green-400 text-black font-medium py-2 rounded-lg"
            >
              Create New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;