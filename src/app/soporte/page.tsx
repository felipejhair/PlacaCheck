"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background p-6 pb-24 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold">{t({ es: "Soporte Técnico", en: "App Support" })}</h1>
                    </div>
                </header>

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section className="space-y-4 p-6 bg-card border rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            {t({ es: "Contáctanos", en: "Contact Us" })}
                        </h2>
                        <p className="text-muted-foreground">
                            {t({
                                es: "Si tienes problemas con la aplicación, encuentras un error o tienes alguna sugerencia, no dudes en escribirnos. Nuestro equipo te responderá lo antes posible.",
                                en: "If you are experiencing issues with the app, found a bug, or have a suggestion, please do not hesitate to write to us. Our team will get back to you as soon as possible."
                            })}
                        </p>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t({ es: "Correo Electrónico", en: "Email" })}</span>
                            <a href="mailto:soporte@believer4ever.com" className="text-lg font-bold text-primary hover:underline">
                                soporte@believer4ever.com
                            </a>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold">{t({ es: "Preguntas Frecuentes", en: "Frequently Asked Questions" })}</h2>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h3 className="font-semibold">{t({ es: "¿Cómo elimino mi cuenta?", en: "How do I delete my account?" })}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {t({
                                        es: "Puedes eliminar tu cuenta permanentemente desde la aplicación. Ve a Ajustes (icono de engranaje) > Eliminar Cuenta.",
                                        en: "You can permanently delete your account from within the app. Go to Settings (gear icon) > Delete Account."
                                    })}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold">{t({ es: "¿Mis reportes son anónimos?", en: "Are my reports anonymous?" })}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {t({
                                        es: "Sí, a menos que elijas explícitamente compartir tu identidad. Tu privacidad es nuestra prioridad.",
                                        en: "Yes, unless you explicitly choose to share your identity. Your privacy is our priority."
                                    })}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
