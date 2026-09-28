// ============================================================================
//  CONFIGURACIÓN DEL CUMPLEAÑOS DE 1 AÑO DE LEONARDO
// ----------------------------------------------------------------------------
//  Aquí se concentran todos los datos del evento para que puedas modificarlos
//  fácilmente (horario, salón, dirección, regalos, teléfono de WhatsApp, etc.)
// ============================================================================

export interface ItinerarioItem {
  hora: string;
  titulo: string;
  descripcion: string;
  icono: "welcome" | "games" | "pinata" | "cake" | "farewell";
}

export interface RegaloSugerencia {
  titulo: string;
  detalle: string;
  icono: "clothes" | "toys" | "envelope" | "diapers";
  color: string;
}

export interface InvitadoCumple {
  slug: string;          // Ej: "abuelitos", "familia-perez", "padrinos"
  nombre: string;        // Nombre mostrado en la invitación
  pasesAdultos: number;  // Pases de adultos asignados
  pasesNinos: number;    // Pases de niños
  mensajePersonalizado?: string;
  isGeneric?: boolean;   // Si es true, el invitado puede escribir su nombre
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
    edadAprox: string;
    subtitulo: string;
    bromaCorta: string;
    bromaLarga: string;
    notaChistosa: string;
    habilidades: string[];
  };
  fechaISO: string;       // Formato ISO para la cuenta regresiva exacta
  fechaTexto: string;     // Para mostrar con cariño
  diaSemana: string;      // "Domingo"
  horarioTexto: string;   // "3:00 PM a 8:00 PM"
  lugar: {
    nombre: string;
    subtitulo: string;
    direccion: string;
    referencia?: string;
    mapsUrl: string;
    wazeUrl: string;
  };
  vestimenta: {
    tipo: string;
    descripcion: string;
    notaPeques: string;
  };
  itinerario: ItinerarioItem[];
  regalos: RegaloSugerencia[];
  whatsappNumero: string; // Formato internacional ej: "528182602964"
  invitados: InvitadoCumple[];
}

export const CUMPLE_DATA: CumpleConfig = {
  festejado: {
    nombre: "Leonardo",
    edad: 1,
    subtitulo: "¡Mi Primer Añito de Aventuras!",
    lema: "El rey indiscutible de la fiesta, del pastel y de los corazones",
    apodo: "El Pequeño Gran Leo 🦁",
    habilidades: [
      "Gatear a velocidad supersónica hacia los cables",
      "Sonreír con 4 dientitos para conseguir lo que sea",
      "Aplaudir cuando escucha música",
      "Probar absolutamente todo lo que caiga al suelo",
    ],
  },
  papaColado: {
    nombre: "Felipe",
    edadAprox: "+3X vueltas al sol",
    subtitulo: "(El cumpleañero colado de honor 🤫)",
    bromaCorta: "P.D. También cumple papá Felipe, pero hoy nadie vino por él 😂",
    bromaLarga:
      "Sí, papá también cumple años el mismo día... pero aceptémoslo: él ya no tiene piñata, ya no cabe en el brincolín y su único regalo es que Leo no llore a la hora del pastel.",
    notaChistosa:
      "Felicitar a Felipe en voz baja para no opacar al cumpleañero estrella 🎂",
    habilidades: [
      "Cargar la pañalera con estilo",
      "Sobrevivir con 4 horas de sueño y café",
      "Pagar las cuentas y armar juguetes sin leer el manual",
      "Comerse las orillas del pastel que nadie quiso",
    ],
  },
  fechaISO: "2026-11-01T15:00:00", // Domingo 1 de Noviembre 2026, 3:00 PM
  fechaTexto: "1 de Noviembre de 2026",
  diaSemana: "Domingo",
  horarioTexto: "3:00 PM a 8:00 PM",
  lugar: {
    nombre: "Salón Infantil Mágico",
    subtitulo: "Juegos, brincolines y área techada para todas las edades",
    direccion: "Av. Las Américas 123, Apodaca, N.L.",
    referencia: "Frente al parque principal, con amplio estacionamiento",
    mapsUrl: "https://maps.google.com/?q=Apodaca+Nuevo+Leon",
    wazeUrl: "https://waze.com/ul?q=Apodaca+Nuevo+Leon",
  },
  vestimenta: {
    tipo: "Casual y divertida",
    descripcion:
      "Ven con ropa fresca y cómoda para jugar, correr y bailar.",
    notaPeques: "¡Muy importante! Traer calcetines para los brincolines y área de juegos.",
  },
  itinerario: [
    {
      hora: "3:00 PM",
      titulo: "Bienvenida y fotos con Leo",
      descripcion: "Llegada de los invitados, recepción y primera sesión de fotos con el rey de la fiesta.",
      icono: "welcome",
    },
    {
      hora: "4:00 PM",
      titulo: "¡A jugar sin parar!",
      descripcion: "Área de brincolines, alberca de pelotas, dinámicas y juegos para peques y grandes.",
      icono: "games",
    },
    {
      hora: "5:30 PM",
      titulo: "La Gran Piñata de Leonardo",
      descripcion: "¡Dale, dale, dale! Lluvia de dulces y juguetes para todos los niños.",
      icono: "pinata",
    },
    {
      hora: "6:30 PM",
      titulo: "Las Mañanitas y Pastel",
      descripcion:
        "Le cantamos a Leonardo con su primera velita... (y 5 segundos de aplausos para Felipe si se porta bien 🎂).",
      icono: "cake",
    },
    {
      hora: "7:30 PM",
      titulo: "Sorpresas, bolsitas y abrazos",
      descripcion: "Entrega de dulceros, recuerdos y agradecimiento por acompañarnos en este día tan especial.",
      icono: "farewell",
    },
  ],
  regalos: [
    {
      titulo: "Ropita y Calzado",
      detalle: "Talla de ropa: 12-18 meses · Calzado: 12-13 MX",
      icono: "clothes",
      color: "from-sky-400 to-blue-500",
    },
    {
      titulo: "Juguetes Didácticos",
      detalle: "Juguetes sensoriales, bloques suaves, libros musicales (etapa 1+)",
      icono: "toys",
      color: "from-amber-400 to-orange-500",
    },
    {
      titulo: "Pañales y Cuidado",
      detalle: "Pañales etapa 4 o 5, toallitas húmedas hipoalergénicas",
      icono: "diapers",
      color: "from-emerald-400 to-teal-500",
    },
    {
      titulo: "Lluvia de Sobres",
      detalle: "Si prefieres un detalle en sobre para el cochinito de Leo, ¡será muy bien recibido!",
      icono: "envelope",
      color: "from-pink-400 to-rose-500",
    },
  ],
  whatsappNumero: "528182602964",
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

  // Si no coincide con ninguno predefinido, creamos uno genérico con el nombre deducido
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
