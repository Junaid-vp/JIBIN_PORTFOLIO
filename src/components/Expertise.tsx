"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  BarChart3, 
  Database, 
  Zap, 
  Code2, 
  Layers
} from "lucide-react";

const groupIcons: Record<string, React.ReactNode> = {
  "BI ADMINISTRATION": <ShieldCheck className="w-5 h-5 text-accent" />,
  "DATA & REPORTING": <BarChart3 className="w-5 h-5 text-accent" />,
  "DATA ENGINEERING": <Database className="w-5 h-5 text-accent" />,
  "AUTOMATION & INTEGRATION": <Zap className="w-5 h-5 text-accent" />,
  "PROGRAMMING": <Code2 className="w-5 h-5 text-accent" />,
};

interface CompetencyRowProps {
  group: string;
  skills: string[];
  index: number;
}

function CompetencyRow({ group, skills, index }: CompetencyRowProps) {
  // Multiply skills to ensure a wide continuous marquee
  const multiplier = Math.ceil(10 / skills.length);
  const baseList = Array.from({ length: multiplier }, () => skills).flat();
  const loopList = [...baseList, ...baseList];

  const isReverse = index % 2 === 1;
  const durations = [24, 28, 22, 26, 25];
  const duration = durations[index % durations.length];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 lg:gap-10 py-6 border-b border-border/70 last:border-b-0 items-center group">
      {/* Category Info */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="p-2.5 rounded-lg bg-background border border-border group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-300">
          {groupIcons[group] || <Layers className="w-5 h-5 text-accent" />}
        </span>
        <div className="flex flex-col">
          <h3 className="font-serif text-lg md:text-xl text-foreground m-0 group-hover:text-accent transition-colors duration-300">
            {group}
          </h3>
          <span className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground">
            {skills.length} Competencies
          </span>
        </div>
      </div>

      {/* Horizontal Running Marquee */}
      <div 
        className="relative overflow-hidden w-full select-none py-1 group/track"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        <div
          className={`flex items-center gap-3 w-max group-hover/track:[animation-play-state:paused] ${
            isReverse ? "marquee-track-reverse" : "marquee-track"
          }`}
          style={{
            animationDuration: `${duration}s`,
          }}
        >
          {loopList.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="font-sans text-sm text-secondary-foreground px-4 py-2 border border-border rounded-full bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 flex items-center gap-2.5 shrink-0 cursor-default hover:scale-105 hover:shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
              <span className="whitespace-nowrap font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <section className="pt-16 pb-16 md:pt-20 md:pb-20 bg-secondary border-t border-border relative overflow-hidden scroll-mt-20" id="expertise">
      {/* Embedded styles ensuring immediate 100% reliable execution in browser */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track {
          display: flex;
          animation: marqueeLeft 26s linear infinite;
          will-change: transform;
        }
        .marquee-track-reverse {
          display: flex;
          animation: marqueeRight 26s linear infinite;
          will-change: transform;
        }
        .group\\/track:hover .marquee-track,
        .group\\/track:hover .marquee-track-reverse {
          animation-play-state: paused !important;
        }
      `}} />

      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-3 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
              Core Expertise
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-normal tracking-tight m-0">
              Specialized Competencies
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wider uppercase font-sans">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Live Running Track &bull; Hover to Pause</span>
          </div>
        </div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {portfolioData.expertise.map((group, index) => (
            <CompetencyRow
              key={group.group}
              group={group.group}
              skills={group.skills}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
