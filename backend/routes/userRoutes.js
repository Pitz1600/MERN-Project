import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData, saveAnalysis, getAnalyses } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.post('/analysis', userAuth, saveAnalysis);
userRouter.get('/analysis', userAuth, getAnalyses);

export default userRouter;