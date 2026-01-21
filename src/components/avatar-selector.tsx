"use client";

import { Check, User, Bot, Smile, Zap, Crown, Ghost, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const AVATARS = [
    { id: "default", icon: User, label: "Default" },
    { id: "robot", icon: Bot, label: "Robot" },
    { id: "smile", icon: Smile, label: "Feliz" },
    { id: "zap", icon: Zap, label: "Energía" },
    { id: "crown", icon: Crown, label: "Rey" },
    { id: "ghost", icon: Ghost, label: "Fantasma" },
    { id: "plane", icon: Plane, label: "Viajero" },
];

interface AvatarSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentAvatar: string | null;
    onSelect: (avatarId: string) => void;
}

export function AvatarSelector({
    isOpen,
    onClose,
    currentAvatar,
    onSelect,
}: AvatarSelectorProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Elige tu Avatar</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4 py-4">
                    {AVATARS.map((avatar) => {
                        const Icon = avatar.icon;
                        const isSelected = (currentAvatar || "default") === avatar.id;

                        return (
                            <button
                                key={avatar.id}
                                onClick={() => onSelect(avatar.id)}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-2 rounded-xl transition-all hover:bg-muted relative group",
                                    isSelected ? "bg-primary/10 ring-2 ring-primary" : "border"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium truncate w-full text-center">
                                    {avatar.label}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Helper to render avatar icon by ID
export function getAvatarIcon(id: string | null | undefined, className?: string) {
    const avatar = AVATARS.find(a => a.id === id) || AVATARS[0];
    const Icon = avatar.icon;
    return <Icon className={className} />;
}
