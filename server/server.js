import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';


import cors from 'cors';

import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';


const PORT = process.env.PORT || 5000;

const app = express();
// connect database
await connectDB()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is on');
});
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)



app.listen(PORT, () => console.log(`server running on ${PORT}`));


