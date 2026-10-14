"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SquishSwitch from "@/components/SquishSwitch";
import { smoothScrollTo } from "@/lib/smoothScroll";

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
    { name: "Expertise", href: "#expertise" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href, 70, 900);
      window.history.pushState(null, "", href);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      smoothScrollTo(href, 70, 900);
      window.history.pushState(null, "", href);
    }, 120);
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[5%]",
        scrolled ? "h-16 bg-background/85 backdrop-blur-md border-b border-border shadow-xs" : "h-20 bg-transparent border-b border-transparent"
      )}>
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
          
          {/* Logo & Brand Info */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-3xl font-semibold tracking-widest uppercase text-foreground">
              JJ
            </span>
            <div className="hidden sm:flex flex-col border-l border-border/70 pl-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground">
                {portfolioData.identity.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                {portfolioData.identity.title}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-1 cursor-pointer"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions: Download Resume & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={portfolioData.identity.resumeUrl} 
              download 
              className="text-xs font-medium bg-foreground text-background dark:bg-white dark:text-[#0B0F19] hover:opacity-90 px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 border border-border shadow-xs cursor-pointer"
            >
              <Download size={13} className="text-accent dark:text-blue-600" />
              <span>Resume</span>
            </a>

            {/* SquishSwitch Theme Toggle */}
            {mounted ? (
              <div className="flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-2xs transition-colors">
                <SquishSwitch
                  checked={resolvedTheme === "dark"}
                  onChange={(val) => setTheme(val ? "dark" : "light")}
                  ariaLabel="Toggle dark/light mode"
                  width={46}
                  height={24}
                  radius={12}
                  trackColor="#E2E8F0"
                  trackOnColor="#1E293B"
                  thumbColor="#2563EB"
                  thumbOnColor="#38BDF8"
                  speed={60}
                  stretch={35}
                />
              </div>
            ) : (
              <div className="w-[84px] h-[34px]" />
            )}
          </div>

          {/* Mobile Right Actions: Theme Toggle & Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {mounted && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <SquishSwitch
                  checked={resolvedTheme === "dark"}
                  onChange={(val) => setTheme(val ? "dark" : "light")}
                  ariaLabel="Toggle dark/light mode"
                  width={40}
                  height={22}
                  radius={11}
                  trackColor="#E2E8F0"
                  trackOnColor="#1E293B"
                  thumbColor="#2563EB"
                  thumbOnColor="#38BDF8"
                  speed={60}
                  stretch={35}
                />
              </div>
            )}

            <button 
              className="text-foreground p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>

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
            <div className="flex justify-between items-center mb-10">
              <span className="font-serif text-3xl font-semibold tracking-widest uppercase">JJ</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-serif text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-4 mt-8 pb-8 pt-4 border-t border-border">
              <a 
                href={portfolioData.identity.resumeUrl} 
                download 
                className="text-xs font-medium bg-foreground text-background dark:bg-white dark:text-[#0B0F19] px-4 py-2 rounded-full flex items-center gap-1.5"
              >
                <Download size={13} className="text-accent dark:text-blue-600" />
                <span>Resume</span>
              </a>

              {mounted && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50">
                  <SquishSwitch
                    checked={resolvedTheme === "dark"}
                    onChange={(val) => setTheme(val ? "dark" : "light")}
                    ariaLabel="Toggle dark/light mode"
                    width={46}
                    height={24}
                    radius={12}
                    trackColor="#E2E8F0"
                    trackOnColor="#1E293B"
                    thumbColor="#2563EB"
                    thumbOnColor="#38BDF8"
                    speed={60}
                    stretch={35}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
