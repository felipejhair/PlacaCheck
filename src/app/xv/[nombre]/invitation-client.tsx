"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  CalendarHeart,
  Church,
  Clock,
  Gift,
  Heart,
  Home,
  Mail,
  MapPin,
  Music,
  PartyPopper,
  Shirt,
  Sparkles,
  VolumeX,
  X,
} from "lucide-react";
import type { XvInvitacion, XvInvitado, Lugar } from "../invitaciones";
import {
  AuroraBackground,
  FallingPetals,
  OpeningOverlay,
  RollingNumber,
  ShimmerText,
} from "./effects";

interface Props {
  slug: string;
  invitacion: XvInvitacion;
  invitado?: XvInvitado;
}

// ---------------------------------------------------------------------------
// Cuenta regresiva
// ---------------------------------------------------------------------------
function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: false, cargando: true };
  }

  const diff = Math.max(0, target - now);
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    terminado: diff === 0,
    cargando: false,
  };
}

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-rose-300">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
      <Sparkles className="h-4 w-4 text-amber-400" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300" />
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function LugarCard({
  lugar,
  icon,
  delay = 0,
}: {
  lugar: Lugar;
  icon: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-rose-100 bg-white/60 p-3 text-center shadow-sm backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-rose-100 sm:p-6"
    >
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-transform group-hover:scale-110 sm:mb-3 sm:h-12 sm:w-12">
        {icon}
      </div>
      <h3 className="font-serif-elegant text-base font-semibold text-stone-700 sm:text-xl">
        {lugar.titulo}
      </h3>
      <p className="mt-1 font-serif-elegant text-sm text-stone-600 sm:mt-2 sm:text-lg">{lugar.lugar}</p>
      {lugar.direccion && (
        <p className="mt-1 text-xs text-stone-500 sm:text-sm">{lugar.direccion}</p>
      )}
      <p className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-rose-500 sm:gap-1.5 sm:text-sm">
        <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> {lugar.hora}
      </p>
      {lugar.mapsUrl && (
        <a
          href={lugar.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-rose-200 px-2 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-500 hover:text-white sm:mt-4 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" /> Cómo llegar
        </a>
      )}
    </motion.div>
  );
}

function Interlude({
  img,
  texto,
  nombre,
  fecha,
}: {
  img: string;
  texto?: string;
  nombre: string;
  fecha: string;
}) {
  return (
    <section className="xv-snap-section relative flex min-h-[100dvh] items-end justify-center overflow-hidden">
      <motion.img
        src={img}
        alt={nombre}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mb-16 px-6 text-center text-white"
      >
        {texto ? (
          <p className="mx-auto max-w-xl font-serif-elegant text-2xl italic drop-shadow-lg">
            {texto}
          </p>
        ) : (
          <>
            <p className="font-script text-5xl drop-shadow-lg sm:text-6xl">{nombre}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.3em] drop-shadow-md">{fecha}</p>
          </>
        )}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Galería tipo Polaroid con lightbox
// ---------------------------------------------------------------------------
const POLAROID_ROTATIONS = [-4, 3, -2, 5, -3, 4, -1];

function PolaroidGallery({ fotos, nombre }: { fotos: string[]; nombre: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const items = fotos.length > 0 ? fotos : Array.from({ length: 4 }, () => "");

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 px-4"
          >
            <motion.img
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              src={selected}
              alt={nombre}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-full rounded-sm object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de polaroids */}
      <div className="mx-auto mt-6 max-w-xs px-2 sm:max-w-sm">
        <div className="grid grid-cols-2 gap-5">
          {items.map((src, i) => {
            const rotate = POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length];
            const isLastOdd = items.length % 2 !== 0 && i === items.length - 1;

            return (
              <motion.button
                key={src || i}
                onClick={() => src && setSelected(src)}
                initial={{ opacity: 0, y: 80, rotate: rotate * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotate }}
                whileHover={{ scale: 1.12, rotate: 0, y: -10, zIndex: 20 }}
                whileTap={{ scale: 0.96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className={`relative bg-white p-2 pb-8 shadow-xl shadow-stone-400/40 transition-shadow hover:shadow-2xl hover:shadow-rose-300/50 ${
                  isLastOdd ? "col-span-2 mx-auto w-[45%]" : ""
                }`}
              >
                {src ? (
                  <img
                    src={src}
                    alt={`${nombre} ${i + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-rose-50">
                    <Sparkles className="h-8 w-8 text-rose-200" />
                  </div>
                )}
                {/* Brillo tipo polaroid */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              </motion.button>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-stone-400">
          Toca una foto para verla completa
        </p>
      </div>
    </>
  );
}

export default function InvitationClient({ slug, invitacion, invitado }: Props) {
  const c = useCountdown(invitacion.fechaISO);

  // --- Contenedor de scroll por secciones ---
  // scrollRef ya no es el contenedor de scroll; el window es el scroll container.
  // Se mantiene para referenciar <main> si se necesita.
  const scrollRef = useRef<HTMLElement | null>(null);

  // --- Barra de progreso de scroll (window scroll) ---
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- Parallax del hero (window scroll sobre el target) ---
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // --- Navegación por secciones (solo móvil: swipe tipo TikTok) ---
  const currentSectionRef = useRef(0);
  const navLocked = useRef(false);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (navLocked.current) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".xv-snap-section"));
    const next = Math.max(0, Math.min(sections.length - 1, idx));
    currentSectionRef.current = next;
    setCurrentSection(next);
    navLocked.current = true;
    sections[next].scrollIntoView({ behavior: "smooth", block: "start" });
    if (navTimer.current) clearTimeout(navTimer.current);
    navTimer.current = setTimeout(() => {
      navLocked.current = false;
    }, 700);
  }, []);

  // Swipe táctil para móvil — desktop usa scroll nativo sin intervención
  useEffect(() => {
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      // No capturar inicio si hay animación en curso (evita delta basura)
      if (!navLocked.current) touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); };
    const onTouchEnd = (e: TouchEvent) => {
      if (navLocked.current) {
        // El toque interrumpió la animación — re-snap instantáneo al destino
        const sections = Array.from(document.querySelectorAll<HTMLElement>(".xv-snap-section"));
        sections[currentSectionRef.current]?.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      goTo(currentSectionRef.current + (delta > 0 ? 1 : -1));
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      if (navTimer.current) clearTimeout(navTimer.current);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  // --- Música de fondo ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      startMusic();
    }
  };

  // Pausar música al salir / minimizar la pestaña
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (document.hidden && audio && !audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // --- RSVP por WhatsApp ---
  const maxPersonas = invitado ? invitado.limite : 10;
  const [personas, setPersonas] = useState(1);

  const whatsappUrl = useMemo(() => {
    const word = personas === 1 ? "invitado" : "invitados";
    const nombre = invitado?.nombre ?? "Invitado";
    const message = `${nombre} confirma asistencia al XV de Arianne con ${personas} ${word}.`;
    const number = invitacion.whatsappNumero ?? "528182602964";
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }, [personas, invitado?.nombre, invitacion.whatsappNumero]);

  const countdownItems = [
    { label: "Días", value: c.dias },
    { label: "Horas", value: c.horas },
    { label: "Minutos", value: c.minutos },
    { label: "Segundos", value: c.segundos },
  ];

  return (
    <main
      ref={scrollRef}
      className="xv-snap relative text-stone-700"
    >
      <AuroraBackground />
      <FallingPetals count={22} />

      {/* Sobre de apertura */}
      <OpeningOverlay
        nombre={invitacion.nombre}
        onOpen={startMusic}
        invitadoNombre={invitado?.nombre}
        onClose={() => window.scrollTo({ top: 0 })}
      />

      {/* Barra de progreso */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400"
      />

      {invitacion.musicaUrl && (
        <>
          <audio ref={audioRef} src={invitacion.musicaUrl} loop preload="none" />
          <button
            onClick={toggleMusic}
            aria-label={playing ? "Pausar música" : "Reproducir música"}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-300/50 transition hover:scale-105 hover:bg-rose-600"
          >
            {playing ? (
              <Music className="h-6 w-6 animate-pulse" />
            ) : (
              <VolumeX className="h-6 w-6" />
            )}
          </button>
        </>
      )}

      {/* Botón volver al inicio — visible en móvil cuando no estás en la sección 1 */}
      <AnimatePresence>
        {currentSection > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={() => goTo(0)}
            aria-label="Volver al inicio"
            className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-rose-200 bg-white/90 text-rose-500 shadow-lg shadow-rose-100/60 backdrop-blur-sm transition hover:scale-105 hover:bg-rose-50 md:hidden"
          >
            <Home className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        className="xv-snap-section relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        {invitacion.heroImg && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={invitacion.heroImg}
              alt={invitacion.nombre}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 via-rose-50/80 to-amber-50/92" />
          </div>
        )}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif-elegant text-lg uppercase tracking-[0.3em] text-rose-500 [text-shadow:0_2px_8px_rgba(255,255,255,0.8)]"
          >
            {invitacion.fraseInicial || "Mis XV Años"}
          </motion.p>
          <Divider />
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-7xl leading-tight drop-shadow sm:text-8xl md:text-9xl"
          >
            <ShimmerText>{invitacion.nombre}</ShimmerText>
          </motion.h1>
          <Divider />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif-elegant text-xl tracking-wide text-stone-800 [text-shadow:0_2px_10px_rgba(255,255,255,0.95)]"
          >
            {invitacion.fechaTexto}
          </motion.p>
          {invitado && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0 }}
              className="mx-auto mt-6 inline-flex items-center rounded-full border border-rose-300/50 bg-white/40 px-5 py-2.5 shadow-sm backdrop-blur-sm"
            >
              <span className="font-serif-elegant text-base text-stone-800 [text-shadow:0_1px_4px_rgba(255,255,255,0.9)]">
                Para <span className="font-semibold">{invitado.nombre}</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-1 text-rose-400"
        >
          <span className="text-xs uppercase tracking-widest">Desliza</span>
          <div className="h-8 w-5 rounded-full border border-rose-400 p-1">
            <div className="h-2 w-full rounded-full bg-rose-400" />
          </div>
        </motion.div>
      </section>

      {/* ---------------- VERSÍCULO ---------------- */}
      {invitacion.versiculo && (
        <motion.section
          {...reveal}
          className="xv-snap-section flex min-h-[100dvh] flex-col items-center justify-center px-6 py-20 text-center"
        >
          {invitacion.retratoImg && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto mb-8 h-64 w-48 overflow-hidden rounded-t-full rounded-b-3xl border-4 border-white shadow-xl shadow-rose-200/60 ring-1 ring-rose-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={invitacion.retratoImg}
                alt={invitacion.nombre}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mx-auto mb-5 w-fit"
          >
            <Heart className="h-7 w-7 fill-rose-300 text-rose-400" />
          </motion.div>
          <p className="mx-auto max-w-2xl font-serif-elegant text-2xl font-light italic leading-relaxed text-stone-600">
            &ldquo;{invitacion.versiculo}&rdquo;
          </p>
        </motion.section>
      )}

      {/* ---------------- INTERLUDIO 1 ---------------- */}
      {invitacion.interludios?.[0] && (
        <Interlude
          img={invitacion.interludios[0].img}
          texto={invitacion.interludios[0].texto}
          nombre={invitacion.nombre}
          fecha={invitacion.fechaTexto}
        />
      )}

      {/* ---------------- CUENTA REGRESIVA ---------------- */}
      <motion.section
        {...reveal}
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-16"
      >
        <h2 className="mb-2 text-center font-serif-elegant text-3xl text-stone-700">
          Faltan
        </h2>
        <Divider />
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
          {countdownItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-rose-100 bg-white/60 py-5 text-center shadow-sm backdrop-blur-md"
            >
              <div className="flex justify-center font-serif-elegant text-4xl font-semibold text-rose-500 sm:text-5xl">
                {c.cargando ? "··" : <RollingNumber value={item.value} />}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-stone-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
        {c.terminado && (
          <p className="mt-6 text-center font-serif-elegant text-2xl text-rose-500">
            ¡Hoy es el gran día! 🎉
          </p>
        )}
      </motion.section>

      {/* ---------------- PADRES Y PADRINOS ---------------- */}
      {Boolean(invitacion.padres?.length || invitacion.padrinos?.length) && (
        <motion.section
          {...reveal}
          className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-12 text-center"
        >
          <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
            {invitacion.padres?.length ? (
              <div>
                <p className="text-sm uppercase tracking-widest text-rose-400">
                  Con la bendición de mis padres
                </p>
                <div className="mt-3 space-y-1 font-serif-elegant text-lg text-stone-600">
                  {invitacion.padres.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
            {invitacion.padrinos?.length ? (
              <div>
                <p className="text-sm uppercase tracking-widest text-rose-400">
                  Y de mis padrinos
                </p>
                <div className="mt-3 space-y-1 font-serif-elegant text-lg text-stone-600">
                  {invitacion.padrinos.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </motion.section>
      )}

      {/* ---------------- DETALLES DEL EVENTO ---------------- */}
      <motion.section
        {...reveal}
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-4 py-8 sm:px-6 sm:py-16"
      >
        <h2 className="mb-2 flex items-center justify-center gap-2 text-center font-serif-elegant text-2xl text-stone-700 sm:text-3xl">
          <CalendarHeart className="h-6 w-6 text-rose-400 sm:h-7 sm:w-7" /> Detalles del evento
        </h2>
        <Divider />
        <div className="mx-auto mt-4 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-6 sm:gap-6">
          {invitacion.ceremonia && (
            <LugarCard
              lugar={invitacion.ceremonia}
              icon={<Church className="h-5 w-5 sm:h-6 sm:w-6" />}
            />
          )}
          <LugarCard
            lugar={invitacion.recepcion}
            icon={<PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" />}
            delay={invitacion.ceremonia ? 0.15 : 0}
          />
        </div>

        {(invitacion.dressCode || invitacion.regalo?.length) && (
          <div className="mx-auto mt-4 grid w-full grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            {invitacion.dressCode && (
              <div className="col-span-2 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 backdrop-blur sm:col-span-1 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4">
                <Shirt className="h-4 w-4 shrink-0 text-amber-500 sm:h-5 sm:w-5" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-500">
                    Código de vestimenta
                  </p>
                  <p className="font-serif-elegant text-base text-stone-700 sm:text-lg">
                    {invitacion.dressCode}
                  </p>
                </div>
              </div>
            )}
            {invitacion.regalo?.map((r) => (
              <div
                key={r}
                className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50/60 px-4 py-3 backdrop-blur sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4"
              >
                {r.toLowerCase().includes("sobre") ? (
                  <Mail className="h-4 w-4 shrink-0 text-rose-400 sm:h-5 sm:w-5" />
                ) : (
                  <Gift className="h-4 w-4 shrink-0 text-rose-400 sm:h-5 sm:w-5" />
                )}
                <p className="font-serif-elegant text-base text-stone-700 sm:text-lg">{r}</p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* ---------------- INTERLUDIO 2 ---------------- */}
      {invitacion.interludios?.[1] && (
        <Interlude
          img={invitacion.interludios[1].img}
          texto={invitacion.interludios[1].texto}
          nombre={invitacion.nombre}
          fecha={invitacion.fechaTexto}
        />
      )}

      {/* ---------------- GALERÍA ---------------- */}
      <motion.section
        {...reveal}
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-16"
      >
        <h2 className="mb-2 text-center font-serif-elegant text-3xl text-stone-700">
          Galería
        </h2>
        <Divider />
        <PolaroidGallery fotos={invitacion.galeria} nombre={invitacion.nombre} />
      </motion.section>

      {/* ---------------- RSVP (WhatsApp) ---------------- */}
      <motion.section
        {...reveal}
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-16"
      >
        <div className="mx-auto max-w-lg rounded-3xl border border-rose-100 bg-white/70 p-8 shadow-xl shadow-rose-100/50 backdrop-blur-md">
          {invitado && (
            <div className="mb-5 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-widest text-amber-500">
                Esta invitación es para
              </p>
              <p className="mt-0.5 font-serif-elegant text-lg font-semibold text-stone-700">
                {invitado.nombre}
              </p>
              <p className="text-sm text-stone-500">
                {invitado.limite === 1
                  ? "1 lugar reservado"
                  : `${invitado.limite} lugares reservados`}
              </p>
            </div>
          )}

          <h2 className="text-center font-serif-elegant text-3xl text-stone-700">
            Confirma tu asistencia
          </h2>
          <Divider />

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-600">
                ¿Cuántas personas asistirán?
              </label>
              <select
                value={personas}
                onChange={(e) => setPersonas(Number(e.target.value))}
                className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-stone-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              >
                {Array.from({ length: maxPersonas }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-3.5 font-medium text-white shadow-md shadow-green-200/60 transition hover:scale-[1.02] hover:bg-[#1fbc5a] active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Confirmar por WhatsApp
            </a>

            <p className="text-center text-xs text-stone-400">
              Al confirmar se abrirá WhatsApp con tu asistencia lista para enviar
            </p>
          </div>
        </div>
      </motion.section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="xv-snap-section flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12 text-center">
        <Divider />
        <p className="font-script text-5xl">
          <ShimmerText>{invitacion.nombre}</ShimmerText>
        </p>
        <p className="mt-2 text-sm text-stone-400">{invitacion.fechaTexto}</p>
      </footer>
    </main>
  );
}
