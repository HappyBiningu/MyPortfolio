import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

export default function EnhancedSkillsAnimation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const skills: Skill[] = [
    { name: "Python", level: 95, category: "Programming", icon: "🐍", color: "from-blue-500 to-blue-600" },
    { name: "JavaScript", level: 90, category: "Programming", icon: "⚡", color: "from-yellow-500 to-yellow-600" },
    { name: "TypeScript", level: 88, category: "Programming", icon: "📘", color: "from-blue-600 to-blue-700" },
    { name: "React", level: 92, category: "Frontend", icon: "⚛️", color: "from-cyan-500 to-cyan-600" },
    { name: "Node.js", level: 87, category: "Backend", icon: "🟢", color: "from-green-500 to-green-600" },
    { name: "Machine Learning", level: 93, category: "Data Science", icon: "🤖", color: "from-purple-500 to-purple-600" },
    { name: "TensorFlow", level: 85, category: "AI/ML", icon: "🧠", color: "from-orange-500 to-orange-600" },
    { name: "PyTorch", level: 82, category: "AI/ML", icon: "🔥", color: "from-red-500 to-red-600" },
    { name: "PostgreSQL", level: 88, category: "Database", icon: "🐘", color: "from-indigo-500 to-indigo-600" },
    { name: "AWS", level: 80, category: "Cloud", icon: "☁️", color: "from-yellow-600 to-orange-500" },
    { name: "Docker", level: 85, category: "DevOps", icon: "🐳", color: "from-blue-400 to-blue-500" },
    { name: "Data Analysis", level: 94, category: "Data Science", icon: "📊", color: "from-teal-500 to-teal-600" },
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            Technical Expertise
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Proficiency across the full stack with specialized focus on data science and AI
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="perspective-1000"
                  >
                    <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className="font-medium text-white">
                              {skill.name}
                            </span>
                          </div>
                          <Badge 
                            variant="secondary"
                            className="bg-white/10 text-white border-white/20"
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        
                        {/* Animated Progress Bar */}
                        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          />
                          
                          {/* Shimmer effect on hover */}
                          {hoveredSkill === skill.name && (
                            <motion.div
                              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "400%" }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Hover details */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: hoveredSkill === skill.name ? 1 : 0,
                            height: hoveredSkill === skill.name ? "auto" : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 text-xs text-white/60"
                        >
                          {skill.level >= 90 && "Expert level proficiency"}
                          {skill.level >= 80 && skill.level < 90 && "Advanced proficiency"}
                          {skill.level >= 70 && skill.level < 80 && "Intermediate proficiency"}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* Interactive Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold mb-6 text-white">
            Quick Skills Overview
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={`cloud-${skill.name}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className="cursor-pointer"
              >
                <Badge
                  variant="outline"
                  className={`
                    bg-gradient-to-r ${skill.color} text-white border-none
                    hover:shadow-lg transition-all duration-300
                    px-3 py-1 text-sm font-medium
                  `}
                >
                  {skill.icon} {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}