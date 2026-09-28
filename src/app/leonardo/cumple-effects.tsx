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
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      // Audio no permitido aún
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
      // Audio error fallback
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
//  Mascota Vectorial: Leoncito con Corona (Leonardo)
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

        {/* Melena de león suave y esponjosa */}
        <g className="kid-wobble" style={{ transformOrigin: "100px 105px" }}>
          <circle cx="100" cy="105" r="76" fill="url(#maneGrad)" />
          {/* Ondas decorativas de la melena */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <circle
              key={deg}
              cx={100 + 72 * Math.cos((deg * Math.PI) / 180)}
              cy={105 + 72 * Math.sin((deg * Math.PI) / 180)}
              r="22"
              fill="url(#maneGrad)"
            />
          ))}
        </g>

        {/* Orejitas */}
        <circle cx="56" cy="62" r="22" fill="#d97706" />
        <circle cx="56" cy="62" r="13" fill="#fbcfe8" />
        <circle cx="144" cy="62" r="22" fill="#d97706" />
        <circle cx="144" cy="62" r="13" fill="#fbcfe8" />

        {/* Cara tierna */}
        <ellipse cx="100" cy="112" rx="58" ry="52" fill="url(#faceGrad)" />

        {/* Mejillas sonrosadas */}
        <circle cx="68" cy="120" r="10" fill="#f43f5e" opacity="0.35" />
        <circle cx="132" cy="120" r="10" fill="#f43f5e" opacity="0.35" />

        {/* Ojos tiernos y brillantes */}
        <ellipse cx="78" cy="102" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="76" cy="99" r="3.2" fill="#ffffff" />
        <circle cx="81" cy="105" r="1.5" fill="#ffffff" />

        <ellipse cx="122" cy="102" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="120" cy="99" r="3.2" fill="#ffffff" />
        <circle cx="125" cy="105" r="1.5" fill="#ffffff" />

        {/* Naricita en forma de corazón invertido */}
        <polygon points="100,123 93,115 107,115" fill="#78350f" rx="2" />

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

        {/* Corona dorada de Rey del Primer Año */}
        <g transform="translate(100, 48) rotate(-4) translate(-100, -48)">
          <path
            d="M72 48 L80 18 L100 32 L120 18 L128 48 Z"
            fill="url(#crownGrad)"
            stroke="#b45309"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Gemas en la corona */}
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

    // Respawn después de 4 segundos
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
              className="absolute pointer-events-none flex items-center justify-center font-bold text-amber-500 text-sm"
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
                {/* Cuerpo del globo */}
                <ellipse cx="50" cy="50" rx="45" ry="48" fill={b.color} />
                {/* Brillo 3D */}
                <ellipse cx="32" cy="32" rx="14" ry="20" fill={b.shineColor} opacity="0.6" transform="rotate(-20 32 32)" />
                {/* Nudo */}
                <polygon points="50,96 44,106 56,106" fill={b.color} />
                {/* Cuerdita ondulada */}
                <path
                  d="M50 106 Q46 115 52 122 Q58 130 50 138"
                  stroke="#94a3b8"
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
      // Reencender
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
          {/* Llama o humito */}
          <div className="h-14 flex items-end justify-center">
            {!blown ? (
              <motion.div
                animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [-2, 2, -1, 3, -2] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="relative flex flex-col items-center"
              >
                {/* Resplandor exterior */}
                <div className="absolute -inset-2 rounded-full bg-amber-400/40 blur-md" />
                {/* Llama externa */}
                <div className="w-6 h-9 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-lg" />
                {/* Llama interna */}
                <div className="absolute bottom-1 w-3 h-5 rounded-full bg-white/90" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: [0.8, 0.4, 0], y: -25, scale: [1, 1.8, 2.2] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
                className="text-stone-400 text-xs font-semibold flex items-center gap-1"
              >
                💨 humito...
              </motion.div>
            )}
          </div>

          {/* Cera de la vela: Número 1 Dorado */}
          <div className="relative -mt-1 flex items-center justify-center">
            <div className="h-16 w-8 rounded-t-lg bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md flex items-center justify-center border-2 border-amber-600/30">
              <span className="font-kids font-black text-2xl text-amber-950 drop-shadow-sm">1</span>
            </div>
            {/* Mecha */}
            <div className="absolute -top-2.5 w-1 h-2.5 bg-stone-700 rounded-full" />
          </div>
        </div>

        {/* Pastel multi-piso animado */}
        <div className="w-56 sm:w-64 -mt-2">
          {/* Piso superior */}
          <div className="relative h-16 w-44 mx-auto rounded-t-2xl bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 shadow-md border-b-4 border-sky-400 overflow-hidden">
            {/* Betún derretido */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl shadow-sm" />
            <div className="absolute top-2 inset-x-0 flex justify-around">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="w-2 h-2 rounded-full bg-rose-400" />
            </div>
            <div className="h-full flex items-center justify-center pt-2 font-kids font-bold text-sky-800 text-sm">
              LEONARDO
            </div>
          </div>

          {/* Piso inferior */}
          <div className="relative h-20 w-56 sm:w-64 rounded-t-3xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-xl border-b-6 border-amber-300 overflow-hidden">
            {/* Betún blanco */}
            <div className="absolute top-0 inset-x-0 h-5 bg-white rounded-b-2xl shadow-sm flex items-center justify-around px-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-inner" />
              ))}
            </div>
            {/* Confetis decorativos del pastel */}
            <div className="absolute inset-0 pt-7 flex flex-wrap gap-3 justify-center opacity-80">
              <span className="w-2 h-4 rounded-full bg-pink-400 rotate-12" />
              <span className="w-2 h-4 rounded-full bg-blue-400 -rotate-45" />
              <span className="w-2 h-4 rounded-full bg-emerald-400 rotate-30" />
              <span className="w-2 h-4 rounded-full bg-purple-400 -rotate-12" />
              <span className="w-2 h-4 rounded-full bg-orange-400 rotate-45" />
              <span className="w-2 h-4 rounded-full bg-teal-400 -rotate-30" />
            </div>
            <div className="relative h-full flex items-center justify-center pt-4 font-kids text-amber-900 font-extrabold text-base tracking-wide">
              ★ MI 1ER AÑITO ★
            </div>
          </div>

          {/* Plato del pastel */}
          <div className="h-3 w-64 sm:w-72 -mx-4 rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-200 shadow-lg border border-slate-300" />
        </div>
      </div>

      {/* Indicador de acción interactiva */}
      <motion.button
        onClick={handleCandleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-4 px-5 py-2.5 rounded-full font-kids text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
          blown
            ? "bg-amber-100 text-amber-800 border-2 border-amber-300 hover:bg-amber-200"
            : "bg-gradient-to-r from-amber-400 to-orange-400 text-stone-900 hover:shadow-lg hover:shadow-amber-200"
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

      {/* Mensaje de deseo concedido */}
      <AnimatePresence>
        {blown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-3 text-center"
          >
            <p className="font-kids text-lg font-bold text-amber-600">
              🎉 ¡Deseo pedido con éxito! 🎉
            </p>
            <p className="font-friendly text-xs text-stone-600">
              (Y un pedacito de pastel asegurado para papá Felipe 😉)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti al soplar la velita */}
      <KidsConfetti active={showConfetti} />
    </div>
  );
}

// ===========================================================================
//  Lluvia de Confeti Infantil (Formitas de fiesta y colores pasteles)
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
    { id: number; x: number; color: string; delay: number; rotate: number; size: number; shape: "rect" | "circle" | "star" }[]
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
      shape: (i % 3 === 0 ? "star" : i % 2 === 0 ? "circle" : "rect") as "rect" | "circle" | "star",
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
//  Pase VIP / Entrada Mágica de Unboxing
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-br from-amber-50 via-sky-50 to-pink-50 p-4"
        >
          {/* Fondo festivo con círculos flotantes */}
          <div className="absolute inset-0 bg-kids-party opacity-60" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={opened ? { scale: 1.1, opacity: 0, y: -40 } : { scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-sm rounded-3xl border-4 border-amber-300 bg-white p-6 text-center shadow-2xl shadow-amber-200/50"
          >
            {/* Decoración superior: Banderines de fiesta */}
            <div className="absolute -top-5 left-6 right-6 flex justify-around">
              <span className="w-6 h-7 bg-rose-400 clip-flag shadow-sm" />
              <span className="w-6 h-7 bg-amber-400 clip-flag shadow-sm" />
              <span className="w-6 h-7 bg-sky-400 clip-flag shadow-sm" />
              <span className="w-6 h-7 bg-emerald-400 clip-flag shadow-sm" />
              <span className="w-6 h-7 bg-purple-400 clip-flag shadow-sm" />
            </div>

            {/* Mascota Leonardo */}
            <div className="mt-3 flex justify-center">
              <LeoLionMascot className="w-28 h-28" />
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 font-kids text-xs font-bold text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              PASE VIP OFICIAL
            </div>

            <h2 className="mt-3 font-kids text-2xl font-black text-stone-800">
              ¡El 1er Añito de {festejado}! 🎈
            </h2>

            {invitadoNombre ? (
              <div className="mt-2 rounded-2xl bg-sky-50 p-2.5 border border-sky-200">
                <p className="font-friendly text-xs text-stone-500">Invitación especial para:</p>
                <p className="font-kids text-base font-bold text-sky-800">{invitadoNombre}</p>
              </div>
            ) : (
              <p className="mt-1 font-friendly text-sm text-stone-600">
                ¡Tienes una invitación muy especial a una fiesta llena de magia y sonrisas!
              </p>
            )}

            {/* Pequeña broma del papá */}
            <p className="mt-2 text-[11px] font-friendly italic text-stone-400">
              *(Y sí... papá Felipe también cumple, pero viene de chofer 🚐)*
            </p>

            {/* Botón de apertura */}
            <motion.button
              onClick={handleOpenClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 py-3.5 px-4 font-kids text-base font-bold text-white shadow-lg shadow-orange-300/50 transition hover:shadow-xl flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-5 h-5 text-yellow-100" />
              ¡Abrir Mi Invitación! ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===========================================================================
//  Cielo de Fondo: Nubes Flotantes y Destellos
// ===========================================================================
export function FloatingSky() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nube 1 */}
      <div className="absolute top-10 -left-12 opacity-40 cloud-drift">
        <svg width="220" height="90" viewBox="0 0 200 80" fill="#e0f2fe">
          <circle cx="50" cy="50" r="30" />
          <circle cx="85" cy="40" r="38" />
          <circle cx="125" cy="45" r="32" />
          <circle cx="155" cy="55" r="24" />
        </svg>
      </div>

      {/* Nube 2 */}
      <div className="absolute top-44 -right-16 opacity-35 cloud-drift" style={{ animationDelay: "-9s" }}>
        <svg width="260" height="110" viewBox="0 0 200 80" fill="#fef3c7">
          <circle cx="50" cy="50" r="30" />
          <circle cx="90" cy="35" r="42" />
          <circle cx="135" cy="45" r="35" />
          <circle cx="165" cy="55" r="22" />
        </svg>
      </div>

      {/* Nube 3 */}
      <div className="absolute top-[65%] -left-10 opacity-30 cloud-drift" style={{ animationDelay: "-4s" }}>
        <svg width="200" height="80" viewBox="0 0 200 80" fill="#fce7f3">
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
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-lg shadow-stone-300/40 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 border-2 border-amber-200"
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
