# User Metadata

> Dokumentasi lengkap tentang struktur data pengguna yang digunakan dalam sistem.

---

## Daftar Isi

- [Struktur Tabel Database](#struktur-tabel-database)
- [API Endpoints](#api-endpoints)
  - [Register](#1-register)
  - [Login](#2-login)
  - [Get Profile](#3-get-profile)
- [Contoh Response](#contoh-response)
- [Keamanan](#keamanan)

---

## Struktur Tabel Database

### Tabel `users`

| Kolom                  | Tipe Data      | Wajib | Default              | Keterangan                                    |
| ---------------------- | -------------- | :---: | -------------------- | --------------------------------------------- |
| `id`                   | UUID           |  ✅   | `gen_random_uuid()`  | ID unik pengguna, dibuat otomatis             |
| `email`                | VARCHAR(255)   |  ✅   | —                    | Alamat email, harus unik                      |
| `password`             | VARCHAR(255)   |  ✅   | —                    | Password yang sudah di-hash (bcrypt)          |
| `full_name`            | VARCHAR(100)   |  ✅   | —                    | Nama lengkap pengguna                         |
| `username`             | VARCHAR(30)    |  ✅   | —                    | Username unik (huruf, angka, underscore)      |
| `phone_number`         | VARCHAR(20)    |  ❌   | `null`               | Nomor telepon                                 |
| `date_of_birth`        | DATE           |  ❌   | `null`               | Tanggal lahir (format: `YYYY-MM-DD`)          |
| `gender`               | VARCHAR(10)    |  ❌   | `null`               | Jenis kelamin: `male`, `female`, atau `other` |
| `address`              | VARCHAR(255)   |  ❌   | `null`               | Alamat tempat tinggal                         |
| `profile_picture_url`  | TEXT           |  ❌   | `null`               | URL foto profil                               |
| `role`                 | VARCHAR(20)    |  ✅   | `'user'`             | Peran pengguna: `user` atau `admin`           |
| `created_at`           | TIMESTAMPTZ    |  ✅   | `NOW()`              | Waktu pendaftaran (otomatis)                  |
| `updated_at`           | TIMESTAMPTZ    |  ✅   | `NOW()`              | Waktu terakhir diperbarui (via trigger)       |

---

## API Endpoints

### 1. Register

**Endpoint:** `POST /api/auth/register`

#### Request Body

| Field          | Tipe     | Wajib | Validasi                                                       |
| -------------- | -------- | :---: | -------------------------------------------------------------- |
| `email`        | `string` |  ✅   | Format email valid                                             |
| `password`     | `string` |  ✅   | Min. 8 karakter, mengandung huruf besar, huruf kecil, dan angka |
| `full_name`    | `string` |  ✅   | 2–100 karakter                                                 |
| `username`     | `string` |  ✅   | 3–30 karakter, hanya huruf, angka, dan underscore              |
| `phone_number` | `string` |  ❌   | Format nomor telepon valid                                     |
| `date_of_birth`| `string` |  ❌   | Format ISO 8601 (`YYYY-MM-DD`)                                 |
| `gender`       | `string` |  ❌   | Salah satu dari: `male`, `female`, `other`                     |
| `address`      | `string` |  ❌   | Maksimal 255 karakter                                          |

#### Contoh Request

```json
{
  "email": "jordan@email.com",
  "password": "Password123",
  "full_name": "Jordan Sitorus",
  "username": "jordannst",
  "phone_number": "081234567890",
  "date_of_birth": "2000-01-15",
  "gender": "male",
  "address": "Medan, Sumatera Utara"
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

#### Request Body

| Field        | Tipe     | Wajib | Keterangan                     |
| ------------ | -------- | :---: | ------------------------------ |
| `identifier` | `string` |  ✅   | Bisa diisi email atau username |
| `password`   | `string` |  ✅   | Password akun                  |

#### Contoh Request

```json
{
  "identifier": "jordannst",
  "password": "Password123"
}
```

---

### 3. Get Profile

**Endpoint:** `GET /api/auth/me`

#### Headers

| Key             | Value              |
| --------------- | ------------------ |
| `Authorization` | `Bearer <token>`   |

---

## Contoh Response

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

### Get Profile Berhasil

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

### Error Response

```json
{
  "error": "Email atau username sudah terdaftar"
}
```

```json
{
  "errors": [
    { "msg": "Format email tidak valid", "path": "email" },
    { "msg": "Password minimal 8 karakter", "path": "password" }
  ]
}
```

---

## Keamanan

| Aspek              | Detail                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| **Password Hash**  | Bcrypt dengan 12 salt rounds, tidak pernah dikirim dalam response      |
| **Token JWT**      | Berlaku selama **24 jam**, berisi: `id`, `email`, `role`               |
| **Authorization**  | Header `Authorization: Bearer <token>` diperlukan untuk endpoint `/me` |
| **Validasi Input** | Semua input divalidasi di server menggunakan `express-validator`       |
