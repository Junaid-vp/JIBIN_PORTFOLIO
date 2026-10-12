"use client";

import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

function AnimatedMetric({ value, isInView, delay = 0 }: { value: string; isInView: boolean; delay?: number }) {
  const match = value.match(/(\d+)/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const numIndex = match ? value.indexOf(match[1]) : -1;
  const prefix = numIndex > 0 ? value.slice(0, numIndex) : "";
  const suffix = match ? value.slice(numIndex + match[1].length) : value;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds for smooth ease-out

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Smooth ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(easeOut * targetNumber);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(targetNumber);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, delay]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function ImpactCard({ item, index }: { item: (typeof portfolioData.impact)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col gap-4 pb-8 border-b border-border relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
    >
      <div className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none text-foreground tabular-nums tracking-tight">
        <AnimatedMetric value={item.metric} isInView={isInView} delay={(index % 3) * 0.12} />
      </div>
      <div className="font-sans text-lg font-medium text-secondary-foreground group-hover:text-accent transition-colors duration-300">
        {item.description}
      </div>
      <div className="font-sans text-sm text-muted-foreground leading-relaxed">
        {item.detail}
      </div>
    </motion.div>
  );
}

export function Impact() {
  return (
    <section className="py-20 md:py-24 bg-secondary relative" id="impact">
      <div className="max-w-[1440px] mx-auto px-[5%]">
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Selected Impact
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {portfolioData.impact.map((item, index) => (
            <ImpactCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
