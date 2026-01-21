"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFavorites(userId: string) {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: { plate: true },
            orderBy: { createdAt: 'desc' }
        });
        // Return just the plate numbers since that's what our context expects mostly, 
        // or return the full objects if we want to be more efficient.
        // Logic: adapting to existing context which uses string[]
        return favorites.map((fav: { plate: { licensePlate: string } }) => fav.plate.licensePlate);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
}

export async function toggleFavoriteAction(userId: string, plate: string) {
    try {
        // 1. Ensure plate exists
        const plateRecord = await prisma.plate.upsert({
            where: { licensePlate: plate },
            update: {},
            create: { licensePlate: plate },
        });

        // 2. Check if already favorite
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_plateId: {
                    userId,
                    plateId: plateRecord.id,
                },
            },
        });

        if (existing) {
            await prisma.favorite.delete({
                where: { id: existing.id },
            });
            return { action: "removed" };
        } else {
            await prisma.favorite.create({
                data: {
                    userId,
                    plateId: plateRecord.id,
                },
            });
            return { action: "added" };
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
        return { error: "Failed to toggle favorite" };
    }
}
