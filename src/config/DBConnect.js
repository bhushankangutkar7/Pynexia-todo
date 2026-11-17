import mongoose from 'mongoose';
import { MONGO_URL } from './Constants.js';

const DBConnect = async() => {
  try{
    await mongoose.connect(MONGO_URL);
    console.log(`MongonDB Connected`);
  } catch(err) {
    console.error(`MongoDB connection error: ${err.message}`);
  };
};

export default DBConnect;