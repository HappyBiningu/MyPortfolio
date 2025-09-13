import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Calendar, Trophy, Verified } from "lucide-react";
import { certifications } from "@/lib/constants";

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
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
            Professional Certifications
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Continuous learning and professional development in data science and technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="h-full"
            >
              <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div 
                        className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-3 rounded-full border border-yellow-500/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="h-6 w-6 text-yellow-400" />
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                          {cert.title}
                        </CardTitle>
                        <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
                          <Verified className="h-3 w-3" />
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-white/60 hover:text-white hover:bg-white/10 p-2"
                    >
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View certificate"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Certificate Status */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <Badge 
                      variant="outline" 
                      className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30 transition-colors"
                    >
                      <Trophy className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                    
                    {cert.date && (
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Calendar className="h-3 w-3" />
                        {cert.date}
                      </div>
                    )}
                  </div>

                  {/* Skills gained */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {cert.skills.slice(0, 3).map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs bg-white/10 text-white/80 border-white/20 hover:bg-white/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-white/10 text-white/60 border-white/20"
                        >
                          +{cert.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
