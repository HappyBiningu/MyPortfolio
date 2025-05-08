import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { useEffect } from "react";

export default function Home() {
  // Set page title and meta description
  useEffect(() => {
    document.title = "Tinotenda Biningu - Data Science Portfolio";
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </>
  );
}
