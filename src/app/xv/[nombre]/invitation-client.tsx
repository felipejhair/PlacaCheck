"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  CalendarHeart,
  Church,
  Clock,
  Heart,
  MapPin,
  Music,
  PartyPopper,
  Send,
  Shirt,
  Sparkles,
  VolumeX,
} from "lucide-react";
import type { XvInvitacion, Lugar } from "../invitaciones";
import { createRsvp } from "@/actions/xv-actions";
import {
  AuroraBackground,
  Confetti,
  FallingPetals,
  OpeningOverlay,
  RollingNumber,
  ShimmerText,
} from "./effects";

interface Stats {
  totalConfirmados: number;
  totalPersonas: number;
  mensajes: { nombre: string; mensaje: string; asistira: boolean }[];
}

interface Props {
  slug: string;
  invitacion: XvInvitacion;
  initialStats: Stats;
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

function LugarCard({
  lugar,
  icon,
  delay = 0,
}: {
  lugar: Lugar;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-rose-100 bg-white/60 p-6 text-center shadow-sm backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-rose-100"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-serif-elegant text-xl font-semibold text-stone-700">
        {lugar.titulo}
      </h3>
      <p className="mt-2 font-serif-elegant text-lg text-stone-600">{lugar.lugar}</p>
      {lugar.direccion && (
        <p className="mt-1 text-sm text-stone-500">{lugar.direccion}</p>
      )}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-rose-500">
        <Clock className="h-4 w-4" /> {lugar.hora}
      </p>
      {lugar.mapsUrl && (
        <a
          href={lugar.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500 hover:text-white"
        >
          <MapPin className="h-4 w-4" /> Cómo llegar
        </a>
      )}
    </motion.div>
  );
}

function GalleryImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ scale: failed ? 1 : 1.03 }}
      className="overflow-hidden rounded-2xl shadow-sm"
    >
      {failed ? (
        <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/40 text-rose-200 backdrop-blur">
          <Sparkles className="h-8 w-8" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-110"
        />
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

export default function InvitationClient({ slug, invitacion, initialStats }: Props) {
  const c = useCountdown(invitacion.fechaISO);
  const [stats, setStats] = useState<Stats>(initialStats);

  // --- Contenedor de scroll por secciones ---
  const scrollRef = useRef<HTMLElement | null>(null);

  // --- Barra de progreso de scroll ---
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- Parallax del hero ---
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    container: scrollRef,
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

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

  // --- Formulario RSVP ---
  const [nombre, setNombre] = useState("");
  const [asistira, setAsistira] = useState<boolean | null>(null);
  const [acompanantes, setAcompanantes] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nombre.trim()) {
      setError("Por favor escribe tu nombre.");
      return;
    }
    if (asistira === null) {
      setError("Indícanos si podrás asistir.");
      return;
    }
    setEnviando(true);
    const res = await createRsvp({
      slug,
      nombre,
      asistira,
      acompanantes: asistira ? acompanantes : 0,
      mensaje,
    });
    setEnviando(false);

    if (res.success) {
      setEnviado(true);
      setStats((prev) => ({
        totalConfirmados: prev.totalConfirmados + (asistira ? 1 : 0),
        totalPersonas: prev.totalPersonas + (asistira ? 1 + acompanantes : 0),
        mensajes: mensaje.trim()
          ? [{ nombre: nombre.trim(), mensaje: mensaje.trim(), asistira }, ...prev.mensajes]
          : prev.mensajes,
      }));
    } else {
      setError(res.error || "Algo salió mal. Inténtalo de nuevo.");
    }
  };

  const countdownItems = [
    { label: "Días", value: c.dias },
    { label: "Horas", value: c.horas },
    { label: "Minutos", value: c.minutos },
    { label: "Segundos", value: c.segundos },
  ];

  return (
    <main
      ref={scrollRef}
      className="xv-snap relative h-[100dvh] overflow-y-scroll text-stone-700"
    >
      <AuroraBackground />
      <FallingPetals count={22} />

      {/* Sobre de apertura — el toque inicial también arranca la música */}
      <OpeningOverlay nombre={invitacion.nombre} onOpen={startMusic} />

      {/* Barra de progreso de lectura */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400"
      />

      {/* Confeti al confirmar */}
      <Confetti active={enviado && asistira === true} />

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
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/85 via-rose-50/55 to-amber-50/90" />
          </div>
        )}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif-elegant text-lg uppercase tracking-[0.3em] text-rose-400"
          >
            {invitacion.fraseInicial || "Mis XV Años"}
          </motion.p>
          <Divider />
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-7xl leading-tight drop-shadow-sm sm:text-8xl md:text-9xl"
          >
            <ShimmerText>{invitacion.nombre}</ShimmerText>
          </motion.h1>
          <Divider />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif-elegant text-xl tracking-wide text-stone-600"
          >
            {invitacion.fechaTexto}
          </motion.p>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-1 text-rose-300"
        >
          <span className="text-xs uppercase tracking-widest">Desliza</span>
          <div className="h-8 w-5 rounded-full border border-rose-300 p-1">
            <div className="h-2 w-full rounded-full bg-rose-300" />
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
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-16"
      >
        <h2 className="mb-2 flex items-center justify-center gap-2 text-center font-serif-elegant text-3xl text-stone-700">
          <CalendarHeart className="h-7 w-7 text-rose-400" /> Detalles del evento
        </h2>
        <Divider />
        <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
          {invitacion.ceremonia && (
            <LugarCard
              lugar={invitacion.ceremonia}
              icon={<Church className="h-6 w-6" />}
            />
          )}
          <LugarCard
            lugar={invitacion.recepcion}
            icon={<PartyPopper className="h-6 w-6" />}
            delay={invitacion.ceremonia ? 0.15 : 0}
          />
        </div>

        {invitacion.dressCode && (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 px-6 py-4 text-center backdrop-blur">
            <Shirt className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-500">
                Código de vestimenta
              </p>
              <p className="font-serif-elegant text-lg text-stone-700">
                {invitacion.dressCode}
              </p>
            </div>
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
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {(invitacion.galeria.length > 0
            ? invitacion.galeria
            : Array.from({ length: 6 }, () => "")
          ).map((src, i) => (
            <GalleryImage
              key={src || i}
              src={src}
              alt={`${invitacion.nombre} ${i + 1}`}
              index={i}
            />
          ))}
        </div>
      </motion.section>

      {/* ---------------- RSVP ---------------- */}
      <motion.section
        {...reveal}
        className="xv-snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-16"
      >
        <div className="mx-auto max-w-lg rounded-3xl border border-rose-100 bg-white/70 p-8 shadow-xl shadow-rose-100/50 backdrop-blur-md">
          <h2 className="text-center font-serif-elegant text-3xl text-stone-700">
            Confirma tu asistencia
          </h2>
          <Divider />

          {enviado ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mb-3 w-fit"
              >
                <Heart className="h-12 w-12 fill-rose-300 text-rose-400" />
              </motion.div>
              <p className="font-serif-elegant text-xl text-stone-700">
                {asistira
                  ? "¡Gracias por confirmar! Nos vemos en la fiesta 💖"
                  : "Gracias por avisarnos. Te extrañaremos 💕"}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-600">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre y apellido"
                  className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-stone-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-600">
                  ¿Podrás acompañarnos?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAsistira(true)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      asistira === true
                        ? "border-rose-400 bg-rose-500 text-white shadow-md shadow-rose-200"
                        : "border-rose-200 bg-white text-stone-600 hover:bg-rose-50"
                    }`}
                  >
                    ¡Sí, ahí estaré!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsistira(false)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      asistira === false
                        ? "border-stone-400 bg-stone-500 text-white"
                        : "border-rose-200 bg-white text-stone-600 hover:bg-rose-50"
                    }`}
                  >
                    No podré asistir
                  </button>
                </div>
              </div>

              {asistira === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="mb-1.5 block text-sm font-medium text-stone-600">
                    Acompañantes adicionales
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={acompanantes}
                    onChange={(e) => setAcompanantes(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-stone-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                  />
                </motion.div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-600">
                  Mensaje para {invitacion.nombre} (opcional)
                </label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  placeholder="Déjale unas palabras bonitas..."
                  className="w-full resize-none rounded-xl border border-rose-200 bg-white px-4 py-3 text-stone-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={enviando}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3.5 font-medium text-white shadow-md shadow-rose-200 transition hover:scale-[1.02] hover:bg-rose-600 disabled:opacity-60"
              >
                {enviando ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Confirmar
                  </>
                )}
              </button>
            </form>
          )}

          {stats.totalConfirmados > 0 && (
            <p className="mt-6 text-center text-sm text-stone-500">
              {stats.totalPersonas}{" "}
              {stats.totalPersonas === 1
                ? "persona ha confirmado"
                : "personas han confirmado"}{" "}
              su asistencia 🎉
            </p>
          )}
        </div>

        {/* Mensajes de los invitados */}
        {stats.mensajes.length > 0 && (
          <div className="mx-auto mt-10 max-h-[32vh] max-w-lg space-y-3 overflow-y-auto pr-1">
            <h3 className="text-center font-serif-elegant text-2xl text-stone-700">
              Mensajes de cariño
            </h3>
            {stats.mensajes.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-rose-100 bg-white/60 px-5 py-4 backdrop-blur"
              >
                <p className="text-stone-600">&ldquo;{m.mensaje}&rdquo;</p>
                <p className="mt-2 text-sm font-medium text-rose-400">— {m.nombre}</p>
              </motion.div>
            ))}
          </div>
        )}
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
