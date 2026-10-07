"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col items-center gap-8 relative z-10">
            <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="text-4xl md:text-5xl font-serif tracking-[0.2em] text-foreground text-center"
            >
              JIBIN JOHNSON
            </motion.div>
            
            <div className="w-64 h-[1px] bg-border relative overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-accent w-1/2"
               />
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-center"
            >
               Data Analytics Specialist
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
