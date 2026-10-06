"use client";

import React from "react";
import { motion } from "framer-motion";
import { babySoundEngine } from "@/lib/baby-sound-engine";

interface KeypadButtonProps {
  value: string;
  subIcon?: string;
  subLabel?: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  onClick: (val: string) => void;
  disabled?: boolean;
}

export const KeypadButton: React.FC<KeypadButtonProps> = ({
  value,
  subIcon,
  colorBg,
  colorBorder,
  colorText,
  onClick,
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (disabled) return;

    // Haptic feedback for toddler
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }

    babySoundEngine.playKeyTone(value);
    onClick(value);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.92, y: 4 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={`relative select-none flex flex-col items-center justify-center rounded-3xl w-full h-[72px] xs:h-[80px] sm:h-[92px] shadow-lg border-b-[6px] transition-all cursor-pointer font-bold ${colorBg} ${colorBorder} ${colorText}`}
      style={{
        touchAction: "manipulation",
      }}
    >
      {/* Glossy Top Reflection */}
      <div className="absolute top-1 inset-x-3 h-3 bg-white/35 rounded-full pointer-events-none" />

      {/* Main digit */}
      <span className="text-3xl sm:text-4xl leading-none drop-shadow-sm font-black tracking-tight">
        {value}
      </span>

      {/* Sub icon / emoji */}
      {subIcon && (
        <span className="text-base sm:text-lg leading-none mt-0.5 filter drop-shadow-sm">
          {subIcon}
        </span>
      )}
    </motion.button>
  );
};
