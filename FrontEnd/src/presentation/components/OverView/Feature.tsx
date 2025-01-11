import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Hook to check if the device is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
  gradient: string;
  index: number;
}

export default function Feature({
  icon,
  title,
  description,
  imageUrl,
  linkText,
  linkUrl,
  gradient,
  index,
}: FeatureProps) {
  const isEven = index % 2 === 0;
  const isMobile = useIsMobile(); // Check if it's a mobile device

  // Memoize static icon and image URL to avoid unnecessary re-renders
  const IconMemo = useMemo(() => icon, [icon]);
  const ImageMemo = useMemo(() => imageUrl, [imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 50 }} // Adjust animation for mobile
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: isMobile ? 0.5 : 0.8, delay: index * 0.2 }} // Adjust duration for mobile
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-12 py-20`}
    >
      
      <div className="flex-1 space-y-6 p-10">
        <motion.div
          initial={{ scale: isMobile ? 0.8 : 0 }} // Adjust scale for mobile
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center`}
        >
          {IconMemo}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-slate-600 dark:text-slate-400"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to={linkUrl}
            className="group inline-flex items-center text-theme hover:opacity-80 font-medium"
          >
            {linkText}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="flex-1 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className={`absolute inset-0 ${gradient} rounded-2xl blur opacity-20`}
        />
        <motion.img
          src={ImageMemo}
          alt={title}
          className="relative rounded-2xl shadow-xl w-full object-cover aspect-video"
          whileHover={!isMobile ? { scale: 1.02 } : {}} // Disable hover effects on mobile
          transition={{ duration: 0.3 }}
          loading="lazy" // Enable lazy loading for mobile
        />
      </motion.div>
    </motion.div>
  );
}
