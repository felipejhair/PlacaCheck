"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ===========================================================================
//  Fondo "Aurora": manchas de color difuminadas que se mueven lentamente
// ===========================================================================
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-[#fdf6f0] to-amber-50" />
      <div className="xv-aurora xv-aurora-1" />
      <div className="xv-aurora xv-aurora-2" />
      <div className="xv-aurora xv-aurora-3" />
      {/* Grano sutil para textura premium */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}

// ===========================================================================
//  Pétalos / destellos cayendo de forma continua
// ===========================================================================
type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  kind: "petal" | "sparkle";
};

export function FallingPetals({ count = 22 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 16,
      duration: 9 + Math.random() * 10,
      delay: Math.random() * 12,
      drift: (Math.random() - 0.5) * 220,
      rotate: Math.random() * 360,
      kind: Math.random() > 0.45 ? "petal" : "sparkle",
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="xv-petal absolute -top-10"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--drift" as string]: `${p.drift}px`,
              ["--spin" as string]: `${p.rotate}deg`,
            } as React.CSSProperties
          }
        >
          {p.kind === "petal" ? (
            <svg viewBox="0 0 32 32" className="h-full w-full">
              <path
                d="M16 2C9 8 6 16 16 30C26 16 23 8 16 2Z"
                fill="url(#petalGrad)"
                opacity="0.85"
              />
              <defs>
                <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fecdd3" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full">
              <path
                d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z"
                fill="#fcd34d"
                opacity="0.8"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

// ===========================================================================
//  Texto con brillo dorado animado (gold foil)
// ===========================================================================
export function ShimmerText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`xv-shimmer ${className}`}>{children}</span>;
}

// ===========================================================================
//  Dígito que "rueda" al cambiar de valor (estilo flip)
// ===========================================================================
export function RollingNumber({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden align-baseline tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ===========================================================================
//  Confeti (al confirmar asistencia)
// ===========================================================================
const CONFETTI_COLORS = ["#fb7185", "#f43f5e", "#fcd34d", "#f59e0b", "#fbcfe8", "#ffffff"];

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<
    { id: number; x: number; color: string; delay: number; rotate: number; size: number }[]
  >([]);

  useEffect(() => {
    if (!active) return;
    setPieces(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.5,
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 8,
      }))
    );
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10vh", x: 0, opacity: 1, rotate: p.rotate }}
          animate={{ y: "110vh", x: (Math.random() - 0.5) * 200, rotate: p.rotate + 540, opacity: [1, 1, 0] }}
          transition={{ duration: 2.6 + Math.random() * 1.4, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0 rounded-[2px]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 1.6,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ===========================================================================
//  Sobre lacrado de apertura: cubre la pantalla hasta que el invitado lo abre.
//  El gesto de tocar también permite reproducir la música (autoplay desbloqueado).
// ===========================================================================
export function OpeningOverlay({
  nombre,
  onOpen,
}: {
  nombre: string;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    setTimeout(() => setGone(true), 1400);
  };

  useEffect(() => {
    if (!gone) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-gradient-to-br from-[#2a1822] via-[#3d2030] to-[#1f1018] px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <button
              onClick={handleOpen}
              className="group relative outline-none"
              aria-label="Abrir invitación"
            >
              {/* Sobre */}
              <motion.div
                animate={opening ? { scale: 1.06, y: -8 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-52 w-72 rounded-lg bg-gradient-to-b from-rose-100 to-rose-200 shadow-2xl shadow-black/50 sm:h-60 sm:w-96"
              >
                {/* Cuerpo del sobre */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-rose-50" />
                  <div className="absolute bottom-0 left-0 h-1/2 w-1/2 origin-bottom-left skew-x-[20deg] bg-rose-100/70" />
                  <div className="absolute bottom-0 right-0 h-1/2 w-1/2 origin-bottom-right -skew-x-[20deg] bg-rose-100/70" />
                </div>
                {/* Solapa superior que se abre */}
                <motion.div
                  animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                  className="absolute left-0 top-0 z-20 h-1/2 w-full origin-top"
                >
                  <div
                    className="h-0 w-0 border-l-[144px] border-r-[144px] border-t-[104px] border-l-transparent border-r-transparent border-t-rose-300 sm:border-l-[192px] sm:border-r-[192px] sm:border-t-[120px]"
                  />
                </motion.div>
                {/* Sello de cera */}
                <motion.div
                  animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 font-script text-2xl text-rose-50 shadow-lg ring-4 ring-rose-400/40"
                >
                  {nombre.charAt(0)}
                </motion.div>
              </motion.div>
            </button>

            <p className="mt-10 font-script text-5xl text-rose-100">{nombre}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-rose-200/70">
              Mis XV Años
            </p>
            {!opening && (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-8 text-sm text-rose-100/80"
              >
                Toca el sobre para abrir tu invitación
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
