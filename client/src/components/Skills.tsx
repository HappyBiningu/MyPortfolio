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
  PenTool,
  Zap
} from "lucide-react";

const technicalSkills = [
  { name: "Python", percentage: 95, color: "text-yellow-400" },
  { name: "JavaScript", percentage: 88, color: "text-blue-400" },
  { name: "SQL", percentage: 90, color: "text-green-400" },
  { name: "R", percentage: 85, color: "text-purple-400" },
  { name: "Data Visualization", percentage: 92, color: "text-pink-400" },
  { name: "Machine Learning", percentage: 88, color: "text-emerald-400" },
];

const tools = [
  { name: "Pandas", icon: <PieChart className="h-8 w-8 text-yellow-400" /> },
  { name: "Power BI", icon: <BarChart3 className="h-8 w-8 text-blue-400" /> },
  { name: "Django", icon: <Code className="h-8 w-8 text-green-400" /> },
  { name: "React", icon: <PenTool className="h-8 w-8 text-cyan-400" /> },
  { name: "PostgreSQL", icon: <Database className="h-8 w-8 text-blue-500" /> },
  { name: "Git", icon: <GitBranch className="h-8 w-8 text-orange-400" /> },
  { name: "Tableau", icon: <Table2 className="h-8 w-8 text-indigo-400" /> },
  { name: "Azure", icon: <Cloud className="h-8 w-8 text-sky-400" /> },
  { name: "TensorFlow", icon: <Brain className="h-8 w-8 text-orange-500" /> },
  { name: "Node.js", icon: <FileJson className="h-8 w-8 text-green-500" /> },
  { name: "Odoo", icon: <Monitor className="h-8 w-8 text-purple-400" /> },
  { name: "Docker", icon: <Server className="h-8 w-8 text-blue-600" /> },
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
    <section id="skills" className="py-16 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUM5MkFDIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Zap className="h-8 w-8 text-emerald-400" />
            My Skills & Expertise
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Technical proficiencies and tools I use to build innovative solutions and analyze complex data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 p-8 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-6 text-white flex items-center gap-2">
              <Code className="h-5 w-5 text-emerald-400" />
              Technical Skills
            </h3>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium text-white/90 ${skill.color}`}>{skill.name}</span>
                    <span className="text-white/60 font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: animate ? `${skill.percentage}%` : 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.3 + index * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 p-8 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-6 text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" />
              Tools & Frameworks
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="glassmorphism border-white/10 bg-white/5 hover:bg-white/15 transition-all duration-300 p-4 rounded-md text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {tool.icon}
                  </div>
                  <p className="font-medium mt-2 text-white/80 text-sm">{tool.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm">Continuously learning and evolving</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
