import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquareQuote,
  Star,
  StarHalf
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
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageSquareQuote className="h-10 w-10 text-primary mb-4 opacity-20" />
                  <p className="mb-4 italic">{testimonial.text}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}