"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink, 
  Briefcase, 
  Users, 
  Handshake, 
  MoreHorizontal, 
  Calendar, 
  Paperclip, 
  Send, 
  BarChart3, 
  LineChart, 
  Workflow, 
  Headphones, 
  ChevronDown, 
  User, 
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { sendEmail } from "@/actions/sendEmail";
import { DottedGlobe } from "@/components/DottedGlobe";

function LinkedinIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function compressImage(file: File, maxWidth = 1600, quality = 0.8): Promise<File> {
  if (!file.type.startsWith("image/")) return Promise.resolve(file);

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
            } else {
              const newName = file.name.replace(/\.[^/.]+$/, ".jpg");
              const compressedFile = new File([blob], newName, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states
  const [projectType, setProjectType] = useState<string>("Freelance Project");
  const [messageText, setMessageText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionNote, setCompressionNote] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const rawFile = e.target.files[0];
      if (rawFile.type.startsWith("image/")) {
        setIsCompressing(true);
        try {
          const compressed = await compressImage(rawFile);
          setSelectedFile(compressed);
          if (compressed.size < rawFile.size) {
            const origMb = (rawFile.size / (1024 * 1024)).toFixed(2);
            const compKb = Math.round(compressed.size / 1024);
            setCompressionNote(`Optimized to ${compKb} KB (reduced from ${origMb} MB)`);
          } else {
            setCompressionNote(null);
          }
        } catch {
          setSelectedFile(rawFile);
          setCompressionNote(null);
        } finally {
          setIsCompressing(false);
        }
      } else {
        setSelectedFile(rawFile);
        setCompressionNote(null);
      }
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setCompressionNote(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.set("projectType", projectType);
    if (selectedFile) {
      formData.set("file", selectedFile);
    }

    try {
      const result = await sendEmail(formData);

      if (result?.error) {
        setStatus("error");
        setErrorMessage(result.error);
      } else {
        setStatus("success");
        formRef.current?.reset();
        setMessageText("");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit form.");
    }
  }

  const projectTypes = [
    { id: "Freelance Project", label: "Freelance Project", icon: Briefcase },
    { id: "Consulting", label: "Consulting", icon: Users },
    { id: "Collaboration", label: "Collaboration", icon: Handshake },
    { id: "Other", label: "Other", icon: MoreHorizontal },
  ];

  const capabilities = [
    { title: "BI & Reporting", icon: BarChart3 },
    { title: "Data Analytics", icon: LineChart },
    { title: "ETL & Automation", icon: Workflow },
    { title: "Consulting & Support", icon: Headphones },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 scroll-mt-0 bg-[#EFEAE2] dark:bg-black text-foreground relative overflow-hidden transition-colors duration-500" id="contact">
      
      {/* Decorative Topographic Curves Background */}
      <div className="absolute right-0 top-0 w-full max-w-3xl h-full pointer-events-none opacity-20 dark:opacity-10 overflow-hidden">
        <svg viewBox="0 0 800 800" className="w-full h-full text-[#C59B63]" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M450,-50 C520,120 620,180 780,220 C840,240 880,310 850,420 C820,530 680,590 560,650 C440,710 320,780 200,850" />
          <path d="M400,-70 C470,100 580,160 740,190 C800,210 850,280 820,380 C790,480 660,550 530,620 C400,690 280,750 160,820" />
          <path d="M350,-90 C420,80 540,140 700,160 C760,180 820,250 790,340 C760,430 640,510 500,590 C360,670 240,720 120,790" />
        </svg>
      </div>

      <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-stretch">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-2 sm:gap-3">
            
            {/* Top Info Section */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A67E50] dark:text-[#C59B63]">
                  Let&apos;s Connect
                </span>
                <span className="w-8 h-[1.5px] bg-[#A67E50]/50 dark:bg-[#C59B63]/60 inline-block" />
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-[clamp(2.1rem,3.2vw,3.2rem)] leading-[0.98] tracking-tight font-normal text-[#121614] dark:text-neutral-100 m-0">
                Let&apos;s Work <br />
                With <span className="text-[#B8874E] italic font-serif">Data.</span>
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-normal sm:leading-relaxed max-w-xl m-0">
                I&apos;m open to freelance projects, consulting opportunities, and collaborative work in BI, data analytics, reporting, and automation. If you have a project in mind or just want to discuss ideas, I&apos;d love to hear from you.
              </p>

              {/* 4 Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-0.5">
                
                {/* Email Card */}
                <div className="bg-[#E7E1D6]/85 dark:bg-[#14100E] border border-[#D8D0C3] dark:border-[#382820]/80 rounded-xl py-1.5 px-3 sm:py-2 sm:px-3.5 flex items-center justify-between gap-2 shadow-xs hover:border-[#C59B63]/50 transition-all group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1512] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                        Email
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate" title={portfolioData.identity.email}>
                        {portfolioData.identity.email}
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleCopy(portfolioData.identity.email, "email")}
                    className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    title={copiedField === "email" ? "Copied!" : "Copy email"}
                    aria-label="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="bg-[#E7E1D6]/85 dark:bg-[#14100E] border border-[#D8D0C3] dark:border-[#382820]/80 rounded-xl py-1.5 px-3 sm:py-2 sm:px-3.5 flex items-center justify-between gap-2 shadow-xs hover:border-[#C59B63]/50 transition-all group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1512] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Phone size={14} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                        Phone
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                        {portfolioData.identity.phone}
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleCopy(portfolioData.identity.phone, "phone")}
                    className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    title={copiedField === "phone" ? "Copied!" : "Copy phone"}
                    aria-label="Copy phone"
                  >
                    {copiedField === "phone" ? (
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Location Card */}
                <div className="bg-[#E7E1D6]/85 dark:bg-[#14100E] border border-[#D8D0C3] dark:border-[#382820]/80 rounded-xl py-1.5 px-3 sm:py-2 sm:px-3.5 flex items-center gap-2.5 shadow-xs hover:border-[#C59B63]/50 transition-all">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1512] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {portfolioData.identity.location}
                    </span>
                  </div>
                </div>

                {/* LinkedIn Card */}
                <div className="bg-[#E7E1D6]/85 dark:bg-[#14100E] border border-[#D8D0C3] dark:border-[#382820]/80 rounded-xl py-1.5 px-3 sm:py-2 sm:px-3.5 flex items-center justify-between gap-2 shadow-xs hover:border-[#C59B63]/50 transition-all group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1512] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
                      <LinkedinIcon size={14} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                        LinkedIn
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100" title="linkedin.com/in/jibin-309johnson">
                        linkedin.com/in/jibin-309johnson
                      </span>
                    </div>
                  </div>
                  <a 
                    href={portfolioData.identity.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg transition-colors shrink-0"
                    title="Open LinkedIn"
                    aria-label="Open LinkedIn profile"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            </div>

            {/* Bottom Dark Card: Open to Freelance Projects & Consulting */}
            <div className="bg-[#1C1512] border border-[#3E2E25]/80 rounded-2xl p-2.5 sm:p-3 text-white shadow-lg relative overflow-hidden flex flex-col justify-between gap-2 mt-0.5">
              
              {/* Top Row: Dotted Globe + Title on Left, 4 Capabilities on Right */}
              <div className="flex items-center justify-between gap-3 w-full">
                {/* Left: Globe + Title starting at top of globe */}
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <DottedGlobe size={58} />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C59B63] font-semibold leading-none">
                      Open to
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-normal text-white leading-tight mt-1 mb-0">
                      Freelance Projects &amp; Consulting
                    </h3>
                  </div>
                </div>

                {/* Right: 4 Capability Items (2x2 Grid) */}
                <div className="grid grid-cols-2 gap-1.5 shrink-0">
                  {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    return (
                      <div key={cap.title} className="flex items-center gap-1.5">
                        <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-md border border-white/15 bg-white/5 flex items-center justify-center text-white/90 shrink-0">
                          <Icon size={12} />
                        </div>
                        <span className="text-xs sm:text-[12.5px] font-medium text-neutral-200 whitespace-nowrap">
                          {cap.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Written straight across the bottom of the container */}
              <div className="pt-1.5 border-t border-[#3E2E25]/80 w-full">
                <p className="text-xs sm:text-[13px] text-neutral-300/85 leading-normal m-0">
                  Available for short-term and long-term engagements in BI, data analytics, reporting, ETL, and automation.
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN (SEND A MESSAGE FORM) ================= */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-[#1C1512] border border-[#3E2E25]/80 rounded-2xl sm:rounded-3xl py-3 px-3.5 sm:py-3.5 sm:px-5 lg:py-3.5 lg:px-5 text-white shadow-xl relative h-full flex flex-col justify-between">
              
              {/* Card Header Row */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C59B63]">
                      Send a Message
                    </span>
                    <span className="w-8 h-[1.5px] bg-[#C59B63]/60 inline-block" />
                  </div>

                  {/* Typically replies soon badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Typically replies soon
                  </div>
                </div>

                {/* Form Title & Description */}
                <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-white mt-1 mb-0.5 tracking-tight">
                  Tell Me About Your Project
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 mb-2">
                  Share a few details and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* The Interactive Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  
                  {/* Name Field */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="name" className="text-xs sm:text-[13px] font-medium text-neutral-200">
                      Your Name <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-3 text-neutral-500 pointer-events-none" />
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#140E0C] border border-[#382820]/80 rounded-lg px-3 py-1.5 pl-8 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C59B63] focus:ring-1 focus:ring-[#C59B63] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="email" className="text-xs sm:text-[13px] font-medium text-neutral-200">
                      Your Email <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={14} className="absolute left-3 text-neutral-500 pointer-events-none" />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#140E0C] border border-[#382820]/80 rounded-lg px-3 py-1.5 pl-8 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C59B63] focus:ring-1 focus:ring-[#C59B63] transition-colors"
                      />
                    </div>
                  </div>

                </div>

                {/* Row 2: Project Type (4 Selectable Cards) */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-xs sm:text-[13px] font-medium text-neutral-200">
                    Project Type <span className="text-amber-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = projectType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setProjectType(pt.id)}
                          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border transition-all cursor-pointer text-center ${
                            isSelected 
                              ? "border-[#C59B63] bg-[#C59B63]/15 text-white ring-1 ring-[#C59B63]" 
                              : "border-[#382820]/80 bg-[#140E0C] text-neutral-400 hover:border-[#523A2E] hover:text-neutral-200"
                          }`}
                        >
                          <Icon size={14} className={isSelected ? "text-[#C59B63]" : "text-neutral-400"} />
                          <span className="text-xs sm:text-[13px] font-medium tracking-tight whitespace-nowrap">
                            {pt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 3: Budget Range & Timeline (2 Dropdowns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  
                  {/* Budget Dropdown */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="budget" className="text-xs sm:text-[13px] font-medium text-neutral-200">
                      Budget Range <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <select 
                        id="budget" 
                        name="budget" 
                        defaultValue=""
                        className="w-full bg-[#140E0C] border border-[#382820]/80 rounded-lg px-3 py-1.5 text-sm text-neutral-200 focus:outline-none focus:border-[#C59B63] focus:ring-1 focus:ring-[#C59B63] transition-colors appearance-none pr-8 cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#140E0C] text-neutral-500">Select budget range</option>
                        <option value="< $1,000" className="bg-[#140E0C] text-white">&lt; $1,000</option>
                        <option value="$1,000 - $3,000" className="bg-[#140E0C] text-white">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000" className="bg-[#140E0C] text-white">$3,000 - $5,000</option>
                        <option value="$5,000+" className="bg-[#140E0C] text-white">$5,000+</option>
                        <option value="To be discussed" className="bg-[#140E0C] text-white">To be discussed</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Timeline Dropdown */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="timeline" className="text-xs sm:text-[13px] font-medium text-neutral-200">
                      Timeline <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <Calendar size={14} className="absolute left-2.5 text-neutral-500 pointer-events-none" />
                      <select 
                        id="timeline" 
                        name="timeline" 
                        defaultValue=""
                        className="w-full bg-[#140E0C] border border-[#382820]/80 rounded-lg px-3 py-1.5 pl-8 text-sm text-neutral-200 focus:outline-none focus:border-[#C59B63] focus:ring-1 focus:ring-[#C59B63] transition-colors appearance-none pr-8 cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#140E0C] text-neutral-500">Select timeline</option>
                        <option value="Immediate (< 2 weeks)" className="bg-[#140E0C] text-white">Immediate (&lt; 2 weeks)</option>
                        <option value="1 - 2 months" className="bg-[#140E0C] text-white">1 - 2 months</option>
                        <option value="3+ months" className="bg-[#140E0C] text-white">3+ months</option>
                        <option value="Flexible" className="bg-[#140E0C] text-white">Flexible</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                </div>

                {/* Row 4: Message */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-xs sm:text-[13px] font-medium text-neutral-200">
                      Message <span className="text-amber-500">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {messageText.length}/1000
                    </span>
                  </div>
                  <div className="relative bg-[#140E0C] border border-[#382820]/80 rounded-lg px-3 py-1.5 focus-within:border-[#C59B63] focus-within:ring-1 focus-within:ring-[#C59B63] transition-colors">
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={2}
                      maxLength={1000}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Please describe your project, requirements, goals, and any specific technologies you'd like to discuss..."
                      className="w-full bg-transparent border-none text-sm text-white placeholder:text-neutral-500 focus:outline-none resize-none min-h-[38px] sm:min-h-[42px] leading-snug"
                    />
                  </div>
                </div>

                {/* Row 5: Attach File (Optional) */}
                <div className="border border-[#382820]/80 bg-[#140E0C] rounded-lg py-1.5 px-2.5 sm:py-2 sm:px-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                      <Paperclip size={13} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-[13px] font-medium text-white truncate">
                        {isCompressing 
                          ? "Compressing image..." 
                          : selectedFile 
                            ? selectedFile.name 
                            : "Attach File (Optional)"}
                      </span>
                      <span className="text-[11px] text-neutral-400 truncate hidden sm:block">
                        {isCompressing ? (
                          <span className="text-[#C59B63]">Optimizing image for fast delivery...</span>
                        ) : compressionNote ? (
                          <span className="text-emerald-400">{compressionNote}</span>
                        ) : selectedFile ? (
                          `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace`
                        ) : (
                          "Project brief, specs, or image (PDF, DOC, PNG, JPG)"
                        )}
                      </span>
                    </div>
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.png,.jpg,.jpeg"
                  />

                  <div className="flex items-center gap-1.5 shrink-0">
                    {selectedFile && (
                      <button 
                        type="button" 
                        onClick={clearFile}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Remove file"
                        aria-label="Remove attached file"
                      >
                        <X size={13} />
                      </button>
                    )}
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-medium px-2.5 py-1 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 transition-colors cursor-pointer"
                    >
                      {selectedFile ? "Change" : "Choose File"}
                    </button>
                  </div>
                </div>

                {/* Row 6: Submit Button */}
                <div className="mt-0.5 flex flex-col gap-1">
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-[#C59B63] hover:bg-[#B3874E] active:bg-[#9F7540] text-[#1C1512] font-semibold text-sm sm:text-base py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#C59B63]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#1C1512] border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Message Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Feedback banners */}
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs"
                      >
                        <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                        <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs"
                      >
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errorMessage || "Failed to send message. Please reach out directly to jibin309johnson@gmail.com"}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
