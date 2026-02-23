# User Metadata

Dokumentasi lengkap tentang struktur data pengguna yang digunakan dalam sistem.

## Struktur Tabel `users`

| Kolom | Tipe Data | Wajib | Default | Keterangan |
|---|---|---|---|---|
| `id` | UUID | ✅ | `gen_random_uuid()` | ID unik pengguna, dibuat otomatis |
| `email` | VARCHAR(255) | ✅ | — | Alamat email, harus unik |
| `password` | VARCHAR(255) | ✅ | — | Password yang sudah di-hash (bcrypt) |
| `full_name` | VARCHAR(100) | ✅ | — | Nama lengkap pengguna |
| `username` | VARCHAR(30) | ✅ | — | Username unik (huruf, angka, underscore) |
| `phone_number` | VARCHAR(20) | ❌ | `null` | Nomor telepon |
| `date_of_birth` | DATE | ❌ | `null` | Tanggal lahir (format: YYYY-MM-DD) |
| `gender` | VARCHAR(10) | ❌ | `null` | Jenis kelamin: `male`, `female`, atau `other` |
| `address` | VARCHAR(255) | ❌ | `null` | Alamat tempat tinggal |
| `profile_picture_url` | TEXT | ❌ | `null` | URL foto profil |
| `role` | VARCHAR(20) | ✅ | `'user'` | Peran pengguna: `user` atau `admin` |
| `created_at` | TIMESTAMPTZ | ✅ | `NOW()` | Waktu pendaftaran (otomatis) |
| `updated_at` | TIMESTAMPTZ | ✅ | `NOW()` | Waktu terakhir diperbarui (otomatis via trigger) |

## Field yang Dikirim Saat Register

| Field | Wajib | Validasi |
|---|---|---|
| `email` | ✅ | Harus format email valid |
| `password` | ✅ | Min. 8 karakter, mengandung huruf besar, huruf kecil, dan angka |
| `full_name` | ✅ | 2–100 karakter |
| `username` | ✅ | 3–30 karakter, hanya huruf, angka, dan underscore |
| `phone_number` | ❌ | Format nomor telepon valid |
| `date_of_birth` | ❌ | Format ISO 8601 (YYYY-MM-DD) |
| `gender` | ❌ | Salah satu dari: `male`, `female`, `other` |
| `address` | ❌ | Maksimal 255 karakter |

## Field yang Dikirim Saat Login

| Field | Wajib | Keterangan |
|---|---|---|
| `identifier` | ✅ | Bisa diisi email atau username |
| `password` | ✅ | Password akun |

## Contoh Response API

### Register / Login Berhasil

```json
{
  "message": "Registrasi berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "jordan@email.com",
    "full_name": "Jordan Sitorus",
    "username": "jordannst",
    "phone_number": null,
    "date_of_birth": null,
    "gender": null,
    "address": null,
    "profile_picture_url": null,
    "role": "user",
    "created_at": "2026-02-23T06:00:00.000Z",
    "updated_at": "2026-02-23T06:00:00.000Z"
  }
}
```

### Get Profile (`GET /api/auth/me`)

```json
{
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "jordan@email.com",
    "full_name": "Jordan Sitorus",
    "username": "jordannst",
    "phone_number": "081234567890",
    "date_of_birth": "2000-01-15",
    "gender": "male",
    "address": "Medan, Sumatera Utara",
    "profile_picture_url": null,
    "role": "user",
    "created_at": "2026-02-23T06:00:00.000Z",
    "updated_at": "2026-02-23T06:00:00.000Z"
  }
}
```

## Catatan Keamanan

- **Password** tidak pernah dikirim dalam response API — hanya disimpan dalam bentuk hash (bcrypt, 12 salt rounds)
- **Token JWT** berlaku selama **24 jam**, berisi: `id`, `email`, `role`
- Field `password` otomatis dihapus dari response di endpoint login
- Endpoint `GET /api/auth/me` hanya bisa diakses dengan token valid di header `Authorization: Bearer <token>`
