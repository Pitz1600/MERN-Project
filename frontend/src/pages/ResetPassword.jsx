import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import backIcon from '../assets/icon_back.png'; // adjust the path if needed


const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

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
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const otpArray = inputRefs.current.map(e => e.value);
      setOtp(otpArray.join(''));
      const { data } = await axios.post(backendUrl + '/api/auth/verify-reset-account', { email, otp })
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
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/');
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
       <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-[#023E8A] to-black">

<div className="relative card w-[400px] min-h-[350px] text-white rounded-4xl shadow-lg p-8 text-center" style={{ backgroundColor: '#00B4D8' }}>
 {(!isEmailSent || (!isOtpSubmitted && isEmailSent)) && (
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="absolute top-5 left-5"
  >
    <img src={backIcon} alt="Back" className="w-6 h-6" />
  </button>
)}
  {!isEmailSent && (
    <form onSubmit={onSubmitEmail} className="text-sm">
      
    <div className="mt-10 mb-6">
  <h1 className="text-3xl font-bold text-black mb-1">PureText</h1>
  <h2 className="title text-black ">Reset Password</h2>
</div>

      {/* Email input */}
      <div className="mb-3 w-full">
        <label className="block text-left text-sm font-medium text-black mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input bg-gray-50 outline-none text-black w-full px-4 py-2"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-60 bg-green-500 text-black py-3 rounded-2xl hover:bg-green-400 mt-5"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
</form>
        )}

       {!isOtpSubmitted && isEmailSent &&
  <form onSubmit={onSubmitOtp} className='text-sm'>
    <h2 className="title text-blue-600 font-bold text-2xl">Reset Password OTP</h2>
    <h4 className="subtitle text-gray-600 mb-6">Enter the 6-digit code sent to your email.</h4>
    <div className='flex justify-between mb-8' onPaste={handlePaste}>
      {Array(6).fill(0).map((_, index) => (
        <input type="text" maxLength='1' key={index} required
          ref={e => inputRefs.current[index] = e}
          onInput={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className='w-12 h-12 bg-gray-50 text-black text-center text-xl rounded-md border'
        />
      ))}
    </div>

     {/* Submit OTP Button */}
    <button
      className='w-58 bg-green-500 text-white py-3 rounded-2xl hover:bg-green-400'
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Verify OTP'}
    </button>

    {/* Styled "Back to Login" Button */}
    <button
      type="button"
      onClick={() => navigate('/login')}
      className='w-40 bg-green-500 text-white py-3 rounded-2xl hover:bg-green-400 mt-4'
    >
      Back to Login
    </button>
  </form>
}
{isOtpSubmitted && isEmailSent &&
  <form onSubmit={onSubmitNewPassword} className='text-sm'>
    <h2 className="title text-black font-bold text-2xl">PureText</h2>
    <h4 className="subtitle text-gray-600 mb-6">Enter your new password</h4>

    {/* New Password Input */}
    <div className='mb-4 w-full text-left'>
      <label className="block text-sm font-medium text-black mb-1">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="bg-gray-50 outline-none text-black w-full px-4 py-2 "
        placeholder="Enter new password"
        required
      />
    </div>

    {/* Confirm Password Input */}
    <div className='mb-4 w-full text-left'>
      <label className="block text-sm font-medium text-black mb-1">Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="bg-gray-50 outline-none text-black w-full px-4 py-2 "
        placeholder="Confirm new password"
        required
      />
    </div>

   {/* Submit Button */}
<button
  type="submit"
  className="w-60 bg-green-500 text-white py-3 rounded-2xl hover:bg-green-400"
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

{/* Back to Login Button */}
<button
  type="button"
  onClick={() => navigate('/login')}
  className="w-40 bg-green-500 text-white py-3 rounded-2xl hover:bg-green-400 mt-2"
>
  Back to Login
</button>
  </form>
        }
      </div>
    </div>
  )
}

export default ResetPassword
