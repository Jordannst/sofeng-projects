import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import supabase from '../config/supabase';
import authenticateToken, { AuthRequest } from '../middleware/auth';
import { registerValidation, loginValidation } from '../validators/auth';

const router = Router();

// Daftar kolom user yang aman untuk dikirim ke client (tanpa password)
const SAFE_USER_FIELDS = 'id, email, full_name, username, phone_number, date_of_birth, gender, address, profile_picture_url, role, created_at, updated_at';

/**
 * POST /api/auth/register
 * Mendaftarkan pengguna baru ke dalam sistem.
 */
router.post('/register', registerValidation, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Memeriksa hasil validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, full_name, username, phone_number, date_of_birth, gender, address } = req.body;

    // Memeriksa apakah email sudah terdaftar
    const { data: emailExists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (emailExists) {
      res.status(409).json({ error: 'Email sudah terdaftar' });
      return;
    }

    // Memeriksa apakah username sudah digunakan
    const { data: usernameExists } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (usernameExists) {
      res.status(409).json({ error: 'Username sudah digunakan' });
      return;
    }

    // Mengenkripsi password dengan bcrypt (salt rounds: 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Menyimpan data pengguna baru ke database
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        full_name,
        username,
        phone_number: phone_number || null,
        date_of_birth: date_of_birth || null,
        gender: gender || null,
        address: address || null,
        role: 'user',
      })
      .select(SAFE_USER_FIELDS)
      .single();

    if (error) {
      console.error('Gagal menyimpan pengguna:', error);
      res.status(500).json({ error: 'Gagal membuat akun' });
      return;
    }

    // Membuat token JWT (berlaku 24 jam)
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registrasi berhasil',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

/**
 * POST /api/auth/login
 * Login pengguna dengan email atau username.
 */
router.post('/login', loginValidation, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Memeriksa hasil validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { identifier, password } = req.body;

    // Menentukan apakah identifier adalah email atau username
    const isEmail = identifier.includes('@');
    const column = isEmail ? 'email' : 'username';

    // Mencari pengguna berdasarkan email atau username
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq(column, identifier)
      .single();

    if (error || !user) {
      res.status(401).json({ error: 'Email/username atau password salah' });
      return;
    }

    // Mencocokkan password yang diinput dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Email/username atau password salah' });
      return;
    }

    // Membuat token JWT (berlaku 24 jam)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    // Menghapus password dari data yang dikirim ke client
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login berhasil',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

/**
 * GET /api/auth/me
 * Mengambil data profil pengguna yang sedang login.
 * Memerlukan token JWT di header Authorization.
 */
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Mengambil data pengguna berdasarkan ID dari token
    const { data: user, error } = await supabase
      .from('users')
      .select(SAFE_USER_FIELDS)
      .eq('id', req.user!.id)
      .single();

    if (error || !user) {
      res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Error saat mengambil profil:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

export default router;
