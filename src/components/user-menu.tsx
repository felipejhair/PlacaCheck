"use client";

import { useState } from "react";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { AvatarSelector, getAvatarIcon } from "@/components/avatar-selector";
import { updateUserAvatar } from "@/actions/user-actions";
import { cn } from "@/lib/utils";

export function UserMenu() {
    const { user, logout, updateUser } = useAuth();
    const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    if (!user) return null;

    const handleAvatarSelect = async (avatarId: string) => {
        setIsUploading(true);
        // Optimistic Update
        updateUser({ avatar: avatarId });
        setIsAvatarSelectorOpen(false);

        if (user.id) {
            await updateUserAvatar(user.id, avatarId);
        }
        setIsUploading(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border transition-all hover:scale-105 focus:ring-2 focus:ring-primary/50">
                        <div className="flex bg-secondary items-center justify-center w-full h-full">
                            {user.avatar ? (
                                getAvatarIcon(user.avatar, "w-6 h-6")
                            ) : (
                                <UserIcon className="w-6 h-6 text-muted-foreground" />
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsAvatarSelectorOpen(true)} className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Cambiar Avatar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AvatarSelector
                isOpen={isAvatarSelectorOpen}
                onClose={() => setIsAvatarSelectorOpen(false)}
                currentAvatar={user.avatar || "default"}
                onSelect={handleAvatarSelect}
            />
        </>
    );
}
