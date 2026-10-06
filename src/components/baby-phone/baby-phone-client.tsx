"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Delete,
  Sparkles,
  RotateCcw,
  Users,
  Home,
} from "lucide-react";
import Link from "next/link";
import {
  ANIMAL_FRIENDS,
  AnimalFriend,
  getRandomAnimal,
  getRandomMessage,
} from "@/lib/baby-animals-data";
import { babySoundEngine } from "@/lib/baby-sound-engine";
import { AnimalAvatar } from "./animal-avatar";
import { KeypadButton } from "./keypad-button";
import { BubblesEffect } from "./bubbles-effect";
import {
  AppleIcon,
  BananaIcon,
  StrawberryIcon,
  ToyCarIcon,
  StarIcon,
  BalloonIcon,
  RocketIcon,
  PuppyPawIcon,
  KittyPawIcon,
  MusicNoteIcon,
  UnicornIcon,
  HeartIcon,
  DiceIcon,
  BellIcon,
  MiniAnimalAvatar,
} from "./baby-icons";

export default function BabyPhoneClient() {
  const [dialedNumber, setDialedNumber] = useState<string>("");
  const [screenState, setScreenState] = useState<"dialpad" | "calling" | "connected">("dialpad");
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalFriend | null>(null);
  const [activeAnimal, setActiveAnimal] = useState<AnimalFriend>(ANIMAL_FRIENDS[0]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Keypad definitions with bright baby colors and custom SVG icons
  const keys = [
    { value: "1", icon: <AppleIcon className="w-6 h-6" />, bg: "bg-red-400 hover:bg-red-500", border: "border-red-600", text: "text-white" },
    { value: "2", icon: <BananaIcon className="w-6 h-6" />, bg: "bg-amber-400 hover:bg-amber-500", border: "border-amber-600", text: "text-amber-950" },
    { value: "3", icon: <StrawberryIcon className="w-6 h-6" />, bg: "bg-rose-400 hover:bg-rose-500", border: "border-rose-600", text: "text-white" },
    { value: "4", icon: <ToyCarIcon className="w-6 h-6" />, bg: "bg-blue-400 hover:bg-blue-500", border: "border-blue-600", text: "text-white" },
    { value: "5", icon: <StarIcon className="w-6 h-6" />, bg: "bg-yellow-400 hover:bg-yellow-500", border: "border-yellow-600", text: "text-yellow-950" },
    { value: "6", icon: <BalloonIcon className="w-6 h-6" />, bg: "bg-purple-400 hover:bg-purple-500", border: "border-purple-600", text: "text-white" },
    { value: "7", icon: <RocketIcon className="w-6 h-6" />, bg: "bg-emerald-400 hover:bg-emerald-500", border: "border-emerald-600", text: "text-white" },
    { value: "8", icon: <PuppyPawIcon className="w-6 h-6" />, bg: "bg-orange-400 hover:bg-orange-500", border: "border-orange-600", text: "text-white" },
    { value: "9", icon: <KittyPawIcon className="w-6 h-6" />, bg: "bg-teal-400 hover:bg-teal-500", border: "border-teal-600", text: "text-white" },
    { value: "*", icon: <MusicNoteIcon className="w-6 h-6" />, bg: "bg-indigo-400 hover:bg-indigo-500", border: "border-indigo-600", text: "text-white" },
    { value: "0", icon: <UnicornIcon className="w-6 h-6" />, bg: "bg-fuchsia-400 hover:bg-fuchsia-500", border: "border-fuchsia-600", text: "text-white" },
    { value: "#", icon: <HeartIcon className="w-6 h-6" />, bg: "bg-pink-400 hover:bg-pink-500", border: "border-pink-600", text: "text-white" },
  ];

  // Call timer counter
  useEffect(() => {
    if (screenState === "connected") {
      setCallDuration(0);
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [screenState]);

  // Handle keypad clicks
  const handleKeyPress = (val: string) => {
    if (val === "*") {
      // Fun musical chime
      playMagicMelody();
      return;
    }
    if (val === "#") {
      // Heart explosion
      triggerHeartShower();
      return;
    }

    if (dialedNumber.length < 12) {
      setDialedNumber((prev) => prev + val);
    }
  };

  // Backspace
  const handleBackspace = (e: React.MouseEvent) => {
    e.stopPropagation();
    babySoundEngine.playPop();
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  // Trigger magic melody
  const playMagicMelody = () => {
    const notes = ["1", "3", "5", "8", "6", "5", "8"];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        babySoundEngine.playKeyTone(n);
      }, idx * 160);
    });
    triggerHeartShower();
  };

  // Heart & Star shower animation
  const triggerHeartShower = () => {
    setShowConfetti(true);
    babySoundEngine.playGiggle();
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    babySoundEngine.setMuted(next);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Start Call (Triggered by huge green button - regardless of whether numbers are typed!)
  const handleStartCall = async (e?: React.MouseEvent) => {
    e?.stopPropagation();

    // Haptic burst
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([60, 40, 60]);
      } catch {}
    }

    // Determine which animal will answer
    const targetAnimal = selectedAnimal || getRandomAnimal();
    setActiveAnimal(targetAnimal);
    setScreenState("calling");

    // Ringing phase (1.8 seconds)
    await babySoundEngine.playRinging(1.8);

    // Pick up!
    setScreenState("connected");
    babySoundEngine.playConnectChime();

    // Trigger dialogue speech
    const msg = getRandomMessage(targetAnimal);
    setCurrentMessage(msg);
    setDisplayedText("");

    setTimeout(() => {
      speakAnimalMessage(targetAnimal, msg);
    }, 400);
  };

  // Speak dialogue using Animalese voice engine
  const speakAnimalMessage = (animal: AnimalFriend, text: string) => {
    setDisplayedText("");
    setIsSpeaking(true);

    babySoundEngine.playAnimalese(
      text,
      {
        pitchMultiplier: animal.voice.pitchMultiplier,
        speedMultiplier: animal.voice.speedMultiplier,
        timbre: animal.voice.timbre,
      },
      {
        onChar: (char, index, speaking) => {
          setIsSpeaking(speaking);
          setDisplayedText(text.slice(0, index + 1));
        },
        onComplete: () => {
          setIsSpeaking(false);
          setDisplayedText(text);
        },
      }
    );
  };

  // Repeat speech or tell another message
  const handleRepeatSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMsg = getRandomMessage(activeAnimal);
    setCurrentMessage(nextMsg);
    speakAnimalMessage(activeAnimal, nextMsg);
  };

  // Switch to another animal in call
  const handleNextAnimal = (e: React.MouseEvent) => {
    e.stopPropagation();
    babySoundEngine.stopSpeech();
    babySoundEngine.playConnectChime();

    const otherAnimals = ANIMAL_FRIENDS.filter((a) => a.id !== activeAnimal.id);
    const nextAnimal = otherAnimals[Math.floor(Math.random() * otherAnimals.length)];
    setActiveAnimal(nextAnimal);
    setSelectedAnimal(nextAnimal);

    const msg = getRandomMessage(nextAnimal);
    setCurrentMessage(msg);
    setDisplayedText("");

    setTimeout(() => {
      speakAnimalMessage(nextAnimal, msg);
    }, 250);
  };

  // Hang Up Call (Big Red Button)
  const handleHangUp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    babySoundEngine.playHangup();
    setIsSpeaking(false);
    setScreenState("dialpad");
    setDialedNumber("");
  };

  // Format call duration MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-300 via-pink-200 to-amber-100 flex flex-col items-center justify-center p-2 sm:p-4 select-none overflow-hidden touch-manipulation font-sans">
      {/* Floating Bubbles & Sparkles Background */}
      <BubblesEffect />

      {/* SVG Confetti Shower */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
                  y: -50,
                  rotate: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  scale: 1.2,
                }}
                transition={{ duration: 1.8 + Math.random(), ease: "easeIn" }}
                className="absolute"
              >
                {i % 3 === 0 ? (
                  <StarIcon className="w-8 h-8" />
                ) : i % 3 === 1 ? (
                  <HeartIcon className="w-8 h-8" />
                ) : (
                  <BalloonIcon className="w-8 h-8" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Utilities for Parents */}
      <header className="relative z-30 w-full max-w-md flex items-center justify-between px-3 py-1.5 mb-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-sm text-xs sm:text-sm font-bold border border-white/60 transition-transform active:scale-95"
        >
          <Home className="w-4 h-4 text-primary" />
          <span>Inicio</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            type="button"
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-700 shadow-md border border-white/60 flex items-center justify-center transition-transform active:scale-95"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            type="button"
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-700 shadow-md border border-white/60 flex items-center justify-center transition-transform active:scale-95"
            title="Pantalla completa"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5 text-blue-600" />}
          </button>
        </div>
      </header>

      {/* Toy Smartphone Chassis */}
      <div className="relative z-20 w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-[40px] sm:rounded-[48px] p-3 sm:p-5 shadow-2xl border-4 sm:border-[6px] border-white/95 flex flex-col justify-between min-h-[580px] xs:min-h-[640px] sm:min-h-[700px]">
        {/* Cute Toy Speaker Slot & Camera */}
        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400/50" />
          <div className="w-16 sm:w-20 h-2 bg-slate-300 rounded-full border border-slate-400/50" />
        </div>

        {/* SCREEN CONTENT: DIALPAD vs CALLING vs CONNECTED */}
        <AnimatePresence mode="wait">
          {screenState === "dialpad" && (
            <motion.div
              key="dialpad"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-between"
            >
              {/* DISPLAY SCREEN */}
              <div className="bg-gradient-to-r from-violet-100 via-pink-100 to-amber-100 border-2 sm:border-3 border-pink-200 rounded-3xl p-3 sm:p-4 shadow-inner flex flex-col justify-center min-h-[90px] xs:min-h-[105px] relative overflow-hidden">
                {/* Animal Picker Header */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Amigo seleccionado:
                  </span>
                  {selectedAnimal ? (
                    <button
                      onClick={() => setSelectedAnimal(null)}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-pink-700 bg-pink-100 hover:bg-pink-200 px-2 py-0.5 rounded-full font-bold"
                    >
                      <DiceIcon className="w-3.5 h-3.5" />
                      <span>Sorpresa</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      <DiceIcon className="w-3.5 h-3.5" />
                      <span>Cualquiera</span>
                    </span>
                  )}
                </div>

                {/* Number or Prompt */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 overflow-x-auto scrollbar-none py-1">
                    {dialedNumber.length > 0 ? (
                      <div className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider font-mono flex items-center gap-1">
                        {dialedNumber}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {selectedAnimal ? (
                          <div className="flex items-center gap-2">
                            <MiniAnimalAvatar animalId={selectedAnimal.id} className="w-7 h-7" />
                            <span className="text-base sm:text-lg font-bold text-slate-700">
                              Llamar a {selectedAnimal.name}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <PuppyPawIcon className="w-6 h-6 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-bold text-slate-600 leading-tight">
                              Toca los números y pulsa el botón verde para llamar
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Backspace Button */}
                  {dialedNumber.length > 0 && (
                    <button
                      onClick={handleBackspace}
                      className="w-10 h-10 rounded-2xl bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow border border-slate-200 transition-transform active:scale-90 ml-2"
                      title="Borrar dígito"
                    >
                      <Delete className="w-5 h-5 text-rose-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* HORIZONTAL ANIMAL SELECTOR TRAY */}
              <div className="py-2 overflow-x-auto scrollbar-none flex items-center gap-2 px-1">
                <button
                  type="button"
                  onClick={() => {
                    babySoundEngine.playPop();
                    setSelectedAnimal(null);
                  }}
                  className={`flex-shrink-0 px-2.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm ${
                    selectedAnimal === null
                      ? "bg-amber-400 text-amber-950 ring-2 ring-amber-500 scale-105"
                      : "bg-white/70 text-slate-600 hover:bg-white"
                  }`}
                >
                  <DiceIcon className="w-4 h-4" />
                  <span>Sorpresa</span>
                </button>

                {ANIMAL_FRIENDS.map((animal) => {
                  const isSelected = selectedAnimal?.id === animal.id;
                  return (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() => {
                        babySoundEngine.playPop();
                        setSelectedAnimal(animal);
                      }}
                      className={`flex-shrink-0 px-2.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm ${
                        isSelected
                          ? "bg-primary text-white ring-2 ring-primary scale-105"
                          : "bg-white/70 text-slate-700 hover:bg-white"
                      }`}
                    >
                      <MiniAnimalAvatar animalId={animal.id} className="w-5 h-5" />
                      <span>{animal.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3x4 KEYPAD GRID WITH SVG ICONS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1 sm:py-2">
                {keys.map((k) => (
                  <KeypadButton
                    key={k.value}
                    value={k.value}
                    icon={k.icon}
                    colorBg={k.bg}
                    colorBorder={k.border}
                    colorText={k.text}
                    onClick={handleKeyPress}
                  />
                ))}
              </div>

              {/* HUGE GREEN CALL BUTTON */}
              <div className="pt-2 sm:pt-3 pb-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.94, y: 3 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                      "0 15px 35px -5px rgba(34, 197, 94, 0.7)",
                      "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 1.8, repeat: Infinity },
                    type: "spring",
                    stiffness: 400,
                  }}
                  onClick={handleStartCall}
                  type="button"
                  className="w-full h-18 sm:h-20 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-3xl sm:rounded-4xl flex items-center justify-center gap-3 sm:gap-4 shadow-xl border-b-[6px] border-emerald-700 font-black text-2xl sm:text-3xl tracking-wide select-none cursor-pointer"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/25 flex items-center justify-center animate-bounce">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                  </div>
                  <span>LLAMAR</span>
                  <PuppyPawIcon className="w-8 h-8" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* CALLING SCREEN (RINGING PHASE) */}
          {screenState === "calling" && (
            <motion.div
              key="calling"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-between py-6 text-center"
            >
              <div className="w-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-sm mb-3">
                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                  <span>¡Marcando número...!</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                  Llamando a {activeAnimal.name}
                </h2>
                <p className="text-sm font-semibold text-slate-500">{activeAnimal.title}</p>
              </div>

              {/* Pulsing Avatar */}
              <div className="relative my-6 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-emerald-300/40"
                />
                <motion.div
                  animate={{ rotate: [-8, 8, -8], scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="relative z-10"
                >
                  <AnimalAvatar animal={activeAnimal} isSpeaking={false} size="lg" interactive={false} />
                </motion.div>
              </div>

              {/* Cartoon Ringing Text with Bell SVG */}
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black text-emerald-600 animate-pulse">
                <BellIcon className="w-7 h-7" />
                <span>Riiiing... Riiiing!</span>
              </div>

              {/* Cancel / Hang up Button */}
              <div className="w-full pt-4">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleHangUp}
                  type="button"
                  className="w-full h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-3xl shadow-lg border-b-4 border-rose-700 font-black text-xl flex items-center justify-center gap-3"
                >
                  <PhoneOff className="w-6 h-6" />
                  <span>CANCELAR</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* CONNECTED VIDEO-CALL SCREEN */}
          {screenState === "connected" && (
            <motion.div
              key="connected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col justify-between py-1"
            >
              {/* Call Header Bar */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200 rounded-2xl px-3 py-2 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <MiniAnimalAvatar animalId={activeAnimal.id} className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-sm font-black text-slate-800 leading-tight">
                      {activeAnimal.name}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{formatTime(callDuration)}</span>
                    </div>
                  </div>
                </div>

                {/* Animated Voice Equalizer */}
                <div className="flex items-end gap-1 h-6 px-2">
                  {[0.4, 0.8, 0.5, 0.9, 0.6].map((mult, idx) => (
                    <motion.div
                      key={idx}
                      animate={
                        isSpeaking
                          ? { height: ["20%", `${mult * 100}%`, "20%"] }
                          : { height: "20%" }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 0.35 + idx * 0.08,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Center Stage: Interactive Animated Animal Avatar */}
              <div className="flex-1 flex flex-col items-center justify-center my-1 relative">
                <div className="text-center mb-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-pink-600 uppercase tracking-widest bg-pink-100 px-3 py-0.5 rounded-full">
                    <HeartIcon className="w-3.5 h-3.5" />
                    <span>¡Tócame para hacerme cosquillas!</span>
                  </span>
                </div>

                <AnimalAvatar
                  animal={activeAnimal}
                  isSpeaking={isSpeaking}
                  size="lg"
                  interactive={true}
                />
              </div>

              {/* ANIMAL CROSSING SPEECH BUBBLE */}
              <div className="relative bg-white border-3 sm:border-4 border-pink-300 rounded-3xl p-3 sm:p-4 shadow-lg mb-2">
                {/* Speech bubble pointer */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-pink-300" />

                <div className="text-center min-h-[50px] xs:min-h-[58px] flex items-center justify-center">
                  <p className="text-base sm:text-lg font-black text-slate-800 leading-snug tracking-wide">
                    {displayedText || "..."}
                    {isSpeaking && (
                      <span className="inline-block w-2 h-5 bg-pink-500 ml-1 animate-pulse rounded-full" />
                    )}
                  </p>
                </div>

                {/* Call Action Quick Buttons */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={handleRepeatSpeech}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs transition-transform active:scale-95 shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>¡Hablar otra vez!</span>
                  </button>

                  <button
                    onClick={handleNextAnimal}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-xs transition-transform active:scale-95 shadow-sm"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Otro amigo</span>
                  </button>
                </div>
              </div>

              {/* HUGE RED END CALL BUTTON */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.93, y: 3 }}
                  onClick={handleHangUp}
                  type="button"
                  className="w-full h-16 sm:h-18 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-600 hover:to-red-700 text-white rounded-3xl shadow-xl border-b-[6px] border-rose-800 font-black text-2xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <PhoneOff className="w-7 h-7 fill-white" />
                  <span>COLGAR</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer note */}
      <footer className="relative z-20 mt-3 text-center text-xs font-bold text-slate-600/80 flex items-center justify-center gap-1.5">
        <PuppyPawIcon className="w-4 h-4" />
        <span>Teléfono Mágico para Bebé · Con amor para divertirse jugando</span>
      </footer>
    </div>
  );
}
