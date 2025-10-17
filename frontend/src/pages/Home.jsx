import React, { useContext, useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import PieChartElement from '../components/PieChartElement.jsx';

const Home = () => {

  const navigate = useNavigate();
  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendVerificationOtp = async () => {
    try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp', {userId: userData.id});
        if (data.success) {
          navigate('/email-verify');
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-[#023E8A] text-white">
      {/* Navbar */}
      <Navbar />

      {!userData.isAccountVerified ? (
      <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img alt="App Logo" className='w-36 h-36 rounded-full mb-6'/>
        <h1 className='text-white'>Hey {userData ? userData.name : 'User'}!</h1>
        <p className='text-white'>Please verify your email to continue.</p>
        <button onClick={sendVerificationOtp} disabled={isLoading}
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
          {isLoading ?
            ('Loading')
          : ('Verify Email')}</button>
      </div>
      ) : (
      <main className="min-w-screen flex-grow flex flex-col items-center justify-center p-8">
        <div className="bg-white text-black w-full min-w-6xl min-h-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-center text-xl font-semibold mb-8">
            Welcome back,{" "}
            <span className="text-[#023E8A]">{userData ? userData.name : 'User'}</span>!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-150">
            {/* Recent Activity */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600 mb-6">No analyzed text yet?</p>
              </div>
              <button onClick={() => {navigate("/analyzer");}}
              className="bg-[#023E8A] hover:bg-[#0077B6] text-white font-semibold py-2 rounded-full transition-all">
                Start Analyzing
              </button>
            </div>

            {/* Usage Statistics */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6 text-center flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Usage Statistics
              </h3>
              <PieChartElement />
              {/* <div className="w-40 h-40 bg-[#90E0EF] rounded-full mb-4"></div> */}
              <p className="text-gray-600">No statistics yet.</p>
              <p className="text-gray-500 mt-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Additional Tips */}
            <div className="bg-[#CAF0F8] border border-gray-300 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Tips
              </h3>
              <p className="text-gray-600 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </main>
      )}
    </div>
  );
};

export default Home;