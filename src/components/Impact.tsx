"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  BarChart3, 
  Zap, 
  Database, 
  FileText, 
  ShieldCheck, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  Workflow 
} from "lucide-react";
import { DottedGlobe } from "@/components/DottedGlobe";

// ================= INTERACTIVE ANIMATED NUMBER COMPONENT =================
function AnimatedMetric({ 
  value, 
  isInView, 
  delay = 0,
  hoverKey = 0 
}: { 
  value: string; 
  isInView: boolean; 
  delay?: number;
  hoverKey?: number;
}) {
  const match = value.match(/(\d+)/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const numIndex = match ? value.indexOf(match[1]) : -1;
  const prefix = numIndex > 0 ? value.slice(0, numIndex) : "";
  const suffix = match ? value.slice(numIndex + match[1].length) : value;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    setCount(0);
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 1500;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth exponential ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3.5);
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
  }, [isInView, targetNumber, delay, hoverKey]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ================= MINI-GRAPH 1: RUNNING LIVE UPTIME CHART (Card 1) =================
function UptimeChart({ isInView }: { isInView: boolean }) {
  const bars = [25, 45, 35, 60, 50, 75, 65, 85, 95];
  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex items-end justify-between gap-0.5 pt-2 select-none overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-x-0 top-1 h-px border-t border-dashed border-white/10" />
      <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-white/10" />

      {/* Floating Badge with Live Pulsing Radar */}
      <div className="absolute -top-1 right-0 px-2 py-0.5 rounded bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <div className="flex flex-col items-end">
          <span className="text-[6.5px] font-mono uppercase tracking-wider text-neutral-400 leading-none">Dashboard Uptime</span>
          <span className="text-[9.5px] font-bold text-white font-mono leading-tight">
            <AnimatedMetric value="99.2%" isInView={isInView} delay={0.1} />
          </span>
        </div>
      </div>

      {/* Equalizer Telemetry Bars - Running continuously */}
      <div className="flex items-end justify-between w-full h-[40px] gap-0.5 px-0.5 pb-0.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <motion.div
              className="w-full rounded-t-xs bg-gradient-to-t from-blue-900/60 via-blue-600/70 to-blue-400/90 shadow-[0_0_8px_rgba(56,189,248,0.25)]"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              animate={isInView ? {
                scaleY: [1, 1.08 + (i % 2) * 0.04, 0.94 - (i % 3) * 0.03, 1.05, 1],
              } : { scaleY: 0 }}
              transition={{
                duration: 2.2 + (i % 4) * 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            />
          </div>
        ))}
      </div>

      {/* Continuous Running Trend Line with Streaming Light Particle */}
      <svg className="absolute inset-x-0 bottom-0 w-full h-[40px] pointer-events-none" viewBox="0 0 130 45" preserveAspectRatio="none">
        {/* Base line */}
        <path
          d="M 6 34 Q 35 28, 60 20 T 100 12 T 124 7"
          fill="none"
          stroke="#38BDF8"
          strokeOpacity="0.4"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Live Running Pulse Line */}
        <motion.path
          d="M 6 34 Q 35 28, 60 20 T 100 12 T 124 7"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="6 14"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -40] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Live Telemetry Peak Beacon */}
        <circle cx="124" cy="7" r="4" fill="#38BDF8" className="animate-ping opacity-60" />
        <circle cx="124" cy="7" r="2.5" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// ================= MINI-GRAPH 2: RUNNING ASCENDING BARS CHART (Card 2) =================
function AscendingBarsChart({ isInView }: { isInView: boolean }) {
  const bars = [25, 42, 60, 78, 95];
  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex items-end justify-end select-none overflow-hidden">
      <div className="relative flex items-end justify-end gap-1.5 h-[42px] w-full pr-0.5">
        {/* Curving upward arrow with Running Telemetry Stream */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 120 45">
          <path
            d="M 12 38 C 45 34, 75 22, 112 7"
            fill="none"
            stroke="#F59E0B"
            strokeOpacity="0.3"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Continuous Running Energy Stream */}
          <motion.path
            d="M 12 38 C 45 34, 75 22, 112 7"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="8 12"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="112" cy="7" r="3.5" fill="#F59E0B" className="animate-ping opacity-75" />
          <circle cx="112" cy="7" r="2.5" fill="#F59E0B" />
        </svg>

        {/* Live Stepped Equalizer Bars */}
        {bars.map((h, i) => (
          <div key={i} className="w-2.5 sm:w-3 flex flex-col justify-end h-full">
            <motion.div
              className="w-full rounded-t-xs bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 opacity-90 shadow-xs"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              animate={isInView ? {
                scaleY: [1, 1.07, 0.94, 1.05, 1],
              } : { scaleY: 0 }}
              transition={{
                duration: 2.1 + i * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= MINI-GRAPH 3: CONTINUOUS RUNNING WAVE CHART (Card 3) =================
function WaveAreaChart({ isInView }: { isInView: boolean }) {
  // Wave path variations for continuous living ocean/telemetry wave
  const waveA = "M 5 36 C 30 36, 45 14, 70 26 C 95 38, 115 10, 135 16 L 135 50 L 5 50 Z";
  const waveB = "M 5 33 C 32 26, 48 18, 72 20 C 96 32, 118 14, 135 20 L 135 50 L 5 50 Z";
  const waveC = "M 5 37 C 28 34, 46 11, 68 28 C 94 40, 114 8, 135 14 L 135 50 L 5 50 Z";

  const lineA = "M 5 36 C 30 36, 45 14, 70 26 C 95 38, 115 10, 135 16";
  const lineB = "M 5 33 C 32 26, 48 18, 72 20 C 96 32, 118 14, 135 20";
  const lineC = "M 5 37 C 28 34, 46 11, 68 28 C 94 40, 114 8, 135 14";

  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex items-end justify-center select-none overflow-visible">
      <svg className="w-full h-[44px] overflow-visible" viewBox="0 0 140 50" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveFillGradLive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Continuously Morphing Living Wave Area */}
        <motion.path
          d={waveA}
          fill="url(#waveFillGradLive)"
          animate={isInView ? {
            d: [waveA, waveB, waveC, waveA],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Continuously Morphing Wave Outline */}
        <motion.path
          d={lineA}
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={isInView ? {
            d: [lineA, lineB, lineC, lineA],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Running Dashed Telemetry Pulse along wave */}
        <motion.path
          d={lineA}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.4"
          strokeDasharray="6 18"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Peak Dots with Breathing Glow */}
        <motion.circle 
          cx="60" 
          cy="20" 
          r="2.5" 
          fill="#38BDF8" 
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle 
          cx="135" 
          cy="16" 
          r="2.5" 
          fill="#2563EB" 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

// ================= MINI-GRAPH 4: RUNNING DESCENDING BARS CHART (Card 4) =================
function DescendingBarsChart({ isInView }: { isInView: boolean }) {
  const bars = [95, 78, 60, 42, 25];
  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex items-end justify-end select-none overflow-hidden">
      {/* Continuous Live Radar Scanline */}
      <motion.div
        className="absolute inset-y-0 w-0.5 bg-cyan-400/50 shadow-[0_0_8px_#38BDF8] pointer-events-none z-10"
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-end justify-end gap-1.5 h-[42px] w-full pr-0.5">
        {bars.map((h, i) => (
          <div key={i} className="w-2.5 sm:w-3 flex flex-col justify-end h-full">
            <motion.div
              className="w-full rounded-t-xs bg-gradient-to-t from-slate-400 via-blue-400 to-cyan-300 dark:from-slate-700 dark:to-blue-500 opacity-80"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              animate={isInView ? {
                scaleY: [1, 0.94 - (i % 2) * 0.04, 1.06 + (i % 3) * 0.03, 0.97, 1],
              } : { scaleY: 0 }}
              transition={{
                duration: 2.3 + (i % 3) * 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= MINI-GRAPH 5: RUNNING RADAR DONUT CHART (Card 5) =================
function RadialDonutChart({ isInView }: { isInView: boolean }) {
  const size = 52;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - 0.25 * circumference;

  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex items-center justify-end pr-0.5 select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        
        {/* Continuous Rotating Radar Sweep Light Beam */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.4) 80deg, transparent 90deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={strokeWidth}
          />
          {/* Animated 25% Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#donutIntegrityGradLive)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
          />
          <defs>
            <linearGradient id="donutIntegrityGradLive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text Counting Up Live */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.span 
            className="text-[11px] font-bold text-white font-mono leading-none"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatedMetric value="25%" isInView={isInView} delay={0.15} />
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ================= MINI-GRAPH 6: RUNNING DUAL LINE TELEMETRY CHART (Card 6) =================
function ComparativeDualLineChart({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-[54px] sm:h-[58px] flex flex-col justify-end select-none overflow-hidden">
      <div className="relative w-full h-[40px]">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 130 40" preserveAspectRatio="none">
          {/* Before Curve: Continuously Streaming Dashed Data Packets */}
          <motion.path
            d="M 5 28 C 30 36, 55 18, 80 32 C 105 38, 120 22, 128 26"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          {/* After Curve: Smooth Solid Line */}
          <path
            d="M 5 35 C 30 22, 55 10, 80 15 C 105 18, 120 6, 128 8"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* After Curve: Running Light Pulse streaming along line */}
          <motion.path
            d="M 5 35 C 30 22, 55 10, 80 15 C 105 18, 120 6, 128 8"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.4"
            strokeDasharray="8 20"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -56] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />

          {/* Live Ping Beacon */}
          <circle cx="128" cy="8" r="4" fill="#2563EB" className="animate-ping opacity-60" />
          <circle cx="128" cy="8" r="2.5" fill="#2563EB" />
        </svg>
      </div>

      {/* Mini Legend */}
      <div className="flex items-center justify-end gap-2 text-[8px] sm:text-[8.5px] font-mono text-muted-foreground pt-0.5">
        <span className="flex items-center gap-0.5">
          <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500 inline-block" />
          Before
        </span>
        <span className="flex items-center gap-0.5">
          <span className="w-2.5 h-0.5 bg-blue-600 inline-block rounded-full" />
          After
        </span>
      </div>
    </div>
  );
}

// ================= MAIN IMPACT COMPONENT =================
export function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // once: false ensures re-entry animates interactively when scrolled into view
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  // Hover triggers for interactive re-rolling
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoverCounts, setHoverCounts] = useState<{ [key: number]: number }>({});

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
    setHoverCounts((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-5 sm:py-6 lg:py-7 bg-background relative overflow-hidden scroll-mt-14 text-foreground" 
      id="impact"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. SECTION HEADER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center mb-4 sm:mb-5">
          
          {/* Left Column: Eyebrow + Main Editorial Title */}
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent">
                MY IMPACT
              </span>
              <span className="w-10 h-px bg-accent/60 inline-block" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.06] tracking-tight font-normal text-foreground m-0">
              Turning Data <br />
              Into <span className="text-accent italic font-serif">Real Results.</span>
            </h2>
          </div>

          {/* Right Column: Narrative + Running Milestone Wave Graphic */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
            <p className="font-sans text-xs sm:text-[13px] text-muted-foreground leading-relaxed max-w-xl m-0">
              I design, manage and optimize data solutions that improve reporting speed, data accuracy and business decision-making. These are some of the key outcomes delivered through my work in BI administration, data analytics and reporting.
            </p>

            {/* Ascending Process Curve Graphic with Continuous Running Data Stream */}
            <div className="relative w-full h-[36px] hidden sm:flex items-center justify-between">
              {/* Step labels */}
              <div className="flex flex-col gap-0 text-[7.5px] font-mono uppercase tracking-wider text-muted-foreground/80 leading-none">
                <span>INSIGHT</span>
                <span>ANALYZE</span>
                <span>AUTOMATE</span>
                <span>OPTIMIZE</span>
              </div>

              {/* Curved Connection Path */}
              <div className="relative flex-1 h-full mx-3 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 260 32" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="headerCurveGradLive" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Base path */}
                  <path
                    d="M 10 26 C 65 26, 110 19, 150 14 C 190 9, 220 5, 250 4"
                    fill="none"
                    stroke="url(#headerCurveGradLive)"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />

                  {/* Continuous Running Pulse Stream */}
                  <motion.path
                    d="M 10 26 C 65 26, 110 19, 150 14 C 190 9, 220 5, 250 4"
                    fill="none"
                    stroke="url(#headerCurveGradLive)"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  />

                  <circle cx="10" cy="26" r="2.5" fill="#2563EB" />
                  <circle cx="95" cy="21" r="2.5" fill="#38BDF8" />
                  <circle cx="170" cy="12" r="2.5" fill="#38BDF8" />
                  <circle cx="250" cy="4" r="3.5" fill="#F59E0B" className="animate-pulse" />
                </svg>
              </div>

              {/* Indicator Pill */}
              <div className="px-2.5 py-1 rounded-full border border-border bg-secondary/80 dark:bg-slate-900/80 shadow-xs flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8.5px] font-mono uppercase tracking-wider font-semibold text-foreground">
                  BETTER DECISIONS
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= 2. THE 6 METRIC CARDS (2x3 GRID) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5 mb-4 sm:mb-5">
          
          {/* ---------- CARD 1 (Featured Dark Card) ---------- */}
          <motion.div 
            className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-md flex justify-between gap-3 relative overflow-hidden group hover:border-slate-700 transition-all min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={() => handleCardHover(1)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <BarChart3 size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="99%+" 
                    isInView={isInView} 
                    delay={0.05} 
                    hoverKey={hoverCounts[1] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-white/95 mb-0.5 leading-tight">
                  Dashboard availability
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-neutral-400 leading-normal m-0 line-clamp-2">
                  Proactively resolving refresh failures and performance bottlenecks.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Running Chart */}
            <div className="w-[120px] sm:w-[135px] lg:w-[145px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 text-[8px] font-mono uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  HIGH AVAILABILITY
                </span>
              </div>
              <UptimeChart isInView={isInView} />
            </div>
          </motion.div>

          {/* ---------- CARD 2 (Surface Card) ---------- */}
          <motion.div 
            className="bg-secondary/70 dark:bg-slate-900/60 border border-border rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex justify-between gap-3 group min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            onMouseEnter={() => handleCardHover(2)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <Zap size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="40%" 
                    isInView={isInView} 
                    delay={0.1} 
                    hoverKey={hoverCounts[2] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-foreground mb-0.5 leading-tight">
                  Report generation time reduction
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-normal m-0 line-clamp-2">
                  Designed and deployed Power BI dashboards for KPI tracking.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Running Chart */}
            <div className="w-[115px] sm:w-[130px] lg:w-[140px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="text-[8.5px] font-mono font-bold text-amber-500 flex items-center gap-0.5">
                  40% FASTER <TrendingUp size={11} />
                </span>
              </div>
              <AscendingBarsChart isInView={isInView} />
            </div>
          </motion.div>

          {/* ---------- CARD 3 (Surface Card) ---------- */}
          <motion.div 
            className="bg-secondary/70 dark:bg-slate-900/60 border border-border rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex justify-between gap-3 group min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            onMouseEnter={() => handleCardHover(3)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <Database size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="30%" 
                    isInView={isInView} 
                    delay={0.15} 
                    hoverKey={hoverCounts[3] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-foreground mb-0.5 leading-tight">
                  Reduction in data inconsistencies
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-normal m-0 line-clamp-2">
                  Engineered end-to-end ETL workflows and data warehousing pipelines.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Running Wave */}
            <div className="w-[115px] sm:w-[130px] lg:w-[140px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[8px] font-mono uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CLEANER DATA
                </span>
              </div>
              <WaveAreaChart isInView={isInView} />
            </div>
          </motion.div>

          {/* ---------- CARD 4 (Surface Card) ---------- */}
          <motion.div 
            className="bg-secondary/70 dark:bg-slate-900/60 border border-border rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex justify-between gap-3 group min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            onMouseEnter={() => handleCardHover(4)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <FileText size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="35%" 
                    isInView={isInView} 
                    delay={0.2} 
                    hoverKey={hoverCounts[4] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-foreground mb-0.5 leading-tight">
                  Reduction in manual reporting effort
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-normal m-0 line-clamp-2">
                  Automated reporting workflows using SharePoint Online and Nintex.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Running Bars */}
            <div className="w-[115px] sm:w-[130px] lg:w-[140px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="text-[8.5px] font-mono font-bold text-accent flex items-center gap-0.5">
                  35% LESS EFFORT <TrendingDown size={11} />
                </span>
              </div>
              <DescendingBarsChart isInView={isInView} />
            </div>
          </motion.div>

          {/* ---------- CARD 5 (Featured Dark Card) ---------- */}
          <motion.div 
            className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-md flex justify-between gap-3 relative overflow-hidden group hover:border-slate-700 transition-all min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            onMouseEnter={() => handleCardHover(5)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <ShieldCheck size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="25%" 
                    isInView={isInView} 
                    delay={0.25} 
                    hoverKey={hoverCounts[5] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-white/95 mb-0.5 leading-tight">
                  Improvement in data integrity
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-neutral-400 leading-normal m-0 line-clamp-2">
                  Validated and interpreted client queries against data systems.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Rotating Donut */}
            <div className="w-[115px] sm:w-[130px] lg:w-[140px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 text-[8px] font-mono uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  IMPROVED INTEGRITY
                </span>
              </div>
              <RadialDonutChart isInView={isInView} />
            </div>
          </motion.div>

          {/* ---------- CARD 6 (Surface Card) ---------- */}
          <motion.div 
            className="bg-secondary/70 dark:bg-slate-900/60 border border-border rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex justify-between gap-3 group min-h-[132px] sm:min-h-[138px] cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            onMouseEnter={() => handleCardHover(6)}
          >
            {/* Left: Text Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1.5">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mb-1 group-hover:scale-110 transition-transform">
                <ArrowLeftRight size={14} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-0.5 leading-none">
                  <AnimatedMetric 
                    value="20%" 
                    isInView={isInView} 
                    delay={0.3} 
                    hoverKey={hoverCounts[6] || 0}
                  />
                </div>
                <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-foreground mb-0.5 leading-tight">
                  Reduction in reporting discrepancies
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-normal m-0 line-clamp-2">
                  Maintained data accuracy across ERP systems using SQL.
                </p>
              </div>
            </div>

            {/* Right: Badge + Live Running Dual Telemetry */}
            <div className="w-[115px] sm:w-[130px] lg:w-[140px] flex flex-col justify-between shrink-0">
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[8px] font-mono uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACCURATE REPORTS
                </span>
              </div>
              <ComparativeDualLineChart isInView={isInView} />
            </div>
          </motion.div>

        </div>

        {/* ================= 3. BOTTOM BANNER: BUILDING RELIABLE DATA FOUNDATIONS ================= */}
        <motion.div 
          className="rounded-2xl border border-border bg-secondary/50 dark:bg-slate-900/50 p-3 sm:p-4 lg:p-4 relative overflow-hidden shadow-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {/* Subtle Dotted Globe Sphere in Bottom-Left Background */}
          <div className="absolute -bottom-12 -left-8 opacity-20 dark:opacity-15 pointer-events-none select-none">
            <DottedGlobe size={150} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center relative z-10">
            
            {/* Left Column: Heading + Description */}
            <div className="lg:col-span-6 flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[9.5px] uppercase tracking-[0.25em] font-semibold text-accent">
                  IMPACT AREAS
                </span>
                <span className="w-6 h-px bg-accent/60 inline-block" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-normal text-foreground leading-tight m-0">
                Building Reliable Data Foundations
              </h3>
              <p className="font-sans text-[11px] sm:text-xs text-muted-foreground leading-normal max-w-xl m-0">
                From data infrastructure to automated reporting, my work focuses on creating reliable, efficient and scalable data solutions that drive measurable business impact.
              </p>
            </div>

            {/* Right Column: 4 Circular Pillars with Labels */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-center">
              
              {/* Pillar 1: Faster Reporting */}
              <div className="flex flex-col items-center text-center gap-1 group">
                <div className="w-9 h-9 rounded-full bg-secondary dark:bg-slate-800 border border-border/80 flex items-center justify-center text-accent shadow-xs group-hover:scale-105 group-hover:border-accent transition-all">
                  <BarChart3 size={15} />
                </div>
                <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider font-semibold text-foreground/90 leading-tight">
                  FASTER REPORTING
                </span>
              </div>

              {/* Pillar 2: Cleaner Data */}
              <div className="flex flex-col items-center text-center gap-1 group">
                <div className="w-9 h-9 rounded-full bg-secondary dark:bg-slate-800 border border-border/80 flex items-center justify-center text-accent shadow-xs group-hover:scale-105 group-hover:border-accent transition-all">
                  <Database size={15} />
                </div>
                <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider font-semibold text-foreground/90 leading-tight">
                  CLEANER DATA
                </span>
              </div>

              {/* Pillar 3: Automated Workflows */}
              <div className="flex flex-col items-center text-center gap-1 group">
                <div className="w-9 h-9 rounded-full bg-secondary dark:bg-slate-800 border border-border/80 flex items-center justify-center text-accent shadow-xs group-hover:scale-105 group-hover:border-accent transition-all">
                  <Workflow size={15} />
                </div>
                <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider font-semibold text-foreground/90 leading-tight">
                  AUTOMATED WORKFLOWS
                </span>
              </div>

              {/* Pillar 4: Better Decisions */}
              <div className="flex flex-col items-center text-center gap-1 group">
                <div className="w-9 h-9 rounded-full bg-secondary dark:bg-slate-800 border border-border/80 flex items-center justify-center text-accent shadow-xs group-hover:scale-105 group-hover:border-accent transition-all">
                  <TrendingUp size={15} />
                </div>
                <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider font-semibold text-foreground/90 leading-tight">
                  BETTER DECISIONS
                </span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
