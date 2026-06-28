import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInvitacion, getSlugs } from "../invitaciones";
import InvitationClient from "./invitation-client";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getSlugs().map((nombre) => ({ nombre }));
}

export async function generateMetadata({
  params,
}: {
  params: { nombre: string };
}): Promise<Metadata> {
  const invitacion = getInvitacion(params.nombre);
  if (!invitacion) return { title: "Invitación no encontrada" };

  return {
    title: `Mis XV Años · ${invitacion.nombre}`,
    description: `Te invito a celebrar mis XV años. ${invitacion.fechaTexto}.`,
  };
}

export default function XvPage({
  params,
}: {
  params: { nombre: string };
}) {
  const invitacion = getInvitacion(params.nombre);

  if (!invitacion) {
    notFound();
  }

  return (
    <InvitationClient
      slug={params.nombre.toLowerCase()}
      invitacion={invitacion}
    />
  );
}
