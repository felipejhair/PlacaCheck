export interface AnimalFriend {
  id: string;
  name: string;
  species: string;
  title: string;
  bgColor: string;
  accentColor: string;
  borderColor: string;
  voice: {
    pitchMultiplier: number;
    speedMultiplier: number;
    timbre: "triangle" | "sawtooth" | "square";
  };
  messages: string[];
}

export const ANIMAL_FRIENDS: AnimalFriend[] = [
  {
    id: "leo",
    name: "Leo",
    species: "Leoncito",
    title: "El rey de la selva",
    bgColor: "from-amber-400 via-orange-400 to-yellow-300",
    accentColor: "#F59E0B",
    borderColor: "#D97706",
    voice: {
      pitchMultiplier: 0.95,
      speedMultiplier: 70,
      timbre: "triangle",
    },
    messages: [
      "¡Hola campeón! ¡Soy Leo el leoncito! ¡Grrr! ¡Qué lindo que me llamaste!",
      "¡Grrr rugidito cariñoso! ¡Tienes una sonrisa hermosa hoy! ¡Te mando un abrazo bien fuerte!",
      "¡Hola amiguito! ¡Mira cómo sacudo mi melena dorada! ¡Vamos a jugar juntos!",
      "¡Waaa! ¡Qué alegría escuchar tu llamada! ¡Eres el niño más valiente y lindo del mundo!",
    ],
  },
  {
    id: "mimi",
    name: "Mimi",
    species: "Gatita",
    title: "La gatita juguetona",
    bgColor: "from-pink-400 via-rose-300 to-fuchsia-300",
    accentColor: "#EC4899",
    borderColor: "#DB2777",
    voice: {
      pitchMultiplier: 1.45,
      speedMultiplier: 62,
      timbre: "triangle",
    },
    messages: [
      "¡Miau, miau! ¡Hola corazón! ¿Estás jugando con tu teléfono? ¡Qué divertido! ¡Purrr!",
      "¡Miau! ¡Te mando muchos besitos con bigotes! ¡Mua, mua! ¡Miau!",
      "¡Purrr! ¡Estaba jugando con una bola de estambre rosa! ¡Eres mi amiguito favorito!",
      "¡Miau miau miau! ¡Mira mis orejitas como se mueven! ¡Te quiero mucho!",
    ],
  },
  {
    id: "toby",
    name: "Toby",
    species: "Perrito",
    title: "El perrito alegre",
    bgColor: "from-sky-400 via-blue-400 to-indigo-300",
    accentColor: "#0284C7",
    borderColor: "#0369A1",
    voice: {
      pitchMultiplier: 1.15,
      speedMultiplier: 64,
      timbre: "triangle",
    },
    messages: [
      "¡Guau, guau! ¡Hola amigo! ¡Muevo mi colita de felicidad por tu llamada!",
      "¡Guau! ¿Vamos a correr por el jardín y buscar la pelota roja? ¡Boing, boing!",
      "¡Guau, guau! ¡Te mando un lengüetazo con mucho cariño! ¡Eres súper genial!",
      "¡Woof! ¡Qué bonito tocas los botones de colores! ¡Toca más y volvamos a hablar!",
    ],
  },
  {
    id: "pepe",
    name: "Pepe",
    species: "Ranita",
    title: "La ranita saltarina",
    bgColor: "from-emerald-400 via-green-400 to-teal-300",
    accentColor: "#10B981",
    borderColor: "#059669",
    voice: {
      pitchMultiplier: 0.9,
      speedMultiplier: 65,
      timbre: "sawtooth",
    },
    messages: [
      "¡Croac, croac! ¡Hola pequeñito! ¡Mira cómo salto por las hojas gigantes! ¡Boing!",
      "¡Croac! ¿Te gustan los charquitos de agua? ¡A chapotear con las manitas!",
      "¡Croac, croac! ¡Atrapé una estrellita brillante y mágica para ti! ¡Wiiii!",
      "¡Boing, boing! ¡Salto alto, salto bajo, croac croac! ¡Qué risa me das!",
    ],
  },
  {
    id: "pandi",
    name: "Pandi",
    species: "Osito Panda",
    title: "El osito pachoncito",
    bgColor: "from-violet-400 via-purple-300 to-pink-300",
    accentColor: "#8B5CF6",
    borderColor: "#7C3AED",
    voice: {
      pitchMultiplier: 1.05,
      speedMultiplier: 72,
      timbre: "triangle",
    },
    messages: [
      "¡Hola pequeñito! ¡Mmm qué rico bambú! ¡Te mando un abrazo suavecito de oso!",
      "¡Hola corazón! ¡Qué risita tan linda tienes! ¡Vamos a rodar como pelotitas!",
      "¡Aaaay qué pachoncito me siento hoy! ¡Tú y yo somos grandes amigos!",
      "¡Te quiero un montón! ¡Te mando estrellas y corazones voladores!",
    ],
  },
  {
    id: "pio",
    name: "Pío",
    species: "Pollito",
    title: "El pollito cantor",
    bgColor: "from-yellow-300 via-amber-300 to-orange-300",
    accentColor: "#EAB308",
    borderColor: "#CA8A04",
    voice: {
      pitchMultiplier: 1.6,
      speedMultiplier: 58,
      timbre: "triangle",
    },
    messages: [
      "¡Pío, pío, pío! ¡Hola! ¡Mira mis alitas pequeñitas, aletean de pura alegría!",
      "¡Pío, pío! ¡El sol brilla bien bonito! ¡Sonríe grandote para mí!",
      "¡Pío! ¡Qué sonido tan divertido haces con los botones! ¡Pío pío pío!",
      "¡Canta conmigo! ¡Pío, pío, pa, pa! ¡Eres un sol!",
    ],
  },
  {
    id: "bunny",
    name: "Bunny",
    species: "Conejito",
    title: "El conejito saltarín",
    bgColor: "from-teal-300 via-cyan-300 to-sky-300",
    accentColor: "#14B8A6",
    borderColor: "#0D9488",
    voice: {
      pitchMultiplier: 1.35,
      speedMultiplier: 62,
      timbre: "triangle",
    },
    messages: [
      "¡Hola amiguito! ¡Muevo mi naricita y mis orejotas! ¡Boing, boing!",
      "¡Ñam ñam! ¡Comiendo una zanahoria rica! ¿Me das una sonrisa bonita?",
      "¡Salto a la derecha, salto a la izquierda! ¡Qué rápido tecleaste para llamarme!",
      "¡Boing! ¡Te regalo flores de mil colores! ¡Eres el bebé más precioso!",
    ],
  },
  {
    id: "trompi",
    name: "Trompi",
    species: "Elefantito",
    title: "El elefantito azul",
    bgColor: "from-blue-300 via-indigo-300 to-purple-300",
    accentColor: "#3B82F6",
    borderColor: "#2563EB",
    voice: {
      pitchMultiplier: 0.85,
      speedMultiplier: 74,
      timbre: "sawtooth",
    },
    messages: [
      "¡Fuuu! ¡Hola pequeñito! ¡Con mi trompita te tiro pompas de jabón brillantes!",
      "¡Fuuu! ¡Mira mis orejotas gigantes, sirven para escucharte con mucho amor!",
      "¡Hola campeón! ¡Paso a pasito, retumba la diversión con Trompi!",
      "¡Qué divertido es hablar por teléfono contigo! ¡Un besito con trompa!",
    ],
  },
];

export function getRandomAnimal(): AnimalFriend {
  const randomIndex = Math.floor(Math.random() * ANIMAL_FRIENDS.length);
  return ANIMAL_FRIENDS[randomIndex];
}

export function getRandomMessage(animal: AnimalFriend): string {
  const randomIndex = Math.floor(Math.random() * animal.messages.length);
  return animal.messages[randomIndex];
}
