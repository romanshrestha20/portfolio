import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { getPublishedProjects } from "@/lib/projects";
import { getPortfolioSettings } from "@/lib/site-settings";


export const revalidate = 3600;

export default async function HomePage() {
  const [projects, settings] = await Promise.all([getPublishedProjects(), getPortfolioSettings()]);
  return (
    <main className="w-full overflow-x-hidden signal-site bg-signal-bg text-signal-text">
      <Navbar />
      <Hero
        profileImageUrl={settings.profile.imageUrl}
        profileImageAlt={settings.profile.altText}
        resumeUrl={settings.resumeUrl}
      />
      <Projects projects={projects} />
      <About />
      <Skills />
      <Contact />
      <Footer />

    </main>
  );
}
