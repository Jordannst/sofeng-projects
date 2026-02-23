import { body } from 'express-validator';

/**
 * Aturan validasi untuk endpoint Register.
 * Field wajib: email, password, full_name, username.
 * Field opsional: phone_number, date_of_birth, gender, address.
 */
export const registerValidation = [
  // Email harus valid
  body('email')
    .isEmail().withMessage('Format email tidak valid')
    .normalizeEmail(),

  // Password minimal 8 karakter, harus mengandung huruf besar, huruf kecil, dan angka
  body('password')
    .isLength({ min: 8 }).withMessage('Password minimal 8 karakter')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password harus mengandung huruf besar, huruf kecil, dan angka'),

  // Nama lengkap wajib diisi, 2-100 karakter
  body('full_name')
    .trim()
    .notEmpty().withMessage('Nama lengkap wajib diisi')
    .isLength({ min: 2, max: 100 }).withMessage('Nama lengkap harus 2-100 karakter'),

  // Username wajib, 3-30 karakter, hanya huruf, angka, dan underscore
  body('username')
    .trim()
    .notEmpty().withMessage('Username wajib diisi')
    .isLength({ min: 3, max: 30 }).withMessage('Username harus 3-30 karakter')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya boleh huruf, angka, dan underscore'),

  // Nomor telepon (opsional)
  body('phone_number')
    .optional({ values: 'falsy' })
    .isMobilePhone('any').withMessage('Format nomor telepon tidak valid'),

  // Tanggal lahir (opsional, format ISO: YYYY-MM-DD)
  body('date_of_birth')
    .optional({ values: 'falsy' })
    .isISO8601().withMessage('Format tanggal tidak valid (gunakan YYYY-MM-DD)'),

  // Gender (opsional, hanya: male/female/other)
  body('gender')
    .optional({ values: 'falsy' })
    .isIn(['male', 'female', 'other']).withMessage('Gender harus male, female, atau other'),

  // Alamat (opsional, maksimal 255 karakter)
  body('address')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 255 }).withMessage('Alamat maksimal 255 karakter'),
];

/**
 * Aturan validasi untuk endpoint Login.
 * Field wajib: identifier (email atau username) dan password.
 */
export const loginValidation = [
  // Identifier bisa berupa email atau username
  body('identifier')
    .trim()
    .notEmpty().withMessage('Email atau username wajib diisi'),

  body('password')
    .notEmpty().withMessage('Password wajib diisi'),
];
