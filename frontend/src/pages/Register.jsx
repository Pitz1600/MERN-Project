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
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-[#023E8A] to-black">

<div className="card w-[400px] text-white rounded-2xl shadow-lg p-8 text-center" style={{ backgroundColor: '#00B4D8' }}>
        <div className="logo mx-auto mb-4 text-black text-4 xl font-bold">PureText</div>
        <h4 className="subtitle text-black  font-medium mb-6 text-lg">Register</h4>

        <form onSubmit={onSubmitRegister}>
          {/* Full Name */}
          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-black">Full Name:</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
               className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
             
            />
          </div>

          {/* Email */}
          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-black">Email address:</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
               className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
             
            />
          </div>

          {/* Password */}
          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-black">Password:</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
             
            />
          </div>

          {/* Confirm Password */}
          <div className="inputGroup mb-4 text-left">
            <label className="label block text-sm font-medium text-black">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input mt-1 block w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              
            />
          </div>

          {/* Link + Button */}
          <a href="/" className="authLink text-blue-600 hover:underline text-sm block mb-4">
            Already have an account? Login
          </a>

          <div className="buttonContainer flex flex-col gap-3">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded-lg"
            >
              Register
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;