"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginUser, getUser } from "@/actions/auth-actions"; // Import getUser

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

    // Load session from localStorage on mount AND validate with server
    useEffect(() => {
        const initSession = async () => {
            const savedUser = localStorage.getItem("placa-check-user");
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser); // Optimistic set

                    // Validate with server if we have an email
                    if (parsedUser.email) {
                        try {
                            const dbUser = await getUser(parsedUser.email);
                            if (!dbUser) {
                                // User deleted or invalid
                                console.warn("Session invalid: User not found on server");
                                setUser(null);
                                localStorage.removeItem("placa-check-user");
                            } else {
                                // Optional: Update local user with fresh DB data
                                const freshUser: User = {
                                    id: dbUser.id,
                                    name: dbUser.name,
                                    email: dbUser.email || parsedUser.email,
                                    avatar: dbUser.avatar || undefined,
                                    provider: dbUser.provider as AuthProviderType,
                                };
                                setUser(freshUser);
                                localStorage.setItem("placa-check-user", JSON.stringify(freshUser));
                            }
                        } catch (err) {
                            console.error("Error validating session:", err);
                            // Don't logout on network error, just keep optimistic
                        }
                    }
                } catch (e) {
                    console.error("Failed to parse user session", e);
                    localStorage.removeItem("placa-check-user");
                }
            }
            setIsLoading(false);
        };

        initSession();
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
