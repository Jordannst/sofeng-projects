"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import BrandingOverlay from "./BrandingOverlay";

export default function AuthContainer() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* ========== LOGIN FORM (right side by default) ========== */}
      <div
        className={`
          form-panel
          absolute top-0 right-0 w-1/2 h-full
          flex items-center justify-center p-10 bg-white
          transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]
          max-lg:relative max-lg:w-full max-lg:min-h-screen
          ${
            isRegisterActive
              ? "opacity-0 pointer-events-none translate-x-[10%] max-lg:hidden"
              : "opacity-100 translate-x-0"
          }
        `}
        style={{ transitionDelay: isRegisterActive ? "0ms" : "250ms" }}
      >
        <LoginForm onSwitchToRegister={() => setIsRegisterActive(true)} />
      </div>

      {/* ========== REGISTER FORM (left side by default) ========== */}
      <div
        className={`
          form-panel
          absolute top-0 left-0 w-1/2 h-full
          flex items-center justify-center p-10 bg-white overflow-y-auto
          transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]
          max-lg:relative max-lg:w-full max-lg:min-h-screen
          ${
            isRegisterActive
              ? "opacity-100 translate-x-0 max-lg:flex"
              : "opacity-0 pointer-events-none -translate-x-[10%] max-lg:hidden"
          }
        `}
        style={{ transitionDelay: isRegisterActive ? "250ms" : "0ms" }}
      >
        <RegisterForm onSwitchToLogin={() => setIsRegisterActive(false)} />
      </div>

      {/* ========== BRANDING OVERLAY ========== */}
      <BrandingOverlay isRegisterActive={isRegisterActive} />
    </div>
  );
}
