import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, MapPin, Mail, Download } from "lucide-react";
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
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <InteractiveBackground />
        <FloatingParticles />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional dynamic gradients */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div 
            className="lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img 
                src={profileImage} 
                alt="Tinotenda Biningu" 
                className="relative rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover mx-auto shadow-2xl border-4 border-white/20 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 text-center lg:text-left order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 text-white">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Tinotenda
                </span>
              </h1>
              
              <div className="text-2xl lg:text-4xl font-semibold text-white/90 mb-4 min-h-[3rem] flex items-center justify-center lg:justify-start">
                <span className="mr-3">I'm a</span>
                <TypingAnimation 
                  words={roles}
                  className="text-primary font-bold"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                <a href="#contact" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                <a href="#projects" className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  View Projects
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                <a href="/assets/Tinotenda Happy -Finalcv.pdf" target="_blank" className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex items-center gap-6 justify-center lg:justify-start mb-8"
            >
              <a 
                href="https://github.com/HappyBiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/tinotendabiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/tinotendabiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </motion.div>

            {/* GitHub Activity Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Live GitHub Activity</span>
              </div>
              <GitHubActivityTicker />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
