import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getCategoryStats } from '../controllers/statsController.js';

const statsRouter = express.Router();

statsRouter.get('/category', userAuth, getCategoryStats);

export default statsRouter;