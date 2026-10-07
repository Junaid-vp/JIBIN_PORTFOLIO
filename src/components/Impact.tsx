"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

export function Impact() {
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
    <section className="py-20 md:py-24 bg-secondary relative" id="impact">
      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Selected Impact
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {portfolioData.impact.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-4 pb-8 border-b border-border relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none text-foreground tabular-nums">
                {item.metric}
              </div>
              <div className="font-sans text-lg font-medium text-secondary-foreground">
                {item.description}
              </div>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
