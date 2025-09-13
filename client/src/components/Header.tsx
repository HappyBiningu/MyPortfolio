import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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

// Flatten all links for mobile menu
const allLinks = [
  ...navStructure.standalone,
  ...navStructure.dropdowns.flatMap(dropdown => dropdown.items)
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-900/95 via-indigo-900/95 to-slate-900/95 backdrop-blur-md border-b border-white/10 z-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUM5MkFDIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 py-3 relative z-10">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-primary transition-colors">
              TB<span className="text-primary">.</span>
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
                className="font-medium text-white/80 hover:text-primary transition-all duration-300 relative group"
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            {/* Dropdown Menus */}
            {navStructure.dropdowns.map((dropdown, dropdownIndex) => (
              <motion.div
                key={dropdown.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (navStructure.standalone.length + dropdownIndex) }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className="group font-medium text-white/80 hover:text-primary transition-all duration-300 relative flex items-center gap-1 bg-transparent border-none outline-none focus:outline-none"
                    data-testid={`nav-dropdown-${dropdown.label.toLowerCase()}`}
                  >
                    {dropdown.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent 
                    className="bg-slate-900/95 backdrop-blur-md border-white/10 shadow-2xl min-w-[200px]"
                    sideOffset={5}
                  >
                    {dropdown.items.map((item, itemIndex) => (
                      <DropdownMenuItem
                        key={item.href}
                        className="text-white/80 hover:text-primary hover:bg-white/5 focus:bg-white/10 focus:text-primary transition-all duration-300 cursor-pointer"
                        data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-primary hover:bg-white/10 transition-all duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </nav>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 glassmorphism border-white/20 bg-white/5 backdrop-blur-md border-t overflow-hidden mt-4 rounded-lg"
            >
              <div className="flex flex-col space-y-2">
                {/* Mobile menu organized by sections */}
                
                {/* Standalone links first */}
                {navStructure.standalone.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="font-medium text-white/80 hover:text-primary transition-all duration-300 px-4 py-2 rounded-md hover:bg-white/10"
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                    {link.label}
                  </motion.a>
                ))}

                {/* Dropdown sections */}
                {navStructure.dropdowns.map((dropdown, dropdownIndex) => (
                  <div key={dropdown.label} className="space-y-1">
                    <div className="px-4 py-2 text-sm font-semibold text-primary uppercase tracking-wider">
                      {dropdown.label}
                    </div>
                    {dropdown.items.map((item, itemIndex) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * (navStructure.standalone.length + dropdownIndex * 4 + itemIndex) }}
                        className="font-medium text-white/70 hover:text-primary transition-all duration-300 px-6 py-2 rounded-md hover:bg-white/10 block"
                        data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                        {item.label}
                      </motion.a>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
