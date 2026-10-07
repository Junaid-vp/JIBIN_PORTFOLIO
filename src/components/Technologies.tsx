"use client";

import { motion } from "framer-motion";
import { BarChart3, Database, Code2, Zap, Cloud, Wrench, Calculator, Network, Router, FileBarChart, ArrowRightLeft, Building2, LineChart, SearchCode, Workflow, Webhook, Blocks, Briefcase, RefreshCw, FileText, ListTodo, Code } from "lucide-react";
import { SiMysql, SiPython, SiPandas, SiNumpy, SiR, SiGit } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaFileExcel } from "react-icons/fa6";
import { GrOracle } from "react-icons/gr";
import { DiMsqlServer } from "react-icons/di";
import React from "react";

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
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef, useState } from "react";

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
    <section className="py-20 md:py-24 bg-secondary border-t border-border relative">
      <div className="max-w-[1440px] mx-auto px-[5%]" ref={containerRef}>
        <div className="font-sans text-sm uppercase tracking-[0.1em] text-muted-foreground mb-12 flex items-center gap-4 before:content-[''] before:block before:w-10 before:h-px before:bg-muted-foreground">
          Technical Ecosystem
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(portfolioData.technologies).map(([category, skills], index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <h4 className="font-sans text-xs uppercase tracking-widest font-semibold text-accent flex items-center gap-2">
                <span className="opacity-80">{categoryIcons[category]}</span>
                {category}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-px bg-border shrink-0" />
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground opacity-80">{skillIcons[skill] || <Code className="w-4 h-4" />}</span>
                      <span className="font-serif text-lg text-foreground">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
