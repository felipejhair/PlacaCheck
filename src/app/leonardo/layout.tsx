import type { Metadata } from "next";
import { Fredoka, Nunito, Patrick_Hand } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-doodle",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡Mi 1er Añito! · Leonardo 🦁🎈 (... y Felipe 31)",
  description:
    "Estás invitado a celebrar el 1er cumpleaños de Leonardo este 1 de Noviembre en Quinta Terraza Santa Rosa. ¡Acompáñanos a festejar!",
  openGraph: {
    title: "¡Mi 1er Añito! · Leonardo 🦁🎈 (... y Felipe 31)",
    description:
      "Acompáñanos a festejar el primer año de Leonardo el Domingo 1 de Noviembre en Quinta Terraza Santa Rosa.",
  },
};

export default function LeonardoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fredoka.variable} ${patrickHand.variable} ${nunito.variable} font-friendly light min-h-screen bg-[#FFFDF7] text-stone-800 selection:bg-amber-300 selection:text-stone-900`}
      style={{ colorScheme: "light" }}
    >
      {children}
    </div>
  );
}
