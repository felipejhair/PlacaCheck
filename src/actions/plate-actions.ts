"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPlate(licensePlate: string) {
    try {
        const plate = await prisma.plate.findUnique({
            where: { licensePlate },
            include: {
                reviews: {
                    orderBy: { createdAt: "desc" },
                    include: { user: true }
                },
            },
        });
        return plate;
    } catch (error) {
        console.error("Error fetching plate:", error);
        return null;
    }
}

export async function createReview(
    plate: string,
    userId: string | undefined,
    rating: number,
    text: string,
    tags: string[],
    isAnonymous: boolean = false
) {
    try {
        // 1. Find or Create Plate
        const plateRecord = await prisma.plate.upsert({
            where: { licensePlate: plate },
            update: {},
            create: { licensePlate: plate },
        });

        let finalUserId = userId;

        // 2. Handle Anonymous/Guest User (Not Logged In)
        // If logged in but chose anonymous, we still keep userId for record but mark isAnonymous=true
        if (!finalUserId) {
            // Find existing Guest user or create one
            let guestUser = await prisma.user.findUnique({
                where: { email: "guest@placacheck.com" } // Use a fixed email for the "Anonymous" actor
            });

            if (!guestUser) {
                guestUser = await prisma.user.create({
                    data: {
                        name: "Anónimo",
                        email: "guest@placacheck.com",
                        provider: "guest",
                        avatar: null // No avatar
                    }
                });
            }
            finalUserId = guestUser.id;
        }

        // 3. Create Review
        const review = await prisma.review.create({
            data: {
                plateId: plateRecord.id,
                userId: finalUserId!,
                rating,
                text,
                tags: JSON.stringify(tags),
                isAnonymous: isAnonymous, // Explicitly set anonymous flag
            },
        });

        revalidatePath(`/placa/${plate}`);
        return { success: true, review };
    } catch (error) {
        console.error("Error creating review:", error);
        return { success: false, error: "Failed to create review" };
    }
}
