"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useState } from "react";

export function Hero() {
  const [dataNodes, setDataNodes] = useState<any[]>([]);
  const [dataLines, setDataLines] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    setDataNodes(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    })));

    setDataLines(Array.from({ length: 8 }).map((_, i) => {
      const isHorizontal = Math.random() > 0.5;
      return {
        id: i,
        top: isHorizontal ? `${Math.random() * 100}%` : 0,
        left: isHorizontal ? 0 : `${Math.random() * 100}%`,
        width: isHorizontal ? "100%" : "1px",
        height: isHorizontal ? "1px" : "100%",
        delay: Math.random() * 2,
      };
    }));
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden" id="about">
      <div className="max-w-[1440px] mx-auto px-[5%] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-sans text-xs font-semibold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
             POWER BI &middot; DATA ANALYTICS &middot; REPORTING
          </div>
          <h1 className="font-serif text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] tracking-tight uppercase m-0 text-foreground">
            {portfolioData.identity.name.split(" ").map((name, i) => (
              <span key={i} className="block">{name}</span>
            ))}
          </h1>
          <h2 className="font-sans text-[clamp(1rem,2vw,1.25rem)] text-accent font-medium mb-4">
            {portfolioData.identity.title}
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-[480px]">
            {portfolioData.identity.shortProfile}
          </p>
        </motion.div>

        <motion.div 
          className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center rounded-sm overflow-hidden border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Main Portrait Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[var(--olive)]/10 dark:bg-[var(--olive)]/20 mix-blend-multiply dark:mix-blend-color z-10 pointer-events-none" />
            <img 
              src="/Professional Portrait in Striped Shirt.png" 
              alt="Jibin Johnson"
              className="w-full h-full object-cover object-[50%_15%] grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />

          {/* Abstract Data Overlay */}
          <div className="absolute inset-0 z-20 overflow-hidden flex items-center justify-center">
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                   backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                   backgroundSize: '40px 40px' 
                 }}>
            </div>
            
            {mounted && dataLines.map((line) => (
              <motion.div
                key={`line-${line.id}`}
                className="absolute bg-accent/60"
                style={{
                  top: line.top,
                  left: line.left,
                  width: line.width,
                  height: line.height,
                }}
                initial={{ scaleX: line.width === "100%" ? 0 : 1, scaleY: line.height === "100%" ? 0 : 1 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 1.5, delay: line.delay, ease: "easeInOut" }}
              />
            ))}

            {mounted && dataNodes.map((node) => (
              <motion.div
                key={`node-${node.id}`}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]"
                style={{ top: node.top, left: node.left }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
                transition={{ 
                  duration: 2, 
                  delay: node.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: node.duration
                }}
              />
            ))}

            <motion.div 
              className="absolute border border-[var(--olive)] opacity-20"
              style={{ width: "60%", height: "40%", top: "30%", left: "20%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
