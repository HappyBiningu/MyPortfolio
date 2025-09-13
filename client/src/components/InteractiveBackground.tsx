import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic gradient that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #3b82f6, #8b5cf6, #06b6d4)",
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 30,
        }}
      />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                animate={{
                  strokeOpacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className={`w-4 h-4 ${
              i % 3 === 0
                ? "bg-blue-400/20 rounded-full"
                : i % 3 === 1
                ? "bg-purple-400/20 rotate-45"
                : "bg-cyan-400/20 rounded-sm"
            }`}
          />
        </motion.div>
      ))}

      {/* Pulsing rings */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400/20 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-400/20 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}