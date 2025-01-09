import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../infrastructure/utils/cn";
import {
  AlertCircle,
  MessageCircle,
  BookOpen,
  MoreVertical,
  Star,
} from "lucide-react";

interface FloatingMenuProps {
  showFloatingMenu: boolean;
  setShowFloatingMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCourses: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>;
  showInfo: boolean;
  showChat: boolean;
  showCourses: boolean;
}

export default function FloatingMenu({
  showFloatingMenu,
  setShowFloatingMenu,
  setShowInfo,
  setShowChat,
  setShowCourses,
  setShowRating,
  showInfo,
  showChat,
  showCourses,
}: FloatingMenuProps) {
  const floatingButtonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
    exit: { opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <AnimatePresence mode="popLayout">
        {showFloatingMenu && (
          <>
            {/* Buttons */}
            <motion.div
              className="relative group"
              variants={floatingButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={3}
            >
              <button
                onClick={() => setShowRating(true)}
                className={cn(
                  "p-4 rounded-full shadow-lg bg-theme text-white hover:scale-110"
                )}
              >
                <Star className="w-6 h-6" />
              </button>
            </motion.div>
            <motion.div
              className="relative group"
              variants={floatingButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={2}
            >
              <button
                onClick={() => setShowCourses(!showCourses)}
                className={cn(
                  "p-4 rounded-full shadow-lg bg-theme text-white hover:scale-110"
                )}
              >
                <BookOpen className="w-6 h-6" />
              </button>
            </motion.div>
            <motion.div
              className="relative group"
              variants={floatingButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1}
            >
              <button
                onClick={() => setShowChat(!showChat)}
                className={cn(
                  "p-4 rounded-full shadow-lg bg-theme text-white hover:scale-110"
                )}
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            </motion.div>
            <motion.div
              className="relative group"
              variants={floatingButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0}
            >
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={cn(
                  "p-4 rounded-full shadow-lg bg-theme text-white hover:scale-110"
                )}
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setShowFloatingMenu(!showFloatingMenu)}
        className={cn(
          "p-4 rounded-full shadow-lg bg-theme text-white hover:scale-110"
        )}
      >
        <MoreVertical className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
