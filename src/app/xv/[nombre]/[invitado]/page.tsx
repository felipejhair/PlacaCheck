import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInvitacion, getInvitado, getInvitadoSlugs } from "../../invitaciones";
import InvitationClient from "../invitation-client";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const params: { nombre: string; invitado: string }[] = [];
  const xvSlugs = ["arianne"];
  for (const nombre of xvSlugs) {
    for (const invitado of getInvitadoSlugs(nombre)) {
      params.push({ nombre, invitado });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { nombre: string; invitado: string };
}): Promise<Metadata> {
  const invitacion = getInvitacion(params.nombre);
  if (!invitacion) return { title: "Invitación no encontrada" };

  const invitadoData = getInvitado(params.nombre, params.invitado);
  const para = invitadoData ? ` · ${invitadoData.nombre}` : "";

  return {
    title: `Mis XV Años · ${invitacion.nombre}${para}`,
    description: `Te invito a celebrar mis XV años. ${invitacion.fechaTexto}.`,
  };
}

export default function XvInvitadoPage({
  params,
}: {
  params: { nombre: string; invitado: string };
}) {
  const invitacion = getInvitacion(params.nombre);
  if (!invitacion) notFound();

  const invitadoData = getInvitado(params.nombre, params.invitado);
  if (!invitadoData) notFound();

  return (
    <InvitationClient
      slug={params.nombre.toLowerCase()}
      invitacion={invitacion}
      invitado={invitadoData}
    />
  );
}
