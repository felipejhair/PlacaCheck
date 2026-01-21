"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function loginUser(email: string, name: string, provider: string, avatar?: string) {
    try {
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    provider,
                    avatar,
                },
            });
        } else {
            // User exists, just return them. Do not overwrite avatar with mock defaults.
        }

        return { success: true, user };
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, error: "Failed to login" };
    }
}

export async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { favorites: true, reviews: true }
        });
        return user;
    } catch (error) {
        return null;
    }
}

// ------ Email Auth Logic ------

import { sendEmail } from "@/lib/mail";
import crypto from "crypto";

// ... existing hashPassword ...

function hashPassword(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export async function registerUser(name: string, email: string, password: string) {
    try {
        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing && existing.isVerified) {
            return { success: false, error: "El correo ya está registrado" };
        }

        if (existing && !existing.isVerified) {
            await prisma.user.delete({ where: { email } });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hash = hashPassword(password, salt);

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
                salt,
                provider: "email",
                avatar: "avatar-1",
                verificationCode: otp,
                verificationCodeExpiresAt: expiresAt,
                isVerified: false
            },
        });

        // Send Email
        const emailSent = await sendEmail(
            email,
            "Tu código de verificación - PlacaCheck",
            `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #1a1a1a;">Bienvenido a PlacaCheck</h1>
                <p style="font-size: 16px; color: #4a4a4a;">Para completar tu registro, utiliza el siguiente código de verificación:</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
                    <span style="color: #4F46E5; font-size: 32px; font-weight: bold; letter-spacing: 4px;">${otp}</span>
                </div>
                <p style="font-size: 14px; color: #6b7280;">Este código expira en 15 minutos.</p>
                <p style="font-size: 14px; color: #6b7280;">Si no solicitaste este código, ignora este correo.</p>
            </div>
            `
        );

        if (!emailSent) {
            console.log(`[DEV OTP] For ${email}: ${otp}`);
        }

        return { success: true, requireVerification: true };
    } catch (error) {
        console.error("Register Error:", error);
        return { success: false, error: "Error al registrar usuario" };
    }
}

export async function verifyEmail(email: string, code: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { success: false, error: "Usuario no encontrado" };

        if (user.isVerified) return { success: true, user };

        if (!user.verificationCode || !user.verificationCodeExpiresAt) {
            return { success: false, error: "Código inválido" };
        }

        if (new Date() > user.verificationCodeExpiresAt) {
            return { success: false, error: "El código ha expirado" };
        }

        if (user.verificationCode !== code) {
            return { success: false, error: "Código incorrecto" };
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationCodeExpiresAt: null
            }
        });

        return { success: true, user: updatedUser };

    } catch (error) {
        return { success: false, error: "Error al verificar" };
    }
}

export async function loginWithEmail(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.provider !== "email" || !user.salt || !user.password) {
            return { success: false, error: "Credenciales inválidas" };
        }

        // Ensure user is verified before allowing login
        if (!user.isVerified) {
            return { success: false, error: "Cuenta no verificada. Verifica tu correo." };
        }

        const hash = hashPassword(password, user.salt);
        if (hash === user.password) {
            return { success: true, user };
        } else {
            return { success: false, error: "Credenciales inválidas" };
        }
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: "Error al iniciar sesión" };
    }
}
