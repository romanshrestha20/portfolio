import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getPublishedProjects();
  return (
    <main className="w-full overflow-x-hidden bg-signal-bg text-signal-text">
      <Navbar />
      <Hero />
      <Projects projects={projects} />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
