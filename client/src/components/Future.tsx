import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Target, Lightbulb, TrendingUp, BrainCircuit, Rocket, Globe, Users, Zap } from "lucide-react";

export default function Future() {
  const goals = [
    {
      icon: Target,
      title: "Advanced AI Specialization",
      description: "Deepen expertise in natural language processing, computer vision, and emerging AI technologies",
      timeframe: "Next 2 years",
      category: "Technical Growth"
    },
    {
      icon: BrainCircuit,
      title: "Open Source Leadership",
      description: "Actively contribute to major open source data science libraries and lead community projects",
      timeframe: "Ongoing",
      category: "Community Impact"
    },
    {
      icon: Rocket,
      title: "AI Research & Innovation",
      description: "Publish research on practical AI applications and contribute to the advancement of the field",
      timeframe: "Next 3 years",
      category: "Research"
    },
    {
      icon: Globe,
      title: "Global Impact Projects",
      description: "Work on AI solutions for social good, healthcare, and environmental sustainability",
      timeframe: "Long-term",
      category: "Social Impact"
    }
  ];

  const interests = [
    "Large Language Models & Generative AI",
    "MLOps & Production AI Systems", 
    "Ethical AI & Responsible Development",
    "Quantum Computing Applications",
    "Real-time Data Processing",
    "Edge AI & IoT Integration"
  ];

  return (
    <section id="future" className="py-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            Future Goals & Vision
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Charting the path forward in AI, data science, and technology innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Goals Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Compass className="h-6 w-6 text-cyan-400" />
                  Career & Technical Goals
                </CardTitle>
                <p className="text-white/70 text-sm">
                  My vision is to become a leading expert in AI and machine learning, bridging cutting-edge research with practical business applications that create meaningful social impact.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div 
                          className="bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 p-2 rounded-lg border border-cyan-500/30"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <goal.icon className="h-5 w-5 text-cyan-400" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm">{goal.title}</h4>
                          <p className="text-white/70 text-xs leading-relaxed mt-1">
                            {goal.description}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-white/10 text-white/80 border-white/20"
                            >
                              {goal.timeframe}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                            >
                              {goal.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Areas of Interest Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Research Interests */}
            <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  Research Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">{interest}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Goals */}
            <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Impact Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span className="text-white/80 text-sm">Mentor aspiring data scientists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-400" />
                    <span className="text-white/80 text-sm">Build AI for social good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-white/80 text-sm">Advance ethical AI practices</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-white/10">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30 w-full justify-center">
                    <Rocket className="h-3 w-3 mr-1" />
                    Ready for the Future
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}