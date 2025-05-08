import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Target, Lightbulb, TrendingUp, BrainCircuit } from "lucide-react";

export default function Future() {
  return (
    <section id="future" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Future Goals
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <Card className="flex-grow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
                  <Compass className="h-6 w-6 text-primary" />
                  Career Vision
                </h3>
                <p className="mb-4">
                  My long-term vision is to become a leading expert in AI and machine learning, bridging the gap between cutting-edge data science research and practical business applications. I aim to work on projects that have meaningful social impact while pushing the boundaries of what's possible with data.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Complete Advanced Data Science Specializations</h4>
                      <p className="text-gray-600">Deepen expertise in specialized areas like natural language processing and computer vision.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Contribute to Open Source</h4>
                      <p className="text-gray-600">Actively contribute to open source data science libraries and frameworks to give back to the community.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <Card className="flex-grow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Areas of Interest
                </h3>
                <p className="mb-4">
                  I'm particularly interested in exploring emerging technologies and research areas that are reshaping the future of data science and software development.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Generative AI Applications
                    </h4>
                    <p className="text-gray-600 mt-1">Exploring how generative AI can be applied to create solutions in healthcare, finance, and education.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Ethical AI & Responsible Data Use
                    </h4>
                    <p className="text-gray-600 mt-1">Developing frameworks and practices for ethical AI implementation and responsible data management.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Edge Computing for ML Models
                    </h4>
                    <p className="text-gray-600 mt-1">Optimizing machine learning models for edge devices to enable real-time, on-device intelligence.</p>
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