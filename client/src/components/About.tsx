import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-4">My Journey</h3>
            <p className="mb-4">
              I'm a data science professional with a passion for machine learning, data visualization, and developing AI solutions. My journey in the world of data started with a curiosity about how information can be leveraged to make better decisions.
            </p>
            <p className="mb-4">
              With expertise in Python, R, and SQL, I've worked on various data science projects ranging from predictive modeling to natural language processing. I'm constantly learning and exploring new technologies to enhance my skills.
            </p>
            <p>
              Currently, I'm focused on developing machine learning models that can be deployed in real-world scenarios to solve complex business problems.
            </p>
            <div className="mt-8">
              <Button variant="secondary" className="gap-2">
                <Download size={18} /> Download Resume
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Data Science Work Environment" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
