"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginUser } from "@/actions/auth-actions";

export type AuthProviderType = "google" | "facebook" | "guest" | "email";

export interface User {
    id?: string; // Database ID
    name: string;
    email: string;
    avatar?: string;
    provider: AuthProviderType;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (provider: AuthProviderType) => Promise<void>;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
    setSession: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load session from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("placa-check-user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem("placa-check-user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (provider: AuthProviderType) => {
        setIsLoading(true);

        let mockUser: User = { // Initialize with required properties
            name: "",
            email: "",
            provider: provider as AuthProviderType,
        };

        if (provider === "google") {
            mockUser = {
                name: "Usuario Google",
                email: "usuario@gmail.com",
                avatar: "G",
                provider: "google",
            };
        } else if (provider === "facebook") {
            mockUser = {
                name: "Usuario Facebook",
                email: "usuario@facebook.com",
                avatar: "F",
                provider: "facebook",
            };
        } else {
            setIsLoading(false);
            return;
        }

        try {
            // Call Server Action to persist in MySQL
            const result = await loginUser(mockUser.email, mockUser.name, mockUser.provider, mockUser.avatar);

            if (result.success && result.user) {
                // Use the REAL user from DB which has the ID
                const realUser: User = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email || mockUser.email,
                    avatar: result.user.avatar || undefined,
                    provider: result.user.provider as AuthProviderType,
                };
                setUser(realUser);
                localStorage.setItem("placa-check-user", JSON.stringify(realUser));
            } else {
                console.error("Login failed on server:", result.error);
                // Fallback with mock data if server fails (e.g. connectivity)
                setUser(mockUser);
                localStorage.setItem("placa-check-user", JSON.stringify(mockUser));
            }
        } catch (error) {
            console.error("Login action error:", error);
            // Fallback
            setUser(mockUser);
            localStorage.setItem("placa-check-user", JSON.stringify(mockUser));
        }

        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("placa-check-user");
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("placa-check-user", JSON.stringify(updatedUser));
        }
    };

    const setSession = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("placa-check-user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser, setSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
