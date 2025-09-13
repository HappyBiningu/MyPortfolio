import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquareQuote,
  Star,
  StarHalf,
  User,
  Building,
  Quote
} from "lucide-react";

type TestimonialType = {
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
};

const testimonials: TestimonialType[] = [
  {
    name: "Lucklard Mudyarabikwa",
    position: "Bank Supervisor",
    company: "People's Own Savings Bank",
    text: "Tinotenda demonstrated exceptional analytical skills during his time at our bank. His ability to quickly analyze data and provide insights helped us improve our customer service metrics significantly.",
    rating: 5,
  },
  {
    name: "Rushon Ganyo",
    position: "Software Developer",
    company: "Tobacco Sales Limited",
    text: "Working with Tinotenda was a pleasure. His technical skills in data analysis and software development made him a valuable asset to our team. He has a remarkable ability to transform complex data into actionable insights.",
    rating: 4.5,
  },
  {
    name: "Tafara Ushendibaba",
    position: "Manager",
    company: "Creative Studiosz",
    text: "Tinotenda's contribution to our software development projects was outstanding. His expertise in both data science and programming allowed us to deliver high-quality solutions to our clients on time and within scope.",
    rating: 5,
  },
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
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
            Client Testimonials
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            What colleagues and clients say about my work and contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="h-full"
            >
              <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group relative">
                {/* Quote decoration */}
                <div className="absolute top-4 right-4">
                  <Quote className="h-8 w-8 text-emerald-400/30 transform rotate-180" />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 rounded-full border border-emerald-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <User className="h-5 w-5 text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Quote className="h-4 w-4 text-emerald-400/50 mb-2" />
                    <p className="text-white/80 text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Rating and Company */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                      <span className="text-white/60 text-xs ml-1">
                        {testimonial.rating}/5
                      </span>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 transition-colors text-xs"
                    >
                      {testimonial.company}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 max-w-md mx-auto">
            <CardContent className="p-6">
              <MessageSquareQuote className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Work with me
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Ready to transform your data into actionable insights?
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none px-6 py-2 cursor-pointer">
                  <a href="#contact" className="text-sm font-medium">
                    Get in Touch
                  </a>
                </Badge>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}