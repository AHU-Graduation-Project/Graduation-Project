import { motion } from 'framer-motion';

export default function SavingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex items-center justify-center"
    >
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-theme rounded-full blur-xl opacity-20 animate-pulse" />

        {/* Main content */}
        <div className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-xl">
          {/* Spinner */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full animate-[spin_1s_linear_infinite]" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-t-theme rounded-full animate-[spin_1.5s_linear_infinite]" />
            </div>
            <p className="text-lg font-medium text-slate-900 dark:text-white animate-pulse">
              Saving changes...
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
