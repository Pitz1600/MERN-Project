import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

connectDB();

const port = process.env.PORT || 3001;

// API endpoints
app.get('/', (req, res) => { res.send('API connected.'); });
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});