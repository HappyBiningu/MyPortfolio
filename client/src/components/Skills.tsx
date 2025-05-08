import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Database,
  GitBranch,
  BarChart3,
  PieChart,
  Server,
  Cloud,
  Table2,
  Flame,
  Code,
  FileJson,
  Monitor,
  PenTool
} from "lucide-react";

const technicalSkills = [
  { name: "Python", percentage: 95 },
  { name: "JavaScript", percentage: 88 },
  { name: "SQL", percentage: 90 },
  { name: "R", percentage: 85 },
  { name: "Data Visualization", percentage: 92 },
  { name: "Machine Learning", percentage: 88 },
];

const tools = [
  { name: "Pandas", icon: <PieChart className="h-8 w-8 text-primary" /> },
  { name: "Power BI", icon: <BarChart3 className="h-8 w-8 text-primary" /> },
  { name: "Django", icon: <Code className="h-8 w-8 text-primary" /> },
  { name: "React", icon: <PenTool className="h-8 w-8 text-primary" /> },
  { name: "PostgreSQL", icon: <Database className="h-8 w-8 text-primary" /> },
  { name: "Git", icon: <GitBranch className="h-8 w-8 text-primary" /> },
  { name: "Tableau", icon: <Table2 className="h-8 w-8 text-primary" /> },
  { name: "Azure", icon: <Cloud className="h-8 w-8 text-primary" /> },
  { name: "TensorFlow", icon: <Brain className="h-8 w-8 text-primary" /> },
  { name: "Node.js", icon: <FileJson className="h-8 w-8 text-primary" /> },
  { name: "Odoo", icon: <Monitor className="h-8 w-8 text-primary" /> },
  { name: "Docker", icon: <Server className="h-8 w-8 text-primary" /> },
];

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-6">Technical Skills</h3>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <Progress 
                    value={animate ? skill.percentage : 0} 
                    className="h-2"
                    style={{ 
                      transition: `width ${0.5 + index * 0.1}s ease-in-out`,
                      transitionDelay: `${0.3 + index * 0.1}s`
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-6">Tools & Frameworks</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="bg-gray-50 p-4 rounded-md text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  {tool.icon}
                  <p className="font-medium mt-2">{tool.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
