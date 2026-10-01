"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PartyPopper, Volume2, VolumeX, Cake, Star } from "lucide-react";

// ===========================================================================
//  Sintetizador Web Audio API: Sonidos de fiesta sin archivos externos
// ===========================================================================
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Sonido de globo ponchándose (pop!)
  playPop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio no disponible
    }
  }

  // Sonido de soplar velita (whoosh suave)
  playBlow() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio fallback
    }
  }

  // Fanfarria alegre (Arpegio infantil Do - Mi - Sol - Do5)
  playCelebration() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
      });
    } catch {
      // Audio fallback
    }
  }

  // Click dulce para botones
  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundEffects();

// ===========================================================================
//  Componentes Doodle / Crayon SVG
// ===========================================================================

export function WashiTape({
  className = "",
  color = "yellow",
}: {
  className?: string;
  color?: "yellow" | "pink" | "blue" | "mint";
}) {
  const colorMap = {
    yellow: "bg-amber-300/70 border-amber-400/40",
    pink: "bg-rose-300/70 border-rose-400/40",
    blue: "bg-sky-300/70 border-sky-400/40",
    mint: "bg-emerald-300/70 border-emerald-400/40",
  };

  return (
    <div
      className={`h-5 w-20 rounded-[2px] shadow-sm border-l-2 border-r-2 border-dashed ${colorMap[color]} backdrop-blur-xs select-none pointer-events-none ${className}`}
    />
  );
}

// Corona de crayola
export function DoodleCrown({ className = "w-10 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={`inline-block ${className}`}>
      <path
        d="M10 70 L20 20 L50 45 L80 20 L90 70 Z"
        fill="#facc15"
        stroke="#eab308"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="7" fill="#f43f5e" stroke="#e11d48" strokeWidth="2" />
      <circle cx="50" cy="45" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <circle cx="80" cy="20" r="7" fill="#10b981" stroke="#059669" strokeWidth="2" />
      <path
        d="M15 70 Q 50 75 85 70"
        stroke="#ca8a04"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Estrella de crayola hecha a mano
export function DoodleStar({
  className = "w-6 h-6",
  color = "#f59e0b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 50 50" className={`inline-block ${className}`}>
      <path
        d="M25 5 L30 18 L44 19 L33 28 L37 42 L25 34 L13 42 L17 28 L6 19 L20 18 Z"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

// Corazón hecho a mano con crayola
export function DoodleHeart({
  className = "w-6 h-6",
  color = "#f43f5e",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 50 50" className={`inline-block ${className}`}>
      <path
        d="M25 42 C12 30 5 22 5 14 C5 7 11 3 17 3 C22 3 24 7 25 9 C26 7 28 3 33 3 C39 3 45 7 45 14 C45 22 38 30 25 42 Z"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Sol sonriente doodle
export function DoodleSun({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`inline-block select-none ${className}`}>
      {/* Rayos de sol garabateados */}
      <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
        <line x1="50" y1="8" x2="50" y2="20" />
        <line x1="50" y1="80" x2="50" y2="92" />
        <line x1="8" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="92" y2="50" />
        <line x1="20" y1="20" x2="28" y2="28" />
        <line x1="72" y1="72" x2="80" y2="80" />
        <line x1="80" y1="20" x2="72" y2="28" />
        <line x1="28" y1="72" x2="20" y2="80" />
      </g>
      {/* Círculo central */}
      <circle cx="50" cy="50" r="26" fill="#fde047" stroke="#eab308" strokeWidth="4" />
      {/* Ojitos y sonrisa */}
      <circle cx="42" cy="46" r="3" fill="#78350f" />
      <circle cx="58" cy="46" r="3" fill="#78350f" />
      {/* Mejillas */}
      <circle cx="37" cy="53" r="3" fill="#f43f5e" opacity="0.5" />
      <circle cx="63" cy="53" r="3" fill="#f43f5e" opacity="0.5" />
      <path
        d="M43 54 Q 50 62 57 54"
        stroke="#78350f"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Flecha doodle curva
export function DoodleArrow({ className = "w-12 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={`inline-block ${className}`}>
      <path
        d="M10 50 Q 30 10 65 25"
        stroke="#f59e0b"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M52 18 L68 26 L56 36"
        stroke="#f59e0b"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Subrayado garabateado tipo crayola
export function DoodleSquiggle({
  className = "w-32 h-3",
  color = "#f59e0b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 120 16" className={`inline-block ${className}`} preserveAspectRatio="none">
      <path
        d="M4 8 Q 20 2, 35 10 T 65 9 T 95 10 T 116 7"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ===========================================================================
//  Mascota Vectorial: Leoncito con Corona (Leonardo) - Estilo Doodle Crayon
// ===========================================================================
export function LeoLionMascot({ className = "w-40 h-40" }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="maneGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
          <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="85%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fcd34d" />
          </radialGradient>
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Melena de león suave con contorno tipo dibujo */}
        <g className="kid-wobble" style={{ transformOrigin: "100px 105px" }}>
          <circle cx="100" cy="105" r="76" fill="url(#maneGrad)" stroke="#b45309" strokeWidth="3" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <circle
              key={deg}
              cx={100 + 72 * Math.cos((deg * Math.PI) / 180)}
              cy={105 + 72 * Math.sin((deg * Math.PI) / 180)}
              r="22"
              fill="url(#maneGrad)"
              stroke="#b45309"
              strokeWidth="2.5"
            />
          ))}
        </g>

        {/* Orejitas */}
        <circle cx="56" cy="62" r="22" fill="#d97706" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="56" cy="62" r="13" fill="#fbcfe8" />
        <circle cx="144" cy="62" r="22" fill="#d97706" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="144" cy="62" r="13" fill="#fbcfe8" />

        {/* Cara tierna */}
        <ellipse cx="100" cy="112" rx="58" ry="52" fill="url(#faceGrad)" stroke="#b45309" strokeWidth="3" />

        {/* Mejillas sonrosadas garabateadas */}
        <circle cx="68" cy="120" r="11" fill="#f43f5e" opacity="0.45" />
        <circle cx="132" cy="120" r="11" fill="#f43f5e" opacity="0.45" />

        {/* Ojos tiernos y brillantes */}
        <ellipse cx="78" cy="102" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="76" cy="99" r="3.2" fill="#ffffff" />
        <circle cx="81" cy="105" r="1.5" fill="#ffffff" />

        <ellipse cx="122" cy="102" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="120" cy="99" r="3.2" fill="#ffffff" />
        <circle cx="125" cy="105" r="1.5" fill="#ffffff" />

        {/* Naricita */}
        <polygon points="100,123 93,115 107,115" fill="#78350f" />

        {/* Hocico tierno y dientito asomando */}
        <path
          d="M93 124 Q100 131 100 125 Q100 131 107 124"
          stroke="#78350f"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Dientito de 1 añito */}
        <rect x="97" y="127" width="6" height="5" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />

        {/* Corona dorada */}
        <g transform="translate(100, 48) rotate(-4) translate(-100, -48)">
          <path
            d="M72 48 L80 18 L100 32 L120 18 L128 48 Z"
            fill="url(#crownGrad)"
            stroke="#92400e"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="19" r="4.5" fill="#06b6d4" stroke="#0891b2" strokeWidth="1" />
          <circle cx="100" cy="32" r="5" fill="#ec4899" stroke="#db2777" strokeWidth="1" />
          <circle cx="120" cy="19" r="4.5" fill="#10b981" stroke="#059669" strokeWidth="1" />
          <rect x="73" y="44" width="54" height="6" rx="2" fill="#ca8a04" />
        </g>
      </svg>
    </div>
  );
}

// ===========================================================================
//  Globos Flotantes Interactivos: ¡Tócalos para poncharlos con sonido POP!
// ===========================================================================
interface BalloonItem {
  id: number;
  x: number;
  color: string;
  shineColor: string;
  size: number;
  duration: number;
  delay: number;
  popped: boolean;
}

const BALLOON_PALETTES = [
  { color: "#38bdf8", shine: "#bae6fd" }, // Sky blue
  { color: "#f43f5e", shine: "#fecdd3" }, // Coral rose
  { color: "#facc15", shine: "#fef08a" }, // Sunshine yellow
  { color: "#10b981", shine: "#a7f3d0" }, // Mint green
  { color: "#a855f7", shine: "#e9d5ff" }, // Soft purple
  { color: "#fb923c", shine: "#fed7aa" }, // Sweet orange
];

export function InteractiveBalloons({ count = 7 }: { count?: number }) {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  useEffect(() => {
    const list: BalloonItem[] = Array.from({ length: count }, (_, i) => {
      const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
      return {
        id: i,
        x: 10 + (i * 80) / count + (Math.random() * 8 - 4),
        color: palette.color,
        shineColor: palette.shine,
        size: 55 + Math.random() * 25,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 6,
        popped: false,
      };
    });
    setBalloons(list);
  }, [count]);

  const handlePop = (id: number) => {
    soundEffects.playPop();
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 4000);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {balloons.map((b) => {
        if (b.popped) {
          return (
            <motion.div
              key={`pop-${b.id}`}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ left: `${b.x}%`, top: "35%" }}
              className="absolute pointer-events-none flex items-center justify-center font-doodle font-bold text-amber-500 text-lg"
            >
              💥 ¡POP!
            </motion.div>
          );
        }

        return (
          <motion.div
            key={b.id}
            initial={{ y: "110vh" }}
            animate={{ y: "-20vh" }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${b.x}%` }}
            className="absolute top-0 pointer-events-auto cursor-pointer select-none group"
            onClick={() => handlePop(b.id)}
            title="¡Toca para ponchar el globo!"
          >
            <div
              className="relative transition-transform duration-200 group-hover:scale-110 active:scale-95"
              style={{ width: b.size, height: b.size * 1.25 }}
            >
              <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-md">
                <ellipse cx="50" cy="50" rx="45" ry="48" fill={b.color} stroke="#334155" strokeWidth="2.5" />
                <ellipse cx="32" cy="32" rx="14" ry="20" fill={b.shineColor} opacity="0.6" transform="rotate(-20 32 32)" />
                <polygon points="50,96 44,106 56,106" fill={b.color} stroke="#334155" strokeWidth="2" />
                <path
                  d="M50 106 Q46 115 52 122 Q58 130 50 138"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ===========================================================================
//  Pastel de Cumpleaños Interactivo: ¡Sopla la Velita de Leo!
// ===========================================================================
export function InteractiveCake({
  onBlow,
}: {
  onBlow?: () => void;
}) {
  const [blown, setBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCandleClick = () => {
    if (blown) {
      soundEffects.playClick();
      setBlown(false);
      return;
    }

    soundEffects.playBlow();
    setBlown(true);
    setShowConfetti(true);

    setTimeout(() => {
      soundEffects.playCelebration();
      onBlow?.();
    }, 200);

    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  return (
    <div className="relative flex flex-col items-center select-none py-6 px-4">
      {/* Botón interactivo de la velita */}
      <div
        onClick={handleCandleClick}
        className="group relative cursor-pointer flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
        role="button"
        tabIndex={0}
        aria-label={blown ? "Encender velita" : "Soplar velita"}
      >
        {/* Velita número 1 con llama parpadeante */}
        <div className="relative flex flex-col items-center">
          <div className="h-14 flex items-end justify-center">
            {!blown ? (
              <motion.div
                animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [-2, 2, -1, 3, -2] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="relative flex flex-col items-center"
              >
                <div className="absolute -inset-2 rounded-full bg-amber-400/40 blur-md" />
                <div className="w-6 h-9 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-lg border border-amber-600/30" />
                <div className="absolute bottom-1 w-3 h-5 rounded-full bg-white/90" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: [0.8, 0.4, 0], y: -25, scale: [1, 1.8, 2.2] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
                className="text-stone-400 font-doodle text-sm font-bold flex items-center gap-1"
              >
                💨 humito...
              </motion.div>
            )}
          </div>

          {/* Número 1 Dorado estilo crayola */}
          <div className="relative -mt-1 flex items-center justify-center">
            <div className="h-16 w-8 rounded-t-lg bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md flex items-center justify-center border-2 border-stone-800">
              <span className="font-kids font-black text-2xl text-amber-950 drop-shadow-sm">1</span>
            </div>
            <div className="absolute -top-2.5 w-1 h-2.5 bg-stone-800 rounded-full" />
          </div>
        </div>

        {/* Pastel multi-piso animado con trazo doodle */}
        <div className="w-56 sm:w-64 -mt-2">
          {/* Piso superior */}
          <div className="relative h-16 w-44 mx-auto rounded-t-2xl bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 shadow-md border-2 border-b-4 border-stone-800 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl shadow-sm border-b border-stone-700/20" />
            <div className="absolute top-2 inset-x-0 flex justify-around">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 border border-stone-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-stone-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-stone-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 border border-stone-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-stone-800" />
            </div>
            <div className="h-full flex items-center justify-center pt-2 font-doodle font-bold text-sky-900 text-lg">
              LEONARDO
            </div>
          </div>

          {/* Piso inferior */}
          <div className="relative h-20 w-56 sm:w-64 rounded-t-3xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-xl border-2 border-b-6 border-stone-800 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-5 bg-white rounded-b-2xl shadow-sm flex items-center justify-around px-3 border-b border-stone-700/20">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-stone-700/40" />
              ))}
            </div>
            <div className="absolute inset-0 pt-7 flex flex-wrap gap-3 justify-center opacity-80">
              <span className="w-2 h-4 rounded-full bg-pink-400 rotate-12" />
              <span className="w-2 h-4 rounded-full bg-blue-400 -rotate-45" />
              <span className="w-2 h-4 rounded-full bg-emerald-400 rotate-30" />
              <span className="w-2 h-4 rounded-full bg-purple-400 -rotate-12" />
              <span className="w-2 h-4 rounded-full bg-orange-400 rotate-45" />
              <span className="w-2 h-4 rounded-full bg-teal-400 -rotate-30" />
            </div>
            <div className="relative h-full flex items-center justify-center pt-4 font-doodle text-amber-950 font-black text-xl tracking-wide">
              ★ MI 1ER AÑITO ★
            </div>
          </div>

          {/* Plato del pastel */}
          <div className="h-3.5 w-64 sm:w-72 -mx-4 rounded-full bg-gradient-to-r from-stone-200 via-white to-stone-200 shadow-lg border-2 border-stone-800" />
        </div>
      </div>

      {/* Indicador de acción interactiva */}
      <motion.button
        onClick={handleCandleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-4 px-6 py-2.5 rounded-full font-doodle text-base font-bold shadow-md transition-all flex items-center gap-2 border-2 border-stone-800 ${
          blown
            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
            : "bg-gradient-to-r from-amber-400 to-orange-400 text-stone-900 hover:shadow-lg"
        }`}
      >
        {blown ? (
          <>
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            ¡Encender la velita otra vez! 🕯️
          </>
        ) : (
          <>
            <Cake className="w-4 h-4" />
            ¡Toca aquí para soplar la velita de Leo! 💨
          </>
        )}
      </motion.button>

      {/* Mensaje de deseo concedido (Sin subtítulo de Felipe como se pidió en el requerimiento #3) */}
      <AnimatePresence>
        {blown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-3 text-center"
          >
            <p className="font-doodle text-2xl font-black text-amber-600">
              🎉 ¡Deseo pedido con éxito! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <KidsConfetti active={showConfetti} />
    </div>
  );
}

// ===========================================================================
//  Lluvia de Confeti Infantil (Formitas de fiesta y estrellas)
// ===========================================================================
const KIDS_COLORS = [
  "#38bdf8", // Sky blue
  "#f43f5e", // Rose
  "#fbbf24", // Gold
  "#34d399", // Emerald
  "#a855f7", // Violet
  "#fb923c", // Orange
  "#f472b6", // Pink
];

export function KidsConfetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<
    {
      id: number;
      x: number;
      color: string;
      delay: number;
      rotate: number;
      size: number;
      shape: "rect" | "circle" | "star";
    }[]
  >([]);

  useEffect(() => {
    if (!active) return;
    const items = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: KIDS_COLORS[Math.floor(Math.random() * KIDS_COLORS.length)],
      delay: Math.random() * 0.4,
      rotate: Math.random() * 360,
      size: 8 + Math.random() * 8,
      shape: (i % 3 === 0 ? "star" : i % 2 === 0 ? "circle" : "rect") as
        | "rect"
        | "circle"
        | "star",
    }));
    setPieces(items);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 1, rotate: p.rotate }}
          animate={{
            y: "110vh",
            x: `${p.x + (Math.random() - 0.5) * 20}vw`,
            rotate: p.rotate + 720,
            opacity: [1, 1, 0.2],
          }}
          transition={{ duration: 2.8 + Math.random() * 1.5, delay: p.delay, ease: "easeOut" }}
          className="absolute top-0 flex items-center justify-center"
          style={{ width: p.size, height: p.size }}
        >
          {p.shape === "circle" ? (
            <div className="w-full h-full rounded-full" style={{ backgroundColor: p.color }} />
          ) : p.shape === "star" ? (
            <Star className="w-full h-full" style={{ fill: p.color, stroke: "none" }} />
          ) : (
            <div className="w-full h-3/5 rounded-[2px]" style={{ backgroundColor: p.color }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ===========================================================================
//  Pase VIP / Entrada Mágica de Unboxing estilo Cuaderno Doodle
// ===========================================================================
export function VIPPartyUnbox({
  festejado,
  invitadoNombre,
  onOpen,
}: {
  festejado: string;
  invitadoNombre?: string;
  onOpen: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleOpenClick = () => {
    if (opened) return;
    soundEffects.playCelebration();
    setOpened(true);
    onOpen();
    setTimeout(() => {
      setRemoved(true);
    }, 900);
  };

  if (removed) return null;

  return (
    <AnimatePresence>
      {!removed && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-br from-amber-100/90 via-sky-100/80 to-rose-100/90 p-4 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-doodle-paper opacity-70" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={opened ? { scale: 1.1, opacity: 0, y: -40 } : { scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-sm rounded-3xl border-3 border-stone-800 bg-[#FFFDF7] p-6 text-center shadow-2xl shadow-stone-400/40"
          >
            {/* Cinta washi tape decorativa en la parte superior */}
            <WashiTape color="yellow" className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2" />

            {/* Banderines doodle de fiesta */}
            <div className="mt-3 flex justify-around">
              <span className="w-6 h-7 bg-rose-400 shadow-sm border border-stone-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="w-6 h-7 bg-amber-400 shadow-sm border border-stone-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="w-6 h-7 bg-sky-400 shadow-sm border border-stone-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="w-6 h-7 bg-emerald-400 shadow-sm border border-stone-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="w-6 h-7 bg-purple-400 shadow-sm border border-stone-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
            </div>

            {/* Mascota Leonardo */}
            <div className="mt-4 flex justify-center">
              <LeoLionMascot className="w-28 h-28" />
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border-2 border-stone-800 bg-amber-200 px-3 py-1 font-doodle text-sm font-bold text-stone-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              ¡PASE VIP OFICIAL!
            </div>

            <h2 className="mt-3 font-doodle text-3xl font-black text-stone-900">
              ¡El 1er Añito de {festejado}! 🎈
            </h2>
            <p className="font-doodle text-base font-bold text-amber-700">
              ... ¡y Felipe 31! 🎂
            </p>

            {invitadoNombre ? (
              <div className="mt-3 rounded-2xl bg-sky-50 p-3 border-2 border-dashed border-sky-400">
                <p className="font-doodle text-sm text-stone-500">Invitación especial para:</p>
                <p className="font-doodle text-xl font-bold text-sky-900">{invitadoNombre}</p>
              </div>
            ) : (
              <p className="mt-2 font-doodle text-base text-stone-600">
                ¡Tienes una invitación muy especial a una fiesta llena de juegos y sonrisas!
              </p>
            )}

            {/* Botón de apertura estilo crayola */}
            <motion.button
              onClick={handleOpenClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full rounded-2xl border-3 border-stone-800 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 py-3.5 px-4 font-doodle text-xl font-black text-stone-900 shadow-lg shadow-orange-300/40 transition hover:shadow-xl flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-6 h-6 text-yellow-100" />
              ¡Abrir Mi Invitación! ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===========================================================================
//  Cielo Doodle de Fondo: Nubes y Destellos Garabateados
// ===========================================================================
export function FloatingSky() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nube 1 con trazo doodle */}
      <div className="absolute top-10 -left-12 opacity-35 cloud-drift">
        <svg width="220" height="90" viewBox="0 0 200 80" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="85" cy="40" r="38" />
          <circle cx="125" cy="45" r="32" />
          <circle cx="155" cy="55" r="24" />
        </svg>
      </div>

      {/* Nube 2 con trazo doodle */}
      <div className="absolute top-44 -right-16 opacity-35 cloud-drift" style={{ animationDelay: "-9s" }}>
        <svg width="260" height="110" viewBox="0 0 200 80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="90" cy="35" r="42" />
          <circle cx="135" cy="45" r="35" />
          <circle cx="165" cy="55" r="22" />
        </svg>
      </div>

      {/* Nube 3 */}
      <div className="absolute top-[65%] -left-10 opacity-30 cloud-drift" style={{ animationDelay: "-4s" }}>
        <svg width="200" height="80" viewBox="0 0 200 80" fill="#fce7f3" stroke="#f43f5e" strokeWidth="2">
          <circle cx="45" cy="50" r="28" />
          <circle cx="80" cy="38" r="35" />
          <circle cx="120" cy="45" r="30" />
        </svg>
      </div>
    </div>
  );
}

// ===========================================================================
//  Botón Flotante de Control de Audio
// ===========================================================================
export function AudioToggle() {
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    soundEffects.enabled = !soundEffects.enabled;
    setMuted(!soundEffects.enabled);
    if (soundEffects.enabled) {
      soundEffects.playPop();
    }
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "Activar efectos de sonido" : "Silenciar efectos de sonido"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-lg shadow-stone-400/30 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 border-2 border-stone-800"
      aria-label="Alternar sonido"
    >
      {muted ? (
        <VolumeX className="h-5 w-5 text-stone-400" />
      ) : (
        <Volume2 className="h-5 w-5 text-amber-500 animate-pulse" />
      )}
    </button>
  );
}
