"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, AuthProviderType } from "@/components/auth-provider";
import { useState } from "react";
import { registerUser, loginWithEmail, verifyEmail } from "@/actions/auth-actions";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function EmailAuthForm({ onClose, onCancel }: { onClose: () => void, onCancel: () => void }) {
    const { setSession } = useAuth();
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
                    <h3 className="font-semibold text-lg">Verificar Correo</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    Hemos enviado un código a <strong>{formData.email}</strong>
                </p>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Código de 6 dígitos</label>
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
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verificar"}
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
                    {mode === "login" ? "Iniciar con Correo" : "Crear cuenta"}
                </h3>
            </div>

            {mode === "register" && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input
                        required
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium">Correo electrónico</label>
                <Input
                    required
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
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
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === "login" ? "Entrar" : "Registrarse")}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
                {mode === "login" ? (
                    <>
                        ¿No tienes cuenta?{" "}
                        <button type="button" onClick={() => setMode("register")} className="text-primary hover:underline font-medium">
                            Regístrate
                        </button>
                    </>
                ) : (
                    <>
                        ¿Ya tienes cuenta?{" "}
                        <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                            Inicia Sesión
                        </button>
                    </>
                )}
            </div>
        </form>
    );
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login } = useAuth();
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
                        initial={{ opacity: 0, scale: 0.95, y: "100%" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bottom-auto w-full sm:w-[90%] sm:max-w-md bg-card border-t sm:border shadow-2xl rounded-t-3xl sm:rounded-2xl z-[101] p-6 space-y-8"
                    >
                        <div className="flex justify-between items-center bg-card z-10 pb-2">
                            <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground text-center pb-4">
                                Inicia sesión para que tus reportes tengan más peso y sean verificados por la comunidad.
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
                                        Continuar con Correo
                                    </Button>
                                ) : (
                                    <EmailAuthForm onClose={onClose} onCancel={() => setShowEmailForm(false)} />
                                )}
                            </div>

                            {!showEmailForm && (
                                <>
                                    {/* Social Login Buttons - Hidden until API Keys are available 
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full h-14 text-lg font-medium relative hover:bg-white hover:text-black transition-colors"
                                        onClick={() => handleLogin("google")}
                                        disabled={isLoggingIn}
                                    >
                                        <svg className="w-5 h-5 absolute left-5" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Google
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full h-14 text-lg font-medium relative hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
                                        onClick={() => handleLogin("facebook")}
                                        disabled={isLoggingIn}
                                    >
                                        <svg className="w-5 h-5 absolute left-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v2.277h-2.17c-2.083 0-2.605.984-2.605 2.587v1.852h4.421l-.558 3.667h-3.863v7.925a12.06 12.06 0 0 1-6.936 .02a12.08 12.08 0 0 1-3.056-.425z" />
                                        </svg>
                                        Facebook
                                    </Button>
                                    */}

                                    <Button
                                        variant="ghost"
                                        className="w-full text-muted-foreground font-normal hover:text-foreground mt-4"
                                        onClick={onClose}
                                    >
                                        Continuar como invitado
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
