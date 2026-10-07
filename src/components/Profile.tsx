"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlightTerms = ["BI Administration", "Power BI", "SQL", "ETL", "Data Warehousing", "ERP Integration", "Python", "Cloud", "Agile/Scrum", "DAX", "Power Query", "Data Modelling", "workspace management", "gateway configuration", "scheduled refresh monitoring", "SSRS/MSBI", "Data Science"];

  const renderParagraph = (text: string) => {
    let result = text;
    highlightTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, "gi");
      result = result.replace(regex, `<span class="text-accent font-semibold">$1</span>`);
    });
    return <p className="font-serif text-base md:text-lg lg:text-xl leading-[1.6] text-foreground m-0" dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className="py-12 md:py-16 bg-background relative flex items-center min-h-[calc(100vh-80px)]" id="profile">
      <div className="max-w-[1440px] mx-auto px-[5%] w-full" ref={containerRef}>
        <div className="font-sans text-xs uppercase tracking-[0.1em] text-muted-foreground mb-8 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          The Profile
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-center">
          
          <motion.div
            className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[500px] -ml-2 lg:-ml-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
              {/* Overlay for subtle color matching */}
              <div className="absolute inset-0 bg-background/40 z-10 pointer-events-none mix-blend-overlay" />
              
              <Image
                src="/jibin-about.jpg"
                alt="Jibin Johnson"
                fill
                className="object-cover object-center mix-blend-luminosity opacity-80 hover:opacity-100 hover:mix-blend-normal transition-all duration-1000"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {portfolioData.profile.paragraphs.map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              >
                {renderParagraph(p)}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
