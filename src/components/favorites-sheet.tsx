"use client";

import { useState } from "react";
import { useFavorites } from "@/components/favorites-context";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FavoritesSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FavoritesSheet({ isOpen, onClose }: FavoritesSheetProps) {
    const { favorites, removeFavorite } = useFavorites();

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
                            <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <Heart className="w-5 h-5 fill-primary" />
                                <span>Mis Favoritos</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {favorites.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-50">
                                    <div className="p-4 bg-secondary rounded-full">
                                        <Heart className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground max-w-[200px]">
                                        Aún no tienes placas guardadas.
                                        <br />
                                        <span className="text-sm">Toca el corazón en el detalle de una placa para agregarla.</span>
                                    </p>
                                </div>
                            ) : (
                                favorites.map((placa) => (
                                    <div key={placa} className="group relative flex items-center bg-card border rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                                        <Link
                                            href={`/placa/${placa}`}
                                            className="flex-1 flex items-center gap-3"
                                            onClick={onClose}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center font-mono font-bold text-sm border">
                                                {placa.substring(0, 3)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-lg tracking-wider font-mono">{placa}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase font-medium">Ver detalles</span>
                                            </div>
                                        </Link>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFavorite(placa)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
                                            title="Eliminar de favoritos"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t bg-card/50 text-center text-xs text-muted-foreground">
                            <p>Total guardados: {favorites.length}</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
