import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif-elegant",
  display: "swap",
});

export default function XvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${greatVibes.variable} ${cormorant.variable}`}>
      {children}
    </div>
  );
}
