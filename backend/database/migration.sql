-- =============================================
-- Migrasi Tabel Users untuk Supabase PostgreSQL
-- =============================================

-- Membuat tabel pengguna dengan metadata lengkap
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,       -- ID unik pengguna
  email VARCHAR(255) UNIQUE NOT NULL,                  -- Alamat email (unik)
  password VARCHAR(255) NOT NULL,                      -- Password yang sudah di-hash
  full_name VARCHAR(100) NOT NULL,                     -- Nama lengkap
  username VARCHAR(30) UNIQUE NOT NULL,                -- Username (unik)
  phone_number VARCHAR(20),                            -- Nomor telepon (opsional)
  date_of_birth DATE,                                  -- Tanggal lahir (opsional)
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),  -- Jenis kelamin
  address VARCHAR(255),                                -- Alamat (opsional)
  profile_picture_url TEXT,                            -- URL foto profil (opsional)
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')), -- Peran pengguna
  created_at TIMESTAMPTZ DEFAULT NOW(),                -- Waktu pendaftaran
  updated_at TIMESTAMPTZ DEFAULT NOW()                 -- Waktu terakhir diperbarui
);

-- Indeks untuk mempercepat pencarian berdasarkan email dan username
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Fungsi trigger: otomatis memperbarui kolom updated_at saat data diubah
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: menjalankan fungsi update_updated_at setiap kali baris diperbarui
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
