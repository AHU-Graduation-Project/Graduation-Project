import React from "react";
import { motion } from "framer-motion"; // Ensure you import framer-motion

const GeneratingIndicator: React.FC = () => {
  return (
    <motion.div
      className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center space-y-4">
        <motion.div
          className="w-16 h-16 border-4 border-x-black dark:border-x-white border-t-transparent rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-lg font-medium text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Generating your personalized learning roadmap...
        </motion.p>
        <motion.p
          className="text-sm text-slate-500 dark:text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          This may take a few moments
        </motion.p>
      </div>
    </motion.div>
  );
};

export default GeneratingIndicator;
