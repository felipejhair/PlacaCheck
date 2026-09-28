import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡Mi 1er Añito! · Leonardo 🦁🎈",
  description:
    "Estás invitado a celebrar el 1er cumpleaños de Leonardo este 1 de Noviembre. ¡Habrá juegos, piñata, pastel y muchas sonrisas! (Y pastelito para papá Felipe también)",
  openGraph: {
    title: "¡Mi 1er Añito! · Leonardo 🦁🎈",
    description:
      "Acompáñanos a festejar el primer año de Leonardo el Domingo 1 de Noviembre.",
  },
};

export default function LeonardoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fredoka.variable} ${nunito.variable} font-friendly light min-h-screen bg-[#FFFDF7] text-stone-800 selection:bg-amber-300 selection:text-stone-900`}
      style={{ colorScheme: "light" }}
    >
      {children}
    </div>
  );
}
