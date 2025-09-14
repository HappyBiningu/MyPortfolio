
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Heart, Sparkles, Code, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#live-data", label: "Live Data" },
    { href: "#codelab", label: "Code Lab" },
    { href: "#ml-demo", label: "ML Demo" },
    { href: "#resources", label: "Resources" },
    { href: "#contact", label: "Contact" },
  ];
  
  return (
    <footer className="relative glassmorphism-intense border-t border-white/10 py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-aurora animate-gradient opacity-20" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="glassmorphism-card p-3 rounded-xl"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-8 w-8 text-gradient" />
              </motion.div>
              <div>
                <h3 className="text-3xl font-heading font-bold text-white">
                  TB<motion.span 
                    className="text-gradient"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >.</motion.span>
                </h3>
                <p className="text-white/70 text-sm">Data Scientist & AI Enthusiast</p>
              </div>
            </div>
            
            <motion.p
              className="text-white/80 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming data into insights and building innovative solutions. 
              Passionate about creating beautiful, functional applications that solve real-world problems.
            </motion.p>
            
            {/* Stats */}
            <motion.div
              className="flex gap-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { label: "Projects", value: "50+" },
                { label: "Experience", value: "3+ Years" },
                { label: "Technologies", value: "20+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glassmorphism-card p-3 rounded-lg text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-gradient font-bold text-lg">{stat.value}</div>
                  <div className="text-white/60 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-heading font-semibold text-white flex items-center gap-2 mb-6">
              <Code className="h-5 w-5 text-primary" />
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="glassmorphism-card text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 px-3 py-2 rounded-lg text-sm block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Let's Connect
            </h4>
            <p className="text-white/80 text-sm">
              Ready to start your next project? Download my resume or get in touch!
            </p>
            
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full glassmorphism-card bg-gradient-magic hover:shadow-2xl text-white font-semibold">
                  <a href="/assets/Tinotenda Happy -Finalcv.pdf" target="_blank" className="flex items-center gap-2 w-full justify-center">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="w-full glassmorphism-card border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  <a href="#contact" className="flex items-center gap-2 w-full justify-center">
                    <Heart className="h-4 w-4" />
                    Get In Touch
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom section */}
        <motion.div
          className="glassmorphism-card border-t border-white/10 pt-8 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-white/70 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              &copy; {currentYear} Tinotenda Biningu. Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-400 fill-current" />
              </motion.span>
              and lots of coffee ☕
            </motion.p>
            
            <motion.div
              className="flex items-center gap-2 text-xs text-white/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Currently available for opportunities</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
