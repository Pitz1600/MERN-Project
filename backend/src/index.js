import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import UserModel from './models/Users.js';

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 3001;

app.post('/login', (req, res) => {
  const { email, password } = req.body
  UserModel.findOne({ email, password })
    .then(user => {
      if (user) {
        if (user.password === password) {
        res.json("Login Successful");
        } else {
        res.json("The password is incorrect");
        }
      } else {
        res.json("No user found with this email");
        }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/signup', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});