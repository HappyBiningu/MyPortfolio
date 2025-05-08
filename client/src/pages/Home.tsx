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
import LiveDataProjects from "@/components/LiveDataProjects";
import CommunityContributions from "@/components/CommunityContributions";
import CodeChallenge from "@/components/CodeChallenge";
import MLDemo from "@/components/MLDemo";
import ResourceLibrary from "@/components/ResourceLibrary";
import Contact from "@/components/Contact";

export default function Home() {
  // Set page title and meta description
  useEffect(() => {
    document.title = "Tinotenda Biningu - Data Science Portfolio";
    // Add meta description for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Professional portfolio of Tinotenda Biningu, Data Scientist and AI Enthusiast. Explore projects, skills, and interactive coding resources.';
    document.head.appendChild(metaDescription);
    
    // Add Open Graph tags for better social sharing
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Tinotenda Biningu - Data Science Portfolio';
    
    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Professional portfolio showcasing data science projects, skills, and interactive coding resources.';
    
    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    
    document.head.appendChild(ogTitle);
    document.head.appendChild(ogDescription);
    document.head.appendChild(ogType);
    
    // Cleanup function to remove meta tags on unmount
    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDescription);
      document.head.removeChild(ogType);
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <LiveDataProjects />
      <Certifications />
      <CodeLab />
      <MLDemo />
      <CodeChallenge />
      <CommunityContributions />
      <ResourceLibrary />
      <Testimonials />
      <Future />
      <Contact />
    </>
  );
}
