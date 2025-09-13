import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, MapPin, Building, Calendar, ExternalLink } from "lucide-react";

export default function LinkedInShowcase() {
  // Professional information based on your LinkedIn profile
  const profileData = {
    name: "Tinotenda Biningu",
    title: "Software Developer & Data Scientist",
    location: "Johannesburg, Gauteng, South Africa",
    company: "Midlein",
    website: "https://www.midle.co.zw/",
    portfolio: "https://biningutinoportfolio.netlify.app",
    experience: [
      {
        role: "Software Developer & Data Scientist",
        company: "Midlein",
        location: "Johannesburg, Gauteng",
        period: "Current",
        description: "Building innovative data solutions and full-stack applications"
      }
    ],
    skills: [
      "Python", "JavaScript", "TypeScript", "SQL", "React", "Node.js",
      "Data Science", "Machine Learning", "Data Engineering", "ETL Pipelines",
      "TensorFlow", "PyTorch", "PostgreSQL", "MongoDB", "AWS", "GCP"
    ],
    highlights: [
      "🏆 GitHub Pull Shark Achievement (x2)",
      "⚡ Quickdraw Achievement",
      "🎯 YOLO Achievement",
      "📊 Data Engineering Specialist",
      "🤖 AI/ML Enthusiast",
      "🌐 Full-Stack Developer"
    ]
  };

  return (
    <section id="linkedin-profile" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with me on LinkedIn to explore my professional journey and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
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
                        {profileData.name}
                      </CardTitle>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {profileData.title}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    <a
                      href="https://www.linkedin.com/in/tinotendabiningu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      Connect
                    </a>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Current Role */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Current Role</h3>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {profileData.experience[0].company}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {profileData.experience[0].period}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {profileData.experience[0].description}
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {profileData.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills & Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Skills */}
            <Card className="border-purple-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Core Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 hover:scale-105 transition-transform"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-green-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Quick Links
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
                  className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-gray-600 dark:text-purple-400 dark:hover:bg-gray-700"
                >
                  <a
                    href={profileData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
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
                    href={profileData.website}
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