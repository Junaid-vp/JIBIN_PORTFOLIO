"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Download, 
  TrendingUp, 
  Database, 
  Zap,
  Activity,
  Layers,
  Cpu 
} from "lucide-react";

function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

// ================= REUSABLE ANIMATED COUNT-UP =================
function CountUp({ 
  value, 
  prefix = "", 
  suffix = "", 
  decimals = 0, 
  duration = 1.6 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number; 
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    let animationFrameId: number;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      if (elapsed < 1) {
        const easeOut = 1 - Math.pow(1 - elapsed, 3);
        setDisplay(start + (value - start) * easeOut);
        animationFrameId = requestAnimationFrame(update);
      } else {
        setDisplay(value);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {suffix}
    </span>
  );
}

// ================= ANIMATED DONUT CHART (Modern Tech Analytics Theme) =================
function AnimatedDonutChart({ 
  percentage = 99.4, 
  label = "Pipeline Health",
  size = 86 
}: { 
  percentage?: number; 
  label?: string;
  size?: number;
}) {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-secondary/95 dark:bg-[#111827]/95 backdrop-blur-md border border-border/80 rounded-2xl p-2.5 sm:p-3 shadow-xl">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border/40"
          />
          {/* Animated Tech Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#donutTechGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          />
          <defs>
            <linearGradient id="donutTechGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Outer subtle rotating dashed ring */}
        <div 
          className="absolute inset-0 rounded-full border border-dashed border-accent/30 pointer-events-none animate-spin"
          style={{ animationDuration: "30s" }}
        />

        {/* Central Metric */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-bold tracking-tight text-foreground leading-none">
            <CountUp value={percentage} decimals={1} suffix="%" duration={1.8} />
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Optimal
        </span>
        <span className="text-[10px] text-muted-foreground/75 mt-0.5">Power BI Refresh</span>
      </div>
    </div>
  );
}

// ================= ANIMATED DUAL BAR CHART (Cobalt & Emerald Tech Theme) =================
function AnimatedBarChart() {
  const bars = [
    { label: "INGEST", height1: 42, height2: 30 },
    { label: "CLEAN", height1: 64, height2: 48 },
    { label: "MODEL", height1: 88, height2: 68 },
    { label: "DAX", height1: 96, height2: 74 },
    { label: "VIZ", height1: 76, height2: 58 },
  ];

  return (
    <div className="flex items-end gap-2.5 h-[160px] p-3 pt-6 rounded-2xl bg-secondary/85 dark:bg-[#111827]/85 backdrop-blur-md border border-border/70 shadow-xl">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center h-full justify-end gap-1.5 group">
          <div className="flex items-end gap-1 h-full">
            {/* Primary Series (Electric Cobalt / Azure Gradient) */}
            <div className="w-2.5 sm:w-3 h-full flex items-end">
              <motion.div
                className="w-full rounded-t-sm bg-gradient-to-t from-[#1E40AF] via-[#2563EB] to-[#38BDF8] shadow-xs shadow-blue-500/30"
                style={{ height: `${bar.height1}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {/* Secondary Series (Luminous Emerald Gradient) */}
            <div className="w-2 sm:w-2.5 h-full flex items-end">
              <motion.div
                className="w-full rounded-t-sm bg-gradient-to-t from-[#065F46] via-[#059669] to-[#34D399] opacity-80"
                style={{ height: `${bar.height2}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/80 tracking-wider">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ================= ANIMATED AZURE LINE & AREA CHART =================
function AnimatedAreaLineChart() {
  const points = [
    { x: 10, y: 130 },
    { x: 75, y: 110 },
    { x: 140, y: 115 },
    { x: 215, y: 75 },
    { x: 290, y: 85 },
    { x: 375, y: 35 },
    { x: 450, y: 48 },
  ];

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;
  const areaD = `${pathD} L 450,150 L 10,150 Z`;

  return (
    <div className="absolute inset-x-0 bottom-6 h-[150px] pointer-events-none overflow-visible">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 460 150" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaTechGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.24" />
            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineTechGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="85%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>

        {/* Background Grid Horizontal Lines */}
        <line x1="10" y1="35" x2="450" y2="35" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />
        <line x1="10" y1="85" x2="450" y2="85" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />
        <line x1="10" y1="135" x2="450" y2="135" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />

        {/* Animated Tech Area Fill */}
        <motion.path
          d={areaD}
          fill="url(#areaTechGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />

        {/* Subtle Ambient Glow Stroke (GPU-accelerated) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="6"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Primary Animated Azure Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineTechGradient)"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Glowing Data Nodes */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#38BDF8"
              stroke="var(--background)"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.8 + idx * 0.18,
                repeatType: "reverse",
              }}
            />
            {/* Ping Wave for Peak Points */}
            {(idx === 3 || idx === 5) && (
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="9"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: idx * 0.4 }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ================= ANIMATED STAR SCHEMA DATA MODEL (Semantic Relationships) =================
function StarSchemaModel() {
  return (
    <div className="relative w-[210px] h-[122px] p-2.5 rounded-xl bg-secondary/90 dark:bg-[#111827]/90 backdrop-blur-md border border-border/80 shadow-xl select-none">
      <div className="flex items-center justify-between border-b border-border/50 pb-1 mb-1.5">
        <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          Semantic Model
        </span>
        <span className="text-[8px] font-mono text-muted-foreground">1 : * RELATIONS</span>
      </div>

      <svg viewBox="0 0 190 76" className="w-full h-[74px] overflow-visible">
        <defs>
          <linearGradient id="schemaLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Relationship Connectors */}
        {/* Dim_Date to Fact */}
        <line x1="32" y1="16" x2="95" y2="42" stroke="url(#schemaLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
        {/* Dim_Customer to Fact */}
        <line x1="158" y1="16" x2="95" y2="42" stroke="url(#schemaLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
        {/* Dim_Product to Fact */}
        <line x1="95" y1="66" x2="95" y2="42" stroke="url(#schemaLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* Traveling Data Pulses */}
        <motion.circle 
          r="2.5" 
          fill="#38BDF8"
          animate={{ cx: [32, 95], cy: [16, 42] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle 
          r="2.5" 
          fill="#10B981"
          animate={{ cx: [158, 95], cy: [16, 42] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.7 }}
        />
        <motion.circle 
          r="2.5" 
          fill="#38BDF8"
          animate={{ cx: [95, 95], cy: [66, 42] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.1 }}
        />

        {/* Node 1: Dim_Date */}
        <g transform="translate(10, 6)">
          <rect width="44" height="17" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <text x="22" y="11.5" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" fontFamily="monospace">Dim_Date</text>
        </g>

        {/* Node 2: Dim_Customer */}
        <g transform="translate(136, 6)">
          <rect width="44" height="17" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <text x="22" y="11.5" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" fontFamily="monospace">Dim_Cust</text>
        </g>

        {/* Node 3: Dim_Product */}
        <g transform="translate(73, 56)">
          <rect width="44" height="17" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <text x="22" y="11.5" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" fontFamily="monospace">Dim_Prod</text>
        </g>

        {/* Center Node: Fact_Sales */}
        <g transform="translate(70, 32)">
          <rect width="50" height="20" rx="5" fill="#2563EB" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="25" y="13.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#ffffff" fontFamily="monospace">Fact_Sales</text>
        </g>
      </svg>
    </div>
  );
}

// ================= LIVE VERTIPAQ DAX ENGINE TELEMETRY CARD =================
function DaxTelemetryCard() {
  return (
    <div className="bg-secondary/95 dark:bg-[#111827]/95 backdrop-blur-md border border-border/80 rounded-2xl p-3 shadow-2xl min-w-[195px] select-none">
      <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-foreground flex items-center gap-1">
            <Cpu size={12} className="text-accent" />
            DAX VertiPaq
          </span>
        </div>
        <span className="text-[9px] font-mono text-emerald-500 font-bold">OPTIMIZED</span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Metric 1: Compression */}
        <div>
          <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-0.5">
            <span>Compression</span>
            <span className="text-foreground font-semibold">8.6x</span>
          </div>
          <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "86%" }}
              transition={{ duration: 1.4, delay: 0.4 }}
            />
          </div>
        </div>

        {/* Metric 2: Cache Hit */}
        <div>
          <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-0.5">
            <span>Memory Cache</span>
            <span className="text-foreground font-semibold">99.2%</span>
          </div>
          <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "99%" }}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
          </div>
        </div>

        {/* Metric 3: P95 Latency */}
        <div>
          <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-0.5">
            <span>Query P95</span>
            <span className="text-foreground font-semibold">14ms</span>
          </div>
          <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.4, delay: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= LIVE REAL-TIME DATA STREAM PULSE STRIP =================
function LivePipelinePulse() {
  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 rounded-xl bg-secondary/90 dark:bg-[#111827]/90 border border-border/80 shadow-md">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
          <Activity size={12} className="text-accent" />
          Live Stream
        </span>
      </div>

      {/* Mini Animated Waveform Graphic */}
      <svg width="56" height="16" viewBox="0 0 56 16" className="overflow-visible">
        <motion.path
          d="M 0 8 Q 7 1, 14 8 T 28 8 T 42 8 T 56 8"
          fill="none"
          stroke="url(#pulseLineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: [
              "M 0 8 Q 7 1, 14 8 T 28 8 T 42 8 T 56 8",
              "M 0 8 Q 7 15, 14 8 T 28 8 T 42 8 T 56 8",
              "M 0 8 Q 7 1, 14 8 T 28 8 T 42 8 T 56 8",
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="pulseLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-foreground">
        <CountUp value={2480} duration={2} suffix=" evt/s" />
      </div>

      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span className="text-[9px] font-mono text-emerald-500 font-semibold uppercase">100% SLA</span>
    </div>
  );
}

// ================= HERO MAIN COMPONENT =================
export function Hero() {
  return (
    <section 
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 lg:pt-26 lg:pb-16 overflow-hidden bg-background text-foreground" 
      id="about"
    >
      {/* Subtle analytical grid texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '44px 44px'
        }}
      />

      {/* Ambient background tech light fields */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-35 transition-opacity"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 35%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 25% 75%, rgba(37, 99, 235, 0.09) 0%, transparent 55%)
          `
        }} 
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT CONTENT ZONE ================= */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start text-left gap-5 sm:gap-6 z-20 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow with decorative rule */}
            <div className="inline-flex items-center gap-3.5">
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-accent">
                POWER BI &middot; DATA ANALYTICS &middot; REPORTING
              </span>
              <span className="h-px w-10 sm:w-16 bg-accent/60" />
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-tight uppercase m-0 select-none text-foreground">
              <span className="block drop-shadow-xs">
                JIBIN
              </span>
              <span className="block text-foreground/90">
                JOHNSON
              </span>
            </h1>

            {/* Professional Title */}
            <h2 className="font-sans text-xl sm:text-2xl font-normal text-foreground/85 tracking-wide -mt-1 sm:-mt-2">
              BI Administrator &amp; Data Analytics Specialist
            </h2>

            {/* Verified Professional Summary */}
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              {portfolioData.identity.shortProfile}
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto">
              {/* Primary Action Button */}
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-sm sm:text-[15px] font-semibold transition-all duration-300 shadow-md bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary: Surface Button with Border */}
              <a
                href={portfolioData.identity.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium transition-all duration-300 bg-secondary hover:bg-secondary/80 border border-border hover:border-accent/50 text-foreground hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>

              {/* LinkedIn Circular Icon Button */}
              <a
                href={portfolioData.identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn Profile"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-secondary hover:bg-secondary/80 border border-border hover:border-accent text-foreground hover:text-accent hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>

            {/* Live Streaming Data Stream Waveform Strip */}
            <div className="pt-0.5">
              <LivePipelinePulse />
            </div>

            {/* Quick Contact Information Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2.5 gap-x-6 sm:gap-x-7 text-xs sm:text-sm text-muted-foreground">
              <a 
                href={`mailto:${portfolioData.identity.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{portfolioData.identity.email}</span>
              </a>

              <a 
                href={`tel:${portfolioData.identity.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{portfolioData.identity.phone}</span>
              </a>

              <div className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{portfolioData.identity.location}</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT: THEME-MATCHED ANIMATED DATA ANALYTICS SCENE ================= */}
          <motion.div 
            className="lg:col-span-6 relative flex items-center justify-center lg:justify-end w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] h-[480px] sm:h-[530px] lg:h-[570px] xl:h-[610px] flex items-center justify-center">

              {/* 1. Background Dual-Series Animated Bar Chart (Upper Center-Left behind portrait) */}
              <div className="absolute top-2 left-6 sm:left-10 z-5 pointer-events-none opacity-45 dark:opacity-55">
                <AnimatedBarChart />
              </div>

              {/* 2. Background Continuous Data Scanning Beam (Behind portrait) */}
              <div className="absolute inset-y-0 left-1/2 w-48 -translate-x-1/2 overflow-hidden pointer-events-none opacity-25">
                <motion.div 
                  className="w-full h-24 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
                  animate={{ y: ["-100%", "600%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* 3. Azure SVG Line & Area Chart Layer (Weaving across scene) */}
              <div className="absolute inset-x-0 bottom-4 z-10">
                <AnimatedAreaLineChart />
              </div>

              {/* 4. Live Floating KPI Card 1: Data Pipeline / Processed Rows (Top Left) */}
              <motion.div 
                className="absolute top-2 left-0 sm:-left-3 z-25 bg-secondary/95 dark:bg-[#111827]/95 backdrop-blur-md border border-border/80 rounded-2xl p-3 sm:p-3.5 shadow-2xl max-w-[195px]"
                initial={{ opacity: 0, x: -20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <Database size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">ETL Volume</div>
                    <div className="text-sm font-bold text-foreground leading-tight">
                      <CountUp value={4.2} decimals={1} suffix="M rows" duration={1.8} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2 pt-1.5 border-t border-border/50">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span>+28.4% throughput</span>
                </div>
              </motion.div>

              {/* 5. Live Star Schema Data Model (Upper Right) */}
              <motion.div 
                className="absolute -top-1 sm:-top-2 right-1 sm:right-4 z-20 hidden md:block shadow-xl"
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <StarSchemaModel />
              </motion.div>

              {/* 6. Live DAX VertiPaq Telemetry Engine Card (Mid-Right) */}
              <motion.div 
                className="absolute top-30 sm:top-32 right-0 sm:-right-4 z-25 hidden lg:block shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <DaxTelemetryCard />
              </motion.div>

              {/* 7. Live Floating Card: Animated Donut Chart / Pipeline Accuracy (Lower Right) */}
              <motion.div 
                className="absolute bottom-6 right-0 sm:-right-2 z-25 hidden sm:block shadow-2xl"
                initial={{ opacity: 0, x: 20, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                <AnimatedDonutChart percentage={99.8} label="Reporting Health" size={78} />
              </motion.div>

              {/* 8. Live Floating Pill: SQL Latency Reduction (Upper Center) */}
              <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-56 z-25 hidden sm:flex items-center gap-2 bg-secondary/95 dark:bg-[#111827]/95 backdrop-blur-md border border-border/80 rounded-xl px-2.5 py-1.5 shadow-xl"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Zap size={12} />
                </div>
                <div className="text-left">
                  <div className="text-[8px] font-mono uppercase text-muted-foreground">SQL Speedup</div>
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>-82% Latency</span>
                  </div>
                </div>
              </motion.div>

              {/* 9. Main Transparent Portrait Cutout (Slightly zoomed out with full visibility of hands & watch) */}
              <div className="relative w-full max-w-[350px] sm:max-w-[390px] lg:max-w-[420px] h-[84%] sm:h-[86%] lg:h-[88%] z-15 flex items-end justify-center pb-1">
                <img 
                  src="/portrait-cutout.png" 
                  alt="Jibin Johnson — BI Administrator & Data Analytics Specialist"
                  className="w-auto h-full max-h-[440px] sm:max-h-[480px] lg:max-h-[510px] object-contain object-bottom select-none drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* 10. Tech Stack Micro Badge: "BI · ANALYTICS · ETL · SQL · POWER BI" (Lower Left) */}
              <div className="absolute bottom-4 left-1 sm:left-2 z-25 flex flex-col gap-1 font-mono text-[9px] sm:text-[10px] tracking-widest text-muted-foreground border-l-2 border-accent pl-2.5 uppercase select-none bg-secondary/85 backdrop-blur-xs py-1.5 pr-2.5 rounded-r-md shadow-md">
                <span className="text-accent font-semibold">POWER BI</span>
                <span>SQL SERVER</span>
                <span>ETL PIPELINE</span>
                <span>DATA MODEL</span>
                <span className="text-accent font-semibold">DAX / SSRS</span>
              </div>

              {/* 11. Analytical Flow Node Connector (Micro indicator line in theme accent) */}
              <div className="absolute top-1/2 left-8 z-20 hidden lg:flex items-center gap-1.5 pointer-events-none opacity-60">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <div className="w-16 h-px bg-gradient-to-r from-accent/80 to-transparent" />
                <span className="text-[8px] font-mono text-accent tracking-wider">LIVE FEED</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
