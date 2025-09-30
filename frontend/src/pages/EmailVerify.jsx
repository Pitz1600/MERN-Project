import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
      if (data.success) {
        toast.success(data.message)
        getUserData();
        navigate('/home')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn, userData])
  return (
    <div>
      <div className="card">
        <img className="logo" alt='Logo'/>
        <form onSubmit={onSubmitOtp} className='p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h2 className="title">Email Verify OTP</h2>
          <h4 className="subtitle">Enter the 6-digit code sent to your email address.</h4>
          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index)=>(
              <input type="text" maxLength='1' key={index} required
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className='w-12 h-12 bg-gray-50 text-black text-center text-xl rounded-md'/>
            ))}
          </div>
          <button className='w-full py-3 rounded-full'>Verify Email</button>
        </form>
        </div>
    </div>
  )
}

export default EmailVerify
