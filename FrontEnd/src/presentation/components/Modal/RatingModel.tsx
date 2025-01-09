import { X, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../infrastructure/utils/cn";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function RatingModal({
  isOpen,
  onClose,
  onSubmit,
}: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Rate this Roadmap</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    (hoveredRating ? star <= hoveredRating : star <= rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Comment Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Share your thoughts (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none"
              rows={4}
              placeholder="What did you like or dislike about this roadmap?"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={cn(
                "px-4 py-2 rounded-lg bg-theme text-white transition-colors",
                rating > 0
                  ? "hover:opacity-90"
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
