import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { School, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12"
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
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <School className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold">Midlands State University</h3>
                    <p className="text-gray-600">Bachelor's degree in Data Science and Informatics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>March 2022 - Present</span>
                </div>
                <p className="mb-4">
                  Currently pursuing a comprehensive education in Data Science and Informatics, developing skills in statistics, 
                  programming, data analysis, and machine learning. The curriculum combines theoretical knowledge with practical 
                  applications in real-world data scenarios.
                </p>
                <p>
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
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold">Mutare Boys High School</h3>
                    <p className="text-gray-600">Advanced Level (Commercials)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>February 2020 - December 2021</span>
                </div>
                <p className="mb-4">
                  Completed Advanced Level education with 11 points focusing on commercial subjects, 
                  establishing a strong foundation in business and analytical thinking.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-primary">Economics</h4>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-primary">Business Enterprise Skills</h4>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-primary">Statistics</h4>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-primary">Communication Skills</h4>
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