import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";

export default function Hero() {
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={profileImage} 
              alt="Tinotenda Biningu" 
              className="rounded-full w-48 h-48 md:w-72 md:h-72 object-cover mx-auto md:mx-0 shadow-lg border-4 border-white"
            />
          </motion.div>

          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Hi, I'm <span className="text-primary">Tinotenda Biningu</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              Data & AI Engineer | Software Developer
            </p>
            <p className="text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              Certified Data and AI Engineer with expertise in Python, JavaScript, and SQL. Building innovative solutions that transform complex data into actionable insights and solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            
            <div className="flex mt-8 space-x-4 justify-center md:justify-start">
              <a 
                href="https://github.com/HappyBiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/tinotendabiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/tinotendabiningu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
