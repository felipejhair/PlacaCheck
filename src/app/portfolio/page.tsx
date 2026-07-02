"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Code2,
  Layers,
  Sparkles,
  Globe,
  Star,
  Cpu,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────
type Lang = "es" | "en";

// ─── data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "C# / ASP.NET Core", level: 5, years: "8+" },
  { name: "SQL Server",        level: 5, years: "8+" },
  { name: "Angular",           level: 4, years: "4+" },
  { name: "JavaScript / TS",   level: 5, years: "9+" },
  { name: "Python",            level: 3, years: "3+" },
  { name: "Vue.js",            level: 3, years: "2+" },
  { name: "Ruby on Rails",     level: 3, years: "2+" },
  { name: "Xamarin",           level: 3, years: "1+" },
];

const TOOLS = [
  "Git","Jenkins","Azure DevOps","Kubernetes","IIS","Nexus",
  "Scrum","Agile","Clean Architecture","DDD","REST API","SOAP",
  "NgRx","SignalR","Entity Framework","MongoDB","Firebase","Dialogflow",
];

const EXPERIENCE = [
  {
    company: "Chubb",
    roleEs: "Source System Engineer",
    roleEn: "Source System Engineer",
    periodEs: "Nov 2024 – Presente",
    periodEn: "Nov 2024 – Present",
    tags: [".NET 6","Angular 19","Jenkins","Kubernetes","NgRx","SignalR"],
    bulletEs: [
      "Mantenimiento de sistemas de gestión de seguros vehiculares.",
      "Migración de servicios legacy a APIs en .NET.",
      "Desarrollo de nueva plataforma de endosos en Angular.",
      "Pipelines CI/CD con Jenkins, Kubernetes y Azure DevOps.",
    ],
    bulletEn: [
      "Maintenance of automotive insurance management systems.",
      "Migration of legacy services to .NET APIs.",
      "New endorsement platform built in Angular.",
      "CI/CD pipelines with Jenkins, Kubernetes and Azure DevOps.",
    ],
    current: true,
  },
  {
    company: "Vitek Group",
    roleEs: "Programador Full Stack",
    roleEn: "Full Stack Programmer",
    periodEs: "May 2023 – Nov 2024",
    periodEn: "May 2023 – Nov 2024",
    tags: [".NET Core","SQL Server","Scrum","Jira"],
    bulletEs: [
      "Análisis de requerimientos y propuestas de solución.",
      "Visitas al centro de distribución de HEB para análisis de procesos.",
      "Mantenimiento de sistemas administrativos y contacto con usuarios.",
    ],
    bulletEn: [
      "Requirements analysis and solution proposals.",
      "On-site visits to HEB distribution center for process analysis.",
      "Administrative system maintenance and end-user contact.",
    ],
    current: false,
  },
  {
    company: "Chemisette",
    roleEs: "Ingeniero de Software → Head of Innovation",
    roleEn: "Software Engineer → Head of Innovation",
    periodEs: "Feb 2019 – May 2023",
    periodEn: "Feb 2019 – May 2023",
    tags: [".NET Core","Xamarin","Ruby on Rails","Vue.js","Firebase","Dialogflow"],
    bulletEs: [
      "E-commerce en .NET Core (chemistore.com).",
      "App móvil iOS/Android en Xamarin publicada en tiendas.",
      "Mantenimiento de sistema en Ruby on Rails y Vue.js.",
      "Integraciones: DHL, Estafeta, Google Ads, Firebase, Dialogflow.",
    ],
    bulletEn: [
      "E-commerce website in .NET Core (chemistore.com).",
      "iOS/Android mobile app in Xamarin published on stores.",
      "Ruby on Rails and Vue.js website maintenance.",
      "Integrations: DHL, Estafeta, Google Ads, Firebase, Dialogflow.",
    ],
    current: false,
  },
  {
    company: "DmX — Dimex Capital",
    roleEs: "Líder de Soporte de Aplicaciones",
    roleEn: "Application Support Leader",
    periodEs: "Ago 2022 – Mar 2023",
    periodEn: "Aug 2022 – Mar 2023",
    tags: [".NET Core","SQL Server","REST API","SOAP","IIS"],
    bulletEs: [
      "APIs REST/SOAP y consumo de servicios IIS.",
      "Modelado de base de datos: SPs, scripts y Jobs programados.",
      "Soporte 2° nivel y nuevos proyectos web en .NET Core.",
    ],
    bulletEn: [
      "REST/SOAP APIs and IIS service consumption.",
      "Database modeling: SPs, scripts and scheduled Jobs.",
      "2nd-level support and new .NET Core web projects.",
    ],
    current: false,
  },
];

const PROJECTS: {
  titleEs: string; titleEn: string;
  descEs: string;  descEn: string;
  tags: string[];
  link: string;
  gradient: string;
  icon: string;
  highlightEs: string[]; highlightEn: string[];
}[] = [
  {
    titleEs: "PlacaCheck",
    titleEn: "PlacaCheck",
    descEs: "Plataforma para evaluar el comportamiento vehicular en México. Permite consultar placas, calificar conductores y dejar comentarios anónimos de forma comunitaria.",
    descEn: "Platform to evaluate driver behavior in Mexico. Allows license plate lookups, driver ratings, and anonymous community reviews.",
    tags: ["Next.js 14","Tailwind CSS","TypeScript","Supabase","Vercel"],
    link: "https://placa-check.vercel.app",
    gradient: "from-violet-600 via-blue-600 to-cyan-500",
    icon: "🛡️",
    highlightEs: ["Autenticación con Google","Favoritos y búsqueda histórica","Números de emergencia","Dark / Light mode","Soporte multi-idioma ES/EN"],
    highlightEn: ["Google authentication","Favorites & search history","Emergency numbers","Dark / Light mode","Bilingual ES/EN support"],
  },
  {
    titleEs: "Invitaciones Digitales XV",
    titleEn: "Digital XV Invitations",
    descEs: "Plataforma de invitaciones digitales para XV años con animaciones premium, galería polaroid, confirmación por WhatsApp, cuenta regresiva y efectos de partículas.",
    descEn: "Premium digital invitation platform for XV anniversary parties, featuring animations, a polaroid gallery, WhatsApp RSVP, countdown timer, and particle effects.",
    tags: ["Next.js 14","Framer Motion","Tailwind CSS","TypeScript"],
    link: "https://placa-check.vercel.app/xv/arianne/lorenzo-rendon",
    gradient: "from-rose-500 via-pink-500 to-amber-400",
    icon: "✨",
    highlightEs: ["Scroll TikTok en móvil","Galería lightbox con swipe","Confeti al confirmar","Animaciones de entrada con Framer Motion","Sección de RSVP por WhatsApp"],
    highlightEn: ["TikTok-style mobile scroll","Lightbox gallery with swipe","Confetti on confirmation","Entry animations with Framer Motion","WhatsApp RSVP section"],
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────
function Orb({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none fixed rounded-full blur-[120px] z-0 ${className}`}
    />
  );
}

function Dots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < level ? "bg-blue-400" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-400">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
      {children}
    </h2>
  );
}

function Rule() {
  return <div className="mt-4 h-px w-full bg-white/8" />;
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("es");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const t = <T,>(obj: Record<Lang, T>): T => obj[lang];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07090f] font-sans text-white selection:bg-blue-500/30">
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[999] h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
      />

      {/* Background orbs */}
      <Orb className="h-[700px] w-[700px] -top-64 -left-36 bg-blue-900/25 animate-[drift_22s_ease-in-out_infinite]" />
      <Orb className="h-[550px] w-[550px] -bottom-44 -right-28 bg-violet-900/18 animate-[drift_28s_ease-in-out_infinite_reverse]" />
      <Orb className="h-[450px] w-[450px] top-[45%] left-[55%] bg-cyan-900/14 animate-[drift_19s_ease-in-out_infinite_7s]" />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-[62px] items-center justify-between border-b border-white/[0.06] bg-[#07090f]/65 px-6 backdrop-blur-2xl sm:px-10">
        <span className="text-sm font-bold tracking-tight">
          Felipe<span className="text-blue-400">.</span>
        </span>
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/60 transition hover:border-white/20 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "es" ? "EN" : "ES"}
          </button>
          <a
            href={`/api/cv/${lang}`}
            download
            className="flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-400"
          >
            <Download className="h-3.5 w-3.5" />
            CV PDF
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── HERO ──────────────────────────────────────── */}
        <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 pb-16 pt-28 sm:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1fr_260px]">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Available badge */}
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-2 text-sm font-medium text-emerald-400">
                <span className="h-2 w-2 animate-[blink_2.5s_ease-in-out_infinite] rounded-full bg-emerald-400" />
                {t({ es: "Disponible para nuevas oportunidades", en: "Open to new opportunities" })}
              </div>

              <h1 className="mb-3 text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
                Felipe<br />
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Perez
                </span>
              </h1>

              <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/55">
                {t({
                  es: "Ingeniero de Software Full Stack · 9+ años de experiencia · Especialista en .NET & Angular",
                  en: "Full Stack Software Engineer · 9+ years of experience · .NET & Angular Specialist",
                })}
              </p>

              {/* Contact chips */}
              <div className="mb-10 flex flex-wrap gap-2.5">
                {[
                  { icon: <Phone className="h-3.5 w-3.5" />, label: "(81) 2506 7484",      href: "tel:+528125067484" },
                  { icon: <Mail  className="h-3.5 w-3.5" />, label: "flipmk.ultra@gmail.com", href: "mailto:flipmk.ultra@gmail.com" },
                  { icon: <MapPin className="h-3.5 w-3.5"/>, label: "Apodaca, N.L. — México", href: undefined },
                ].map(({ icon, label, href }) =>
                  href ? (
                    <a key={label} href={href}
                      className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-xs text-white/55 backdrop-blur transition hover:border-white/18 hover:text-white">
                      {icon}{label}
                    </a>
                  ) : (
                    <span key={label}
                      className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-xs text-white/55">
                      {icon}{label}
                    </span>
                  )
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href="#projects"
                  className="flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30">
                  {t({ es: "Ver proyectos", en: "View projects" })}
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#experience"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20">
                  {t({ es: "Mi experiencia", en: "My experience" })}
                </a>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-[-30px] animate-[photoGlow_5s_ease-in-out_infinite_alternate] rounded-full bg-gradient-radial from-blue-500/18 to-transparent" />
                <div className="relative h-[300px] w-[260px] overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_0_2px_rgba(96,165,250,0.15),0_24px_60px_rgba(0,0,0,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatar.png" alt="Felipe Perez"
                    className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090f]/60 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────── */}
        <section className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/[0.06] px-6 sm:grid-cols-4 sm:px-10">
            {[
              { n: "9+", labelEs: "Años de experiencia", labelEn: "Years of experience" },
              { n: "8",  labelEs: "Empresas",            labelEn: "Companies" },
              { n: "15+",labelEs: "Proyectos entregados",labelEn: "Projects delivered" },
              { n: "3",  labelEs: "Idiomas de código",   labelEn: "Code languages" },
            ].map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                  {s.n}
                </span>
                <span className="mt-1.5 text-xs text-white/40">
                  {t({ es: s.labelEs, en: s.labelEn })}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO ─────────────────────────────────── */}
        <section id="projects" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <SectionLabel>{t({ es: "Proyectos", en: "Projects" })}</SectionLabel>
            <SectionTitle>{t({ es: "Portafolio", en: "Portfolio" })}</SectionTitle>
            <Rule />
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <motion.article
                key={p.titleEs}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur transition-all hover:-translate-y-1 hover:border-white/14 hover:shadow-2xl hover:shadow-black/40"
              >
                {/* Gradient top band */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient}`} />

                <div className="p-7">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/6 text-2xl">
                        {p.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {t({ es: p.titleEs, en: p.titleEn })}
                        </h3>
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span key={tag}
                              className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-white/40 transition hover:border-white/20 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-white/50">
                    {t({ es: p.descEs, en: p.descEn })}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {t({ es: p.highlightEs, en: p.highlightEn }).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-white/60">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${p.gradient} py-2.5 text-sm font-semibold text-white opacity-90 transition hover:opacity-100`}>
                    {t({ es: "Ver proyecto en vivo", en: "View live project" })}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────── */}
        <section id="skills" className="border-t border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <SectionLabel>{t({ es: "Tecnologías", en: "Technologies" })}</SectionLabel>
              <SectionTitle>{t({ es: "Habilidades", en: "Skills" })}</SectionTitle>
              <Rule />
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Core skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-7"
              >
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                  <Code2 className="h-3.5 w-3.5" />
                  {t({ es: "Lenguajes y Frameworks", en: "Languages & Frameworks" })}
                </p>
                <div className="space-y-4">
                  {SKILLS.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/80">{s.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/30">{s.years} {t({ es: "años", en: "yrs" })}</span>
                        <Dots level={s.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-7"
              >
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                  <Layers className="h-3.5 w-3.5" />
                  {t({ es: "Herramientas y Metodologías", en: "Tools & Methodologies" })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span key={tool}
                      className="rounded-full border border-blue-500/15 bg-blue-500/7 px-3 py-1.5 text-xs text-blue-300/75">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────── */}
        <section id="experience" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <SectionLabel>{t({ es: "Trayectoria", en: "Career" })}</SectionLabel>
            <SectionTitle>{t({ es: "Experiencia Profesional", en: "Professional Experience" })}</SectionTitle>
            <Rule />
          </motion.div>

          <div className="relative space-y-5 pl-10 before:absolute before:left-[9px] before:top-3 before:bottom-10 before:w-px before:bg-gradient-to-b before:from-blue-400 before:via-blue-400/20 before:to-transparent">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-10 top-6 h-[18px] w-[18px] rounded-full border-2 transition-colors ${
                  exp.current
                    ? "border-blue-400 bg-blue-400 shadow-[0_0_0_5px_rgba(96,165,250,0.18),0_0_18px_rgba(96,165,250,0.5)]"
                    : "border-blue-400/40 bg-[#07090f]"
                }`} />

                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur transition hover:border-white/14">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-white">{exp.company}</p>
                      <p className="mt-0.5 text-sm text-blue-400">
                        {t({ es: exp.roleEs, en: exp.roleEn })}
                      </p>
                    </div>
                    <span className="rounded-full border border-blue-500/15 bg-blue-500/7 px-3 py-1 text-xs text-blue-300/75">
                      {t({ es: exp.periodEs, en: exp.periodEn })}
                    </span>
                  </div>

                  <ul className="mb-4 space-y-1.5">
                    {t({ es: exp.bulletEs, en: exp.bulletEn }).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-white/50">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400/60" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span key={tag}
                        className="rounded-full border border-violet-500/15 bg-violet-500/7 px-2.5 py-0.5 text-[11px] text-violet-300/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION + LANGUAGES ─────────────────────── */}
        <section id="education" className="border-t border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
            <div className="grid gap-16 md:grid-cols-2">
              {/* Education */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7 }}
                  className="mb-10"
                >
                  <SectionLabel>{t({ es: "Formación", en: "Education" })}</SectionLabel>
                  <SectionTitle>{t({ es: "Educación", en: "Education" })}</SectionTitle>
                  <Rule />
                </motion.div>

                <div className="space-y-4">
                  {[
                    {
                      icon: "🎓",
                      degreeEs: "Ingeniero en Tecnología de Software",
                      degreeEn: "B.Sc. in Software Technology Engineering",
                      inst: "Universidad Autónoma de Nuevo León",
                      period: "2013 – 2018",
                    },
                    {
                      icon: "📚",
                      degreeEs: "Bachillerato General",
                      degreeEn: "High School Diploma",
                      inst: "Preparatoria N°1 — UANL",
                      period: "2011 – 2013",
                    },
                  ].map((edu, i) => (
                    <motion.div
                      key={edu.inst}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/8 text-2xl">
                        {edu.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t({ es: edu.degreeEs, en: edu.degreeEn })}
                        </p>
                        <p className="mt-0.5 text-xs text-blue-400">{edu.inst}</p>
                        <p className="mt-0.5 text-xs text-white/35">{edu.period}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7 }}
                  className="mb-10"
                >
                  <SectionLabel>{t({ es: "Comunicación", en: "Communication" })}</SectionLabel>
                  <SectionTitle>{t({ es: "Idiomas", en: "Languages" })}</SectionTitle>
                  <Rule />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { flag: "🇲🇽", nameEs: "Español", nameEn: "Spanish", levelEs: "Nativo",     levelEn: "Native" },
                    { flag: "🇺🇸", nameEs: "Inglés",  nameEn: "English",  levelEs: "Intermedio", levelEn: "Intermediate" },
                  ].map((l) => (
                    <motion.div
                      key={l.flag}
                      initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.6 }}
                      className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] py-8 text-center"
                    >
                      <span className="mb-3 text-4xl">{l.flag}</span>
                      <p className="text-sm font-bold text-white">{t({ es: l.nameEs, en: l.nameEn })}</p>
                      <p className="mt-1 text-xs text-white/40">{t({ es: l.levelEs, en: l.levelEn })}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-violet-500/8 to-transparent p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.12)_0%,transparent_60%)]" />
            <div className="relative z-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-400">
                {t({ es: "¿Listo para colaborar?", en: "Ready to collaborate?" })}
              </p>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t({ es: "Hablemos", en: "Let's talk" })}
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base text-white/50">
                {t({
                  es: "Abierto a nuevas oportunidades laborales, proyectos freelance y colaboraciones.",
                  en: "Open to job opportunities, freelance projects and collaborations.",
                })}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:flipmk.ultra@gmail.com"
                  className="flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30">
                  <Mail className="h-4 w-4" />
                  flipmk.ultra@gmail.com
                </a>
                <a href={`/api/cv/${lang}`} download
                  className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/22">
                  <Download className="h-4 w-4" />
                  {t({ es: "Descargar CV", en: "Download CV" })}
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center sm:px-10">
        <p className="text-xs text-white/25">
          Felipe Jhair Perez Ortiz · Software Engineer · Apodaca, N.L. ·{" "}
          {t({ es: "Hecho con", en: "Made with" })} ♥ · 2026
        </p>
      </footer>

      {/* CSS keyframes via style tag */}
      <style>{`
        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          25%      { transform: translate(40px,-50px); }
          50%      { transform: translate(-25px,35px); }
          75%      { transform: translate(50px,15px); }
        }
        @keyframes blink {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }
        @keyframes photoGlow {
          from { opacity:0.7; transform:scale(0.95); }
          to   { opacity:1;   transform:scale(1.05); }
        }
      `}</style>
    </div>
  );
}
