import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { getPublishedProjects } from "@/lib/projects";
import { getPortfolioProfile } from "@/lib/site-settings";

export const revalidate = 3600;

export default async function HomePage() {
  const [projects, profile] = await Promise.all([getPublishedProjects(), getPortfolioProfile()]);
  return (
    <main className="signal-site w-full overflow-x-hidden bg-signal-bg text-signal-text">
      <Navbar />
      <Hero profileImageUrl={profile.imageUrl} profileImageAlt={profile.altText} />
      <Projects projects={projects} />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
