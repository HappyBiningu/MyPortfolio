import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 left-8 z-40"
    >
      <Button
        size="icon"
        variant="outline"
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg"
        aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDarkMode ? (
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-700" />
        )}
      </Button>
    </motion.div>
  );
}