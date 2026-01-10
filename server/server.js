import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/db/connect.js';
import app from './src/app.js';
import authenticate from './src/middlewares/authMiddleware.js';

const PORT = process.env.PORT || 5000;

app.get('/protect', authenticate, (req, res) => {
  res.status(200).json({ message: 'You are authorized' });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
