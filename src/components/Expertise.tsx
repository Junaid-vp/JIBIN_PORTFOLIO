"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

export function Expertise() {
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
    <section className="pt-20 pb-10 md:pt-24 md:pb-12 bg-secondary border-t border-border relative" id="expertise">
      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Core Expertise
        </div>
        
        <div className="flex flex-col">
          {portfolioData.expertise.map((group, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8 border-b border-border last:border-b-0 last:pb-0 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <h3 className="font-serif text-2xl text-foreground m-0">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-4">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="font-sans text-sm text-secondary-foreground px-4 py-2 border border-border rounded-full bg-background transition-all duration-300 hover:bg-[var(--olive)] hover:text-white hover:border-[var(--olive)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
