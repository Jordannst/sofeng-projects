interface BrandingOverlayProps {
  isRegisterActive: boolean;
}

export default function BrandingOverlay({
  isRegisterActive,
}: BrandingOverlayProps) {
  return (
    <div
      className={`
        absolute top-0 left-0 w-1/2 h-full z-20
        hidden lg:block
        transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]
        ${isRegisterActive ? "translate-x-full" : "translate-x-0"}
      `}
    >
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-800 brand-pattern">
        {/* Decorative shapes */}
        <div className="absolute top-16 left-10 w-3 h-3 rounded-full bg-accent-500/30 animate-float" />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-white/10 animate-float-delay" />
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 rounded-full bg-accent-500/20 animate-float-delay2" />
        <div className="absolute top-1/2 right-12 w-20 h-20 rounded-full border border-white/5" />
        <div className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full border border-white/[0.03]" />

        {/* Content: Login overlay (overlay on left) */}
        <div
          className={`
            absolute inset-0 flex flex-col justify-center p-12 text-white
            transition-opacity duration-400 ease-in delay-100
            ${isRegisterActive ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <div className="max-w-sm">
            <h1 className="text-3xl font-bold leading-snug mb-4">
              Kelola semuanya dalam satu platform.
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Akses dashboard, laporan, dan kolaborasi tim — kapan saja, di mana
              saja. Cukup satu akun untuk memulai.
            </p>
          </div>
        </div>

        {/* Content: Register overlay (overlay on right) */}
        <div
          className={`
            absolute inset-0 flex flex-col justify-center p-12 text-white
            transition-opacity duration-400 ease-in delay-100
            ${isRegisterActive ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div className="max-w-sm">
            <h1 className="text-3xl font-bold leading-snug mb-4">
              Sudah punya akun?
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Masuk untuk melanjutkan pekerjaan Anda. Dashboard, laporan, dan
              tim Anda sudah menunggu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
