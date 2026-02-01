"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquarePlus, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { sendSupportEmail } from "@/app/actions/contact";
import { useToast } from "@/components/ui/use-toast";

interface SupportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
}

export function SupportDialog({ open, onOpenChange, children }: SupportDialogProps) {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await sendSupportEmail(email, message);
            if (result.success) {
                toast({
                    title: t({ es: "Mensaje Enviado", en: "Message Sent" }),
                    description: t({ es: "Gracias por tus comentarios. Te responderemos pronto.", en: "Thanks for your feedback. We will reply soon." }),
                });
                onOpenChange(false);
                setEmail("");
                setMessage("");
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: t({ es: "No se pudo enviar el mensaje. Inténtalo de nuevo.", en: "Could not send message. Please try again." }),
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquarePlus className="w-5 h-5 text-primary" />
                        {t({ es: "Soporte y Sugerencias", en: "Support & Feedback" })}
                    </DialogTitle>
                    <DialogDescription>
                        {t({
                            es: "Cuéntanos qué problema tienes o cómo podemos mejorar. Te contactaremos a tu correo.",
                            en: "Tell us about your issue or how we can improve. We'll contact you via email."
                        })}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t({ es: "Tu Correo", en: "Your Email" })}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">{t({ es: "Mensaje", en: "Message" })}</Label>
                        <Textarea
                            id="message"
                            placeholder={t({ es: "Escribe tu sugerencia o problema aquí...", en: "Type your suggestion or issue here..." })}
                            required
                            className="min-h-[120px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t({ es: "Enviando...", en: "Sending..." })}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t({ es: "Enviar Mensaje", en: "Send Message" })}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
