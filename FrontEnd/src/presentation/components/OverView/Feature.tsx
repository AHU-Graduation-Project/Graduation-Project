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
      

    </motion.div>
  );
}
