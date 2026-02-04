"use server";

import prisma from "@/lib/prisma";

export async function deleteAccount(userId: string) {
    if (!userId) {
        return { success: false, error: "User ID is required" };
    }

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Desvincular o eliminar reviews
            // En este caso eliminamos todo rastro, cascade manual
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
