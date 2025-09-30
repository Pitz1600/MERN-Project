import express from 'express';
import { register, login, logout,
    sendVerifyOtp, verifyEmail, isAuthenticated,
    sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import userAuthEmail from '../middleware/userAuthEmail.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuthEmail, sendVerifyOtp);
authRouter.post('/verify-account', userAuthEmail, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;