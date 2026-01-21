"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, Monitor, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function SettingsMenu() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-6 left-6 z-50">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="rounded-full w-12 h-12 shadow-lg transition-all backdrop-blur-md bg-black/5 hover:bg-black/10 border-black/10 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white/70 dark:hover:text-white border"
            >
                <Settings className="w-6 h-6" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile mostly, but good for focus */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />

                        {/* Menu Popover */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                            className="absolute top-0 left-0 mt-14 w-64 bg-card border shadow-xl rounded-2xl p-4 z-50 space-y-4"
                        >
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="font-semibold text-lg">Ajustes</h3>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    Tema
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setTheme("light")}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded-xl border transition-all hover:bg-secondary",
                                            theme === "light" ? "bg-secondary border-primary/50 text-primary" : "border-transparent text-muted-foreground"
                                        )}
                                    >
                                        <Sun className="w-5 h-5" />
                                        <span className="text-[10px] font-medium">Claro</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme("dark")}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded-xl border transition-all hover:bg-secondary",
                                            theme === "dark" ? "bg-secondary border-primary/50 text-primary" : "border-transparent text-muted-foreground"
                                        )}
                                    >
                                        <Moon className="w-5 h-5" />
                                        <span className="text-[10px] font-medium">Oscuro</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme("system")}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded-xl border transition-all hover:bg-secondary",
                                            theme === "system" ? "bg-secondary border-primary/50 text-primary" : "border-transparent text-muted-foreground"
                                        )}
                                    >
                                        <Monitor className="w-5 h-5" />
                                        <span className="text-[10px] font-medium">Sistema</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
