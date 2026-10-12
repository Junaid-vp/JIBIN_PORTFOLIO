"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, Database, Code2, Zap, Cloud, Wrench, Calculator, Network, 
  Router, FileBarChart, ArrowRightLeft, Building2, LineChart, SearchCode, 
  Workflow, Webhook, Blocks, Briefcase, RefreshCw, FileText, ListTodo, Code 
} from "lucide-react";
import { SiMysql, SiPython, SiPandas, SiNumpy, SiR, SiGit } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaFileExcel } from "react-icons/fa6";
import { GrOracle } from "react-icons/gr";
import { DiMsqlServer } from "react-icons/di";
import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

const skillIcons: Record<string, React.ReactNode> = {
  "Power BI": <img src="/icons/powerbi.jpg" alt="Power BI" className="w-4 h-4 rounded-sm object-cover" />,
  "DAX": <Calculator className="w-4 h-4" />,
  "Power Query": <Database className="w-4 h-4" />,
  "Data Modelling": <Network className="w-4 h-4" />,
  "Gateway Administration": <Router className="w-4 h-4" />,
  "SSRS": <DiMsqlServer className="w-5 h-5 -ml-0.5" />,
  "MSBI": <DiMsqlServer className="w-5 h-5 -ml-0.5" />,
  "MIS Reporting": <FileBarChart className="w-4 h-4" />,
  "SQL": <Database className="w-4 h-4" />,
  "Microsoft SQL Server": <DiMsqlServer className="w-5 h-5 -ml-0.5" />,
  "MySQL": <SiMysql className="w-4 h-4" />,
  "Oracle SQL": <GrOracle className="w-4 h-4" />,
  "ETL": <ArrowRightLeft className="w-4 h-4" />,
  "Data Warehousing": <Building2 className="w-4 h-4" />,
  "Python": <SiPython className="w-4 h-4" />,
  "Pandas": <SiPandas className="w-4 h-4" />,
  "NumPy": <SiNumpy className="w-4 h-4" />,
  "Matplotlib": <LineChart className="w-4 h-4" />,
  "R": <SiR className="w-4 h-4" />,
  "Excel": <FaFileExcel className="w-4 h-4" />,
  "Pivot Tables": <FaFileExcel className="w-4 h-4" />,
  "VLOOKUP/MATCH": <SearchCode className="w-4 h-4" />,
  "SharePoint Online": <img src="/icons/sharepoint.jpg" alt="SharePoint" className="w-4 h-4 rounded-sm object-cover" />,
  "Nintex Workflows": <Workflow className="w-4 h-4" />,
  "Azure": <VscAzure className="w-4 h-4" />,
  "REST APIs": <Webhook className="w-4 h-4" />,
  "SOAP APIs": <Webhook className="w-4 h-4" />,
  "ERP Integration": <Blocks className="w-4 h-4" />,
  "Deltek Vantagepoint": <Briefcase className="w-4 h-4" />,
  "Agile/Scrum": <RefreshCw className="w-4 h-4" />,
  "SonarQube": <img src="/icons/sonarqube.jpg" alt="SonarQube" className="w-4 h-4 rounded-full object-cover" />,
  "Katalon Studio": <img src="/icons/katalon.jpg" alt="Katalon" className="w-4 h-4 rounded-sm object-cover" />,
  "Git": <SiGit className="w-4 h-4" />,
  "Documentation": <FileText className="w-4 h-4" />,
  "Process Management": <ListTodo className="w-4 h-4" />,
};

const categoryIcons: Record<string, React.ReactNode> = {
  "BI & REPORTING": <BarChart3 className="w-4 h-4" />,
  "DATABASE & QUERYING": <Database className="w-4 h-4" />,
  "PROGRAMMING": <Code2 className="w-4 h-4" />,
  "PRODUCTIVITY & AUTOMATION": <Zap className="w-4 h-4" />,
  "CLOUD & INTEGRATION": <Cloud className="w-4 h-4" />,
  "METHODOLOGIES & TOOLS": <Wrench className="w-4 h-4" />
};

interface CategoryLoopColumnProps {
  category: string;
  skills: string[];
  index: number;
  isVisible: boolean;
}

function CategoryLoopColumn({ category, skills, index, isVisible }: CategoryLoopColumnProps) {
  // Multiply items to ensure continuous seamless infinite loop
  const multiplier = Math.ceil(8 / skills.length);
  const baseList = Array.from({ length: multiplier }, () => skills).flat();
  const loopList = [...baseList, ...baseList];

  const durations = [16, 20, 15, 18, 17, 19];
  const duration = durations[index % durations.length];

  return (
    <motion.div
      className="flex flex-col gap-4 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/40">
        <h4 className="font-sans text-xs uppercase tracking-widest font-semibold text-accent flex items-center gap-2">
          <span className="opacity-80">{categoryIcons[category]}</span>
          {category}
        </h4>
        <span className="text-[10px] uppercase font-sans tracking-widest text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Paused
        </span>
      </div>

      <div
        className="tech-running-container relative h-[290px] overflow-hidden select-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="tech-running-track flex flex-col gap-3 py-1"
          style={{
            animation: `techVerticalMarquee ${duration}s linear infinite`,
          }}
        >
          {loopList.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="flex items-center gap-3 group/item hover:translate-x-1.5 transition-transform duration-200 cursor-default"
            >
              <div className="w-8 h-px bg-border shrink-0 group-hover/item:bg-accent group-hover/item:w-10 transition-all duration-300" />
              <div className="flex items-center gap-2.5">
                <span className="text-muted-foreground opacity-80 group-hover/item:opacity-100 group-hover/item:text-accent transition-colors">
                  {skillIcons[skill] || <Code className="w-4 h-4" />}
                </span>
                <span className="font-serif text-lg text-foreground group-hover/item:text-accent transition-colors">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Technologies() {
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
    <section className="py-20 md:py-24 bg-secondary border-t border-border relative overflow-hidden" id="technologies">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes techVerticalMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        .tech-running-track {
          display: flex;
          flex-direction: column;
          animation: techVerticalMarquee 18s linear infinite;
          will-change: transform;
        }
        .tech-running-container:hover .tech-running-track {
          animation-play-state: paused !important;
        }
      `}} />

      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
            Technical Ecosystem
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground tracking-wider uppercase font-sans">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Live Loop Stream &bull; Hover to Pause</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(portfolioData.technologies).map(([category, skills], index) => (
            <CategoryLoopColumn
              key={category}
              category={category}
              skills={skills}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
