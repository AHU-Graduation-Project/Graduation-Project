import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ConfigType = {
  position: { top?: string; left?: string; bottom?: string; right?: string };
  size: string;
  animation: {
    x: number[];
    y: number[];
    scale: number[];
    duration: number;
  };
};

type ConfigurationsType = {
  [key: number]: ConfigType[];
};

export default function BackgroundRays({
  option = 1,
  fullPage = false,
}: {
  option?: number;
  fullPage?: boolean;
}) {
  const [pageHeight, setPageHeight] = useState("100vh");
  const [objects, setObjects] = useState<ConfigType[]>([]);

  useEffect(() => {
    // Calculate page height if fullPage is true
    if (fullPage) {
      const updateHeight = () =>
        setPageHeight(`${document.documentElement.scrollHeight}px`);
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    } else {
      setPageHeight("100vh"); // Reset height if not fullPage
    }
  }, [fullPage]);

  useEffect(() => {
    const n = 25; // Change this to the number of objects you want
    const generatedObjects: ConfigType[] = [];

    for (let i = 0; i < n; i++) {
      let position = {};

      if (i % 2 === 0) {
        // Even index: use "top" and "left"
        position = {
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
        };
      } else {
        // Odd index: use "top" and "right" or "bottom" and "left"
        if (i % 3 === 0) {
          position = {
            top: `${Math.random() * 80}%`,
            right: `${Math.random() * 80}%`,
          };
        } else {
          position = {
            bottom: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          };
        }
      }

      const randomValue = Math.random() * 900 * (Math.random() < 0.5 ? 1 : -1);
      const randomValue2 = Math.random() * 900 * (Math.random() < 0.5 ? 1 : -1);
      const randomValue3 = Math.random() * 900 * (Math.random() < 0.5 ? 1 : -1);
      generatedObjects.push({
        position,
        size: "600",
        animation: {
          x: [randomValue, randomValue2, randomValue],
          y: [randomValue3, randomValue2, randomValue3],
          scale: [0.1, 0.15, 0.1],
          duration: 25,
        },
      });
    }

    setObjects(generatedObjects); // Update the state with the generated objects
  }, []); // Empty dependency array means this runs only once when the component mounts

  const configurations: ConfigurationsType = {
    1: [
      {
        position: { top: "0", left: "-1/4" },
        size: "600",
        animation: {
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          duration: 7,
        },
      },
      {
        position: { top: "40%", left: "-1/2" },
        size: "600",
        animation: {
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          duration: 7,
        },
      },
      {
        position: { bottom: "0", right: "0" },
        size: "600",
        animation: {
          x: [0, -400, 0],
          y: [0, -50, 0],
          scale: [1.2, 1, 1.2],
          duration: 7,
        },
      },
    ],
    2: objects, // Use dynamically generated objects
    3: [
      {
        position: { top: "0", left: "-1/4" },
        size: "600",
        animation: {
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          duration: 15,
        },
      },
      {
        position: { bottom: "0", right: "0" },
        size: "600",
        animation: {
          x: [0, -400, 0],
          y: [0, -50, 0],
          scale: [1.2, 1, 1.2],
          duration: 15,
        },
      },
    ],
    4: [
      {
        position: { top: "15%", left: "15%" },
        size: "600",
        animation: {
          x: [0, 150, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
          duration: 20,
        },
      },
    ],
  };

  const rays = configurations[option] || configurations[1];

  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div
      className="absolute inset-0 overflow-hidden z-0"
      style={{ height: pageHeight }}
    >
      <div className="absolute w-full h-full">
        {rays.map((ray, index) => (
          <motion.div
            key={index}
            className={`absolute bg-theme opacity-30 rounded-full  ${
              isMobile ? "" : "blur-3xl"
            }`}
            style={{
              ...ray.position,
              width: `${ray.size}px`,
              height: `${ray.size}px`,
            }}
            animate={{
              x: ray.animation.x,
              y: ray.animation.y,
              scale: ray.animation.scale,
            }}
            transition={{
              duration: ray.animation.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
