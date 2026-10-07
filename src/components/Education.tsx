"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="py-20 md:py-24 bg-secondary border-t border-border relative" id="education">
      <div className="max-w-[1000px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Academic Background
        </div>
        
        <div className="flex flex-col gap-12 border-l border-border pl-8 relative">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            >
              <div className="absolute w-2 h-2 bg-foreground rounded-full -left-[37px] top-2" />
              
              <div className="flex flex-col gap-2">
                <div className="font-sans text-sm text-accent font-medium tracking-wide">
                  {edu.date}
                </div>
                <h3 className="font-serif text-2xl text-foreground m-0">
                  {edu.degree}
                </h3>
                <div className="font-sans text-base text-secondary-foreground">
                  {edu.institution}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
