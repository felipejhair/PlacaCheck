"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Copy,
  Check,
  Gift,
  Shirt,
  Sparkles,
  Send,
  Baby,
} from "lucide-react";
import type { CumpleConfig, InvitadoCumple } from "./cumple-data";
import {
  LeoLionMascot,
  InteractiveBalloons,
  InteractiveCake,
  VIPPartyUnbox,
  FloatingSky,
  AudioToggle,
  soundEffects,
  KidsConfetti,
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
  const [unboxed, setUnboxed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDadModal, setShowDadModal] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

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

  // Guardar en Google Calendar o iCal
  const handleGoogleCalendar = () => {
    soundEffects.playClick();
    const title = encodeURIComponent(`1er Añito de ${data.festejado.nombre} 🦁🎈`);
    const details = encodeURIComponent(
      `¡Fiesta de cumpleaños de 1 año de ${data.festejado.nombre}!\n(P.D. También felicitar a papá ${data.papaColado.nombre} 🎂)\nLugar: ${data.lugar.nombre}`
    );
    const location = encodeURIComponent(`${data.lugar.nombre}, ${data.lugar.direccion}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261101T210000Z/20261102T020000Z`;
    window.open(gCalUrl, "_blank");
  };

  // Enviar confirmación por WhatsApp
  const handleSendWhatsApp = () => {
    soundEffects.playCelebration();
    setConfettiActive(true);
    setRsvpConfirmado(true);

    const nombre = nombreFamilia.trim() || "Nosotros";
    const msg = `¡Hola ${data.papaColado.nombre}! 🎉 Confirmamos con mucha alegría nuestra asistencia al 1er Añito de ${data.festejado.nombre} para el ${data.fechaTexto} en ${data.lugar.nombre}.
👨‍👩‍👧‍👦 Familia: ${nombre}
👥 Asistiremos: ${adultos} adulto(s) y ${ninos} peque(s).
🎂 ¡Y un abrazo enorme adelantado para ti por tu cumpleaños también! 🥳🎈`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${data.whatsappNumero}?text=${encoded}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setConfettiActive(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FFFDF7] font-friendly text-stone-800 pb-24">
      {/* Entrada mágica tipo unboxing */}
      <VIPPartyUnbox
        festejado={data.festejado.nombre}
        invitadoNombre={invitado?.nombre}
        onOpen={() => setUnboxed(true)}
      />

      {/* Globos interactivos que puedes ponchar */}
      <InteractiveBalloons count={8} />

      {/* Nubes flotantes de fondo */}
      <FloatingSky />

      {/* Botón de audio */}
      <AudioToggle />

      {/* Confeti general */}
      <KidsConfetti active={confettiActive} />

      {/* =====================================================================
          GUIRNALDA DE BANDERINES SUPERIOR
         ===================================================================== */}
      <div className="relative w-full overflow-hidden pt-1 flex justify-center">
        <div className="flex w-[120%] justify-between gap-1 px-2 select-none">
          {["#f43f5e", "#fbbf24", "#38bdf8", "#34d399", "#a855f7", "#fb923c", "#f43f5e", "#fbbf24", "#38bdf8", "#34d399", "#a855f7", "#fb923c"].map(
            (color, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [i % 2 === 0 ? -4 : 4, i % 2 === 0 ? 4 : -4] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="w-7 h-9 shadow-sm"
                style={{
                  backgroundColor: color,
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            )
          )}
        </div>
      </div>

      {/* =====================================================================
          HERO SECTION
         ===================================================================== */}
      <section className="relative mx-auto max-w-xl px-5 pt-8 pb-10 text-center">
        {/* Badge personalizado si viene con invitado */}
        {invitado && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-sky-300 bg-sky-50 px-4 py-1.5 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-sky-500 animate-spin" />
            <span className="font-kids text-xs font-bold text-sky-800">
              Pase Reservado para: {invitado.nombre}
            </span>
          </motion.div>
        )}

        {/* Mascota Leo el Leoncito */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative inline-block cursor-pointer"
          onClick={() => {
            soundEffects.playCelebration();
            setConfettiActive(true);
            setTimeout(() => setConfettiActive(false), 2000);
          }}
          title="¡Tócame para celebrar!"
        >
          <LeoLionMascot className="w-44 h-44 sm:w-52 sm:h-52 mx-auto drop-shadow-xl" />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-amber-400 p-2 text-white shadow-md kid-float">
            <span className="text-xl">🎈</span>
          </div>
        </motion.div>

        {/* Frase pequeña superior */}
        <p className="mt-3 font-kids text-sm font-bold tracking-widest text-amber-600 uppercase">
          ★ ¡Estás cordialmente invitado a mi fiesta! ★
        </p>

        {/* Nombre gigante de Leonardo */}
        <h1 className="mt-1 font-kids text-5xl sm:text-6xl font-black tracking-tight text-stone-900 drop-shadow-sm">
          LEONARDO
        </h1>

        {/* Insignia del 1er Añito */}
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 px-6 py-2 shadow-lg shadow-amber-200">
          <Baby className="h-5 w-5 text-white" />
          <span className="font-kids text-lg font-black text-white tracking-wide">
            ¡CUMPLE 1 AÑO!
          </span>
          <Sparkles className="h-5 w-5 text-yellow-200" />
        </div>

        <p className="mt-4 font-friendly text-base text-stone-600 max-w-md mx-auto leading-relaxed">
          {data.festejado.lema}. ¡Ven a celebrar con nosotros una tarde llena de juegos, sonrisas y momentos inolvidables!
        </p>

        {/* ===================================================================
            EL TOQUE CÓMICO DEL PAPÁ (FELIPE)
           =================================================================== */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-6 relative mx-auto max-w-md rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/90 p-4 shadow-sm text-left"
        >
          {/* Cinta adhesiva de cartón decorativa */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 -rotate-2 rounded-sm shadow-inner" />

          <div className="flex items-start gap-3">
            <div className="text-2xl pt-1">🤫</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-kids text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Nota secreta de papá Felipe:
                </span>
                <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  {data.papaColado.edadAprox}
                </span>
              </div>
              <p className="mt-1 font-friendly text-xs sm:text-sm text-stone-700 leading-snug">
                {data.papaColado.bromaCorta}
              </p>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setShowDadModal(true);
                }}
                className="mt-2 text-xs font-bold text-amber-700 underline underline-offset-2 hover:text-amber-900 flex items-center gap-1"
              >
                <span>Toca aquí para ver el duelo de cumpleañeros 😂</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          CUENTA REGRESIVA LÚDICA (BLOQUES DE JUGUETE)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-4">
        <div className="rounded-3xl border-3 border-amber-200 bg-white/90 p-5 shadow-xl shadow-amber-100/60 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-amber-700 mb-4">
            <Clock className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
            <h2 className="font-kids text-base font-bold uppercase tracking-wider">
              Faltan para la gran fiesta:
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Días */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-sky-100 to-sky-200 p-2.5 sm:p-3 border-2 border-sky-300 shadow-sm">
              <span className="font-kids text-2xl sm:text-3xl font-black text-sky-800">
                {countdown.dias}
              </span>
              <span className="font-friendly text-[11px] font-bold text-sky-700 uppercase">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 p-2.5 sm:p-3 border-2 border-amber-300 shadow-sm">
              <span className="font-kids text-2xl sm:text-3xl font-black text-amber-800">
                {countdown.horas}
              </span>
              <span className="font-friendly text-[11px] font-bold text-amber-700 uppercase">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-rose-100 to-rose-200 p-2.5 sm:p-3 border-2 border-rose-300 shadow-sm">
              <span className="font-kids text-2xl sm:text-3xl font-black text-rose-800">
                {countdown.minutos}
              </span>
              <span className="font-friendly text-[11px] font-bold text-rose-700 uppercase">
                Min
              </span>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-100 to-emerald-200 p-2.5 sm:p-3 border-2 border-emerald-300 shadow-sm">
              <span className="font-kids text-2xl sm:text-3xl font-black text-emerald-800">
                {countdown.segundos}
              </span>
              <span className="font-friendly text-[11px] font-bold text-emerald-700 uppercase">
                Seg
              </span>
            </div>
          </div>

          <p className="mt-3 text-center font-kids text-xs font-semibold text-stone-500">
            📅 {data.fechaTexto} · A partir de las {data.horarioTexto}
          </p>
        </div>
      </section>

      {/* =====================================================================
          DETALLES CLAVE (DÓNDE Y CUÁNDO) - FÁCIL DE INTERPRETAR
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6 space-y-4">
        <div className="text-center mb-2">
          <span className="font-kids text-xs font-bold text-sky-600 uppercase tracking-widest">
            ¿Cuándo y Dónde?
          </span>
          <h2 className="font-kids text-2xl sm:text-3xl font-black text-stone-800">
            Coordenadas de la Diversión
          </h2>
        </div>

        {/* Tarjeta Fecha y Hora */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-3xl border-2 border-amber-200 bg-white p-5 shadow-lg shadow-stone-100 flex items-start gap-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 border border-amber-200">
            <Calendar className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-kids text-lg font-bold text-stone-800">
              {data.diaSemana}, {data.fechaTexto}
            </h3>
            <p className="font-friendly text-sm text-stone-600 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-amber-500" /> {data.horarioTexto}
            </p>
            <button
              onClick={handleGoogleCalendar}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 transition hover:bg-amber-100"
            >
              <Calendar className="w-3.5 h-3.5" />
              Guardar en mi Calendario
            </button>
          </div>
        </motion.div>

        {/* Tarjeta Lugar y Navegación */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-lg shadow-stone-100 flex flex-col gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 border border-sky-200">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-kids text-lg font-bold text-stone-800">
                {data.lugar.nombre}
              </h3>
              <p className="font-friendly text-sm text-stone-600 mt-0.5">
                {data.lugar.direccion}
              </p>
              {data.lugar.referencia && (
                <p className="font-friendly text-xs text-stone-500 mt-1 italic">
                  📍 {data.lugar.referencia}
                </p>
              )}
            </div>
          </div>

          {/* Botones de acción 1 toque */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
            <a
              href={data.lugar.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-2.5 px-3 font-kids text-xs font-bold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Google Maps
            </a>

            <a
              href={data.lugar.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 py-2.5 px-3 font-kids text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-600 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Abrir en Waze
            </a>
          </div>

          <button
            onClick={handleCopyAddress}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 py-2 text-xs font-bold text-stone-700 transition hover:bg-stone-100"
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
          PASTEL INTERACTIVO
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="rounded-3xl border-3 border-amber-300 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/50 p-6 shadow-xl shadow-amber-100/50 text-center">
          <span className="font-kids text-xs font-bold text-amber-600 uppercase tracking-widest">
            ¡Momento Especial!
          </span>
          <h2 className="mt-1 font-kids text-2xl font-black text-stone-800">
            La Primera Velita de Leo 🎂
          </h2>
          <p className="mt-1 font-friendly text-xs text-stone-600">
            Toca la velita para ayudarle a soplar su deseo y desatar la fiesta
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
          ITINERARIO DE LA FIESTA (LÍNEA DE TIEMPO LÚDICA)
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="text-center mb-6">
          <span className="font-kids text-xs font-bold text-rose-500 uppercase tracking-widest">
            ¿Qué haremos?
          </span>
          <h2 className="font-kids text-2xl sm:text-3xl font-black text-stone-800">
            Itinerario de Sonrisas
          </h2>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-sky-300 before:via-amber-300 before:to-rose-300 before:rounded-full">
          {data.itinerario.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-4"
            >
              {/* Nodo decorativo en la línea */}
              <div className="absolute -left-[27px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-white shadow-sm font-kids text-xs font-black">
                {idx + 1}
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-kids text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {item.hora}
                  </span>
                </div>
                <h3 className="mt-1 font-kids text-base font-bold text-stone-800">
                  {item.titulo}
                </h3>
                <p className="mt-1 font-friendly text-xs text-stone-600 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CÓDIGO DE VESTIMENTA Y TIPS
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-4">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/70 p-5 shadow-md flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-300">
            <Shirt className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-kids text-base font-bold text-emerald-900">
              Código de Vestimenta: {data.vestimenta.tipo}
            </h3>
            <p className="mt-1 font-friendly text-xs sm:text-sm text-stone-700">
              {data.vestimenta.descripcion}
            </p>
            <p className="mt-2 font-friendly text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-xl inline-block">
              🧦 {data.vestimenta.notaPeques}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MESA DE REGALOS & SUGERENCIAS
         ===================================================================== */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="text-center mb-5">
          <span className="font-kids text-xs font-bold text-purple-600 uppercase tracking-widest">
            Sugerencias de Cariño
          </span>
          <h2 className="font-kids text-2xl font-black text-stone-800">
            Mesa de Regalos
          </h2>
          <p className="mt-1 font-friendly text-xs text-stone-600">
            Tu presencia es lo más importante. Si deseas tener un detalle con Leo, aquí tienes algunas ideas:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.regalos.map((reg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div
                  className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${reg.color} text-white shadow-sm mb-2`}
                >
                  <Gift className="w-4 h-4" />
                </div>
                <h3 className="font-kids text-sm font-bold text-stone-800">
                  {reg.titulo}
                </h3>
                <p className="mt-1 font-friendly text-xs text-stone-600">
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
      <section className="mx-auto max-w-lg px-5 py-8">
        <div className="rounded-3xl border-4 border-amber-300 bg-white p-6 shadow-2xl shadow-amber-200/60 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -z-0 opacity-60" />

          <div className="relative z-10">
            <span className="font-kids text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              ¡Confirma tu Lugar!
            </span>
            <h2 className="mt-2 font-kids text-3xl font-black text-stone-900">
              ¿Nos Acompañas? 🥳
            </h2>
            <p className="mt-1 font-friendly text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
              Ayúdanos confirmando tu asistencia antes del evento para tener todo listo para ti y tus peques.
            </p>

            {/* Selector de personas */}
            <div className="mt-6 space-y-4 text-left">
              <div>
                <label className="font-kids text-xs font-bold text-stone-700 block mb-1">
                  Nombre de tu Familia / Invitado:
                </label>
                <input
                  type="text"
                  value={nombreFamilia}
                  onChange={(e) => setNombreFamilia(e.target.value)}
                  placeholder="Ej: Familia González"
                  className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 font-friendly text-sm text-stone-800 focus:border-amber-400 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Adultos */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <span className="font-kids text-xs font-bold text-stone-700 block">
                    Adultos:
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setAdultos((a) => Math.max(1, a - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-stone-300 font-kids font-bold text-stone-700 shadow-sm active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-kids text-lg font-black text-stone-800">
                      {adultos}
                    </span>
                    <button
                      onClick={() => setAdultos((a) => a + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-stone-300 font-kids font-bold text-stone-700 shadow-sm active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Niños */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <span className="font-kids text-xs font-bold text-stone-700 block">
                    Niños / Peques:
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setNinos((n) => Math.max(0, n - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-stone-300 font-kids font-bold text-stone-700 shadow-sm active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-kids text-lg font-black text-stone-800">
                      {ninos}
                    </span>
                    <button
                      onClick={() => setNinos((n) => n + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-stone-300 font-kids font-bold text-stone-700 shadow-sm active:scale-95"
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
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 py-4 px-4 font-kids text-base font-bold text-white shadow-xl shadow-emerald-200 transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5 text-emerald-100" />
              Confirmar por WhatsApp 💬
            </motion.button>

            {rsvpConfirmado && (
              <p className="mt-3 text-xs font-bold text-emerald-600 animate-bounce">
                ¡Gracias por confirmar! Te redirigiremos a WhatsApp...
              </p>
            )}

            <p className="mt-3 font-friendly text-[11px] text-stone-400 italic">
              Se enviará tu confirmación directamente al WhatsApp de papá Felipe.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER CON CARIÑO
         ===================================================================== */}
      <footer className="mt-8 text-center px-4 text-stone-400">
        <p className="font-kids text-sm font-bold text-stone-600">
          Leonardo & Familia · 1er Añito
        </p>
        <p className="font-friendly text-xs mt-1">
          Hecho con mucho amor para nuestro pequeño rey 🦁❤️
        </p>
        <p className="font-friendly text-[10px] text-stone-300 mt-2">
          (Y felicidades a Felipe, que sobrevivió al primer año de paternidad 🍼🎉)
        </p>
      </footer>

      {/* =====================================================================
          MODAL CÓMICO: EL DUELO DE CUMPLEAÑEROS (LEO VS FELIPE)
         ===================================================================== */}
      <AnimatePresence>
        {showDadModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowDadModal(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 font-bold hover:bg-stone-200"
              >
                ✕
              </button>

              <div className="text-center">
                <span className="font-kids text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Edición Especial
                </span>
                <h3 className="font-kids text-2xl font-black text-stone-900 mt-1">
                  El Gran Duelo de Cumpleaños 🥊🎂
                </h3>
                <p className="font-friendly text-xs text-stone-500 mt-1">
                  2 cumpleañeros, 1 sola fiesta... ¿quién manda aquí?
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {/* Tarjeta Leo */}
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🦁👑</div>
                    <div>
                      <h4 className="font-kids text-lg font-black text-stone-800">
                        {data.festejado.nombre}
                      </h4>
                      <p className="font-friendly text-xs font-bold text-amber-700">
                        1 Año · El Rey de la Casa
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 font-friendly text-xs text-stone-700">
                    {data.festejado.habilidades.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tarjeta Felipe */}
                <div className="rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👨‍🦰🚐</div>
                    <div>
                      <h4 className="font-kids text-base font-bold text-stone-700">
                        {data.papaColado.nombre}
                      </h4>
                      <p className="font-friendly text-xs text-stone-500">
                        {data.papaColado.edadAprox} · Chofer y Patrocinador
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs italic text-stone-500">
                    {data.papaColado.bromaLarga}
                  </p>
                  <ul className="mt-3 space-y-1.5 font-friendly text-xs text-stone-600">
                    {data.papaColado.habilidades.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-stone-400">▪</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEffects.playCelebration();
                  setShowDadModal(false);
                }}
                className="mt-6 w-full rounded-2xl bg-amber-400 py-3 font-kids text-sm font-bold text-amber-950 shadow-md hover:bg-amber-500 transition"
              >
                ¡Entendido! Todo el honor para Leonardo 🎈
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
