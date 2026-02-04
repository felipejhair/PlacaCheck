"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto";

function hashPassword(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export async function deleteAccount(userId: string, password?: string) {
    if (!userId) {
        return { success: false, error: "User ID is required" };
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { success: false, error: "Usuario no encontrado" };

        // Verification logic
        if (user.provider === "email") {
            if (!password) {
                return { success: false, error: "Contraseña requerida" };
            }
            if (!user.salt || !user.password) {
                // Should not happen for email provider, but safe guard
                return { success: false, error: "Error de configuración de cuenta" };
            }

            const hash = hashPassword(password, user.salt);
            if (hash !== user.password) {
                return { success: false, error: "Contraseña incorrecta" };
            }
        }

        await prisma.$transaction(async (tx) => {
            // 1. Desvincular o eliminar reviews
            await tx.review.deleteMany({
                where: { userId: userId },
            });

            // 2. Eliminar favoritos
            await tx.favorite.deleteMany({
                where: { userId: userId },
            });

            // 3. Finalmente eliminar usuario
            await tx.user.delete({
                where: { id: userId },
            });
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting account:", error);
        return { success: false, error: "Failed to delete account" };
    }
}
