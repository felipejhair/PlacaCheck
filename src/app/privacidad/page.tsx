"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background p-6 pb-24">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold">{t({ es: "Política de Privacidad", en: "Privacy Policy" })}</h1>
                    </div>
                </header>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground/80">
                    <p className="text-sm text-muted-foreground">
                        {t({ es: "Última actualización: 01 de Febrero de 2026", en: "Last updated: February 1st, 2026" })}
                    </p>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-primary">1. {t({ es: "Introducción", en: "Introduction" })}</h2>
                        <p>
                            {t({
                                es: "Bienvenido a PlacaCheck. Valoramos su privacidad y nos comprometemos a proteger su información personal. Esta política explica cómo recopilamos, usamos y protegemos sus datos cuando utiliza nuestra aplicación móvil.",
                                en: "Welcome to PlacaCheck. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data when you use our mobile application."
                            })}
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-primary">2. {t({ es: "Información que Recopilamos", en: "Information We Collect" })}</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>{t({ es: "Reportes Anónimos:", en: "Anonymous Reports:" })}</strong> {t({ es: "Al enviar un reporte, no almacenamos su identidad a menos que inicie sesión voluntariamente.", en: "When submitting a report, we do not store your identity unless you voluntarily log in." })}
                            </li>
                            <li>
                                <strong>{t({ es: "Datos de Uso:", en: "Usage Data:" })}</strong> {t({ es: "Podemos recopilar información sobre cómo interactúa con la aplicación (por ejemplo, búsquedas de placas) para mejorar el servicio.", en: "We may collect information about how you interact with the app (e.g., license plate searches) to improve the service." })}
                            </li>
                            <li>
                                <strong>{t({ es: "Cuenta de Usuario (Opcional):", en: "User Account (Optional):" })}</strong> {t({ es: "Si decide registrarse, recopilamos su correo electrónico y nombre para gestionar su perfil.", en: "If you choose to register, we collect your email and name to manage your profile." })}
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-primary">3. {t({ es: "Uso de la Información", en: "Use of Information" })}</h2>
                        <p>
                            {t({
                                es: "Utilizamos la información recopilada únicamente para proporcionar y mantener el servicio de reportes vehiculares, mejorar la plataforma y prevenir el abuso.",
                                en: "We use the collected information solely to provide and maintain the vehicle reporting service, improve the platform, and prevent abuse."
                            })}
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-primary">4. {t({ es: "Contacto", en: "Contact" })}</h2>
                        <p>
                            {t({
                                es: "Si tiene alguna pregunta sobre esta política, contáctenos en: soporte@placacheck.com",
                                en: "If you have any questions about this policy, please contact us at: soporte@placacheck.com"
                            })}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
