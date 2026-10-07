"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="projects">
      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Selected Projects
        </div>
        
        {isVisible && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {portfolioData.projects.map((project, index) => (
              <motion.div 
                key={project.id || index}
                variants={itemVariants}
                className={`group ${!showAll && index >= 3 ? 'hidden md:flex' : 'flex'} flex-col rounded-2xl overflow-hidden bg-secondary/40 border border-border/40 hover:border-border/80 hover:bg-secondary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5`}
              >
                <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-muted/20 animate-pulse" /> {/* Placeholder */}
                  <img
                    src={project.visualType}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold text-foreground shadow-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col">
                  <h3 className="font-serif text-xl mb-3 text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-2 flex flex-col gap-6">
                    {project.impact && (
                      <div className="p-4 rounded-xl bg-olive/5 border border-olive/10 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/60" />
                        <p className="text-sm font-medium text-foreground/90 pl-2">
                          <span className="text-accent/80 mr-2 uppercase tracking-wide text-xs">Impact</span> <br/>
                          {project.impact}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold bg-background/80 border border-border/60 rounded-md text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {isVisible && portfolioData.projects.length > 3 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center md:hidden"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-border text-xs tracking-widest font-semibold uppercase hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {showAll ? "Show Less" : "Load More Projects"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
