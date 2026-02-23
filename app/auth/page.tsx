import type { Metadata } from "next";
import AuthContainer from "./components/AuthContainer";

export const metadata: Metadata = {
  title: "Login — MyApp",
  description: "Masuk atau daftar akun MyApp",
};

export default function AuthPage() {
  return (
    <main className="font-sans antialiased bg-navy-900">
      <AuthContainer />
    </main>
  );
}
