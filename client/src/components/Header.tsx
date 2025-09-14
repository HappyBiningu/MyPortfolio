
import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navStructure = {
  standalone: [
    { href: "#home", label: "Home" },
    { href: "#future", label: "Future Goals" },
    { href: "#contact", label: "Contact" },
  ],
  dropdowns: [
    {
      label: "About",
      items: [
        { href: "#about", label: "About Me" },
        { href: "#education", label: "Education" },
        { href: "#skills", label: "Skills" },
      ]
    },
    {
      label: "Portfolio", 
      items: [
        { href: "#projects", label: "Projects" },
        { href: "#live-data", label: "Live Data" },
        { href: "#certifications", label: "Certifications" },
      ]
    },
    {
      label: "Interactive",
      items: [
        { href: "#codelab", label: "Code Lab" },
        { href: "#ml-demo", label: "ML Demo" },
        { href: "#code-challenge", label: "Challenges" },
        { href: "#community", label: "Community" },
      ]
    },
    {
      label: "Resources",
      items: [
        { href: "#resources", label: "Resources" },
        { href: "#testimonials", label: "Testimonials" },
      ]
    }
  ]
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 glassmorphism-card bg-primary text-primary-foreground px-4 py-2 rounded-lg z-[100]"
      >
        Skip to main content
      </a>
      
      <motion.header 
        className="fixed top-0 left-0 w-full glassmorphism-intense border-b border-white/10 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Animated background mesh */}
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute inset-0 bg-gradient-aurora animate-gradient opacity-10" />

        <div className="container mx-auto px-4 py-3 relative z-10">
          <nav className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-primary transition-all duration-300 flex items-center gap-2">
                <motion.div
                  className="glassmorphism-card p-2 rounded-lg"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="h-6 w-6 text-gradient" />
                </motion.div>
                TB<motion.span 
                  className="text-gradient"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >.</motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Standalone Links */}
              {navStructure.standalone.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glassmorphism-card px-4 py-2 rounded-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
                  whileHover={{ y: -2 }}
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
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-magic rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* Enhanced Dropdown Menus */}
              {navStructure.dropdowns.map((dropdown, dropdownIndex) => (
                <motion.div
                  key={dropdown.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (navStructure.standalone.length + dropdownIndex) }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="glassmorphism-card px-4 py-2 rounded-lg group font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-1 bg-transparent border-none outline-none focus:outline-none">
                      {dropdown.label}
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="glassmorphism-intense border-white/20 shadow-2xl min-w-[200px] rounded-xl">
                      {dropdown.items.map((item, itemIndex) => (
                        <DropdownMenuItem
                          key={item.href}
                          className="text-white/80 hover:text-white hover:bg-white/10 focus:bg-white/15 focus:text-white transition-all duration-300 cursor-pointer rounded-lg mx-2 my-1"
                          onClick={(e) => {
                            if (item.href.startsWith('#')) {
                              e.preventDefault();
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                          }}
                        >
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.label}
                          </motion.div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleMenu}
                  className="md:hidden glassmorphism-card text-white hover:text-primary hover:bg-white/10 transition-all duration-300"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </nav>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                className="md:hidden glassmorphism-intense border-t border-white/20 mt-4 rounded-2xl overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* Mobile menu organized by sections */}
                  {navStructure.standalone.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="block glassmorphism-card font-medium text-white/80 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/10"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const element = document.querySelector(link.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            closeMenu();
                          }
                        }
                      }}
                    >
                      <motion.div whileHover={{ x: 5 }}>
                        {link.label}
                      </motion.div>
                    </motion.a>
                  ))}

                  {/* Dropdown sections */}
                  {navStructure.dropdowns.map((dropdown, dropdownIndex) => (
                    <motion.div
                      key={dropdown.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + dropdownIndex * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="glassmorphism-card px-4 py-2 rounded-lg">
                        <h4 className="text-sm font-bold text-gradient uppercase tracking-wider flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: dropdownIndex * 0.5 }}
                          />
                          {dropdown.label}
                        </h4>
                      </div>
                      {dropdown.items.map((item, itemIndex) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.05 }}
                          className="block font-medium text-white/70 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg hover:bg-white/5 ml-4"
                          onClick={(e) => {
                            if (item.href.startsWith('#')) {
                              e.preventDefault();
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                                closeMenu();
                              }
                            }
                          }}
                        >
                          <motion.div whileHover={{ x: 5 }}>
                            {item.label}
                          </motion.div>
                        </motion.a>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
