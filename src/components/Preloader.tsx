"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // Crisp 1.6s progress

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const easedProgress = Math.round((1 - Math.pow(1 - rawProgress, 2.2)) * 100);

      setProgress(easedProgress);

      if (rawProgress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 180);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="standard-preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle ambient depth flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/8 rounded-full blur-[90px] pointer-events-none" />

          {/* Central Executive Minimalist Container */}
          <div className="flex flex-col items-center gap-6 relative z-10 px-4">
            
            {/* Logo Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border border-border/80 flex items-center justify-center mb-1 bg-secondary/80"
            >
              <Image
                src="/icon.png"
                alt="Jibin Johnson Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover select-none"
                priority
              />
            </motion.div>

            {/* Typography */}
            <div className="flex flex-col items-center gap-2 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-normal tracking-[0.22em] text-foreground m-0 leading-tight"
              >
                JIBIN JOHNSON
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground m-0"
              >
                BI Administrator &amp; Data Analytics Specialist
              </motion.p>
            </div>

            {/* High-Precision Progress Bar & Numeric Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col items-center gap-2.5 pt-3"
            >
              {/* Progress Line */}
              <div className="w-56 sm:w-64 h-[2px] bg-border relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Numerical Percentage */}
              <span className="font-mono text-xs text-muted-foreground tracking-widest tabular-nums">
                {progress < 10 ? `0${progress}` : progress}%
              </span>
            </motion.div>

          </div>

          {/* Minimalist Bottom Copyright Indicator */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center text-center">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60">
              PORTFOLIO EDITION // 2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
