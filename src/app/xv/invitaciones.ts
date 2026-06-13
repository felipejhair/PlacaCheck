// ============================================================================
//  CONFIGURACIÓN DE INVITACIONES DE XV AÑOS
// ----------------------------------------------------------------------------
//  Cada entrada de este objeto genera una invitación en /xv/<slug>.
//  Por ejemplo, la entrada "sofia" se ve en /xv/sofia
//
//  Para crear una nueva invitación, copia el bloque de ejemplo y cambia los
//  datos. Las imágenes de la galería y la música deben colocarse en /public.
// ============================================================================

export interface Lugar {
  titulo: string; // Ej: "Misa de Acción de Gracias" o "Recepción"
  lugar: string; // Nombre del sitio
  direccion?: string; // Dirección escrita (opcional)
  hora: string; // Ej: "7:00 PM"
  mapsUrl?: string; // Enlace a Google Maps (opcional)
}

export interface XvInvitacion {
  nombre: string; // Nombre de la festejada
  fraseInicial?: string; // Frase corta sobre el héroe (ej: "Mis XV Años")
  fechaISO: string; // Fecha y hora EXACTA para la cuenta regresiva (formato ISO local)
  fechaTexto: string; // Fecha mostrada al invitado
  ceremonia?: Lugar; // Misa o ceremonia (opcional)
  recepcion: Lugar; // Recepción / fiesta
  dressCode?: string; // Código de vestimenta
  versiculo?: string; // Frase o versículo decorativo
  padres?: string[]; // Nombres de los padres
  padrinos?: string[]; // Nombres de los padrinos
  heroImg?: string; // Foto de fondo del encabezado (opcional)
  retratoImg?: string; // Retrato junto al versículo (opcional)
  interludios?: { img: string; texto?: string }[]; // Fotos a pantalla completa entre secciones
  galeria: string[]; // Rutas de imágenes en /public (ej: "/xv/sofia/1.jpg")
  musicaUrl?: string; // Ruta de la canción en /public (ej: "/xv/sofia/cancion.mp3")
}

export const INVITACIONES: Record<string, XvInvitacion> = {
  // ----- Invitación: /xv/arianne -----
  arianne: {
    nombre: "Arianne",
    fechaISO: "2026-07-16T17:00:00", // 16 de julio 2026, hora de la misa
    fechaTexto: "16 de Julio de 2026",
    versiculo:
      "Hoy doy gracias a Dios y a mis padres por estos quince años de vida, y por compartir conmigo este día tan especial.",
    ceremonia: {
      titulo: "Misa",
      lugar: "Parroquia La Sagrada Familia",
      hora: "5:00 PM",
      mapsUrl: "https://share.google/dn4zvpHl2GHbReCm2",
    },
    recepcion: {
      titulo: "Recepción",
      lugar: "Quintas Portal Paradise",
      hora: "A partir de las 8:00 PM",
      mapsUrl: "https://maps.app.goo.gl/Fm8AMrEJYTTSZPe5A",
    },
    padres: ["Pablo Russell Ayala", "Ariadna Rendón Rojas"],
    heroImg: "/xv/arianne/1.jpg",
    retratoImg: "/xv/arianne/7.jpg",
    interludios: [
      { img: "/xv/arianne/4.jpg" },
      { img: "/xv/arianne/6.jpg" },
    ],
    galeria: [
      "/xv/arianne/1.jpg",
      "/xv/arianne/2.jpg",
      "/xv/arianne/3.jpg",
      "/xv/arianne/5.jpg",
      "/xv/arianne/7.jpg",
      "/xv/arianne/8.jpg",
    ],
    musicaUrl: "/xv/arianne/TY.mp3",
  },
};

export function getInvitacion(slug: string): XvInvitacion | null {
  const key = decodeURIComponent(slug).toLowerCase();
  return INVITACIONES[key] ?? null;
}

export function getSlugs(): string[] {
  return Object.keys(INVITACIONES);
}
