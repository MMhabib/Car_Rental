import mongoose from 'mongoose';

// The URI is no longer declared here.

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
  
    
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    
    console.log('✅ Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // exit app if DB connection fails
  }
};

export default connectDB;