import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Connected to MongoDB via Mongoose!');
  } catch (error) {
    console.log('❌ Failed to connect to MongoDB via Mongoose:', error);
    throw error;
  }
}

export default connectDB;