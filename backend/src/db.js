import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async () => {
  dotenv.config();
  try {
    // await mongoose.connect("mongodb+srv://mern-project:RWbMLcN3jdAhpvWf@cluster0.eiuujei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    // For online database connection
    await mongoose.connect("mongodb://localhost:27017/UsersDB");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;