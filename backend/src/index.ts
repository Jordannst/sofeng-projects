import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// Middleware
// ========================

// Mengizinkan request dari frontend (CORS)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Mengurai JSON dari request body
app.use(express.json());

// ========================
// Rute API
// ========================

// Rute autentikasi (register, login, profil)
app.use('/api/auth', authRoutes);

// Pemeriksaan kesehatan server
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server berjalan dengan baik' });
});

// ========================
// Menjalankan Server
// ========================

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
