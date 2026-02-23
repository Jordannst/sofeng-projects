import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Menambahkan properti 'user' pada interface Request
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware untuk memverifikasi token JWT.
 * Mengambil token dari header Authorization (format: "Bearer <token>"),
 * lalu menyimpan data pengguna yang ter-decode ke req.user.
 */
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Mengambil token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token akses diperlukan' });
    return;
  }

  try {
    // Memverifikasi dan mendekode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    // Menyimpan data pengguna ke request untuk digunakan di route handler
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token tidak valid atau sudah kedaluwarsa' });
    return;
  }
};

export default authenticateToken;
