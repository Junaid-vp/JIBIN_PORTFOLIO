"use client";

import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-24 bg-background relative scroll-mt-20" id="experience">
      <div className="max-w-[1000px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Professional Experience
        </div>
        
        <div className="relative border-l border-border pl-8 md:pl-12 flex flex-col gap-16">
          {portfolioData.experience.map((exp, index) => {
            const isExpanded = expandedId === index;
            
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                {/* Timeline node */}
                <div className="absolute w-3 h-3 bg-accent rounded-full -left-[38px] md:-left-[54px] top-2" />
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="font-sans text-sm text-accent font-medium tracking-wide">
                    {exp.date}
                  </div>
                  <h3 className="font-serif text-3xl text-foreground m-0 leading-tight">
                    {exp.role}
                  </h3>
                  <div className="font-sans text-lg text-secondary-foreground font-medium flex flex-col md:flex-row md:items-center gap-2">
                    {exp.company}
                    {exp.project && (
                      <>
                        <span className="hidden md:inline text-muted-foreground">|</span>
                        <span className="text-muted-foreground">Project: {exp.project}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="font-sans text-base text-muted-foreground mb-6">
                  {exp.shortSummary}
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  {exp.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--olive)] mt-2 shrink-0" />
                      <span className="font-sans text-sm text-secondary-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => toggleExpand(index)}
                  className="font-sans text-xs uppercase tracking-widest font-semibold text-accent flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {isExpanded ? "Hide Full Role" : "View Full Role"}
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 pb-4 flex flex-col gap-4">
                        {exp.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-1 h-1 rounded-full bg-border mt-2 shrink-0" />
                            <span className="font-sans text-sm text-muted-foreground leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
