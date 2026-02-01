"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShieldAlert, Ambulance, Flame, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

interface EmergencySheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EmergencySheet({ isOpen, onClose }: EmergencySheetProps) {
    const { t } = useLanguage();

    const emergencyNumbers = [
        {
            number: "911",
            label: { es: "Emergencias General", en: "General Emergency" },
            icon: ShieldAlert,
            color: "text-red-500",
            bg: "bg-red-500/10",
            description: { es: "Policía, Ambulancia, Bomberos", en: "Police, Ambulance, Fire" }
        },
        {
            number: "089",
            label: { es: "Denuncia Anónima", en: "Anonymous Report" },
            icon: Phone,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            description: { es: "Extorsión, Narcomenudeo", en: "Extortion, Drug Dealing" }
        },
        {
            number: "065",
            label: { es: "Cruz Roja", en: "Red Cross" },
            icon: Ambulance,
            color: "text-red-600",
            bg: "bg-red-600/10",
            description: { es: "Atención Médica Urgente", en: "Urgent Medical Attention" }
        },
        {
            number: "068",
            label: { es: "Bomberos", en: "Fire Department" },
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            description: { es: "Incendios, Rescates", en: "Fires, Rescues" }
        },
        {
            number: "074",
            label: { es: "Carreteras (CAPUFE)", en: "Highways (CAPUFE)" },
            icon: Construction,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            description: { es: "Auxilio Vial en Carretera", en: "Highway Roadside Assistance" }
        }
    ];

    const handleCall = (number: string) => {
        window.open(`tel:${number}`);
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-card">
                            <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
                                <ShieldAlert className="w-5 h-5 fill-red-500/20" />
                                <span>{t({ es: "Emergencias México", en: "Emergency Mexico" })}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {emergencyNumbers.map((item) => (
                                <button
                                    key={item.number}
                                    onClick={() => handleCall(item.number)}
                                    className="w-full group relative flex items-center bg-card border rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-left hover:border-primary/50"
                                >
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors", item.bg)}>
                                        <item.icon className={cn("w-6 h-6", item.color)} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-lg">{t(item.label)}</span>
                                            <span className="font-mono font-black text-xl text-foreground/80 group-hover:text-primary transition-colors">{item.number}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{t(item.description)}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 ml-2 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                </button>
                            ))}

                            <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-dashed text-center space-y-2">
                                <p className="text-xs text-muted-foreground">
                                    {t({
                                        es: "Toca cualquier número para llamar directamente.",
                                        en: "Tap any number to call directly."
                                    })}
                                </p>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
                                    {t({ es: "Usa con responsabilidad", en: "Use responsibly" })}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Helper component for the Icon
function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
