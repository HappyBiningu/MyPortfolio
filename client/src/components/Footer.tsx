import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-heading font-bold">
              TB<span className="text-primary">.</span>
            </h3>
            <p className="text-gray-400 mt-2">Data Scientist & AI Enthusiast</p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <a 
                  href="#home" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#live-data" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#live-data')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Live Data
                </a>
              </li>
              <li>
                <a 
                  href="#codelab" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#codelab')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Code Lab
                </a>
              </li>
              <li>
                <a 
                  href="#ml-demo" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#ml-demo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ML Demo
                </a>
              </li>
              <li>
                <a 
                  href="#resources" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#resources')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Resources
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <Button variant="default" className="gap-2 bg-primary hover:bg-primary/90">
              <Download size={18} /> Download Resume
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {currentYear} Tinotenda Biningu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
