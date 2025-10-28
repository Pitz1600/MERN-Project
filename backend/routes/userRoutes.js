import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData, saveAnalysis, getAnalyses, deleteAnalysis, getAnalysisById } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.post('/analysis', userAuth, saveAnalysis);
userRouter.get('/analysis', userAuth, getAnalyses);
userRouter.get('/analysis/:id', userAuth, getAnalysisById);
userRouter.delete('/analysis/:id', userAuth, deleteAnalysis);

export default userRouter;