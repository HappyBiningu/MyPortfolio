import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { School, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    <School className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-white">Midlands State University</h3>
                    <p className="text-white/80">Bachelor's degree in Data Science and Informatics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <Calendar className="h-4 w-4" />
                  <span>March 2022 - Present</span>
                </div>
                <p className="mb-4 text-white/80">
                  Currently pursuing a comprehensive education in Data Science and Informatics, developing skills in statistics, 
                  programming, data analysis, and machine learning. The curriculum combines theoretical knowledge with practical 
                  applications in real-world data scenarios.
                </p>
                <p className="text-white/80">
                  Key coursework includes: Data Structures and Algorithms, Database Systems, Machine Learning, 
                  Statistical Analysis, Data Visualization, and Big Data Technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    <BookOpen className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-white">Mutare Boys High School</h3>
                    <p className="text-white/80">Advanced Level (Commercials)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <Calendar className="h-4 w-4" />
                  <span>February 2020 - December 2021</span>
                </div>
                <p className="mb-4 text-white/80">
                  Completed Advanced Level education with 11 points focusing on commercial subjects, 
                  establishing a strong foundation in business and analytical thinking.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white/10 p-3 rounded-md backdrop-blur-sm">
                    <h4 className="font-medium text-blue-300">Economics</h4>
                  </div>
                  <div className="bg-white/10 p-3 rounded-md backdrop-blur-sm">
                    <h4 className="font-medium text-blue-300">Business Enterprise Skills</h4>
                  </div>
                  <div className="bg-white/10 p-3 rounded-md backdrop-blur-sm">
                    <h4 className="font-medium text-blue-300">Statistics</h4>
                  </div>
                  <div className="bg-white/10 p-3 rounded-md backdrop-blur-sm">
                    <h4 className="font-medium text-blue-300">Communication Skills</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}