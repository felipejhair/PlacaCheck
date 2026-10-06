"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { babySoundEngine } from "@/lib/baby-sound-engine";
import { AnimalFriend } from "@/lib/baby-animals-data";
import { HeartIcon, StarIcon, BalloonIcon } from "./baby-icons";

interface AnimalAvatarProps {
  animal: AnimalFriend;
  isSpeaking: boolean;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  animal,
  isSpeaking,
  size = "lg",
  interactive = true,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [tapEffect, setTapEffect] = useState<{ id: number; x: number; y: number }[]>([]);

  // Periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Rapid mouth movement when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }

    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 110);

    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!interactive) return;

    babySoundEngine.playGiggle();

    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = rect.width / 2;
    let clientY = rect.height / 2;

    if ("clientX" in e) {
      clientX = e.clientX - rect.left;
      clientY = e.clientY - rect.top;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX - rect.left;
      clientY = e.touches[0].clientY - rect.top;
    }

    const newEffect = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
    };

    setTapEffect((prev) => [...prev, newEffect]);
    setTimeout(() => {
      setTapEffect((prev) => prev.filter((item) => item.id !== newEffect.id));
    }, 1200);
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-36 h-36",
    lg: "w-56 h-56 sm:w-64 sm:h-64",
  };

  return (
    <div
      onClick={handleTap}
      onTouchStart={handleTap}
      className={`relative select-none flex items-center justify-center cursor-pointer transition-transform active:scale-95 ${sizeClasses[size]}`}
    >
      {/* Floating Hearts / Stars on Tap */}
      <AnimatePresence>
        {tapEffect.map((effect) => (
          <motion.div
            key={effect.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, y: -90, x: (Math.random() - 0.5) * 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute pointer-events-none z-30"
            style={{ left: effect.x - 14, top: effect.y - 14 }}
          >
            {effect.id % 3 === 0 ? (
              <HeartIcon className="w-8 h-8" />
            ) : effect.id % 3 === 1 ? (
              <StarIcon className="w-8 h-8" />
            ) : (
              <BalloonIcon className="w-8 h-8" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Body Bouncing */}
      <motion.div
        animate={
          isSpeaking
            ? {
                y: [0, -6, 0, -4, 0],
                rotate: [0, -2, 2, -1, 0],
                scale: [1, 1.03, 1, 1.02, 1],
              }
            : {
                y: [0, -4, 0],
                scale: [1, 1.01, 1],
              }
        }
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 0.7 : 2.5,
          ease: "easeInOut",
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {/* Render specific animal SVG */}
        <AnimalSVG
          animalId={animal.id}
          isBlinking={isBlinking}
          mouthOpen={mouthOpen}
          isSpeaking={isSpeaking}
        />
      </motion.div>
    </div>
  );
};

interface SVGProps {
  animalId: string;
  isBlinking: boolean;
  mouthOpen: boolean;
  isSpeaking: boolean;
}

const AnimalSVG: React.FC<SVGProps> = ({ animalId, isBlinking, mouthOpen, isSpeaking }) => {
  switch (animalId) {
    case "leo":
      // Leo el Leoncito
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Fluffy Mane */}
          <circle cx="100" cy="100" r="88" fill="#F59E0B" />
          <g fill="#D97706">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <circle
                key={deg}
                cx={100 + 78 * Math.cos((deg * Math.PI) / 180)}
                cy={100 + 78 * Math.sin((deg * Math.PI) / 180)}
                r="18"
              />
            ))}
          </g>

          {/* Ears */}
          <circle cx="50" cy="55" r="22" fill="#F59E0B" stroke="#D97706" strokeWidth="5" />
          <circle cx="50" cy="55" r="12" fill="#FDE68A" />
          <circle cx="150" cy="55" r="22" fill="#F59E0B" stroke="#D97706" strokeWidth="5" />
          <circle cx="150" cy="55" r="12" fill="#FDE68A" />

          {/* Head */}
          <circle cx="100" cy="105" r="62" fill="#FBBF24" />

          {/* Cheeks */}
          <circle cx="68" cy="120" r="12" fill="#FCA5A5" opacity="0.65" />
          <circle cx="132" cy="120" r="12" fill="#FCA5A5" opacity="0.65" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M 68 96 Q 78 106 88 96" stroke="#451A03" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 112 96 Q 122 106 132 96" stroke="#451A03" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="78" cy="98" r="9" fill="#451A03" />
              <circle cx="75" cy="95" r="3.5" fill="#FFFFFF" />
              <circle cx="122" cy="98" r="9" fill="#451A03" />
              <circle cx="119" cy="95" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Muzzle */}
          <ellipse cx="100" cy="122" rx="20" ry="14" fill="#FEF3C7" />
          {/* Nose */}
          <polygon points="93,115 107,115 100,123" fill="#78350F" />

          {/* Animated Mouth */}
          {mouthOpen ? (
            <path d="M 94 125 Q 100 142 106 125 Z" fill="#DC2626" stroke="#78350F" strokeWidth="2.5" />
          ) : (
            <path d="M 94 124 Q 100 131 106 124" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}
        </svg>
      );

    case "mimi":
      // Mimi la Gatita
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Ears */}
          <polygon points="45,85 30,25 90,50" fill="#F472B6" stroke="#DB2777" strokeWidth="4" />
          <polygon points="48,78 40,38 80,55" fill="#FCE7F3" />

          <polygon points="155,85 170,25 110,50" fill="#F472B6" stroke="#DB2777" strokeWidth="4" />
          <polygon points="152,78 160,38 120,55" fill="#FCE7F3" />

          {/* Head */}
          <circle cx="100" cy="110" r="70" fill="#FDF2F8" stroke="#F472B6" strokeWidth="6" />

          {/* Cheeks */}
          <circle cx="62" cy="122" r="14" fill="#FDA4AF" opacity="0.75" />
          <circle cx="138" cy="122" r="14" fill="#FDA4AF" opacity="0.75" />

          {/* Whiskers */}
          <line x1="32" y1="112" x2="60" y2="114" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="124" x2="60" y2="122" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />
          <line x1="168" y1="112" x2="140" y2="114" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />
          <line x1="168" y1="124" x2="140" y2="122" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M 68 98 Q 78 108 88 98" stroke="#831843" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 112 98 Q 122 108 132 98" stroke="#831843" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="76" cy="100" r="9.5" fill="#831843" />
              <circle cx="73" cy="97" r="4" fill="#FFFFFF" />
              <circle cx="124" cy="100" r="9.5" fill="#831843" />
              <circle cx="121" cy="97" r="4" fill="#FFFFFF" />
            </>
          )}

          {/* Nose */}
          <polygon points="95,116 105,116 100,123" fill="#EC4899" />

          {/* Mouth */}
          {mouthOpen ? (
            <path d="M 93 125 Q 100 140 107 125 Z" fill="#F43F5E" stroke="#DB2777" strokeWidth="2" />
          ) : (
            <path d="M 92 125 Q 96 130 100 125 Q 104 130 108 125" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Cute Bow */}
          <path d="M 135 48 C 145 35 160 40 155 55 Z" fill="#EC4899" />
          <path d="M 135 48 C 125 35 110 40 115 55 Z" fill="#EC4899" />
          <circle cx="135" cy="48" r="6" fill="#F472B6" />
        </svg>
      );

    case "toby":
      // Toby el Perrito
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Floppy Ears */}
          <ellipse cx="40" cy="95" rx="20" ry="40" fill="#92400E" transform="rotate(-15 40 95)" />
          <ellipse cx="160" cy="95" rx="20" ry="40" fill="#92400E" transform="rotate(15 160 95)" />

          {/* Head */}
          <circle cx="100" cy="105" r="66" fill="#FBBF24" />

          {/* Brown Patch over one eye */}
          <ellipse cx="78" cy="96" rx="24" ry="26" fill="#D97706" opacity="0.6" />

          {/* Cheeks */}
          <circle cx="60" cy="126" r="13" fill="#FCA5A5" opacity="0.75" />
          <circle cx="140" cy="126" r="13" fill="#FCA5A5" opacity="0.75" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M 68 96 Q 78 106 88 96" stroke="#451A03" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 112 96 Q 122 106 132 96" stroke="#451A03" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="78" cy="98" r="9.5" fill="#451A03" />
              <circle cx="75" cy="95" r="3.5" fill="#FFFFFF" />
              <circle cx="122" cy="98" r="9.5" fill="#451A03" />
              <circle cx="119" cy="95" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Muzzle */}
          <ellipse cx="100" cy="126" rx="26" ry="18" fill="#FEF3C7" />
          {/* Nose */}
          <ellipse cx="100" cy="118" rx="11" ry="8" fill="#1F2937" />

          {/* Mouth & Tongue */}
          {mouthOpen ? (
            <g>
              <ellipse cx="100" cy="135" rx="10" ry="12" fill="#DC2626" />
              <path d="M 94 135 C 94 148 106 148 106 135 Z" fill="#F43F5E" />
            </g>
          ) : (
            <path d="M 92 126 Q 96 133 100 128 Q 104 133 108 126" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}
        </svg>
      );

    case "pepe":
      // Pepe la Ranita
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Big Eye Bulges */}
          <circle cx="58" cy="62" r="32" fill="#34D399" stroke="#059669" strokeWidth="5" />
          <circle cx="142" cy="62" r="32" fill="#34D399" stroke="#059669" strokeWidth="5" />

          {/* Head */}
          <ellipse cx="100" cy="118" rx="76" ry="58" fill="#34D399" stroke="#059669" strokeWidth="6" />

          {/* Cheeks */}
          <circle cx="52" cy="126" r="14" fill="#F87171" opacity="0.65" />
          <circle cx="148" cy="126" r="14" fill="#F87171" opacity="0.65" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <line x1="44" y1="62" x2="72" y2="62" stroke="#064E3B" strokeWidth="6" strokeLinecap="round" />
              <line x1="128" y1="62" x2="156" y2="62" stroke="#064E3B" strokeWidth="6" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="58" cy="62" r="15" fill="#064E3B" />
              <circle cx="53" cy="57" r="5" fill="#FFFFFF" />
              <circle cx="142" cy="62" r="15" fill="#064E3B" />
              <circle cx="137" cy="57" r="5" fill="#FFFFFF" />
            </>
          )}

          {/* Mouth */}
          {mouthOpen ? (
            <ellipse cx="100" cy="128" rx="24" ry="18" fill="#DC2626" stroke="#064E3B" strokeWidth="4" />
          ) : (
            <path d="M 68 122 Q 100 144 132 122" stroke="#064E3B" strokeWidth="5" strokeLinecap="round" fill="none" />
          )}

          {/* Nostrils */}
          <circle cx="95" cy="104" r="3" fill="#064E3B" />
          <circle cx="105" cy="104" r="3" fill="#064E3B" />
        </svg>
      );

    case "pandi":
      // Pandi el Panda
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Black Ears */}
          <circle cx="48" cy="50" r="26" fill="#1F2937" />
          <circle cx="152" cy="50" r="26" fill="#1F2937" />

          {/* White Head */}
          <circle cx="100" cy="108" r="68" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="4" />

          {/* Black Patches for Eyes */}
          <ellipse cx="72" cy="98" rx="20" ry="24" fill="#1F2937" transform="rotate(-15 72 98)" />
          <ellipse cx="128" cy="98" rx="20" ry="24" fill="#1F2937" transform="rotate(15 128 98)" />

          {/* Cheeks */}
          <circle cx="58" cy="128" r="13" fill="#F472B6" opacity="0.6" />
          <circle cx="142" cy="128" r="13" fill="#F472B6" opacity="0.6" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <line x1="64" y1="98" x2="80" y2="98" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="120" y1="98" x2="136" y2="98" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="73" cy="97" r="7" fill="#FFFFFF" />
              <circle cx="74" cy="96" r="3" fill="#1F2937" />
              <circle cx="127" cy="97" r="7" fill="#FFFFFF" />
              <circle cx="126" cy="96" r="3" fill="#1F2937" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="120" rx="9" ry="6" fill="#1F2937" />

          {/* Mouth */}
          {mouthOpen ? (
            <path d="M 94 126 Q 100 142 106 126 Z" fill="#DC2626" stroke="#1F2937" strokeWidth="2" />
          ) : (
            <path d="M 93 125 Q 97 131 100 127 Q 103 131 107 125" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
        </svg>
      );

    case "pio":
      // Pío el Pollito
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Head Feathers tuft */}
          <path d="M 100 45 C 95 30 108 30 100 45" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 105 45 C 112 32 120 35 105 45" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Body / Head */}
          <circle cx="100" cy="108" r="68" fill="#FDE047" stroke="#FACC15" strokeWidth="5" />

          {/* Wings */}
          <ellipse cx="32" cy="115" rx="14" ry="24" fill="#FACC15" transform="rotate(-15 32 115)" />
          <ellipse cx="168" cy="115" rx="14" ry="24" fill="#FACC15" transform="rotate(15 168 115)" />

          {/* Cheeks */}
          <circle cx="62" cy="122" r="14" fill="#F87171" opacity="0.65" />
          <circle cx="138" cy="122" r="14" fill="#F87171" opacity="0.65" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M 68 96 Q 78 106 88 96" stroke="#78350F" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 112 96 Q 122 106 132 96" stroke="#78350F" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="76" cy="98" r="9" fill="#78350F" />
              <circle cx="73" cy="95" r="3.5" fill="#FFFFFF" />
              <circle cx="124" cy="98" r="9" fill="#78350F" />
              <circle cx="121" cy="95" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Beak */}
          {mouthOpen ? (
            <polygon points="90,112 110,112 100,134" fill="#EA580C" />
          ) : (
            <polygon points="90,115 110,115 100,126" fill="#F97316" />
          )}
        </svg>
      );

    case "bunny":
      // Bunny el Conejito
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Long Ears */}
          <g>
            <ellipse cx="65" cy="50" rx="16" ry="44" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4" transform="rotate(-10 65 50)" />
            <ellipse cx="65" cy="50" rx="9" ry="32" fill="#FCE7F3" transform="rotate(-10 65 50)" />

            <ellipse cx="135" cy="50" rx="16" ry="44" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4" transform="rotate(10 135 50)" />
            <ellipse cx="135" cy="50" rx="9" ry="32" fill="#FCE7F3" transform="rotate(10 135 50)" />
          </g>

          {/* Head */}
          <circle cx="100" cy="116" r="64" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4" />

          {/* Cheeks */}
          <circle cx="62" cy="130" r="14" fill="#F472B6" opacity="0.6" />
          <circle cx="138" cy="130" r="14" fill="#F472B6" opacity="0.6" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <line x1="68" y1="104" x2="86" y2="104" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
              <line x1="114" y1="104" x2="132" y2="104" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="76" cy="104" r="9" fill="#1E293B" />
              <circle cx="73" cy="101" r="3.5" fill="#FFFFFF" />
              <circle cx="124" cy="104" r="9" fill="#1E293B" />
              <circle cx="121" cy="101" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Nose */}
          <polygon points="94,120 106,120 100,127" fill="#F472B6" />

          {/* Mouth & Teeth */}
          {mouthOpen ? (
            <path d="M 94 128 Q 100 144 106 128 Z" fill="#DC2626" stroke="#475569" strokeWidth="2" />
          ) : (
            <path d="M 93 128 Q 97 134 100 130 Q 103 134 107 128" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Cute front teeth */}
          <rect x="97" y="129" width="6" height="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        </svg>
      );

    case "trompi":
    default:
      // Trompi el Elefantito
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {/* Big Ears */}
          <circle cx="36" cy="100" r="32" fill="#93C5FD" stroke="#60A5FA" strokeWidth="5" />
          <circle cx="36" cy="100" r="18" fill="#BFDBFE" />

          <circle cx="164" cy="100" r="32" fill="#93C5FD" stroke="#60A5FA" strokeWidth="5" />
          <circle cx="164" cy="100" r="18" fill="#BFDBFE" />

          {/* Head */}
          <circle cx="100" cy="105" r="62" fill="#93C5FD" stroke="#60A5FA" strokeWidth="5" />

          {/* Cheeks */}
          <circle cx="65" cy="120" r="13" fill="#F472B6" opacity="0.65" />
          <circle cx="135" cy="120" r="13" fill="#F472B6" opacity="0.65" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <line x1="68" y1="95" x2="86" y2="95" stroke="#1E3A8A" strokeWidth="5" strokeLinecap="round" />
              <line x1="114" y1="95" x2="132" y2="95" stroke="#1E3A8A" strokeWidth="5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="76" cy="95" r="9" fill="#1E3A8A" />
              <circle cx="73" cy="92" r="3.5" fill="#FFFFFF" />
              <circle cx="124" cy="95" r="9" fill="#1E3A8A" />
              <circle cx="121" cy="92" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Animated Trunk */}
          <motion.path
            d={
              mouthOpen || isSpeaking
                ? "M 100 110 C 94 130 92 145 84 150 C 76 154 75 142 84 138"
                : "M 100 110 C 95 130 95 150 100 160 C 104 162 108 158 105 150"
            }
            stroke="#60A5FA"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            transition={{ duration: 0.2 }}
          />
        </svg>
      );
  }
};
