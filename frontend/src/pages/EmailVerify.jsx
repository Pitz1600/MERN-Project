import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/EmailVerify.css';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext)
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
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const otp = inputRefs.current.map(e => e.value).join('');
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (data.success) {
        toast.success(data.message)
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleBack = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, userData])

  return (
    <div className="email-verify-container">
      <div className="email-verify-card">
       <div className="logo">
  <img src="src/assets/logo_transparent.png" alt="PureText Logo" />
</div>
        <h2 className="title">PureText</h2>
        <h4 className="subtitle">Reset Password OTP<br/>Enter the 6-digit pin code:</h4>
        <form onSubmit={onSubmitOtp}>
          <div className='otp-inputs' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" maxLength='1' key={index} required
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" className="verify-btn">Verify OTP</button>
          <button type="button" className="back-btn" onClick={handleBack}>Back to Login</button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify
