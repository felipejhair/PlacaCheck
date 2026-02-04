"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Shield, MessageSquare, Star, LogIn, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { UserMenu } from "@/components/user-menu";
import { LoginModal } from "@/components/login-modal";
import { SettingsMenu } from "@/components/settings-menu";
import { FavoritesSheet } from "@/components/favorites-sheet";
import { EmergencySheet } from "@/components/emergency-sheet";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export default function Home() {
  const [placa, setPlaca] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (placa.trim().length > 0) {
      // Normalizar placa: Mayúsculas y solo alfanuméricos
      const cleanPlaca = placa.toUpperCase().replace(/[^A-Z0-9]/g, "");
      router.push(`/placa/${cleanPlaca}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative transition-colors duration-500 bg-background">

      {/* Top Left Controls: Settings & Favorites */}
      <div
        style={{ top: 'calc(1.5rem + env(safe-area-inset-top))' }}
        className="absolute left-6 z-50 flex items-center gap-4"
      >
        <SettingsMenu />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFavoritesOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg transition-all backdrop-blur-md bg-black/5 hover:bg-black/10 border-black/10 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white/70 dark:hover:text-white border"
          title={t({ es: "Mis Favoritos", en: "My Favorites" })}
        >
          <Heart className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEmergencyOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg transition-all backdrop-blur-md bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border"
          title={t({ es: "Números de Emergencia", en: "Emergency Numbers" })}
        >
          <Shield className="w-6 h-6" />
        </Button>
      </div>

      {/* Auth Control - Absolute Top Right */}
      <div style={{ top: 'calc(1.5rem + env(safe-area-inset-top))' }} className="absolute right-6 z-50">
        {user ? (
          <UserMenu />
        ) : (
          <Button
            variant="ghost"
            onClick={() => setIsLoginModalOpen(true)}
            className="font-medium text-foreground/70 hover:text-foreground hover:bg-white/10 rounded-full px-6 h-12 transition-all animate-in fade-in slide-in-from-top-4 duration-700"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {t({ es: "Iniciar Sesión", en: "Sign In" })}
          </Button>
        )}
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 dark:opacity-60"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-background/30 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gradient-start)/0.2)_0%,_hsl(var(--background))_100%)]" />
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-30 z-0" />

      <div className="w-full max-w-md space-y-12 text-center relative z-10">

        {/* Header */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="mx-auto mb-6 relative w-24 h-24 transition-transform hover:scale-105 duration-500 flex items-center justify-center">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />

            {/* Vector Logo Construction */}
            <div className="relative z-10 w-full h-full p-2">
              {/* Main Shield */}
              <Shield className="w-full h-full text-slate-200 dark:text-slate-900 fill-white dark:fill-slate-900/90 drop-shadow-2xl transition-colors duration-500" strokeWidth={1.5} />

              {/* Inner Border/Highlight */}
              <Shield className="absolute inset-0 w-full h-full p-2 text-slate-300/50 dark:text-slate-700/50 transition-colors duration-500" strokeWidth={1} />

              {/* Checkmark */}
              <div className="absolute inset-0 flex items-center justify-center pt-2 pl-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-primary drop-shadow-md"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-white dark:to-white/60">
            PlacaCheck
          </h1>
          <p className="text-muted-foreground text-lg max-w-[80%] mx-auto">
            {t({ es: "La plataforma definitiva para evaluar el comportamiento vehicular en México.", en: "The ultimate platform to evaluate driver behavior in Mexico." })}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500 animate-pulse"></div>

            <div className="relative flex items-center bg-card rounded-xl border shadow-2xl">
              <Search className="absolute left-4 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder={t({ es: "Ingresa la placa (ej: ABC-123)", en: "Enter license plate (e.g. ABC-123)" })}
                className="pl-12 h-16 text-xl bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 uppercase font-mono tracking-wider"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                maxLength={9}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={placa.length < 3}
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.98]"
          >
            {t({ es: "Buscar Placa", en: "Search Plate" })}
          </Button>
        </form>

        {/* Features / Stats */}
        <div className="pt-8 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default group">
            <div className="p-3 bg-card border rounded-full group-hover:bg-primary/20 transition-colors shadow-sm">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium" dangerouslySetInnerHTML={{ __html: t({ es: "Comentarios<br />Anónimos", en: "Anonymous<br />Reviews" }) }} />
          </div>
          <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default group">
            <div className="p-3 bg-card border rounded-full group-hover:bg-accent/20 transition-colors shadow-sm">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-xs font-medium" dangerouslySetInnerHTML={{ __html: t({ es: "Califica<br />Conductores", en: "Rate<br />Drivers" }) }} />
          </div>
          <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default group">
            <div className="p-3 bg-card border rounded-full group-hover:bg-green-500/20 transition-colors shadow-sm">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs font-medium" dangerouslySetInnerHTML={{ __html: t({ es: "Comunidad<br />Segura", en: "Safe<br />Community" }) }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-xs text-muted-foreground/40">
        © 2026 Felipe Jhair. v1.0
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <FavoritesSheet
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
      <EmergencySheet
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </main>
  );
}
