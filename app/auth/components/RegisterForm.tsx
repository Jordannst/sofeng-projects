"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { register, clearAuth } from "@/app/lib/api";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    if (!agreeTerms) {
      setError("Anda harus menyetujui Syarat & Ketentuan");
      return;
    }

    setLoading(true);

    try {
      await register({
        email,
        password,
        full_name: fullName,
        username,
        ...(phoneNumber && { phone_number: phoneNumber }),
        ...(dateOfBirth && { date_of_birth: dateOfBirth }),
        ...(gender && { gender }),
        ...(address && { address }),
      });
      // Registrasi berhasil — arahkan ke form login, bukan dashboard
      clearAuth();
      onSwitchToLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}
      <div className="flex lg:hidden items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-md bg-accent-500 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-base font-bold text-navy-900 tracking-tight">
          MyApp
        </span>
      </div>

      <h2 className="text-xl font-bold text-navy-900">Buat akun baru</h2>
      <p className="text-slate-500 text-xs mt-1 mb-4">
        Mulai perjalanan Anda. Gratis, tanpa kartu kredit.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Nama Lengkap & Username — 2 kolom */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe123"
                required
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-navy-900 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.078 1.921l-7.5 4.615a2.25 2.25 0 01-2.344 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75"
                />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password & Konfirmasi — 2 kolom */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 karakter"
                required
                minLength={8}
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                required
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Nomor Telepon (Opsional) */}
        <div>
          <label className="block text-xs font-medium text-navy-900 mb-1">
            Nomor Telepon <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="081234567890"
              className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Telepon, Tanggal Lahir, Gender — 3 kolom */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Tanggal Lahir <span className="text-slate-400 font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </span>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full pl-9 pr-2 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Gender <span className="text-slate-400 font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full pl-9 pr-2 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition appearance-none bg-white cursor-pointer"
              >
                <option value="">Pilih</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-900 mb-1">
              Alamat <span className="text-slate-400 font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Alamat"
                maxLength={255}
                className="w-full pl-9 pr-2 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>



        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-accent-500 focus:ring-accent-500/30 cursor-pointer accent-accent-500"
          />
          <label
            htmlFor="terms"
            className="text-sm text-slate-600 cursor-pointer select-none leading-snug"
          >
            Saya setuju dengan{" "}
            <a
              href="#"
              className="text-accent-500 hover:text-accent-600 font-medium transition"
            >
              Syarat &amp; Ketentuan
            </a>{" "}
            dan{" "}
            <a
              href="#"
              className="text-accent-500 hover:text-accent-600 font-medium transition"
            >
              Kebijakan Privasi
            </a>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Buat Akun"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-xs text-slate-400 font-medium">atau</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full py-2 border border-slate-300 rounded-lg text-sm font-medium text-navy-900 hover:bg-slate-50 active:bg-slate-100 transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Daftar dengan Google
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-4">
        Sudah punya akun?
        <button
          onClick={onSwitchToLogin}
          className="text-accent-500 hover:text-accent-600 font-semibold transition ml-1 cursor-pointer"
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}
