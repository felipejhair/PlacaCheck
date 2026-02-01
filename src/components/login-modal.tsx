"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, AuthProviderType } from "@/components/auth-provider";
import { useState } from "react";
import { registerUser, loginWithEmail, verifyEmail } from "@/actions/auth-actions";
import { useLanguage } from "@/components/language-provider";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function EmailAuthForm({ onClose, onCancel }: { onClose: () => void, onCancel: () => void }) {
    const { setSession } = useAuth();
    const { t } = useLanguage();
    const [mode, setMode] = useState<"login" | "register" | "verify">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        code: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (mode === "verify") {
                const result = await verifyEmail(formData.email, formData.code);
                if (result.success && result.user) {
                    const user = {
                        id: result.user.id,
                        name: result.user.name,
                        email: result.user.email || "",
                        avatar: result.user.avatar || undefined,
                        provider: "email" as AuthProviderType
                    };
                    setSession(user);
                    onClose();
                } else {
                    setError(result.error || "Código incorrecto");
                }
                setIsLoading(false);
                return;
            }

            if (mode === "register") {
                const result = await registerUser(formData.name, formData.email, formData.password);
                if (result.success && result.requireVerification) {
                    setMode("verify");
                    setIsLoading(false);
                    return;
                }
                setError(result.error || "Ocurrió un error");
                setIsLoading(false);
                return;
            }

            // Login mode
            const result = await loginWithEmail(formData.email, formData.password);

            if (result.success && result.user) {
                const user = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email || "",
                    avatar: result.user.avatar || undefined,
                    provider: "email" as AuthProviderType
                };
                setSession(user);
                onClose();
            } else {
                setError(result.error || "Ocurrió un error");
            }

        } catch (e) {
            setError("Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    if (mode === "verify") {
        return (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="icon" type="button" onClick={() => setMode("register")} className="h-8 w-8 -ml-2">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h3 className="font-semibold text-lg">{t({ es: "Verificar Correo", en: "Verify Email" })}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t({ es: "Hemos enviado un código a", en: "We sent a code to" })} <strong>{formData.email}</strong>
                </p>

                <div className="space-y-2">
                    <label className="text-sm font-medium">{t({ es: "Código de 6 dígitos", en: "6-digit code" })}</label>
                    <Input
                        required
                        placeholder="123456"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        maxLength={6}
                        className="text-center text-2xl tracking-widest uppercase"
                    />
                </div>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t({ es: "Verificar", en: "Verify" })}
                </Button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="icon" type="button" onClick={onCancel} className="h-8 w-8 -ml-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-semibold text-lg">
                    {mode === "login" ? t({ es: "Iniciar con Correo", en: "Login with Email" }) : t({ es: "Crear cuenta", en: "Create Account" })}
                </h3>
            </div>

            {mode === "register" && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t({ es: "Nombre", en: "Name" })}</label>
                    <Input
                        required
                        placeholder={t({ es: "Tu nombre", en: "Your name" })}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium">{t({ es: "Correo electrónico", en: "Email" })}</label>
                <Input
                    required
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t({ es: "Contraseña", en: "Password" })}</label>
                <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === "login" ? t({ es: "Entrar", en: "Login" }) : t({ es: "Registrarse", en: "Sign Up" }))}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
                {mode === "login" ? (
                    <>
                        {t({ es: "¿No tienes cuenta?", en: "Don't have an account?" })}{" "}
                        <button type="button" onClick={() => setMode("register")} className="text-primary hover:underline font-medium">
                            {t({ es: "Regístrate", en: "Sign Up" })}
                        </button>
                    </>
                ) : (
                    <>
                        {t({ es: "¿Ya tienes cuenta?", en: "Already have an account?" })}{" "}
                        <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                            {t({ es: "Inicia Sesión", en: "Login" })}
                        </button>
                    </>
                )}
            </div>
        </form>
    );
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login } = useAuth();
    const { t } = useLanguage();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleLogin = async (provider: AuthProviderType) => {
        setIsLoggingIn(true);
        await login(provider);
        setIsLoggingIn(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: "100%", x: 0 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            x: 0,
                            transition: { type: "spring", damping: 25, stiffness: 300 }
                        }}
                        exit={{ opacity: 0, y: "100%", x: 0 }}
                        className="fixed bottom-0 left-0 right-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-[101] pointer-events-none"
                    >
                        <div className="w-full bg-card border-t sm:border shadow-2xl rounded-t-3xl sm:rounded-2xl p-6 space-y-8 max-h-[90vh] overflow-y-auto sm:w-[90%] sm:max-w-md pointer-events-auto">
                            <div className="flex justify-between items-center bg-card z-10 pb-2">
                                <h2 className="text-2xl font-bold">{t({ es: "Iniciar Sesión", en: "Login" })}</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-muted-foreground text-center pb-4">
                                    {t({ es: "Inicia sesión para que tus reportes tengan más peso y sean verificados por la comunidad.", en: "Log in so your reports have more weight and are verified by the community." })}
                                </p>

                                {/* Email Auth Toggle */}
                                <div className="bg-muted/50 p-4 rounded-xl space-y-4">
                                    {!showEmailForm ? (
                                        <Button
                                            variant="default"
                                            className="w-full h-12 font-bold"
                                            onClick={() => setShowEmailForm(true)}
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            {t({ es: "Continuar con Correo", en: "Continue with Email" })}
                                        </Button>
                                    ) : (
                                        <EmailAuthForm onClose={onClose} onCancel={() => setShowEmailForm(false)} />
                                    )}
                                </div>

                                {!showEmailForm && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className="w-full text-muted-foreground font-normal hover:text-foreground mt-4"
                                            onClick={onClose}
                                        >
                                            {t({ es: "Continuar como invitado", en: "Continue as guest" })}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
