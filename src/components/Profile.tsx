"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const highlightTerms = [
  "BI Administration", 
  "Power BI", 
  "SQL", 
  "ETL", 
  "Data Warehousing", 
  "ERP Integration", 
  "Python", 
  "Cloud", 
  "Agile/Scrum", 
  "DAX", 
  "Power Query", 
  "Data Modelling", 
  "workspace management", 
  "gateway configuration", 
  "scheduled refresh monitoring", 
  "SSRS/MSBI", 
  "Data Science"
];

function TypewriterBio({ paragraphs, isVisible }: { paragraphs: string[]; isVisible: boolean }) {
  const [typedProgress, setTypedProgress] = useState<number[]>(paragraphs.map(() => 0));
  const [activeParaIndex, setActiveParaIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!isVisible || isComplete) return;

    const currentPara = paragraphs[activeParaIndex];
    if (!currentPara) {
      setIsComplete(true);
      return;
    }

    const currentLen = typedProgress[activeParaIndex] || 0;

    if (currentLen < currentPara.length) {
      // Type smoothly at 14ms per character
      const timer = setTimeout(() => {
        setTypedProgress(prev => {
          const next = [...prev];
          next[activeParaIndex] = Math.min(next[activeParaIndex] + 1, currentPara.length);
          return next;
        });
      }, 14);

      return () => clearTimeout(timer);
    } else {
      // Paragraph finished, brief 180ms pause before starting next
      if (activeParaIndex < paragraphs.length - 1) {
        const timer = setTimeout(() => {
          setActiveParaIndex(prev => prev + 1);
        }, 180);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }
  }, [isVisible, activeParaIndex, typedProgress, isComplete, paragraphs]);

  const handleSkip = () => {
    setTypedProgress(paragraphs.map(p => p.length));
    setActiveParaIndex(paragraphs.length - 1);
    setIsComplete(true);
  };

  const renderFormattedText = (text: string) => {
    let result = text;
    highlightTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, "gi");
      result = result.replace(regex, `<span class="text-accent font-semibold">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="flex flex-col gap-5 cursor-pointer select-text" onClick={handleSkip} title="Click to show all text">
      {paragraphs.map((p, index) => {
        if (index > activeParaIndex) return null;

        const currentLength = typedProgress[index] || 0;
        const currentText = p.slice(0, currentLength);
        const isCurrentlyTyping = index === activeParaIndex && !isComplete;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-base md:text-lg lg:text-xl leading-[1.65] text-foreground m-0"
          >
            {renderFormattedText(currentText)}
            {isCurrentlyTyping && (
              <span className="inline-block w-2 h-5 bg-accent ml-1 align-middle animate-pulse" />
            )}
          </motion.div>
        );
      })}

      {!isComplete && isVisible && (
        <div className="pt-2">
          <span className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground/70 hover:text-accent transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Click anywhere to reveal full bio
          </span>
        </div>
      )}
    </div>
  );
}

export function Profile() {
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
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-background relative flex items-center min-h-[calc(100vh-80px)]" id="profile">
      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-xs uppercase tracking-[0.1em] text-muted-foreground mb-8 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          The Profile
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-center">
          
          {/* Portrait with subtle gradient mask */}
          <motion.div
            className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[520px] -ml-2 lg:-ml-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)',
                maskComposite: 'intersect'
              }}
            >
              <div className="absolute inset-0 bg-background/40 z-10 pointer-events-none mix-blend-overlay" />
              
              <Image
                src="/jibin-profile.jpg"
                alt="Jibin Johnson"
                fill
                className="object-cover object-[50%_25%] mix-blend-luminosity opacity-80 hover:opacity-100 hover:mix-blend-normal transition-all duration-1000"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </motion.div>

          {/* Dynamic Typing Bio */}
          <div className="w-full">
            <TypewriterBio
              paragraphs={portfolioData.profile.paragraphs}
              isVisible={isVisible}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
