import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Rute
app.use('/api/auth', authRoutes);

// Pemeriksaan kesehatan server
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
