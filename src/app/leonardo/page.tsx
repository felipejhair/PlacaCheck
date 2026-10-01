import type { Metadata } from "next";
import { getCumpleData, getInvitadoCumple } from "./cumple-data";
import CumpleClient from "./cumple-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { para?: string };
}): Promise<Metadata> {
  const data = getCumpleData();
  const para = searchParams.para ? ` · Para ${searchParams.para}` : "";

  return {
    title: `¡Mi 1er Añito! · ${data.festejado.nombre}${para} 🦁🎈 (... y Felipe 31)`,
    description: `Estás invitado al 1er cumpleaños de ${data.festejado.nombre} en Quinta Terraza Santa Rosa este ${data.fechaTexto} de 2:00 PM a 9:00 PM. ¡Acompáñanos a celebrar!`,
    openGraph: {
      title: `¡Mi 1er Añito! · ${data.festejado.nombre}${para} 🦁🎈 (... y Felipe 31)`,
      description: `Te invitamos a festejar el primer año de ${data.festejado.nombre} en Quinta Terraza Santa Rosa este ${data.fechaTexto}.`,
    },
  };
}

export default function LeonardoPage({
  searchParams,
}: {
  searchParams: { para?: string };
}) {
  const data = getCumpleData();
  const invitado = searchParams.para
    ? getInvitadoCumple(searchParams.para)
    : null;

  return <CumpleClient data={data} invitado={invitado} />;
}
