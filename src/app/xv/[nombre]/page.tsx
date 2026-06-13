import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInvitacion, getSlugs } from "../invitaciones";
import { getRsvpStats } from "@/actions/xv-actions";
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

export default async function XvPage({
  params,
}: {
  params: { nombre: string };
}) {
  const invitacion = getInvitacion(params.nombre);

  if (!invitacion) {
    notFound();
  }

  const stats = await getRsvpStats(params.nombre.toLowerCase());

  return (
    <InvitationClient
      slug={params.nombre.toLowerCase()}
      invitacion={invitacion}
      initialStats={stats}
    />
  );
}
