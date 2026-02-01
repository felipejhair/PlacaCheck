"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "es" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (d: Record<string, string>) => string; // Helper for simple translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");

    useEffect(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem("language") as Language;
        if (saved && (saved === "es" || saved === "en")) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    // Helper to pick string based on current language
    // Usage: t({ es: "Hola", en: "Hello" })
    const t = (dictionary: Record<string, string>) => {
        return dictionary[language] || dictionary["es"] || "";
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
