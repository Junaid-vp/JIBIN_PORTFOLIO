import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Profile } from "@/components/Profile";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Technologies } from "@/components/Technologies";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-accent selection:text-accent-foreground">
      <Header />
      <Hero />
      <Impact />
      <Profile />
      <Expertise />
      <Experience />
      <Technologies />
      <ProjectShowcase />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
