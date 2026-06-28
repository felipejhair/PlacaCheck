// ============================================================================
//  CONFIGURACIÓN DE INVITACIONES DE XV AÑOS
// ----------------------------------------------------------------------------
//  Cada entrada de este objeto genera una invitación en /xv/<slug>.
//  Las invitaciones personalizadas por grupo viven en /xv/<slug>/<invitado>.
//
//  Para agregar invitados, edita el array `invitados` dentro de cada entrada.
// ============================================================================

export interface Lugar {
  titulo: string; // Ej: "Misa de Acción de Gracias" o "Recepción"
  lugar: string; // Nombre del sitio
  direccion?: string; // Dirección escrita (opcional)
  hora: string; // Ej: "7:00 PM"
  mapsUrl?: string; // Enlace a Google Maps (opcional)
}

export interface XvInvitado {
  slug: string;   // URL-friendly: sin acentos, minúsculas, guiones (ej: "lorenzo-rendon")
  nombre: string; // Nombre completo para mostrar (ej: "Fam. Lorenzo Rendón")
  limite: number; // Total de personas incluyendo al titular
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
  regalo?: string[]; // Tipos de regalo aceptados (ej: ["Regalo", "Sobre"])
  whatsappNumero?: string; // Número de WhatsApp para confirmaciones (formato: 521XXXXXXXXXX)
  invitados?: XvInvitado[]; // Lista de grupos/familias invitadas con su cupo
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
      mapsUrl: "https://maps.app.goo.gl/YGwsjQB3pTWPu4LHA",
    },
    recepcion: {
      titulo: "Recepción",
      lugar: "Quintas Portal Paradise",
      hora: "A partir de las 8:00 PM",
      mapsUrl: "https://maps.app.goo.gl/Fm8AMrEJYTTSZPe5A",
    },
    dressCode: "Negro Elegante",
    regalo: ["Regalo", "Sobre"],
    whatsappNumero: "528182602964",
    padres: ["Pablo Russell Ayala", "Ariadna Rendón Rojas"],
    heroImg: "/xv/arianne/XV1.jpg",
    retratoImg: "/xv/arianne/XV9.jpg",
    interludios: [
      { img: "/xv/arianne/XV5.jpg" },
      { img: "/xv/arianne/XV6.jpg" },
    ],
    galeria: [
      "/xv/arianne/XV2.jpg",
      "/xv/arianne/XV3.jpg",
      "/xv/arianne/XV4.jpg",
      "/xv/arianne/XV7.jpg",
      "/xv/arianne/XV8.jpg",
    ],
    musicaUrl: "/xv/arianne/TY.mp3",
    invitados: [
      { slug: "lorenzo-rendon",      nombre: "Fam. Lorenzo Rendón",        limite: 4 },
      { slug: "salinas-rendon",      nombre: "Fam. Salinas Rendón",         limite: 4 },
      { slug: "hernandez-escamilla", nombre: "Fam. Hernández Escamilla",    limite: 6 },
      { slug: "yair-hernandez",      nombre: "Yair Hernández Escamilla",    limite: 2 },
      { slug: "ozorio-rojas",        nombre: "Fam. Ozorio Rojas",           limite: 3 },
      { slug: "rojas-hernandez",     nombre: "Fam. Rojas Hernández",        limite: 2 },
      { slug: "cantu-rojas",         nombre: "Fam. Cantú Rojas",            limite: 5 },
      { slug: "rios-rojas",          nombre: "Fam. Ríos Rojas",             limite: 4 },
      { slug: "antonio-ramirez",     nombre: "Antonio Ramírez Rojas",       limite: 3 },
      { slug: "perez-mendoza",       nombre: "Fam. Pérez Mendoza",          limite: 2 },
      { slug: "castillo-baez",       nombre: "Fam. Castillo Báez",          limite: 5 },
      { slug: "pina-jaramillo",      nombre: "Fam. Piña Jaramillo",         limite: 2 },
      { slug: "zapata-rodriguez",    nombre: "Fam. Zapata Rodríguez",       limite: 2 },
      { slug: "carlos-rodriguez",    nombre: "Sr. Carlos Rodríguez Moreno", limite: 1 },
      { slug: "julian-rojas",        nombre: "Sr. Julián Rojas García",     limite: 2 },
      { slug: "melchor-rojas",       nombre: "Sr. Melchor Rojas García",    limite: 1 },
      { slug: "reyna-russell",       nombre: "Reyna Russell Ayala",         limite: 2 },
      { slug: "russell-santos-1",    nombre: "Fam. Russell Santos",         limite: 4 },
      { slug: "russell-santos-2",    nombre: "Fam. Russell Santos",         limite: 4 },
      { slug: "navarro-tellez",      nombre: "Fam. Navarro Téllez",         limite: 4 },
      { slug: "castanedo-mendoza",   nombre: "Fam. Castañedo Mendoza",      limite: 2 },
      { slug: "soto-torres",         nombre: "Fam. Soto Torres",            limite: 5 },
      { slug: "ferrero-romero",      nombre: "Fam. Ferrero Romero",         limite: 3 },
      { slug: "osoria-ballesteros",  nombre: "Fam. Osoria Ballesteros",     limite: 2 },
      { slug: "lopez-ornelas",       nombre: "Fam. López Ornelas",          limite: 4 },
      { slug: "martinez-arredondo",  nombre: "Fam. Martínez Arredondo",     limite: 2 },
      { slug: "pina-gonzalez",       nombre: "Fam. Piña González",          limite: 3 },
      { slug: "garza-zertuche",      nombre: "Fam. Garza Zertuche",         limite: 4 },
      { slug: "ugalde-quiroga",      nombre: "Fam. Ugalde Quiroga",         limite: 4 },
      { slug: "garza-villarreal",    nombre: "Fam. Garza Villarreal",       limite: 3 },
      { slug: "molar-perez",         nombre: "Fam. Molar Pérez",            limite: 5 },
      { slug: "dagoberto-moron",     nombre: "Dagoberto Morón",             limite: 2 },
      { slug: "juan-moron",          nombre: "Juan Morón",                  limite: 2 },
      { slug: "mancha-lara",         nombre: "Fam. Mancha Lara",            limite: 8 },
    ],
  },
};

export function getInvitacion(slug: string): XvInvitacion | null {
  const key = decodeURIComponent(slug).toLowerCase();
  return INVITACIONES[key] ?? null;
}

export function getSlugs(): string[] {
  return Object.keys(INVITACIONES);
}

export function getInvitado(xvSlug: string, invitadoSlug: string): XvInvitado | null {
  const inv = getInvitacion(xvSlug);
  if (!inv?.invitados) return null;
  const key = decodeURIComponent(invitadoSlug).toLowerCase();
  return inv.invitados.find((i) => i.slug === key) ?? null;
}

export function getInvitadoSlugs(xvSlug: string): string[] {
  const inv = getInvitacion(xvSlug);
  return inv?.invitados?.map((i) => i.slug) ?? [];
}
