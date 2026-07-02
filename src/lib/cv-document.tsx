import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

export type CvLang = "es" | "en";

// ─── palette ─────────────────────────────────────────────────────────────────
const C = {
  navy:    "#0f172a",
  blue:    "#2563eb",
  blueL:   "#eff6ff",
  blueMid: "#bfdbfe",
  violet:  "#7c3aed",
  violetL: "#f3f0ff",
  text:    "#1e293b",
  muted:   "#64748b",
  rule:    "#e2e8f0",
  white:   "#ffffff",
  bg:      "#f8fafc",
};

// ─── i18n ─────────────────────────────────────────────────────────────────────
const T = {
  es: {
    title:       "Ingeniero de Software Full Stack",
    available:   "Disponible para nuevas oportunidades",
    aboutLabel:  "Sobre mí",
    aboutText:   "Profesional enfocado en absorber toda la experiencia posible para seguir creciendo dentro de la industria. Con una trayectoria de sólidas bases, busco nuevos retos que me brinden beneficios profesionales y económicos. Me apasiona la innovación tecnológica y la colaboración en equipo.",
    expLabel:    "Experiencia Profesional",
    skillsLabel: "Habilidades Técnicas",
    toolsLabel:  "Herramientas y Metodologías",
    eduLabel:    "Educación",
    langLabel:   "Idiomas",
    yrs:         "años",
    native:      "Nativo",
    inter:       "Intermedio",
    present:     "Presente",
    roles: {
      chubb:   "Source System Engineer",
      vitek:   "Programador Full Stack",
      chemi:   "Ingeniero de Software → Head of Innovation",
      dmx:     "Líder de Soporte de Aplicaciones",
    },
    periods: {
      chubb:   "Nov 2024 – Presente",
      vitek:   "May 2023 – Nov 2024",
      chemi:   "Feb 2019 – May 2023",
      dmx:     "Ago 2022 – Mar 2023",
    },
    bullets: {
      chubb: [
        "Mantenimiento de sistemas de gestión de seguros vehiculares.",
        "Migración de servicios legacy a APIs en .NET.",
        "Desarrollo de nueva plataforma de endosos en Angular.",
        "Pipelines CI/CD con Jenkins, Kubernetes y Azure DevOps.",
        "Uso de Claude Code y Gemini Code para acelerar desarrollo y aumentar productividad.",
      ],
      vitek: [
        "Análisis de requerimientos y propuestas de solución.",
        "Visitas al centro de distribución de HEB para análisis de procesos.",
        "Mantenimiento de sistemas administrativos y contacto con usuarios.",
      ],
      chemi: [
        "E-commerce en .NET Core (chemistore.com).",
        "App móvil iOS/Android en Xamarin publicada en tiendas.",
        "Integraciones: DHL, Estafeta, Google Ads, Firebase, Dialogflow.",
        "Mantenimiento de sistema en Ruby on Rails y Vue.js.",
      ],
      dmx: [
        "APIs REST/SOAP y consumo de servicios IIS.",
        "Modelado de BD SQL Server: SPs, scripts y Jobs programados.",
        "Soporte 2° nivel y nuevos proyectos web en .NET Core.",
      ],
    },
    edu: [
      { degree: "Ingeniero en Tecnología de Software",  inst: "UANL",          period: "2013 – 2018" },
      { degree: "Bachillerato General",                  inst: "Prep. N°1 UANL", period: "2011 – 2013" },
    ],
  },
  en: {
    title:       "Full Stack Software Engineer",
    available:   "Open to new opportunities",
    aboutLabel:  "About me",
    aboutText:   "Focused professional seeking to absorb all possible experience to keep growing within the industry. With a career built on solid foundations, I look for new challenges that provide both professional and economic growth. I am passionate about technological innovation and team collaboration.",
    expLabel:    "Professional Experience",
    skillsLabel: "Technical Skills",
    toolsLabel:  "Tools & Methodologies",
    eduLabel:    "Education",
    langLabel:   "Languages",
    yrs:         "yrs",
    native:      "Native",
    inter:       "Intermediate",
    present:     "Present",
    roles: {
      chubb:   "Source System Engineer",
      vitek:   "Full Stack Programmer",
      chemi:   "Software Engineer → Head of Innovation",
      dmx:     "Application Support Leader",
    },
    periods: {
      chubb:   "Nov 2024 – Present",
      vitek:   "May 2023 – Nov 2024",
      chemi:   "Feb 2019 – May 2023",
      dmx:     "Aug 2022 – Mar 2023",
    },
    bullets: {
      chubb: [
        "Maintenance of automotive insurance management systems.",
        "Migration of legacy services to .NET APIs.",
        "New endorsement platform built in Angular.",
        "CI/CD pipelines with Jenkins, Kubernetes and Azure DevOps.",
        "Use of Claude Code and Gemini Code to accelerate development and boost productivity.",
      ],
      vitek: [
        "Requirements analysis and solution proposals.",
        "On-site visits to HEB distribution center for process analysis.",
        "Administrative system maintenance and end-user contact.",
      ],
      chemi: [
        "E-commerce website in .NET Core (chemistore.com).",
        "iOS/Android mobile app in Xamarin published on stores.",
        "Integrations: DHL, Estafeta, Google Ads, Firebase, Dialogflow.",
        "Ruby on Rails and Vue.js website maintenance.",
      ],
      dmx: [
        "REST/SOAP APIs and IIS service consumption.",
        "SQL Server DB modeling: SPs, scripts and scheduled Jobs.",
        "2nd-level support and new .NET Core web projects.",
      ],
    },
    edu: [
      { degree: "B.Sc. in Software Technology Engineering", inst: "UANL",          period: "2013 – 2018" },
      { degree: "High School Diploma",                       inst: "Prep. N°1 UANL", period: "2011 – 2013" },
    ],
  },
} as const;

// ─── styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    color: C.text,
    fontSize: 9,
  },

  // Header
  header: {
    backgroundColor: C.navy,
    paddingHorizontal: 36,
    paddingTop: 30,
    paddingBottom: 22,
  },
  headerName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 26,
    color: C.white,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  headerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  headerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerChipDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.blue,
  },
  headerChipText: {
    color: "#94a3b8",
    fontSize: 8.5,
  },
  headerChipLink: {
    color: "#94a3b8",
    fontSize: 8.5,
    textDecoration: "none",
  },

  // Available badge
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },
  badgeText: {
    color: "#34d399",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // Body layout
  body: {
    flexDirection: "row",
    flex: 1,
  },

  // Main column (left 62%)
  main: {
    width: "62%",
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 24,
    borderRightWidth: 1,
    borderRightColor: C.rule,
  },

  // Sidebar column (right 38%)
  sidebar: {
    width: "38%",
    backgroundColor: C.bg,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
  },

  // Section header
  secLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: C.blue,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  secTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: C.text,
    marginBottom: 3,
  },
  rule: {
    height: 1,
    backgroundColor: C.rule,
    marginBottom: 12,
  },
  section: {
    marginBottom: 18,
  },

  // Experience entry
  expEntry: {
    marginBottom: 14,
  },
  expHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.text,
  },
  expPeriod: {
    fontSize: 7.5,
    color: C.white,
    backgroundColor: C.blue,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  expRole: {
    fontSize: 8.5,
    color: C.blue,
    marginBottom: 5,
  },
  bullet: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 3,
  },
  bulletArrow: {
    color: C.blue,
    fontSize: 8,
    marginTop: 1,
  },
  bulletText: {
    fontSize: 8,
    color: C.muted,
    flex: 1,
    lineHeight: 1.5,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  tag: {
    fontSize: 7,
    color: "#5b21b6",
    backgroundColor: C.violetL,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },

  // About text
  aboutText: {
    fontSize: 8.5,
    color: C.muted,
    lineHeight: 1.65,
  },

  // Skills
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  skillLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  skillName: {
    fontSize: 8.5,
    color: C.text,
  },
  skillYears: {
    fontSize: 7,
    color: "#94a3b8",
  },
  dotRow: {
    flexDirection: "row",
    gap: 3,
  },
  dotOn: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.blue,
  },
  dotOff: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#e2e8f0",
  },

  // Tools chips
  toolChip: {
    fontSize: 7,
    color: "#1d4ed8",
    backgroundColor: C.blueL,
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 8,
  },

  // Education
  eduEntry: {
    marginBottom: 9,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.text,
    marginBottom: 1,
  },
  eduInst: {
    fontSize: 8,
    color: C.blue,
    marginBottom: 1,
  },
  eduPeriod: {
    fontSize: 7.5,
    color: C.muted,
  },

  // Language
  langEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  langName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.text,
  },
  langLevel: {
    fontSize: 7.5,
    color: C.muted,
  },

  // Sidebar section separator
  sidebarRule: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 10,
    marginTop: 2,
  },
});

// ─── helpers ──────────────────────────────────────────────────────────────────
function Dots({ level }: { level: number }) {
  return (
    <View style={s.dotRow}>
      {Array.from({ length: 5 }, (_, i) => (
        <View key={i} style={i < level ? s.dotOn : s.dotOff} />
      ))}
    </View>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.rule} />
    </>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletArrow}>›</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

// ─── document ────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "C# / ASP.NET Core",  level: 5, years: "8+" },
  { name: "SQL Server",          level: 5, years: "8+" },
  { name: "JavaScript / TS",     level: 5, years: "9+" },
  { name: "Angular",             level: 4, years: "4+" },
  { name: "Python",              level: 3, years: "3+" },
  { name: "Vue.js",              level: 3, years: "2+" },
  { name: "Ruby on Rails",       level: 3, years: "2+" },
];

const TOOLS = [
  "Git","Jenkins","Azure DevOps","Kubernetes","IIS",
  "Scrum","Agile","Clean Architecture","DDD","REST API",
  "NgRx","SignalR","Entity Framework","MongoDB","Firebase",
  "Claude Code","Gemini Code",
];

const EXP_TAGS = {
  chubb: [".NET 6", "Angular 19", "Jenkins", "Kubernetes", "NgRx", "SignalR"],
  vitek: [".NET Core", "SQL Server", "Scrum", "Jira"],
  chemi: [".NET Core", "Xamarin", "Ruby on Rails", "Vue.js", "Firebase", "Dialogflow"],
  dmx:   [".NET Core", "SQL Server", "REST API", "SOAP", "IIS"],
};

export default function CvDocument({ lang }: { lang: CvLang }) {
  const t = T[lang];

  return (
    <Document
      title={`Felipe Perez — CV ${lang.toUpperCase()}`}
      author="Felipe Jhair Perez Ortiz"
      subject={t.title}
      creator="PlacaCheck Portfolio"
    >
      <Page size="A4" style={s.page}>

        {/* ── HEADER ───────────────────────────────────── */}
        <View style={s.header}>
          <View style={s.badge}>
            <View style={s.badgeDot} />
            <Text style={s.badgeText}>{t.available}</Text>
          </View>
          <Text style={s.headerName}>Felipe Perez</Text>
          <Text style={s.headerTitle}>{t.title}  ·  9+ {t.yrs === "años" ? "años de experiencia" : "years of experience"}</Text>
          <View style={s.headerRow}>
            <View style={s.headerChip}>
              <View style={s.headerChipDot} />
              <Text style={s.headerChipText}>(81) 2506 7484</Text>
            </View>
            <View style={s.headerChip}>
              <View style={s.headerChipDot} />
              <Link src="mailto:flipmk.ultra@gmail.com" style={s.headerChipLink}>flipmk.ultra@gmail.com</Link>
            </View>
            <View style={s.headerChip}>
              <View style={s.headerChipDot} />
              <Text style={s.headerChipText}>Apodaca, N.L. — México</Text>
            </View>
          </View>
        </View>

        {/* ── BODY ─────────────────────────────────────── */}
        <View style={s.body}>

          {/* ── MAIN COLUMN ──────────────────────────── */}
          <View style={s.main}>

            {/* Experience */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.expLabel}</Text>
              <View style={s.rule} />

              {/* Chubb */}
              <View style={s.expEntry}>
                <View style={s.expHead}>
                  <Text style={s.expCompany}>Chubb</Text>
                  <Text style={s.expPeriod}>{t.periods.chubb}</Text>
                </View>
                <Text style={s.expRole}>{t.roles.chubb}</Text>
                {t.bullets.chubb.map((b, i) => <Bullet key={i} text={b} />)}
                <View style={s.tagRow}>
                  {EXP_TAGS.chubb.map((tag) => <Text key={tag} style={s.tag}>{tag}</Text>)}
                </View>
              </View>

              {/* Vitek */}
              <View style={s.expEntry}>
                <View style={s.expHead}>
                  <Text style={s.expCompany}>Vitek Group</Text>
                  <Text style={s.expPeriod}>{t.periods.vitek}</Text>
                </View>
                <Text style={s.expRole}>{t.roles.vitek}</Text>
                {t.bullets.vitek.map((b, i) => <Bullet key={i} text={b} />)}
                <View style={s.tagRow}>
                  {EXP_TAGS.vitek.map((tag) => <Text key={tag} style={s.tag}>{tag}</Text>)}
                </View>
              </View>

              {/* Chemisette */}
              <View style={s.expEntry}>
                <View style={s.expHead}>
                  <Text style={s.expCompany}>Chemisette</Text>
                  <Text style={s.expPeriod}>{t.periods.chemi}</Text>
                </View>
                <Text style={s.expRole}>{t.roles.chemi}</Text>
                {t.bullets.chemi.map((b, i) => <Bullet key={i} text={b} />)}
                <View style={s.tagRow}>
                  {EXP_TAGS.chemi.map((tag) => <Text key={tag} style={s.tag}>{tag}</Text>)}
                </View>
              </View>

              {/* DmX */}
              <View style={s.expEntry}>
                <View style={s.expHead}>
                  <Text style={s.expCompany}>DmX — Dimex Capital</Text>
                  <Text style={s.expPeriod}>{t.periods.dmx}</Text>
                </View>
                <Text style={s.expRole}>{t.roles.dmx}</Text>
                {t.bullets.dmx.map((b, i) => <Bullet key={i} text={b} />)}
                <View style={s.tagRow}>
                  {EXP_TAGS.dmx.map((tag) => <Text key={tag} style={s.tag}>{tag}</Text>)}
                </View>
              </View>
            </View>
          </View>

          {/* ── SIDEBAR ──────────────────────────────── */}
          <View style={s.sidebar}>

            {/* About */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.aboutLabel}</Text>
              <View style={s.sidebarRule} />
              <Text style={s.aboutText}>{t.aboutText}</Text>
            </View>

            {/* Skills */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.skillsLabel}</Text>
              <View style={s.sidebarRule} />
              {SKILLS.map((sk) => (
                <View key={sk.name} style={s.skillRow}>
                  <View style={s.skillLeft}>
                    <Text style={s.skillName}>{sk.name}</Text>
                    <Text style={s.skillYears}>{sk.years} {t.yrs}</Text>
                  </View>
                  <Dots level={sk.level} />
                </View>
              ))}
            </View>

            {/* Tools */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.toolsLabel}</Text>
              <View style={s.sidebarRule} />
              <View style={s.tagRow}>
                {TOOLS.map((tool) => (
                  <Text key={tool} style={s.toolChip}>{tool}</Text>
                ))}
              </View>
            </View>

            {/* Education */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.eduLabel}</Text>
              <View style={s.sidebarRule} />
              {t.edu.map((edu) => (
                <View key={edu.inst + edu.period} style={s.eduEntry}>
                  <Text style={s.eduDegree}>{edu.degree}</Text>
                  <Text style={s.eduInst}>{edu.inst}</Text>
                  <Text style={s.eduPeriod}>{edu.period}</Text>
                </View>
              ))}
            </View>

            {/* Languages */}
            <View style={s.section}>
              <Text style={s.secLabel}>{t.langLabel}</Text>
              <View style={s.sidebarRule} />
              <View style={s.langEntry}>
                <Text style={s.langName}>{lang === "es" ? "Español" : "Spanish"}</Text>
                <Text style={s.langLevel}>{t.native}</Text>
              </View>
              <View style={s.langEntry}>
                <Text style={s.langName}>{lang === "es" ? "Inglés" : "English"}</Text>
                <Text style={s.langLevel}>{t.inter}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
