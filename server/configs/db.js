import mongoose from 'mongoose';

// The URI is no longer declared here.

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
  
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@react-project.3kp3z2m.mongodb.net/?retryWrites=true&w=majority&appName=React-project`;

    await mongoose.connect(uri, clientOptions);
    
    console.log('✅ Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // exit app if DB connection fails
  }
};

export default connectDB;