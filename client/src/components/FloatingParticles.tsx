import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(59, 130, 246, 0.6)", // blue
      "rgba(168, 85, 247, 0.6)", // purple
      "rgba(14, 165, 233, 0.6)", // sky
      "rgba(139, 92, 246, 0.6)", // violet
      "rgba(67, 56, 202, 0.6)", // indigo
    ];

    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 20, particle.y + 20, particle.y],
            x: [particle.x, particle.x + 10, particle.x - 10, particle.x],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Floating code symbols */}
      {["{}", "[]", "()", "</>", "π", "Σ", "∞", "λ"].map((symbol, index) => (
        <motion.div
          key={`symbol-${index}`}
          className="absolute text-blue-300/20 font-mono text-xl select-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}