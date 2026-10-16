"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

// Terms to highlight in the bio
const highlightTerms = [
  "Power BI administration", 
  "DAX", 
  "Power Query", 
  "Data Modelling", 
  "workspace management", 
  "gateway configuration", 
  "scheduled refresh monitoring", 
  "SQL Server (SSRS/MSBI)", 
  "ETL", 
  "data warehousing", 
  "Agile/Scrum", 
  "Data Science", 
  "cloud platforms"
];

function formatBioParagraph(text: string) {
  let result = text;
  highlightTerms.forEach((term) => {
    const regex = new RegExp(`(${term})`, "gi");
    result = result.replace(regex, `<span class="text-accent font-semibold">$1</span>`);
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

// ================= TYPEWRITER BIO COMPONENT =================
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
      // Type smoothly and responsively
      const timer = setTimeout(() => {
        setTypedProgress((prev) => {
          const next = [...prev];
          next[activeParaIndex] = Math.min(next[activeParaIndex] + 2, currentPara.length);
          return next;
        });
      }, 12);

      return () => clearTimeout(timer);
    } else {
      // Paragraph completed, brief pause before typing next
      if (activeParaIndex < paragraphs.length - 1) {
        const timer = setTimeout(() => {
          setActiveParaIndex((prev) => prev + 1);
        }, 120);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }
  }, [isVisible, activeParaIndex, typedProgress, isComplete, paragraphs]);

  const handleSkip = () => {
    setTypedProgress(paragraphs.map((p) => p.length));
    setActiveParaIndex(paragraphs.length - 1);
    setIsComplete(true);
  };

  return (
    <div 
      className="flex flex-col gap-3.5 sm:gap-4 cursor-pointer select-text" 
      onClick={handleSkip} 
      title="Click to reveal full bio"
    >
      {paragraphs.map((p, index) => {
        if (index > activeParaIndex) return null;

        const currentLength = typedProgress[index] || 0;
        const currentText = p.slice(0, currentLength);
        const isCurrentlyTyping = index === activeParaIndex && !isComplete;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-sans text-xs sm:text-[13px] lg:text-sm text-muted-foreground leading-relaxed m-0"
          >
            {formatBioParagraph(currentText)}
            {isCurrentlyTyping && (
              <span className="inline-block w-1.5 h-3.5 bg-accent ml-1 align-middle animate-pulse" />
            )}
          </motion.div>
        );
      })}

      {!isComplete && isVisible && (
        <div className="pt-1 select-none">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 hover:text-accent transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Click anywhere to reveal full bio
          </span>
        </div>
      )}
    </div>
  );
}

// ================= MAIN PROFILE COMPONENT =================
export function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });


  return (
    <section 
      className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden text-foreground scroll-mt-14" 
      id="profile"
      ref={containerRef}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. SECTION TOP LABELS ================= */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {/* Left Top Label */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 sm:w-10 h-px bg-accent/60 inline-block" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-accent">
              THE PROFILE
            </span>
          </div>

          {/* Right Top Label */}
          <div className="hidden lg:flex items-center gap-2.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-accent">
              ABOUT ME
            </span>
            <span className="w-8 sm:w-10 h-px bg-accent/60 inline-block" />
          </div>
        </div>

        {/* ================= 2. TWO-COLUMN HERO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ---------- LEFT COLUMN: PORTRAIT + FLOATING ANALYTICS WIDGETS ---------- */}
          <div className="lg:col-span-6 relative flex justify-center items-center pb-12 sm:pb-16 lg:pb-0 mb-4 sm:mb-6 lg:mb-0">
            
            {/* Portrait & Floating Badges Card Wrapper */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[360px] sm:h-[440px] md:h-[480px]">
              
              {/* Background Dotted Matrix Grid */}
              <div 
                className="absolute -inset-4 sm:-inset-6 pointer-events-none opacity-40 dark:opacity-30 select-none -z-10 rounded-3xl"
                style={{
                  backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Background Flowing Telemetry Accent Wave Line */}
              <svg 
                className="absolute -inset-4 sm:-inset-8 w-[115%] h-[115%] pointer-events-none -z-10 overflow-visible opacity-50 dark:opacity-40" 
                viewBox="0 0 400 500"
              >
                <motion.path
                  d="M -20 280 C 60 220, 140 320, 240 180 C 320 80, 380 140, 430 110"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
                <circle cx="240" cy="180" r="3" fill="#38BDF8" />
              </svg>

              {/* Process Milestone Labels (Top-Right of Photo Container) */}
              <div className="absolute top-2 right-0 sm:-right-2 z-20 hidden sm:flex flex-col gap-1 text-[8px] font-mono uppercase tracking-widest text-muted-foreground/75 text-right select-none">
                <span>ANALYZE</span>
                <span>VISUALIZE</span>
                <span>AUTOMATE</span>
                <span>OPTIMIZE</span>
              </div>

              {/* Main Portrait Frame with Soft Background Blend */}
              <motion.div 
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-border/80 dark:border-slate-800 bg-gradient-to-b from-secondary/70 via-secondary/40 to-background/90"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Image with subtle bottom gradient mask blending into background */}
                <div 
                  className="relative w-full h-full"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  }}
                >
                  <Image
                    src="/jibin-profile.jpg"
                    alt="Jibin Johnson"
                    fill
                    priority
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700 select-none"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                  />
                </div>

                {/* Soft ambient bottom dissolution overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-10" />
              </motion.div>

              {/* Floating Widget 1: 5+ Years of Experience (Top-Left) */}
              <motion.div 
                className="absolute -top-3 -left-2 sm:-left-6 z-30 bg-card/95 dark:bg-slate-900/90 backdrop-blur-md border border-border shadow-xl rounded-2xl p-2.5 sm:p-3 flex flex-col gap-1 min-w-[95px] sm:min-w-[110px]"
                initial={{ opacity: 0, y: -16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                  <BarChart3 size={13} />
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground leading-none mb-0.5">
                    5+
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
                    Years of <br className="hidden sm:inline" />Experience
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 2: 98% Focus Data-Driven Solutions (Right of Shoulder) */}
              <motion.div 
                className="absolute top-1/4 sm:top-1/3 -right-2 sm:-right-8 z-30 bg-card/95 dark:bg-slate-900/90 backdrop-blur-md border border-border shadow-xl rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Radial 98% Ring */}
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      className="text-muted/30"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeDasharray="94.2"
                      strokeDashoffset="94.2"
                      strokeLinecap="round"
                      animate={isInView ? { strokeDashoffset: 94.2 * (1 - 0.98) } : {}}
                      transition={{ duration: 1.4, delay: 0.4 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono text-foreground">
                    98%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono uppercase tracking-wider font-semibold text-muted-foreground leading-none mb-0.5">
                    Focus
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-foreground leading-tight">
                    Data-Driven <br />Solutions
                  </span>
                </div>
              </motion.div>

              {/* Floating Widget 3: Turning Data into Insights (Bottom-Right Overlap) */}
              <motion.div 
                className="absolute -bottom-3 sm:-bottom-4 -right-1 sm:-right-4 z-30 bg-card/95 dark:bg-slate-900/90 backdrop-blur-md border border-border shadow-xl rounded-2xl p-2.5 sm:p-3 flex flex-col gap-1.5 min-w-[125px] sm:min-w-[145px]"
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-foreground leading-tight">
                    Turning Data into Insights
                  </span>
                  <ArrowUpRight size={12} className="text-accent shrink-0" />
                </div>

                {/* Mini Ascending Stepped Bars */}
                <div className="flex items-end justify-between gap-1 h-7 pt-1 px-0.5">
                  {[30, 48, 62, 78, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-xs bg-gradient-to-t from-blue-700 to-cyan-400 opacity-90 shadow-xs"
                      style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating Signature 4: Jibin Johnson (Bottom-Left) */}
              <motion.div 
                className="absolute -bottom-10 sm:-bottom-12 -left-2 sm:-left-6 z-30 select-none flex flex-col items-start"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className="relative">
                  <span 
                    className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-foreground tracking-normal block leading-none pr-2"
                    style={{ fontFamily: "var(--font-signature), 'Dancing Script', cursive" }}
                  >
                    Jibin Johnson
                  </span>
                  {/* Authentic pen stroke underline flourish */}
                  <svg className="w-full h-2.5 overflow-visible text-accent/80 -mt-0.5" viewBox="0 0 120 10" fill="none">
                    <motion.path
                      d="M 4 4 C 35 2, 75 7, 116 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.55 }}
                    />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/80 font-semibold pl-1 -mt-0.5">
                  DATA ANALYST
                </span>
              </motion.div>

            </div>

          </div>

          {/* ---------- RIGHT COLUMN: EDITORIAL HEADLINE + TYPEWRITER BIO ---------- */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 pt-2 lg:pt-0">
            
            {/* Main Editorial Headline */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08] tracking-tight font-normal text-foreground m-0">
                Data Solutions for <br />
                <span className="text-accent italic font-serif">Smarter Decisions.</span>
              </h2>
            </div>

            {/* Interactive Typewriter Bio with Keyword Highlighting */}
            <TypewriterBio 
              paragraphs={portfolioData.profile.paragraphs} 
              isVisible={isInView} 
            />

          </div>

        </div>

      </div>
    </section>
  );
}
