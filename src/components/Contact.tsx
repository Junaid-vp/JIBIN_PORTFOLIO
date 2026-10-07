"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { sendEmail } from "@/actions/sendEmail";
import { useState, useRef } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrorMessage("");

    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      formRef.current?.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  }

  return (
    <section className="py-20 md:py-24 bg-background relative border-t border-border" id="contact">
      <div className="max-w-[1440px] mx-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="flex flex-col gap-12">
          <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-foreground m-0 uppercase">
            Let&apos;s Work<br />With Data.
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <a href={`mailto:${portfolioData.identity.email}`} className="font-sans text-lg text-foreground hover:text-accent transition-colors">
                {portfolioData.identity.email}
              </a>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <a href={`tel:${portfolioData.identity.phone.replace(/\s/g, '')}`} className="font-sans text-lg text-foreground hover:text-accent transition-colors">
                {portfolioData.identity.phone}
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Location</span>
              <span className="font-sans text-lg text-foreground">
                {portfolioData.identity.location}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Network</span>
              <a href={portfolioData.identity.linkedin} target="_blank" rel="noopener noreferrer" className="font-sans text-lg text-foreground hover:text-accent transition-colors">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <form ref={formRef} action={handleSubmit} className="flex flex-col gap-8 w-full max-w-[600px] lg:ml-auto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-sans text-sm text-secondary-foreground">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className="bg-transparent border-b border-border py-2 text-foreground font-sans text-base focus:outline-none focus:border-foreground transition-colors rounded-none"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-sm text-secondary-foreground">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className="bg-transparent border-b border-border py-2 text-foreground font-sans text-base focus:outline-none focus:border-foreground transition-colors rounded-none"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-sans text-sm text-secondary-foreground">Message</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={4}
                className="bg-transparent border-b border-border py-2 text-foreground font-sans text-base focus:outline-none focus:border-foreground transition-colors rounded-none resize-none"
                placeholder="How can I help you?"
              />
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <button 
                type="submit"
                disabled={status === "loading"}
                className="font-sans text-sm uppercase tracking-widest font-semibold bg-foreground text-background py-4 px-8 self-start hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <span className="font-sans text-sm text-green-600 dark:text-green-400">
                  Message sent successfully! I'll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="font-sans text-sm text-red-600 dark:text-red-400">
                  {errorMessage || "Failed to send message. Please try again."}
                </span>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
