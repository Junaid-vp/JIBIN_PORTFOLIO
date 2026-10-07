"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Impact", href: "#impact" },
    { name: "Experience", href: "#experience" },
    { name: "Expertise", href: "#expertise" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[5%]",
        scrolled ? "h-16 bg-background/80 backdrop-blur-md border-b border-border" : "h-20 bg-transparent border-b border-transparent"
      )}>
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
          <Link href="/" className="font-serif text-3xl font-semibold tracking-widest uppercase">
            JJ
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href={portfolioData.identity.resumeUrl} download className="text-sm font-medium bg-foreground text-background px-5 py-2 rounded transition-transform hover:-translate-y-0.5 hover:opacity-90">
              Resume
            </a>
            <button onClick={toggleTheme} className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 border border-transparent hover:border-border rounded" aria-label="Toggle Theme">
              {mounted ? (resolvedTheme === "dark" ? "LIGHT" : "DARK") : "THEME"}
            </button>
          </div>

          <button 
            className="lg:hidden text-foreground p-1" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background z-[200] flex flex-col p-[5%] pt-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-3xl font-semibold tracking-widest uppercase">JJ</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-serif text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex justify-between items-center mt-8 pb-8">
               <a href={portfolioData.identity.resumeUrl} download className="text-sm font-medium bg-foreground text-background px-6 py-3 rounded">
                  Download Resume
               </a>
               <button onClick={toggleTheme} className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground hover:text-foreground p-2 border border-border rounded" aria-label="Toggle Theme">
                  {mounted ? (resolvedTheme === "dark" ? "LIGHT MODE" : "DARK MODE") : "THEME"}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
