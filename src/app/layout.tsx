import type { Metadata } from "next";
import { Nunito, Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Preloader } from "@/components/Preloader";

const nunito = Nunito({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans" 
});
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif" 
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-signature"
});

export const metadata: Metadata = {
  title: "Jibin Johnson — BI Administrator & Data Analytics Specialist",
  description: "Results-driven BI Administrator and Data Analytics Specialist with 4+ years of experience administering BI platforms, managing data pipelines, and delivering enterprise reporting solutions.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${cormorant.variable} ${dancingScript.variable} antialiased selection:bg-accent selection:text-accent-foreground`}>
        <Preloader />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
