"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Copy,
  Check,
  Gift,
  Sparkles,
  Send,
  Baby,
  X,
  Camera,
} from "lucide-react";
import type { CumpleConfig, InvitadoCumple, FotoRecuerdo } from "./cumple-data";
import {
  LeoLionMascot,
  InteractiveBalloons,
  InteractiveCake,
  VIPPartyUnbox,
  FloatingSky,
  AudioToggle,
  soundEffects,
  KidsConfetti,
  WashiTape,
  DoodleCrown,
  DoodleStar,
  DoodleHeart,
  DoodleSun,
  DoodleArrow,
  DoodleSquiggle,
} from "./cumple-effects";

interface Props {
  data: CumpleConfig;
  invitado?: InvitadoCumple | null;
}

// ---------------------------------------------------------------------------
// Hook de Cuenta Regresiva
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
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: false, listo: false };
  }

  const diff = Math.max(0, target - now);
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    terminado: diff === 0,
    listo: true,
  };
}

export default function CumpleClient({ data, invitado }: Props) {
  const [copied, setCopied] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<FotoRecuerdo | null>(null);

  // Formulario RSVP
  const [nombreFamilia, setNombreFamilia] = useState(invitado?.nombre ?? "");
  const [adultos, setAdultos] = useState(invitado?.pasesAdultos ?? 2);
  const [ninos, setNinos] = useState(invitado?.pasesNinos ?? 1);
  const [rsvpConfirmado, setRsvpConfirmado] = useState(false);

  const countdown = useCountdown(data.fechaISO);

  // Copiar dirección
  const handleCopyAddress = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(
      `${data.lugar.nombre}, ${data.lugar.direccion}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Guardar en Google Calendar
  const handleGoogleCalendar = () => {
    soundEffects.playClick();
    const title = encodeURIComponent(`1er Añito de ${data.festejado.nombre} (... y Felipe 31) 🦁🎈`);
    const details = encodeURIComponent(
      `¡Fiesta de 1er cumpleaños de ${data.festejado.nombre}! (... y cumple 31 de Felipe 🎂)\nLugar: ${data.lugar.nombre}\nHorario: ${data.horarioTexto}`
    );
    const location = encodeURIComponent(`${data.lugar.nombre}, ${data.lugar.direccion}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261101T200000Z/20261102T030000Z`;
    window.open(gCalUrl, "_blank");
  };

  // Enviar confirmación por WhatsApp
  const handleSendWhatsApp = () => {
    soundEffects.playCelebration();
    setConfettiActive(true);
    setRsvpConfirmado(true);

    const nombre = nombreFamilia.trim() || "Nosotros";
    const msg = `¡Hola! 🎉 Confirmamos con mucha alegría nuestra asistencia al 1er Añito de ${data.festejado.nombre} para el ${data.fechaTexto} en ${data.lugar.nombre}.
👨‍👩‍👧‍👦 Familia: ${nombre}
👥 Asistiremos: ${adultos} adulto(s) y ${ninos} peque(s).
🎂 ¡Y un abrazo enorme a Felipe por sus 31 años también! 🥳🎈`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${data.whatsappNumero}?text=${encoded}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setConfettiActive(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-doodle-paper font-friendly text-stone-800 pb-28">
      {/* Entrada mágica tipo unboxing doodle */}
      <VIPPartyUnbox
        festejado={data.festejado.nombre}
        invitadoNombre={invitado?.nombre}
        onOpen={() => {}}
      />

      {/* Globos interactivos que puedes ponchar */}
      <InteractiveBalloons count={8} />

      {/* Cielo doodle de fondo */}
      <FloatingSky />

      {/* Botón flotante de audio */}
      <AudioToggle />

      {/* Confeti general */}
      <KidsConfetti active={confettiActive} />

      {/* Sol doodle en la esquina superior */}
      <div className="absolute top-2 right-2 pointer-events-none opacity-85 z-0">
        <DoodleSun className="w-20 h-20 sm:w-24 sm:h-24 kid-float-slow" />
      </div>

      {/* Banderines garabateados superiores */}
      <div className="relative w-full overflow-hidden pt-1 flex justify-center z-10">
        <div className="flex w-[125%] justify-between gap-1 px-2 select-none">
          {[
            "#f43f5e",
            "#facc15",
            "#38bdf8",
            "#34d399",
            "#a855f7",
            "#fb923c",
            "#f43f5e",
            "#facc15",
            "#38bdf8",
            "#34d399",
            "#a855f7",
            "#fb923c",
          ].map((color, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5] }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-7 h-10 shadow-sm border border-stone-800"
              style={{
                backgroundColor: color,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* =====================================================================
          HERO SECTION ESTILO DOODLE & CRAYON
         ===================================================================== */}
      <section className="relative mx-auto max-w-xl px-5 pt-6 pb-8 text-center z-10">
        {/* Badge personalizado si viene con invitado */}
        {invitado && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-sky-400 bg-sky-100/90 px-4 py-1.5 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-sky-600 animate-spin" />
            <span className="font-doodle text-base font-bold text-sky-900">
              Pase Reservado para: {invitado.nombre}
            </span>
          </motion.div>
        )}

        {/* Ilustración de Mascota Leo con garabatos alrededor */}
        <div className="relative inline-block my-2">
          {/* Estrellitas doodle flotantes */}
          <div className="absolute -top-3 -left-4 kid-float">
            <DoodleStar className="w-8 h-8" color="#f59e0b" />
          </div>
          <div className="absolute top-4 -right-5 kid-float-rev">
            <DoodleHeart className="w-7 h-7" color="#f43f5e" />
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative cursor-pointer"
            onClick={() => {
              soundEffects.playCelebration();
              setConfettiActive(true);
              setTimeout(() => setConfettiActive(false), 2000);
            }}
            title="¡Tócame para festejar!"
          >
            <LeoLionMascot className="w-40 h-40 sm:w-48 sm:h-48 mx-auto drop-shadow-md" />
            <div className="absolute -bottom-1 -right-1 rounded-full bg-amber-300 border-2 border-stone-800 p-1.5 shadow-md kid-wobble">
              <span className="text-xl">🎈</span>
            </div>
          </motion.div>
        </div>

        {/* Frase estilo cuaderno escolar */}
        <p className="font-doodle text-lg sm:text-xl font-bold tracking-wide text-amber-700">
          ✏️ ¡Estás invitado a festejar en grande!
        </p>

        {/* Nombre gigante de Leonardo */}
        <div className="relative inline-block my-1">
          <h1 className="font-doodle text-6xl sm:text-7xl font-black tracking-tight text-stone-900 drop-shadow-sm">
            LEONARDO
          </h1>
          {/* Subrayado de crayola */}
          <div className="flex justify-center -mt-2">
            <DoodleSquiggle className="w-56 h-4" color="#f59e0b" />
          </div>
        </div>

        {/* ===================================================================
            BOTÓN CUMPLE 1 AÑO + "... Y FELIPE 31" (Requerimiento #2)
           =================================================================== */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          {/* Botón Cumple 1 Año */}
          <div className="inline-flex items-center gap-2 rounded-2xl border-3 border-stone-800 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-5 py-2.5 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]">
            <Baby className="h-6 w-6 text-stone-900" />
            <span className="font-doodle text-2xl font-black text-stone-900 tracking-wide">
              ¡CUMPLE 1 AÑO!
            </span>
            <DoodleCrown className="w-6 h-5" />
          </div>

          {/* "... y Felipe 31" cómico estilo doodle */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="relative inline-flex items-center gap-1.5 rounded-2xl border-2 border-dashed border-stone-800 bg-rose-100 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] -rotate-1"
          >
            <span className="font-doodle text-xl font-black text-rose-800">
              ... ¡y Felipe 31! 🎂
            </span>
          </motion.div>
        </div>

        <p className="mt-4 font-doodle text-lg text-stone-700 max-w-md mx-auto leading-relaxed">
          {data.festejado.lema}. ¡Ven a celebrar con nosotros en una tarde llena de juegos, alberca y muchas risas!
        </p>
      </section>

      {/* =====================================================================
          FOTO DESTACADA ORGANICA (Polaroid Scrapbook)
         ===================================================================== */}
      <section className="mx-auto max-w-md px-5 py-3 z-10 relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedPhoto(data.fotos[0])}
          className="polaroid-card rounded-2xl cursor-pointer relative -rotate-1"
        >
          {/* Washi tape decorativo */}
          <WashiTape color="mint" className="absolute -top-3 left-8 rotate-[-4deg]" />
          <WashiTape color="pink" className="absolute -top-3 right-8 rotate-[3deg]" />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
            <Image
              src={data.fotos[0].src}
              alt="Familia de Leonardo"
              fill
              sizes="(max-width: 600px) 100vw, 400px"
              priority
              className="object-cover object-center"
            />
            {/* Tag doodle en la foto */}
            <div className="absolute bottom-2 right-2 rounded-lg border-2 border-stone-800 bg-yellow-300 px-2 py-0.5 font-doodle text-xs font-bold text-stone-900 shadow">
              {data.fotos[0].doodleTag}
            </div>
          </div>

          <div className="pt-3 text-center">
            <p className="font-doodle text-lg font-bold text-stone-800">
              &quot;{data.fotos[0].caption}&quot;
            </p>
            <p className="font-doodle text-xs text-stone-400">
              (Toca la foto para verla en grande 🔍)
            </p>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          CUENTA REGRESIVA ESTILO CUADERNO ESCOLAR
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 z-10 relative">
        <div className="relative rounded-3xl border-3 border-stone-800 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
          {/* Cinta washi tape */}
          <WashiTape color="yellow" className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-1" />

          <div className="flex items-center justify-center gap-2 text-stone-900 mb-3">
            <Clock className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
            <h2 className="font-doodle text-xl font-bold uppercase tracking-wider">
              ¡Cuenta Regresiva para la Fiesta!
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Días */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-sky-200 p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              <span className="font-doodle text-3xl sm:text-4xl font-black text-sky-950">
                {countdown.dias}
              </span>
              <span className="font-doodle text-xs font-bold text-sky-900 uppercase">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-amber-200 p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              <span className="font-doodle text-3xl sm:text-4xl font-black text-amber-950">
                {countdown.horas}
              </span>
              <span className="font-doodle text-xs font-bold text-amber-900 uppercase">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-rose-200 p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              <span className="font-doodle text-3xl sm:text-4xl font-black text-rose-950">
                {countdown.minutos}
              </span>
              <span className="font-doodle text-xs font-bold text-rose-900 uppercase">
                Min
              </span>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-emerald-200 p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              <span className="font-doodle text-3xl sm:text-4xl font-black text-emerald-950">
                {countdown.segundos}
              </span>
              <span className="font-doodle text-xs font-bold text-emerald-900 uppercase">
                Seg
              </span>
            </div>
          </div>

          <p className="mt-3 text-center font-doodle text-sm font-bold text-stone-600">
            📅 {data.fechaTexto} · Horario: {data.horarioTexto}
          </p>
        </div>
      </section>

      {/* =====================================================================
          EL GRAN DUELO DE CUMPLEAÑEROS (LEO VS FELIPE) (Requerimiento #1)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 z-10 relative">
        <div className="text-center mb-4">
          <span className="font-doodle text-sm font-bold text-amber-700 uppercase tracking-widest">
            🥊 Especial de la Casa
          </span>
          <h2 className="font-doodle text-3xl sm:text-4xl font-black text-stone-900">
            El Gran Duelo de Cumpleaños
          </h2>
          <p className="font-doodle text-sm text-stone-600">
            2 cumpleañeros, 1 sola fiesta... ¡y ya sabemos quién es el jefe!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tarjeta Leo */}
          <div className="relative rounded-3xl border-3 border-stone-800 bg-amber-50 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
            <WashiTape color="yellow" className="absolute -top-3 left-6 -rotate-2" />
            <div className="flex items-center gap-3">
              <div className="text-3xl">🦁👑</div>
              <div>
                <h3 className="font-doodle text-2xl font-black text-stone-900">
                  {data.festejado.nombre}
                </h3>
                <p className="font-doodle text-sm font-bold text-amber-700">
                  1 Año · El Rey Supremo
                </p>
              </div>
            </div>

            <ul className="mt-3 space-y-1.5 font-doodle text-sm text-stone-800">
              {data.festejado.habilidades.map((h, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">✓</span> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjeta Felipe */}
          <div className="relative rounded-3xl border-3 border-dashed border-stone-800 bg-stone-100 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
            <WashiTape color="blue" className="absolute -top-3 right-6 rotate-2" />
            <div className="flex items-center gap-3">
              <div className="text-3xl">👨‍🦰🎂</div>
              <div>
                <h3 className="font-doodle text-2xl font-black text-stone-900">
                  {data.papaColado.nombre}
                </h3>
                <p className="font-doodle text-sm font-bold text-stone-600">
                  {data.papaColado.edad} Años · Copiloto y Chofer
                </p>
              </div>
            </div>

            <p className="mt-2 font-doodle text-xs italic text-stone-600">
              {data.papaColado.bromaCorta}
            </p>

            <ul className="mt-2 space-y-1.5 font-doodle text-sm text-stone-700">
              {data.papaColado.habilidades.map((h, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-stone-500 font-bold">▪</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DETALLES REALES (QUINTA TERRAZA SANTA ROSA) (Requerimiento #8)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 space-y-4 z-10 relative">
        <div className="text-center mb-2">
          <span className="font-doodle text-sm font-bold text-sky-700 uppercase tracking-widest">
            📍 ¿Cuándo y Dónde?
          </span>
          <h2 className="font-doodle text-3xl sm:text-4xl font-black text-stone-900">
            Coordenadas de la Fiesta
          </h2>
        </div>

        {/* Tarjeta Fecha y Hora */}
        <motion.div
          whileHover={{ y: -2 }}
          className="relative rounded-3xl border-3 border-stone-800 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex items-start gap-4"
        >
          <WashiTape color="pink" className="absolute -top-3 right-10 rotate-1" />
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-stone-800 bg-amber-200 text-stone-900">
            <Calendar className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-doodle text-2xl font-black text-stone-900">
              {data.diaSemana}, {data.fechaTexto}
            </h3>
            <p className="font-doodle text-base text-stone-700 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-amber-600" /> {data.horarioTexto}
            </p>
            <button
              onClick={handleGoogleCalendar}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-stone-800 bg-amber-100 px-4 py-1.5 font-doodle text-sm font-bold text-stone-900 transition hover:bg-amber-200 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Guardar en mi Calendario
            </button>
          </div>
        </motion.div>

        {/* Tarjeta Lugar: Quinta Terraza Santa Rosa */}
        <motion.div
          whileHover={{ y: -2 }}
          className="relative rounded-3xl border-3 border-stone-800 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col gap-4"
        >
          <WashiTape color="mint" className="absolute -top-3 left-10 -rotate-2" />
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-stone-800 bg-sky-200 text-stone-900">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-doodle text-2xl font-black text-stone-900">
                {data.lugar.nombre}
              </h3>
              <p className="font-doodle text-base text-stone-700 mt-0.5">
                {data.lugar.subtitulo}
              </p>
              <p className="font-doodle text-sm text-stone-500 mt-1">
                📍 {data.lugar.direccion}
              </p>
            </div>
          </div>

          {/* Botones de acción directos a Maps */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-dashed border-stone-200">
            <a
              href={data.lugar.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-stone-800 bg-sky-400 py-3 px-3 font-doodle text-base font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition hover:bg-sky-300 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Google Maps
            </a>

            <a
              href={data.lugar.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-stone-800 bg-indigo-300 py-3 px-3 font-doodle text-base font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition hover:bg-indigo-200 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Abrir en Waze
            </a>
          </div>

          <button
            onClick={handleCopyAddress}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 py-2.5 font-doodle text-sm font-bold text-stone-700 transition hover:bg-stone-100"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">¡Dirección copiada al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                Copiar Dirección Completa
              </>
            )}
          </button>
        </motion.div>
      </section>

      {/* =====================================================================
          PASTEL INTERACTIVO (Sin el subtítulo de Felipe - Requerimiento #3)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 z-10 relative">
        <div className="relative rounded-3xl border-3 border-stone-800 bg-gradient-to-b from-amber-100/60 via-white to-amber-100/40 p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] text-center">
          <WashiTape color="yellow" className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-1" />
          <span className="font-doodle text-sm font-bold text-amber-700 uppercase tracking-widest">
            🎂 ¡Momento Mágico!
          </span>
          <h2 className="mt-1 font-doodle text-3xl sm:text-4xl font-black text-stone-900">
            La Primera Velita de Leo
          </h2>
          <p className="mt-1 font-doodle text-base text-stone-600">
            ¡Toca la velita para ayudarle a soplar su deseo!
          </p>

          <InteractiveCake
            onBlow={() => {
              setConfettiActive(true);
              setTimeout(() => setConfettiActive(false), 4000);
            }}
          />
        </div>
      </section>

      {/* =====================================================================
          ÁLBUM DE FOTOS SCRAPBOOK / DOODLE (Requerimiento #9)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 z-10 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-rose-600 mb-1">
            <Camera className="w-5 h-5" />
            <span className="font-doodle text-sm font-bold uppercase tracking-widest">
              Álbum de Recuerdos
            </span>
          </div>
          <h2 className="font-doodle text-3xl sm:text-4xl font-black text-stone-900">
            Un Año de Aventuras y Risas
          </h2>
          <p className="font-doodle text-base text-stone-600">
            Toca cualquier foto para verla completa 📷✨
          </p>
        </div>

        {/* Grid estilo Scrapbook polaroids */}
        <div className="grid grid-cols-2 gap-4">
          {data.fotos.slice(1).map((foto, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04, rotate: 0 }}
              onClick={() => setSelectedPhoto(foto)}
              className={`polaroid-card rounded-2xl cursor-pointer relative ${foto.rotation}`}
            >
              {/* Washi tape alternado */}
              <WashiTape
                color={idx % 2 === 0 ? "pink" : "blue"}
                className={`absolute -top-2.5 ${idx % 2 === 0 ? "left-4 rotate-[-3deg]" : "right-4 rotate-[3deg]"} w-14 h-4`}
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                <Image
                  src={foto.src}
                  alt={foto.caption}
                  fill
                  sizes="(max-width: 600px) 50vw, 200px"
                  className="object-cover object-center"
                />
              </div>

              <div className="pt-2 text-center">
                <p className="font-doodle text-xs font-bold text-amber-800 bg-amber-100 rounded-full px-2 py-0.5 inline-block">
                  {foto.doodleTag}
                </p>
                <p className="font-doodle text-sm font-bold text-stone-800 mt-1 line-clamp-2">
                  {foto.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SUGERENCIAS DE CARIÑO... PARA LEO (Requerimientos #6 y #7)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 z-10 relative">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 text-purple-600 mb-1">
            <Gift className="w-5 h-5" />
            <span className="font-doodle text-sm font-bold uppercase tracking-widest">
              Un Detalle Especial
            </span>
          </div>
          <h2 className="font-doodle text-3xl sm:text-4xl font-black text-stone-900">
            Sugerencias de cariño... para Leo
          </h2>
          <p className="font-doodle text-base text-stone-600">
            Tu presencia y compañía son nuestro mejor regalo. Si deseas tener un detalle con Leo:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.regalos.map((reg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="relative rounded-2xl border-2 border-stone-800 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] flex flex-col justify-between"
            >
              <WashiTape
                color={idx % 2 === 0 ? "yellow" : "mint"}
                className="absolute -top-2 right-4 w-12 h-3 rotate-1"
              />
              <div>
                <div
                  className="inline-flex p-2.5 rounded-xl border border-stone-800 shadow-sm mb-2"
                  style={{ backgroundColor: reg.crayonColor }}
                >
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-doodle text-xl font-bold text-stone-900">
                  {reg.titulo}
                </h3>
                <p className="font-doodle text-base text-stone-700 mt-0.5">
                  {reg.detalle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CONFIRMACIÓN DE ASISTENCIA (RSVP POR WHATSAPP)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-8 z-10 relative">
        <div className="relative rounded-3xl border-3 border-stone-800 bg-white p-6 shadow-[5px_5px_0px_0px_rgba(28,25,23,1)] text-center overflow-hidden">
          <WashiTape color="pink" className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-1 w-28" />

          <div className="relative z-10 pt-2">
            <span className="font-doodle text-sm font-bold text-amber-900 bg-amber-200 px-3.5 py-1 rounded-full uppercase tracking-wider border border-stone-800">
              ¡Confirma tu Lugar!
            </span>
            <h2 className="mt-3 font-doodle text-4xl font-black text-stone-900">
              ¿Nos Acompañas? 🥳
            </h2>
            <p className="mt-1 font-doodle text-base text-stone-600 max-w-xs mx-auto">
              Ayúdanos confirmando tu asistencia para esperarte con todo listo.
            </p>

            {/* Selector de personas */}
            <div className="mt-6 space-y-4 text-left">
              <div>
                <label className="font-doodle text-base font-bold text-stone-800 block mb-1">
                  Nombre de tu Familia / Invitado:
                </label>
                <input
                  type="text"
                  value={nombreFamilia}
                  onChange={(e) => setNombreFamilia(e.target.value)}
                  placeholder="Ej: Familia González"
                  className="w-full rounded-2xl border-2 border-stone-800 bg-stone-50 px-4 py-2.5 font-doodle text-lg text-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Adultos */}
                <div className="rounded-2xl border-2 border-stone-800 bg-stone-50 p-3">
                  <span className="font-doodle text-sm font-bold text-stone-800 block">
                    Adultos:
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setAdultos((a) => Math.max(1, a - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-stone-800 font-doodle font-bold text-lg text-stone-800 shadow-sm active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-doodle text-2xl font-black text-stone-900">
                      {adultos}
                    </span>
                    <button
                      onClick={() => setAdultos((a) => a + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-stone-800 font-doodle font-bold text-lg text-stone-800 shadow-sm active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Niños */}
                <div className="rounded-2xl border-2 border-stone-800 bg-stone-50 p-3">
                  <span className="font-doodle text-sm font-bold text-stone-800 block">
                    Niños / Peques:
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setNinos((n) => Math.max(0, n - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-stone-800 font-doodle font-bold text-lg text-stone-800 shadow-sm active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-doodle text-2xl font-black text-stone-900">
                      {ninos}
                    </span>
                    <button
                      onClick={() => setNinos((n) => n + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-stone-800 font-doodle font-bold text-lg text-stone-800 shadow-sm active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <motion.button
              onClick={handleSendWhatsApp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full rounded-2xl border-3 border-stone-800 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 py-4 px-4 font-doodle text-xl font-black text-stone-950 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5 text-stone-950" />
              Confirmar por WhatsApp 💬
            </motion.button>

            {rsvpConfirmado && (
              <p className="mt-3 font-doodle text-base font-bold text-emerald-700 animate-bounce">
                ¡Gracias por confirmar! Abriendo WhatsApp...
              </p>
            )}

            <p className="mt-3 font-doodle text-xs text-stone-500 italic">
              Se enviará tu confirmación directamente al WhatsApp de mamá (81 2466 1526).
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER SCRAPBOOK CON AMOR
         ===================================================================== */}
      <footer className="mt-4 text-center px-4 text-stone-500 z-10 relative">
        <p className="font-doodle text-lg font-bold text-stone-800">
          Leonardo & Familia · ¡1er Añito!
        </p>
        <p className="font-doodle text-sm mt-0.5">
          Hecho con mucho amor para nuestro rey Leo 🦁❤️ (... ¡y Felipe 31!)
        </p>
      </footer>

      {/* =====================================================================
          MODAL LIGHTBOX PARA FOTOS EN GRANDE
         ===================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-lg w-full rounded-3xl bg-white p-4 shadow-2xl border-3 border-stone-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white font-bold border-2 border-white shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain"
                />
              </div>

              <div className="pt-3 text-center">
                <span className="font-doodle text-xs font-bold text-amber-800 bg-amber-100 rounded-full px-3 py-1 inline-block border border-amber-300">
                  {selectedPhoto.doodleTag}
                </span>
                <p className="font-doodle text-lg font-bold text-stone-900 mt-1">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
