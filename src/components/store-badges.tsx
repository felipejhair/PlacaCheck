import Link from "next/link";
import { cn } from "@/lib/utils";

export function StoreBadges({ className }: { className?: string }) {
    return (
        <div className={cn("hidden md:flex items-center gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700", className)}>
            {/* Apple App Store Badge */}
            <Link
                href="#" // TODO: Add real link
                className="transition-transform hover:scale-105 active:scale-95"
                aria-label="Download on the App Store"
            >
                <img
                    src="/badges/app-store-badge.svg"
                    alt="Download on the App Store"
                    className="h-10 w-auto" // Fixed height, auto width
                />
            </Link>

            {/* Google Play Store Badge */}
            <Link
                href="#" // TODO: Add real link
                className="transition-transform hover:scale-105 active:scale-95"
                aria-label="Get it on Google Play"
            >
                <img
                    src="/badges/google-play-badge.svg"
                    alt="Get it on Google Play"
                    className="h-[40px] w-auto" // Explicit pixel match if needed, but h-10 is usually 40px
                />
            </Link>
        </div>
    );
}
