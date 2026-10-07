"use client";

import { portfolioData } from "@/data/portfolioData";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-12 bg-secondary border-t border-border">
      <div className="max-w-[1440px] mx-auto px-[5%] flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Link href="/" className="font-serif text-lg font-semibold tracking-widest uppercase text-foreground">
            {portfolioData.identity.name}
          </Link>
          <span className="font-sans text-xs text-muted-foreground">
            {portfolioData.identity.title}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href={portfolioData.identity.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href={`mailto:${portfolioData.identity.email}`}
            className="font-sans text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a 
            href={portfolioData.identity.resumeUrl}
            download
            className="font-sans text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="font-sans text-xs text-muted-foreground">
          &copy; {currentYear} {portfolioData.identity.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
