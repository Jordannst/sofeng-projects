"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ identifier, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}
      <div className="flex lg:hidden items-center gap-3 mb-10">
        <div className="w-9 h-9 rounded-lg bg-accent-500 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
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
        <span className="text-lg font-bold text-navy-900 tracking-tight">
          MyApp
        </span>
      </div>

      <h2 className="text-2xl font-bold text-navy-900">Masuk ke akun Anda</h2>
      <p className="text-slate-500 text-sm mt-1.5 mb-8">
        Selamat datang kembali! Silakan masukkan data Anda.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email atau Username */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Email atau Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-[18px] h-[18px]"
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
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="nama@email.com atau username"
              required
              className="w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-navy-900">
              Password
            </label>
            <a
              href="#"
              className="text-xs text-accent-500 hover:text-accent-600 font-medium transition"
            >
              Lupa password?
            </a>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-[18px] h-[18px]"
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
              placeholder="••••••••"
              required
              className="w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-accent-500 focus:ring-accent-500/30 cursor-pointer accent-accent-500"
          />
          <label
            htmlFor="remember"
            className="text-sm text-slate-600 cursor-pointer select-none"
          >
            Ingat saya
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Masuk"}
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
          className="w-full py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-navy-900 hover:bg-slate-50 active:bg-slate-100 transition-colors duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
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
          Masuk dengan Google
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-8">
        Belum punya akun?
        <button
          onClick={onSwitchToRegister}
          className="text-accent-500 hover:text-accent-600 font-semibold transition ml-1 cursor-pointer"
        >
          Daftar sekarang
        </button>
      </p>
    </div>
  );
}
