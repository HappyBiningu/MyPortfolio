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
    <section id="about" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me & Professional Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            <Card className="h-full border-blue-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      TB
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">
                        {professionalData.name}
                      </CardTitle>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {professionalData.title}
                      </p>
                      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mt-1">
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
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">My Professional Journey</h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
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
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">GitHub Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {professionalData.githubAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:text-green-300">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Expertise Areas */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Areas of Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {professionalData.expertise.map((area, index) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
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
            <Card className="border-purple-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
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
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 hover:scale-105 transition-transform cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Links */}
            <Card className="border-green-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
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
                  className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
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
                  className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-gray-600 dark:text-purple-400 dark:hover:bg-gray-700"
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
                  className="w-full justify-start border-green-300 text-green-600 hover:bg-green-50 dark:border-gray-600 dark:text-green-400 dark:hover:bg-gray-700"
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
