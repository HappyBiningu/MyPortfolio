import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGitHubStats } from "@/hooks/useGitHubData";
import {
  Brain,
  Database,
  GitBranch,
  BarChart3,
  PieChart,
  Server,
  Cloud,
  Table2,
  Code,
  FileJson,
  Monitor,
  PenTool,
  TrendingUp,
  Zap
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
];

// Static technical skills with manual percentages
const technicalSkills = [
  { name: "Python", percentage: 95, color: "#3776AB" },
  { name: "JavaScript", percentage: 88, color: "#F7DF1E" },
  { name: "SQL", percentage: 90, color: "#4479A1" },
  { name: "R", percentage: 85, color: "#276DC3" },
  { name: "Data Visualization", percentage: 92, color: "#FF6B6B" },
  { name: "Machine Learning", percentage: 88, color: "#4ECDC4" },
];

const tools = [
  { name: "Pandas", icon: <PieChart className="h-8 w-8 text-blue-500" /> },
  { name: "Power BI", icon: <BarChart3 className="h-8 w-8 text-yellow-500" /> },
  { name: "Django", icon: <Code className="h-8 w-8 text-green-600" /> },
  { name: "React", icon: <PenTool className="h-8 w-8 text-blue-400" /> },
  { name: "PostgreSQL", icon: <Database className="h-8 w-8 text-blue-600" /> },
  { name: "Git", icon: <GitBranch className="h-8 w-8 text-orange-500" /> },
  { name: "Tableau", icon: <Table2 className="h-8 w-8 text-orange-600" /> },
  { name: "Azure", icon: <Cloud className="h-8 w-8 text-blue-500" /> },
  { name: "TensorFlow", icon: <Brain className="h-8 w-8 text-orange-500" /> },
  { name: "Node.js", icon: <FileJson className="h-8 w-8 text-green-500" /> },
  { name: "Odoo", icon: <Monitor className="h-8 w-8 text-purple-500" /> },
  { name: "Docker", icon: <Server className="h-8 w-8 text-blue-400" /> },
];

function GitHubLanguageChart({ languages }: { languages: any[] }) {
  if (!languages || languages.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-white/60">No language data available</p>
      </div>
    );
  }

  const pieData = languages.slice(0, 6).map((lang, index) => ({
    name: lang.language,
    value: parseFloat(lang.percentage),
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={250}>
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: any) => [`${value}%`, 'Usage']}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-2">
        {pieData.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-white text-sm font-medium">{lang.name}</span>
            <span className="text-white/70 text-xs ml-auto">{lang.value}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillProgressBar({ skill, index, animate }: { skill: any; index: number; animate: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-medium text-white">{skill.name}</span>
        </div>
        <span className="text-white font-bold">{skill.percentage}%</span>
      </div>
      <div className="relative">
        <Progress 
          value={animate ? skill.percentage : 0} 
          className="h-3 bg-white/20"
          style={{
            transition: `all 0.8s ease-in-out ${0.2 + index * 0.1}s`,
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.percentage}%` : 0 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          className="absolute top-0 left-0 h-3 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  );
}

function ToolCard({ tool, index }: { tool: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.2 }}
        className="mb-3"
      >
        {tool.icon}
      </motion.div>
      <p className="font-medium text-white group-hover:text-primary transition-colors">{tool.name}</p>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="glassmorphism border-white/20 bg-white/5">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-white/20" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 bg-white/20" />
                <Skeleton className="h-4 w-8 bg-white/20" />
              </div>
              <Skeleton className="h-3 w-full bg-white/20" />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="glassmorphism border-white/20 bg-white/5">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-white/20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full bg-white/20 mb-4" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 bg-white/20" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EnhancedSkills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { data: stats, isLoading, isError } = useGitHubStats();

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
    <section 
      id="skills" 
      className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0yMCAyMGMwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMHYyMGgyMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12 text-white flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="h-8 w-8 text-primary" />
          My Skills & Technologies
        </motion.h2>

        {isLoading && <LoadingSkeleton />}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Technical Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {technicalSkills.map((skill, index) => (
                      <SkillProgressBar 
                        key={skill.name} 
                        skill={skill} 
                        index={index} 
                        animate={animate} 
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* GitHub Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    GitHub Language Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats && stats.languages ? (
                    <GitHubLanguageChart languages={stats.languages} />
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-white/60">
                        {isError ? "Failed to load language data" : "Loading language data..."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Tools & Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Tools & Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tools.map((tool, index) => (
                  <ToolCard key={tool.name} tool={tool} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}