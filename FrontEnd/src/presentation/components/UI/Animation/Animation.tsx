import React, { useEffect, useState, useRef, ReactNode } from "react";
import { cn } from "../../../../infrastructure/utils/cn";
import "./Animation.css";

interface AnimationWrapperProps {
  onScroll?: boolean;
  animationType?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  className?: string; // Add className here
}

export default function AnimationWrapper({
  onScroll = true,
  animationType = 1,
  children,
  className = "", // Default to an empty string if not provided
}: AnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(!onScroll);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const animationClasses = {
    1: "animate-fadeInUp",
    2: "animate-fadeInDown",
    3: "animate-fadeInLeft",
    4: "animate-fadeInRight",
    5: "animate-popUp",
  };

  useEffect(() => {
    if (!onScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [onScroll]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "transition-all duration-500",
        className,
        isVisible ? animationClasses[animationType] : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}
