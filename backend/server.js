import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // 1. ADD THIS IMPORT
import productRoutes from './routes/productRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();

// 2. CALL THE CONNECTION HERE
connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());

// Link your Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('NexusMart API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Nexus Server active on port ${PORT}`));