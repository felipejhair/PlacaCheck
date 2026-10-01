import type { Metadata } from "next";
import {
  getCumpleData,
  getInvitadoCumple,
  getAllInvitadoSlugs,
} from "../cumple-data";
import CumpleClient from "../cumple-client";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllInvitadoSlugs().map((invitado) => ({ invitado }));
}

export async function generateMetadata({
  params,
}: {
  params: { invitado: string };
}): Promise<Metadata> {
  const data = getCumpleData();
  const invitado = getInvitadoCumple(params.invitado);
  const para = invitado ? ` · ${invitado.nombre}` : "";

  return {
    title: `¡Mi 1er Añito! · ${data.festejado.nombre}${para} 🦁🎈 (... y Felipe 31)`,
    description: `Estás cordialmente invitado a celebrar el primer año de ${data.festejado.nombre} en Quinta Terraza Santa Rosa este ${data.fechaTexto} de 2:00 PM a 9:00 PM.`,
    openGraph: {
      title: `¡Mi 1er Añito! · ${data.festejado.nombre}${para} 🦁🎈 (... y Felipe 31)`,
      description: `Invitación especial para ${invitado?.nombre ?? "ti"}. ¡Te esperamos el ${data.fechaTexto} en Quinta Terraza Santa Rosa!`,
    },
  };
}

export default function LeonardoInvitadoPage({
  params,
}: {
  params: { invitado: string };
}) {
  const data = getCumpleData();
  const invitado = getInvitadoCumple(params.invitado);

  return <CumpleClient data={data} invitado={invitado} />;
}
