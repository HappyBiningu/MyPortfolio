
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, MapPin, Mail, Download, Sparkles, Star } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import TypingAnimation from "./TypingAnimation";
import GitHubActivityTicker from "./GitHubActivityTicker";
import FloatingParticles from "./FloatingParticles";
import InteractiveBackground from "./InteractiveBackground";

const roles = [
  "Data Scientist",
  "ML Engineer", 
  "Full-Stack Developer",
  "AI Enthusiast",
  "Software Engineer"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0">
        <InteractiveBackground />
        <FloatingParticles />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-magic animate-gradient" />
          <div className="absolute inset-0 pattern-grid opacity-20" />
        </div>

        {/* Floating orbs with physics */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Spinning constellation */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                left: `${50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Enhanced Profile Image */}
          <motion.div 
            className="lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <div className="relative perspective-1000">
              {/* Animated ring around image */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 scale-110"
                animate={{
                  rotate: 360,
                  scale: [1.1, 1.15, 1.1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Floating sparkles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </motion.div>
              ))}
              
              <motion.div
                className="relative glassmorphism-card rounded-full p-2"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img 
                  src={profileImage} 
                  alt="Tinotenda Biningu" 
                  className="relative rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover mx-auto border-4 border-white/30"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Floating status indicator */}
            <motion.div
              className="inline-flex items-center gap-2 glassmorphism-card px-4 py-2 mb-6 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/80 text-sm font-medium">Available for opportunities</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-heading font-bold mb-6 text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hi, I'm{" "}
                <motion.span 
                  className="text-gradient inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Tinotenda
                </motion.span>
              </motion.h1>

              <div className="text-2xl lg:text-4xl font-semibold text-white/90 mb-4 min-h-[3rem] flex items-center justify-center lg:justify-start">
                <span className="mr-3">I'm a</span>
                <TypingAnimation 
                  words={roles}
                  className="text-gradient font-bold"
                  typingSpeed={80}
                  deletingSpeed={50}
                  pauseDuration={2000}
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Software Developer & Data Scientist from Johannesburg, passionate about transforming data into insights. 
              Building scalable solutions with Python, JavaScript, and modern ML frameworks. 
              Currently focused on AI-powered applications and data engineering pipelines.
            </motion.p>

            {/* Enhanced action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="glassmorphism-card bg-gradient-magic text-white font-semibold px-8 hover:shadow-2xl">
                  <a href="#contact" className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="glassmorphism-card border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                  <a href="#projects" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View Projects
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="glassmorphism-card border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                  <a href="/assets/Tinotenda Happy -Finalcv.pdf" target="_blank" className="inline-flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex items-center gap-6 justify-center lg:justify-start mb-8"
            >
              {[
                { href: "https://github.com/HappyBiningu", icon: Github, color: "from-gray-600 to-gray-800" },
                { href: "https://linkedin.com/in/tinotendabiningu", icon: Linkedin, color: "from-blue-600 to-blue-800" },
                { href: "https://twitter.com/tinotendabiningu", icon: Twitter, color: "from-blue-400 to-blue-600" }
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glassmorphism-card p-3 rounded-full bg-gradient-to-br ${social.color} hover:scale-110 transition-all duration-300 hover:shadow-2xl`}
                  whileHover={{ y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <social.icon className="h-6 w-6 text-white" />
                </motion.a>
              ))}
            </motion.div>

            {/* Enhanced GitHub Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="glassmorphism-intense rounded-2xl p-6 border-animated"
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/90 text-sm font-semibold flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Live GitHub Activity
                </span>
              </div>
              <GitHubActivityTicker />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="glassmorphism-card w-6 h-10 rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-white to-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
