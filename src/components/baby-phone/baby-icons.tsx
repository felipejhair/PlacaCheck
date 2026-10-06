import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Manzana (Apple)
export const AppleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Stem & Leaf */}
    <path d="M 20 12 C 20 7 23 4 25 3" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 21 8 C 26 5 30 7 30 7 C 30 7 28 11 23 10 Z" fill="#22C55E" />
    {/* Apple Body */}
    <path
      d="M 20 13 C 14 13 8 16 8 23 C 8 32 16 37 20 37 C 24 37 32 32 32 23 C 32 16 26 13 20 13 Z"
      fill="#EF4444"
    />
    {/* Shine highlight */}
    <ellipse cx="14" cy="20" rx="2.5" ry="5" fill="#FCA5A5" transform="rotate(-25 14 20)" />
  </svg>
);

// 2. Plátano (Banana)
export const BananaIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path
      d="M 31 8 C 22 10 11 18 10 28 C 9 32 11 34 13 34 C 18 34 26 27 32 15 C 33 13 33 10 31 8 Z"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="1.5"
    />
    <path d="M 31 8 L 34 6" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <path d="M 10 28 L 8 32" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 14 28 C 17 25 24 18 29 12" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Fresa (Strawberry)
export const StrawberryIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Berry Body */}
    <path
      d="M 20 37 C 12 30 7 24 8 16 C 9 10 16 9 20 11 C 24 9 31 10 32 16 C 33 24 28 30 20 37 Z"
      fill="#F43F5E"
    />
    {/* Leaves */}
    <path d="M 20 11 L 14 6 C 16 9 19 11 20 11 Z" fill="#10B981" />
    <path d="M 20 11 L 26 6 C 24 9 21 11 20 11 Z" fill="#10B981" />
    <path d="M 20 11 L 20 4 C 19 8 20 11 20 11 Z" fill="#059669" />
    {/* Seeds */}
    {[
      [14, 17],
      [20, 16],
      [26, 17],
      [16, 23],
      [23, 23],
      [19, 29],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="1.3" fill="#FDE047" />
    ))}
  </svg>
);

// 4. Cochecito (Toy Car)
export const ToyCarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Roof & Body */}
    <path
      d="M 8 24 C 8 20 10 20 13 18 L 17 12 C 18 10 20 10 25 10 L 28 18 C 32 18 34 20 34 24 L 34 27 C 34 28 33 29 32 29 L 8 29 Z"
      fill="#38BDF8"
      stroke="#0284C7"
      strokeWidth="2"
    />
    {/* Windows */}
    <path d="M 17 18 L 18 13 L 23 13 L 23 18 Z" fill="#E0F2FE" />
    <path d="M 24 18 L 24 13 L 27 18 Z" fill="#E0F2FE" />
    {/* Wheels */}
    <circle cx="14" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
    <circle cx="14" cy="29" r="1.5" fill="#FFFFFF" />
    <circle cx="28" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
    <circle cx="28" cy="29" r="1.5" fill="#FFFFFF" />
  </svg>
);

// 5. Estrella (Star)
export const StarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path
      d="M 20 5 L 24.5 14.5 L 35 15.8 L 27.2 23 L 29.3 33.4 L 20 28.2 L 10.7 33.4 L 12.8 23 L 5 15.8 L 15.5 14.5 Z"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Cute smile on star */}
    <circle cx="16" cy="18" r="1.6" fill="#78350F" />
    <circle cx="24" cy="18" r="1.6" fill="#78350F" />
    <path d="M 18 21 Q 20 23.5 22 21" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 6. Globo (Balloon)
export const BalloonIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* String */}
    <path d="M 20 31 Q 23 34 19 37" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
    {/* Knot */}
    <polygon points="18,31 22,31 20,29" fill="#7C3AED" />
    {/* Balloon Body */}
    <ellipse cx="20" cy="18" rx="12" ry="14" fill="#A855F7" />
    {/* Shine */}
    <ellipse cx="15" cy="13" rx="3" ry="5" fill="#E9D5FF" transform="rotate(-30 15 13)" />
  </svg>
);

// 7. Cohete (Rocket)
export const RocketIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Flame */}
    <path d="M 17 31 Q 20 38 23 31" fill="#F97316" />
    <path d="M 18.5 31 Q 20 35 21.5 31" fill="#FDE047" />
    {/* Fins */}
    <path d="M 13 25 L 8 28 L 12 19 Z" fill="#EF4444" />
    <path d="M 27 25 L 32 28 L 28 19 Z" fill="#EF4444" />
    {/* Rocket Body */}
    <path
      d="M 20 6 C 14 12 13 24 13 28 L 27 28 C 27 24 26 12 20 6 Z"
      fill="#34D399"
      stroke="#059669"
      strokeWidth="1.5"
    />
    {/* Window */}
    <circle cx="20" cy="16" r="3.5" fill="#E0F2FE" stroke="#047857" strokeWidth="1.5" />
  </svg>
);

// 8. Huellita de Perro (Puppy Paw)
export const PuppyPawIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Main Pad */}
    <path
      d="M 20 18 C 14 18 11 23 13 29 C 15 33 25 33 27 29 C 29 23 26 18 20 18 Z"
      fill="#FB923C"
    />
    {/* Toe Pads */}
    <ellipse cx="11" cy="18" rx="3.5" ry="4.5" fill="#FB923C" transform="rotate(-30 11 18)" />
    <ellipse cx="16.5" cy="12" rx="3.5" ry="5" fill="#FB923C" transform="rotate(-10 16.5 12)" />
    <ellipse cx="23.5" cy="12" rx="3.5" ry="5" fill="#FB923C" transform="rotate(10 23.5 12)" />
    <ellipse cx="29" cy="18" rx="3.5" ry="4.5" fill="#FB923C" transform="rotate(30 29 18)" />
  </svg>
);

// 9. Huellita de Gato (Kitty Paw)
export const KittyPawIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Main Pad */}
    <path
      d="M 20 20 C 15 20 12 25 14 30 C 16 33 24 33 26 30 C 28 25 25 20 20 20 Z"
      fill="#2DD4BF"
    />
    {/* Toe Pads */}
    <circle cx="12" cy="18" r="3.2" fill="#2DD4BF" />
    <circle cx="16.5" cy="13" r="3.2" fill="#2DD4BF" />
    <circle cx="23.5" cy="13" r="3.2" fill="#2DD4BF" />
    <circle cx="28" cy="18" r="3.2" fill="#2DD4BF" />
  </svg>
);

// 10. Notas Musicales (Music Notes)
export const MusicNoteIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path d="M 15 26 L 15 12 L 27 9 L 27 23" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
    <path d="M 15 13 L 27 10" stroke="#818CF8" strokeWidth="4" />
    <circle cx="12" cy="27" r="4.5" fill="#6366F1" />
    <circle cx="24" cy="24" r="4.5" fill="#6366F1" />
  </svg>
);

// 11. Cuerno de Unicornio Mágico (Unicorn Swirl)
export const UnicornIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Swirled Horn */}
    <polygon points="20,5 14,31 26,31" fill="#E879F9" stroke="#C026D3" strokeWidth="1.5" />
    <path d="M 15 25 Q 20 27 25 25" stroke="#FDE047" strokeWidth="2.5" />
    <path d="M 16.5 19 Q 20 21 23.5 19" stroke="#38BDF8" strokeWidth="2.5" />
    <path d="M 18 13 Q 20 15 22 13" stroke="#4ADE80" strokeWidth="2.5" />
    {/* Magic Sparkle */}
    <circle cx="11" cy="10" r="1.5" fill="#FDE047" />
    <circle cx="29" cy="14" r="1.5" fill="#FDE047" />
  </svg>
);

// 12. Corazón Tierno (Heart)
export const HeartIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path
      d="M 20 34 C 20 34 8 26 8 16 C 8 10 13 6 18 8 C 20 9 20 11 20 11 C 20 11 20 9 22 8 C 27 6 32 10 32 16 C 32 26 20 34 20 34 Z"
      fill="#FB7185"
    />
    <ellipse cx="14" cy="12" rx="2" ry="3.5" fill="#FFE4E6" transform="rotate(-30 14 12)" />
  </svg>
);

// Dado / Sorpresa (Dice / Mystery Box)
export const DiceIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <rect x="5" y="5" width="22" height="22" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
    <circle cx="11" cy="11" r="2.2" fill="#FFFFFF" />
    <circle cx="21" cy="11" r="2.2" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" />
    <circle cx="11" cy="21" r="2.2" fill="#FFFFFF" />
    <circle cx="21" cy="21" r="2.2" fill="#FFFFFF" />
  </svg>
);

// Campana de llamada (Ringing Bell)
export const BellIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path
      d="M 16 5 C 11 5 9 10 9 18 L 6 22 L 26 22 L 23 18 C 23 10 21 5 16 5 Z"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="2"
    />
    <circle cx="16" cy="25" r="3" fill="#D97706" />
    <path d="M 4 14 C 2 16 2 18 4 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 28 14 C 30 16 30 18 28 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Mini avatar icon for tray selector
export const MiniAnimalAvatar: React.FC<{ animalId: string; className?: string }> = ({
  animalId,
  className = "w-6 h-6",
}) => {
  switch (animalId) {
    case "leo":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="20" cy="20" r="18" fill="#F59E0B" />
          <circle cx="20" cy="20" r="12" fill="#FBBF24" />
          <circle cx="16" cy="18" r="2" fill="#451A03" />
          <circle cx="24" cy="18" r="2" fill="#451A03" />
          <polygon points="18,21 22,21 20,23" fill="#78350F" />
        </svg>
      );
    case "mimi":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <polygon points="10,16 6,5 18,10" fill="#F472B6" />
          <polygon points="30,16 34,5 22,10" fill="#F472B6" />
          <circle cx="20" cy="22" r="14" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2" />
          <circle cx="15" cy="20" r="2" fill="#831843" />
          <circle cx="25" cy="20" r="2" fill="#831843" />
          <polygon points="19,23 21,23 20,25" fill="#EC4899" />
        </svg>
      );
    case "toby":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <ellipse cx="8" cy="18" rx="4" ry="8" fill="#92400E" />
          <ellipse cx="32" cy="18" rx="4" ry="8" fill="#92400E" />
          <circle cx="20" cy="20" r="13" fill="#FBBF24" />
          <circle cx="16" cy="18" r="2" fill="#451A03" />
          <circle cx="24" cy="18" r="2" fill="#451A03" />
          <ellipse cx="20" cy="23" rx="4" ry="2.5" fill="#FEF3C7" />
          <ellipse cx="20" cy="22" rx="2" ry="1.5" fill="#1F2937" />
        </svg>
      );
    case "pepe":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="12" cy="12" r="6" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
          <circle cx="28" cy="12" r="6" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
          <ellipse cx="20" cy="22" rx="15" ry="12" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.5" fill="#064E3B" />
          <circle cx="28" cy="12" r="2.5" fill="#064E3B" />
          <path d="M 14 23 Q 20 27 26 23" stroke="#064E3B" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "pandi":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="9" cy="10" r="5" fill="#1F2937" />
          <circle cx="31" cy="10" r="5" fill="#1F2937" />
          <circle cx="20" cy="21" r="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
          <ellipse cx="14" cy="19" rx="3.5" ry="4.5" fill="#1F2937" transform="rotate(-15 14 19)" />
          <ellipse cx="26" cy="19" rx="3.5" ry="4.5" fill="#1F2937" transform="rotate(15 26 19)" />
          <ellipse cx="20" cy="24" rx="2" ry="1.2" fill="#1F2937" />
        </svg>
      );
    case "pio":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="20" cy="21" r="14" fill="#FDE047" stroke="#FACC15" strokeWidth="1.5" />
          <circle cx="15" cy="19" r="2" fill="#78350F" />
          <circle cx="25" cy="19" r="2" fill="#78350F" />
          <polygon points="18,22 22,22 20,26" fill="#F97316" />
        </svg>
      );
    case "bunny":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <ellipse cx="14" cy="9" rx="3" ry="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          <ellipse cx="26" cy="9" rx="3" ry="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          <circle cx="20" cy="22" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="15" cy="20" r="2" fill="#1E293B" />
          <circle cx="25" cy="20" r="2" fill="#1E293B" />
          <polygon points="19,23 21,23 20,25" fill="#F472B6" />
        </svg>
      );
    case "trompi":
    default:
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="8" cy="19" r="6" fill="#93C5FD" />
          <circle cx="32" cy="19" r="6" fill="#93C5FD" />
          <circle cx="20" cy="20" r="12" fill="#93C5FD" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="15" cy="18" r="2" fill="#1E3A8A" />
          <circle cx="25" cy="18" r="2" fill="#1E3A8A" />
          <path d="M 20 21 Q 19 26 21 28" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
};
