"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserAvatar(userId: string, avatarId: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { avatar: avatarId },
        });
        revalidatePath("/"); // Revalidate everywhere to update header
        return { success: true };
    } catch (error) {
        console.error("Error updating avatar:", error);
        return { success: false, error: "Failed to update avatar" };
    }
}
