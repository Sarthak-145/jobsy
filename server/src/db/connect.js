import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB is connected');
  } catch (err) {
    console.log('connection failed, err: ', err);
    process.exit(1);
  }
};
