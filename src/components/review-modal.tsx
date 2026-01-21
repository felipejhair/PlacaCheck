"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; text: string; tags: string[]; isAnonymous: boolean }) => void;
}

const AVAILABLE_TAGS = [
  "Amable",
  "Respeta Señales",
  "Usa Direccionales",
  "Imprudente",
  "Exceso Velocidad",
  "Agresivo",
  "Uso de Celular",
  "Cede el Paso"
];

export function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = () => {
    if (rating > 0 && text.trim().length > 0) {
      onSubmit({ rating, text, tags: selectedTags, isAnonymous });
      // Reset form
      setRating(0);
      setText("");
      setSelectedTags([]);
      setIsAnonymous(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%", x: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              transition: { type: "spring", damping: 25, stiffness: 300 }
            }}
            exit={{ opacity: 0, y: "100%", x: 0 }}
            className="fixed bottom-0 left-0 right-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-[101] pointer-events-none"
          >
            <div className="w-full bg-card border-t sm:border shadow-2xl rounded-t-3xl sm:rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto sm:w-[90%] sm:max-w-md pointer-events-auto">
              {/* Content Wrapper inside the positioning div */}
              <div className="flex justify-between items-center sticky top-0 bg-card z-10 pb-2">
                <h2 className="text-xl font-bold">Calificar Placa</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6 pb-6">
                {/* Star Rating */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="transition-transform hover:scale-110 focus:outline-none p-1"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={cn(
                            "w-10 h-10 transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-yellow-500 text-yellow-500"
                              : "fill-transparent text-muted-foreground/30"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {rating === 0 ? "Toca para calificar" : rating === 5 ? "¡Excelente!" : rating === 1 ? "Muy mal" : `${rating} Estrellas`}
                  </span>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold">Etiquetas (Max 3)</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "text-xs px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 active:scale-95",
                          selectedTags.includes(tag)
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-secondary/50 hover:bg-secondary border-transparent text-muted-foreground"
                        )}
                      >
                        {tag}
                        {selectedTags.includes(tag) && <Check className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Tu opinión</label>
                  <textarea
                    className="flex w-full rounded-xl border border-input bg-secondary/30 px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-none"
                    placeholder="Describe tu experiencia..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                {/* Anonymous Toggle (Only for logged in users) */}
                {user && (
                  <div className="flex items-center space-x-2 py-1">
                    <button
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={cn(
                        "flex items-center justify-center w-5 h-5 rounded border transition-colors",
                        isAnonymous ? "bg-primary border-primary text-primary-foreground" : "border-input bg-background"
                      )}
                    >
                      {isAnonymous && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <label onClick={() => setIsAnonymous(!isAnonymous)} className="text-sm cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
                      Ocultar mi identidad
                    </label>
                  </div>
                )}

                <Button
                  className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={rating === 0 || text.trim().length === 0}
                >
                  Publicar Reseña
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
