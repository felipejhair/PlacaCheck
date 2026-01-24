"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Star, MessageSquare, AlertTriangle, ShieldCheck, UserCircle, LogIn, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlateVisual } from "@/components/plate-visual";
import { ReviewModal } from "@/components/review-modal";
import { LoginModal } from "@/components/login-modal";
import { getPlate, createReview } from "@/actions/plate-actions";
import { useAuth } from "@/components/auth-provider";
import { useFavorites } from "@/components/favorites-context";
import { UserMenu } from "@/components/user-menu";
import { getAvatarIcon } from "@/components/avatar-selector";
import { cn } from "@/lib/utils";

interface Comment {
    id: number;
    user: string;
    userAvatar?: string;
    isAnonymous: boolean;
    rating: number;
    text: string;
    date: string;
    tags: string[];
}

export default function PlacePage({ params }: { params: { placa: string } }) {
    const placa = params.placa.toUpperCase();
    const { user, logout } = useAuth();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const [comments, setComments] = useState<Comment[]>([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showStickyTitle, setShowStickyTitle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show title when scrolled past 200px (approx height of plate visual)
            setShowStickyTitle(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Load from Database
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const plateData = await getPlate(placa);
                if (plateData && plateData.reviews) {
                    // Map DB reviews to UI format
                    const mappedComments: Comment[] = plateData.reviews.map((r: any) => ({
                        id: r.id,
                        user: r.isAnonymous ? "Anónimo" : r.user.name, // Handle anonymous
                        userAvatar: r.isAnonymous ? undefined : r.user.avatar,
                        isAnonymous: r.isAnonymous,
                        rating: r.rating,
                        text: r.text,
                        date: new Date(r.createdAt).toLocaleDateString(),
                        tags: r.tags ? JSON.parse(r.tags) : []
                    }));
                    setComments(mappedComments);
                } else {
                    setComments([]);
                }
            } catch (error) {
                console.error("Failed to fetch plate:", error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [placa]);

    // Calculate dynamic stats
    const totalRating = comments.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = (comments.length > 0 ? (totalRating / comments.length) : 0).toFixed(1);
    const numericRating = parseFloat(averageRating);

    const handleSubmitReview = async (review: { rating: number; text: string; tags: string[]; isAnonymous: boolean }) => {
        // Login is optional now
        // if (!user) { ... } removed

        try {
            // Pass user.id if exists, otherwise undefined (handled by action)
            const result = await createReview(placa, user?.id, review.rating, review.text, review.tags, review.isAnonymous);

            if (result.success && result.review) {
                const newComment: Comment = {
                    id: result.review.id,
                    user: review.isAnonymous ? "Anónimo" : (user ? user.name : "Anónimo"),
                    userAvatar: review.isAnonymous ? undefined : user?.avatar,
                    isAnonymous: review.isAnonymous,
                    rating: result.review.rating,
                    text: result.review.text,
                    date: "Justo ahora",
                    tags: review.tags,
                };
                setComments([newComment, ...comments]);
                setIsReviewModalOpen(false);
            } else {
                alert("Error al guardar la reseña. Intenta nuevamente.");
            }
        } catch (e) {
            console.error("Submit error", e);
        }
    };

    const toggleFavorite = () => {
        if (isFavorite(placa)) {
            removeFavorite(placa);
        } else {
            addFavorite(placa);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_hsl(var(--gradient-start))_0%,_hsl(var(--background))_100%)] pb-32 transition-colors duration-500">
            <header className={cn(
                "fixed top-0 z-50 w-full p-4 pt-safe transition-all duration-500",
                showStickyTitle ? "bg-gradient-to-b from-background via-background/90 to-transparent backdrop-blur-md pb-8" : "pointer-events-none"
            )}>
                <div className="container mx-auto max-w-lg flex items-center justify-between pointer-events-auto mt-2">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full bg-background/50 backdrop-blur-md shadow-sm border border-border/50 hover:bg-background/80">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Header Title (Sticky) */}
                    <div className={cn(
                        "absolute left-1/2 -translate-x-1/2 transition-all duration-500 transform pointer-events-none z-0",
                        showStickyTitle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    )}>
                        <div className="bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="font-bold font-mono tracking-widest text-xs truncate max-w-[120px]">{placa}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleFavorite}
                            className={cn(
                                "rounded-full bg-background/50 backdrop-blur-md shadow-sm border border-border/50 hover:bg-background/80 transition-all",
                                isFavorite(placa) && "text-red-500 bg-red-500/10 border-red-500/20"
                            )}
                        >
                            <Heart className={cn("w-5 h-5", isFavorite(placa) && "fill-current")} />
                        </Button>

                        {user ? (
                            <div className="bg-background/50 backdrop-blur-md rounded-full shadow-sm border border-border/50">
                                <UserMenu />
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => setIsLoginModalOpen(true)}
                                className="rounded-full font-semibold shadow-lg"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Acceder
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <main className="container max-w-lg mx-auto px-4 pt-28 space-y-8">

                {/* Hero / Plate Visual */}
                <section className="relative flex flex-col items-center justify-center py-8">
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-40 pointer-events-none" />
                    <div className="relative z-10 scale-110">
                        <PlateVisual placa={placa} />
                    </div>
                </section>

                {/* Stats Cards - Modern Grid */}
                <section className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 shadow-sm text-center space-y-1">
                        <div className="p-2 bg-yellow-500/10 rounded-full">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">{averageRating}</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Calificación</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 shadow-sm text-center space-y-1">
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">{comments.length}</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Reportes</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 shadow-sm text-center space-y-1">
                        <div className="p-2 bg-gray-500/10 rounded-full">
                            {comments.length === 0 ? (
                                <ShieldCheck className="w-5 h-5 text-gray-500" />
                            ) : numericRating >= 4 ? (
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                            ) : numericRating >= 2.5 ? (
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            )}
                        </div>
                        <span className="text-sm font-bold pt-1 leading-none">
                            {comments.length === 0 ? "Sin datos" : numericRating >= 4 ? "Seguro" : numericRating >= 2.5 ? "Precaución" : "Peligro"}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Estado</span>
                    </div>
                </section>

                {/* Reviews Timeline */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Actividad Reciente</h3>
                        <span className="text-xs text-muted-foreground">{comments.length} opiniones</span>
                    </div>

                    {comments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-50 bg-card/30 rounded-3xl border border-dashed">
                            <MessageSquare className="w-10 h-10" />
                            <p className="text-sm font-medium">Sé el primero en reportar esta placa.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 pl-4 border-l-2 border-primary/10 relative">
                            {comments.map((comment) => (
                                <div key={comment.id} className="relative pl-6 animate-in slide-in-from-bottom-4 duration-500">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background" />

                                    <div className="bg-card/50 backdrop-blur-sm p-4 rounded-2xl border shadow-sm space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border shadow-inner text-sm">
                                                    {comment.userAvatar && !comment.isAnonymous ? (
                                                        getAvatarIcon(comment.userAvatar, "w-6 h-6")
                                                    ) : (
                                                        <span className="font-bold text-muted-foreground">{comment.user[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm flex items-center gap-2">
                                                        {comment.user}
                                                        {comment.isAnonymous && <span className="bg-secondary px-1.5 py-0.5 rounded text-[10px] text-muted-foreground font-medium">Anónimo</span>}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">{comment.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">{comment.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-foreground/90 leading-relaxed">
                                            {comment.text}
                                        </p>

                                        {comment.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {comment.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium border border-border/50">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-40 pb-8 sm:pb-4">
                <div className="container max-w-lg mx-auto">
                    <Button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/25 rounded-2xl transition-transform active:scale-95"
                        size="lg"
                    >
                        Calificar esta placa
                    </Button>
                </div>
            </div>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmitReview}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
}
