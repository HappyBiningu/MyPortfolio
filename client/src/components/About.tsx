import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Building, ExternalLink, Linkedin, Github, Globe, Star } from "lucide-react";

export default function About() {
  // Professional information based on LinkedIn and GitHub profiles
  const professionalData = {
    name: "Tinotenda Biningu",
    title: "Software Developer & Data Scientist",
    location: "Johannesburg, Gauteng, South Africa",
    company: "Midlein",
    website: "https://www.midle.co.zw/",
    portfolio: "https://biningutinoportfolio.netlify.app",
    githubAchievements: ["Pull Shark (x2)", "Quickdraw", "YOLO"],
    coreSkills: [
      "Python", "JavaScript", "TypeScript", "SQL", "React", "Node.js",
      "Data Science", "Machine Learning", "Data Engineering", "TensorFlow", "PyTorch"
    ],
    expertise: [
      "ETL Pipeline Development",
      "AI/ML Model Development", 
      "Full-Stack Web Development",
      "Data Visualization & Analytics",
      "Cloud Solutions (AWS, GCP)"
    ]
  };

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            About Me
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Software Developer & Data Scientist passionate about transforming data into insights and building innovative solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile & Journey */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      TB
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">
                        {professionalData.name}
                      </CardTitle>
                      <p className="text-blue-300 font-medium">
                        {professionalData.title}
                      </p>
                      <div className="flex items-center gap-4 text-white/60 text-sm mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {professionalData.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {professionalData.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Professional Journey */}
                <div>
                  <h3 className="font-semibold text-white mb-3">My Professional Journey</h3>
                  <div className="space-y-3 text-white/80">
                    <p>
                      Based in <strong>Johannesburg, Gauteng</strong>, I'm a passionate Software Developer and Data Scientist 
                      currently working at <strong>Midlein</strong>, where I specialize in building innovative data solutions 
                      and full-stack applications that drive business value.
                    </p>
                    <p>
                      My expertise spans the entire data science pipeline - from ETL development and data engineering 
                      to machine learning model deployment and scalable web applications. I thrive on transforming 
                      complex data into actionable insights and creating solutions that solve real-world problems.
                    </p>
                    <p>
                      With a strong foundation in <strong>Python, JavaScript, and modern ML frameworks</strong>, 
                      I'm dedicated to staying at the forefront of technology, continuously learning and applying 
                      cutting-edge techniques in AI, data engineering, and software development.
                    </p>
                  </div>
                </div>

                {/* GitHub Achievements */}
                <div>
                  <h3 className="font-semibold text-white mb-3">GitHub Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {professionalData.githubAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge className="bg-white/10 text-green-300 border-white/20">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Expertise Areas */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Areas of Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {professionalData.expertise.map((area, index) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-white/80"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href="/assets/Tinotenda Happy -Finalcv.pdf" target="_blank" className="inline-flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="#contact" className="inline-flex items-center gap-2">
                        Get in Touch
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills & Links Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Core Technologies */}
            <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Core Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {professionalData.coreSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-blue-300 border-white/20 hover:scale-105 transition-transform cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Links */}
            <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start border-white/20 text-blue-300 hover:bg-white/10"
                >
                  <a
                    href="https://www.linkedin.com/in/tinotendabiningu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start border-white/20 text-white/80 hover:bg-white/10"
                >
                  <a
                    href="https://github.com/HappyBiningu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Profile
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start border-white/20 text-purple-300 hover:bg-white/10"
                >
                  <a
                    href={professionalData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Portfolio Website
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start border-white/20 text-green-300 hover:bg-white/10"
                >
                  <a
                    href={professionalData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    Company Website
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
