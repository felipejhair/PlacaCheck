"use server";

import prisma from "@/lib/prisma";

interface RsvpInput {
  slug: string;
  invitadoSlug?: string;
  nombre: string;
  asistira: boolean;
  acompanantes: number;
  mensaje?: string;
}

export async function createRsvp(data: RsvpInput) {
  try {
    if (!data.nombre.trim()) {
      return { success: false, error: "El nombre es obligatorio." };
    }

    const rsvp = await prisma.xvRsvp.create({
      data: {
        slug: data.slug,
        invitadoSlug: data.invitadoSlug ?? null,
        nombre: data.nombre.trim(),
        asistira: data.asistira,
        acompanantes: Math.max(0, data.acompanantes || 0),
        mensaje: data.mensaje?.trim() || null,
      },
    });

    return { success: true, rsvp };
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return { success: false, error: "No se pudo registrar tu confirmación." };
  }
}

export async function getRsvpStats(slug: string) {
  try {
    const confirmaciones = await prisma.xvRsvp.findMany({
      where: { slug },
      orderBy: { createdAt: "desc" },
    });

    const asistentes = confirmaciones.filter((c) => c.asistira);
    const totalPersonas = asistentes.reduce(
      (sum, c) => sum + 1 + c.acompanantes,
      0
    );

    return {
      totalConfirmados: asistentes.length,
      totalPersonas,
      mensajes: confirmaciones
        .filter((c) => c.mensaje)
        .map((c) => ({ nombre: c.nombre, mensaje: c.mensaje!, asistira: c.asistira })),
    };
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    return { totalConfirmados: 0, totalPersonas: 0, mensajes: [] };
  }
}

export async function getInvitadoRsvp(xvSlug: string, invitadoSlug: string) {
  try {
    const rsvp = await prisma.xvRsvp.findFirst({
      where: { slug: xvSlug, invitadoSlug },
      orderBy: { createdAt: "desc" },
    });
    if (!rsvp) return null;
    return {
      asistira: rsvp.asistira,
      acompanantes: rsvp.acompanantes,
      mensaje: rsvp.mensaje,
    };
  } catch (error) {
    console.error("Error fetching invitado RSVP:", error);
    return null;
  }
}
