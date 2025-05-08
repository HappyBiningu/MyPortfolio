import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Future from "@/components/Future";
import CodeLab from "@/components/CodeLab";
import Contact from "@/components/Contact";

export default function Home() {
  // Set page title and meta description
  useEffect(() => {
    document.title = "Tinotenda Biningu - Data Science Portfolio";
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Testimonials />
      <Future />
      <CodeLab />
      <Contact />
    </>
  );
}
