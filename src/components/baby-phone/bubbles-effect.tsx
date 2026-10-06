"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { babySoundEngine } from "@/lib/baby-sound-engine";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji?: string;
  speed: number;
}

interface TouchPop {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const BubblesEffect: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [pops, setPops] = useState<TouchPop[]>([]);

  // Spawn periodic gentle floating bubbles in background
  useEffect(() => {
    const colors = [
      "rgba(255, 182, 193, 0.45)", // pink
      "rgba(173, 216, 230, 0.45)", // light blue
      "rgba(255, 255, 153, 0.45)", // yellow
      "rgba(152, 251, 152, 0.45)", // mint
      "rgba(221, 160, 221, 0.45)", // plum
    ];

    const interval = setInterval(() => {
      if (typeof window === "undefined") return;
      setBubbles((prev) => {
        if (prev.length > 15) return prev;
        const newBubble: Bubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * (window.innerWidth - 60),
          y: window.innerHeight + 20,
          size: 35 + Math.random() * 45,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 6 + Math.random() * 5,
        };
        return [...prev, newBubble];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleGlobalTouch = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX = 0;
    let clientY = 0;

    if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    if (clientX === 0 && clientY === 0) return;

    babySoundEngine.playPop();

    const emojis = ["⭐", "✨", "🎈", "💖", "🌸", "🎵", "🍭", "🍀"];
    const newPop: TouchPop = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setPops((prev) => [...prev.slice(-8), newPop]);

    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== newPop.id));
    }, 900);
  };

  const popBubble = (bubbleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    babySoundEngine.playPop();
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  };

  return (
    <div
      onClick={handleGlobalTouch}
      className="absolute inset-0 overflow-hidden pointer-events-auto z-0"
    >
      {/* Floating Gentle Ambient Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "105vh", opacity: 0.2 }}
          animate={{
            y: "-15vh",
            x: [b.x, b.x + (Math.random() * 40 - 20), b.x],
            opacity: [0.3, 0.7, 0.2],
          }}
          transition={{
            duration: b.speed,
            ease: "linear",
          }}
          onAnimationComplete={() => {
            setBubbles((prev) => prev.filter((item) => item.id !== b.id));
          }}
          onClick={(e) => popBubble(b.id, e)}
          style={{
            left: b.x,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
          }}
          className="absolute rounded-full border border-white/60 shadow-inner backdrop-blur-[1px] cursor-pointer active:scale-125 transition-transform"
        >
          <div className="w-1/3 h-1/3 bg-white/70 rounded-full mt-1 ml-2" />
        </motion.div>
      ))}

      {/* Screen Tap Sparkle Bursts */}
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0.3, opacity: 1, y: 0 }}
            animate={{ scale: 2.2, opacity: 0, y: -70 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ left: p.x - 20, top: p.y - 20 }}
            className="absolute pointer-events-none text-4xl select-none z-40 drop-shadow-md"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
