const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ========================
// Tipe Data
// ========================

export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone_number: string | null;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  profile_picture_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error?: string;
  errors?: Array<{ msg: string; path: string }>;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  username: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

// ========================
// Helper Functions
// ========================

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function saveAuth(token: string, user: User): void {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// ========================
// API Calls
// ========================

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    // Mengambil pesan error dari response
    if (data.errors && data.errors.length > 0) {
      throw new Error(data.errors.map((e: { msg: string }) => e.msg).join(', '));
    }
    throw new Error(data.error || 'Terjadi kesalahan');
  }
  return data as T;
}

/** Mendaftarkan pengguna baru */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<AuthResponse>(response);
  saveAuth(result.token, result.user);
  return result;
}

/** Login pengguna dengan email atau username */
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<AuthResponse>(response);
  saveAuth(result.token, result.user);
  return result;
}

/** Mengambil profil pengguna saat ini */
export async function getProfile(): Promise<{ user: User }> {
  const token = getToken();
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<{ user: User }>(response);
}

/** Logout — menghapus data dari localStorage */
export function logout(): void {
  clearAuth();
}
