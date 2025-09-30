import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {

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
    <>
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
      <h1 className='text-white'>Hey {userData ? userData.name : 'User'}!</h1>
    )}
    </>
  )
}

export default Header
