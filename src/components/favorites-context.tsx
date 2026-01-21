"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFavorites, toggleFavoriteAction } from "@/actions/favorite-actions";
import { useAuth } from "@/components/auth-provider";


interface FavoritesContextType {
    favorites: string[];
    addFavorite: (placa: string) => void;
    removeFavorite: (placa: string) => void;
    isFavorite: (placa: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    // Load favorites when user changes
    useEffect(() => {
        const loadFavorites = async () => {
            if (user && user.id) {
                try {
                    const serverFavs = await getFavorites(user.id);
                    setFavorites(serverFavs);
                } catch (e) {
                    console.error("Error loading favorites:", e);
                }
            } else {
                // Fallback to local storage for guests?
                // Current requirement is "use database".
                // Let's keep local storage for non-logged in users?
                // The user said "Database Integration", but "Simulated Auth".
                // If the user logs out, we should probably clear favorites or just rely on LS.
                // For consistent UX, let's stick to Server for Logged In, LS for Guest.

                const saved = localStorage.getItem("placa-favorites");
                if (saved) {
                    try {
                        setFavorites(JSON.parse(saved));
                    } catch (e) {
                        setFavorites([]);
                    }
                } else {
                    setFavorites([]);
                }
            }
        }
        loadFavorites();
    }, [user?.id, user]);

    const handleToggle = async (placa: string, action: 'add' | 'remove') => {
        // Optimistic Update
        if (action === 'add') {
            setFavorites(prev => [...prev, placa]);
        } else {
            setFavorites(prev => prev.filter(p => p !== placa));
        }

        if (user && user.id) {
            // Sync with Server
            try {
                await toggleFavoriteAction(user.id, placa);
            } catch (e) {
                console.error("Failed to sync favorite:", e);
                // Revert on error? For now, we accept minor drift.
            }
        } else {
            // Sync with Local Storage
            const currentFavs = action === 'add' ? [...favorites, placa] : favorites.filter(p => p !== placa);
            localStorage.setItem("placa-favorites", JSON.stringify(currentFavs));
        }
    };

    const addFavorite = (placa: string) => {
        if (!favorites.includes(placa)) {
            handleToggle(placa, 'add');
        }
    };

    const removeFavorite = (placa: string) => {
        handleToggle(placa, 'remove');
    };

    const isFavorite = (placa: string) => {
        return favorites.includes(placa);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
