// ============================================================================
//  CONFIGURACIÓN DEL CUMPLEAÑOS DE 1 AÑO DE LEONARDO (... Y FELIPE 31)
// ============================================================================

export interface RegaloSugerencia {
  titulo: string;
  detalle: string;
  icono: "clothes" | "toys" | "envelope" | "diapers";
  color: string;
  crayonColor: string;
}

export interface InvitadoCumple {
  slug: string;          // Ej: "abuelitos", "familia-perez", "padrinos"
  nombre: string;        // Nombre mostrado en la invitación
  pasesAdultos: number;  // Pases de adultos asignados
  pasesNinos: number;    // Pases de niños
  mensajePersonalizado?: string;
  isGeneric?: boolean;   // Si es true, el invitado puede escribir su nombre
}

export interface FotoRecuerdo {
  src: string;
  caption: string;
  doodleTag: string;
  rotation: string;
}

export interface CumpleConfig {
  festejado: {
    nombre: string;
    edad: number;
    subtitulo: string;
    lema: string;
    apodo: string;
    habilidades: string[];
  };
  papaColado: {
    nombre: string;
    edad: number;
    subtitulo: string;
    bromaCorta: string;
    habilidades: string[];
  };
  fechaISO: string;       // Formato ISO para la cuenta regresiva exacta: 2:00 PM
  fechaTexto: string;     // "1 de Noviembre de 2026"
  diaSemana: string;      // "Domingo"
  horarioTexto: string;   // "2:00 PM a 9:00 PM"
  lugar: {
    nombre: string;
    subtitulo: string;
    direccion: string;
    referencia?: string;
    mapsUrl: string;
    wazeUrl: string;
  };
  regalos: RegaloSugerencia[];
  fotos: FotoRecuerdo[];
  whatsappNumero: string; // Formato internacional ej: "528182602964"
  invitados: InvitadoCumple[];
}

export const CUMPLE_DATA: CumpleConfig = {
  festejado: {
    nombre: "Leonardo",
    edad: 1,
    subtitulo: "¡Mi Primer Añito!",
    lema: "El rey indiscutible de la fiesta, del pastel y de los corazones",
    apodo: "El Pequeño Gran Leo 🦁",
    habilidades: [
      "Gatear a velocidad supersónica hacia los cables",
      "Sonreír con 4 dientitos para conseguir lo que sea",
      "Experto catador de sobres de catsup 🥫",
      "Desarmar juguetes en 3 segundos planos",
    ],
  },
  papaColado: {
    nombre: "Felipe",
    edad: 31,
    subtitulo: "(El cumpleañero colado de honor)",
    bromaCorta: "El copiloto oficial, chofer y patrocinador que cumple 31 vueltas al sol 🎂",
    habilidades: [
      "Cargar la pañalera con una sola mano",
      "Armar juguetes sin instructivo y pedir perdón por no dormir",
      "Llorar de felicidad viendo reír a Leo",
      "Alcanzar las cosas de los estantes altos",
    ],
  },
  fechaISO: "2026-11-01T14:00:00", // Domingo 1 de Noviembre 2026, 2:00 PM
  fechaTexto: "1 de Noviembre de 2026",
  diaSemana: "Domingo",
  horarioTexto: "2:00 PM a 9:00 PM",
  lugar: {
    nombre: "Quinta Terraza Santa Rosa",
    subtitulo: "Palapa, jardín y alberca para disfrutar en familia",
    direccion: "Santa Rosa, Apodaca, N.L.",
    referencia: "Quinta Terraza Santa Rosa",
    mapsUrl: "https://maps.app.goo.gl/nhft8jJy4nzq1Fi17",
    wazeUrl: "https://waze.com/ul?q=Quinta+Terraza+Santa+Rosa",
  },
  regalos: [
    {
      titulo: "Ropita",
      detalle: "Talla: 18 meses",
      icono: "clothes",
      color: "from-sky-400 to-blue-500",
      crayonColor: "#38bdf8",
    },
    {
      titulo: "Pañales",
      detalle: "Solo Etapa 6",
      icono: "diapers",
      color: "from-emerald-400 to-teal-500",
      crayonColor: "#10b981",
    },
    {
      titulo: "Juguetes Didácticos",
      detalle: "Juguetes de estimulación, encajables o libros con sonidos (1 año)",
      icono: "toys",
      color: "from-amber-400 to-orange-500",
      crayonColor: "#f59e0b",
    },
    {
      titulo: "Lluvia de Sobres",
      detalle: "Si prefieres un detalle en sobre para el cochinito de Leo, ¡será muy bien recibido!",
      icono: "envelope",
      color: "from-pink-400 to-rose-500",
      crayonColor: "#ec4899",
    },
  ],
  fotos: [
    {
      src: "/Leo/leo4.JPG",
      caption: "Mamá, papá y Leo listos para la gran fiesta",
      doodleTag: "¡Familia Feliz! 💚",
      rotation: "-rotate-2",
    },
    {
      src: "/Leo/leo1.JPG",
      caption: "Risas mañaneras y complicidad con papá",
      doodleTag: "Risas 100% puras 😄",
      rotation: "rotate-2",
    },
    {
      src: "/Leo/leo5.JPG",
      caption: "Felipe (31) y Leo (1) con su botín de catsup",
      doodleTag: "Fan #1 de la catsup 🥫",
      rotation: "-rotate-1",
    },
    {
      src: "/Leo/leo3.JPG",
      caption: "Esos ojitos curiosos descubriendo el mundo",
      doodleTag: "Mirada tierna ✨",
      rotation: "rotate-3",
    },
    {
      src: "/Leo/leo2.JPG",
      caption: "La sonrisa más contagiosa del universo",
      doodleTag: "El rey Leo 👑",
      rotation: "-rotate-2",
    },
  ],
  whatsappNumero: "528124661526",
  invitados: [
    {
      slug: "familia-perez",
      nombre: "Familia Pérez",
      pasesAdultos: 3,
      pasesNinos: 2,
      mensajePersonalizado: "¡Los esperamos con mucho amor para consentir a Leo!",
    },
    {
      slug: "abuelitos",
      nombre: "Queridos Abuelitos",
      pasesAdultos: 2,
      pasesNinos: 0,
      mensajePersonalizado: "¡Su nieto Leo los espera en primera fila con una enorme sonrisa!",
    },
    {
      slug: "padrinos",
      nombre: "Padrinos de Leonardo",
      pasesAdultos: 2,
      pasesNinos: 1,
      mensajePersonalizado: "¡No puede faltar su bendición y alegría en este día tan especial!",
    },
    {
      slug: "amigos",
      nombre: "Queridos Amigos",
      pasesAdultos: 2,
      pasesNinos: 2,
      mensajePersonalizado: "¡Listos para una tarde llena de risas, juegos y pastel!",
    },
    {
      slug: "invitado",
      nombre: "Amigos y Familia",
      pasesAdultos: 2,
      pasesNinos: 1,
      isGeneric: true,
    },
  ],
};

export function getCumpleData(): CumpleConfig {
  return CUMPLE_DATA;
}

export function getInvitadoCumple(slug: string): InvitadoCumple | null {
  if (!slug) return null;
  const key = decodeURIComponent(slug).toLowerCase().trim();
  const found = CUMPLE_DATA.invitados.find((i) => i.slug.toLowerCase() === key);
  if (found) return found;

  const friendlyName = key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug: key,
    nombre: friendlyName,
    pasesAdultos: 2,
    pasesNinos: 1,
    isGeneric: true,
  };
}

export function getAllInvitadoSlugs(): string[] {
  return CUMPLE_DATA.invitados.map((i) => i.slug);
}
