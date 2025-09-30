import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

    const onSubmitEmail = async (e) => {
        e.preventDefault();
      try {
        setIsLoading(true);
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && setIsEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      } finally {
      setIsLoading(false);
    }
    }

    const onSubmitOtp = async (e) => {
        
      try {
        e.preventDefault();
        setIsLoading(true);

        const otpArray = inputRefs.current.map(e => e.value);
        setOtp(otpArray.join(''));

        const {data} = await axios.post(backendUrl + '/api/auth/verify-reset-account', {email, otp})
        if (data.success) {
          toast.success(data.message)
          setIsOtpSubmitted(true)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)
      } finally {
        setIsLoading(false);
      }
    }

    const onSubmitNewPassword = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && navigate('/');
      } catch (error) {
        toast.error(error.message)        
      } finally {
      setIsLoading(false);
    }
    }

  return (
    <div>      
      <div className="card">
        {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className='p-8 rounded-lg shadow-lg w-96 text-sm'>          
          <h2 className="title">Reset Password</h2>
          <h4 className="subtitle">Enter your registered email address.</h4>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full'>
            <img alt="Email icon" className='w-3 h-3'/>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input bg-white outline-none text-black"
              placeholder="Enter your Email address"
              required
            />
          </div>
          <div className="buttonContainer">
            <button type="submit" className='w-full py-3 rounded-full' disabled={isLoading}>
              {isLoading ?
                ('Loading')
              : ('Submit')}
            </button>
          </div>
        </form>
        }

        {!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitOtp} className='p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h2 className="title">Reset Password OTP</h2>
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
          <button className='w-full py-3 rounded-full' disabled={isLoading}>
            {isLoading ?
              ('Loading')
            : ('Verify Email')}</button>
        </form>
        }

        {isOtpSubmitted && isEmailSent &&        
        <form onSubmit={onSubmitNewPassword} className='p-8 rounded-lg shadow-lg w-96 text-sm'>          
          <h2 className="title">New Password</h2>
          <h4 className="subtitle">Enter the new password</h4>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full'>
            <img alt="Password icon" className='w-3 h-3'/>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input bg-white outline-none text-black"
              placeholder="New Password"
              required
            />
          </div>
          <div className="buttonContainer">
            <button type="submit" className='w-full py-3 rounded-full' disabled={isLoading}>
              {isLoading ?
                ('Loading')
              : ('Submit')}
            </button>
          </div>
        </form>
}
      </div>
    </div>
  )
}

export default ResetPassword
