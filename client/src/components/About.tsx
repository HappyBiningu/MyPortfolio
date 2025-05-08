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
              I'm a certified Data and AI Engineer with a passion for transforming complex data into actionable insights. Currently pursuing my Bachelor's degree in Data Science and Informatics at Midlands State University, I blend academic knowledge with hands-on experience in software development and data analytics.
            </p>
            <p className="mb-4">
              My professional journey spans roles as a Junior Software Developer at Creative Studiosz LLC, where I implement design patterns and work within agile teams, and as an ICT Support & Data Analyst at Tobacco Sales Limited, where I developed Power BI dashboards and designed ETL processes for data accuracy.
            </p>
            <p>
              I thrive on building innovative solutions like my Sign Language Translation System and Financial Report Dashboard. With a strong foundation in Python, R, JavaScript, and SQL, I'm dedicated to using technology to solve real-world problems and drive business decisions through data-driven approaches.
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
