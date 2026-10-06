import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#7dd3fc",
};

export const metadata: Metadata = {
  title: "Teléfono de Animalitos · Modo Bebé",
  description: "Teléfono interactivo para bebés con botones grandes, llamadas mágicas y voces tiernas tipo Animal Crossing.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function BebeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-sky-200 select-none overflow-x-hidden touch-manipulation">
      {children}
    </div>
  );
}
