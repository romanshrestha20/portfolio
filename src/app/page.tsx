import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { getPublishedProjects } from "@/lib/projects";
import { getPortfolioSettings } from "@/lib/site-settings";


// Portrait and resume selections are managed from the admin workspace and must
// be reflected immediately instead of waiting for an ISR snapshot to expire.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, settings] = await Promise.all([getPublishedProjects(), getPortfolioSettings()]);
  const details = settings.personalDetails;
  return (
    <main className="w-full overflow-x-hidden signal-site bg-signal-bg text-signal-text">
      <Navbar name={details.name} />
      <Hero
        profileImageUrl={settings.profile.imageUrl}
        profileImageAlt={settings.profile.altText || details.name}
        resumeUrl={settings.resumeUrl}
        name={details.name}
        role={details.role}
        location={details.location}
        availability={details.availability}
        intro={details.heroIntro}
      />
      <Projects projects={projects} />
      <About
        intro={details.aboutIntro}
        body={details.aboutBody}
        location={details.location}
        study={details.study}
        focus={details.focus}
        outsideCode={details.outsideCode}
        linkedinUrl={details.linkedinUrl}
        githubUrl={details.githubUrl}
        coordinates={details.coordinates}
      />
      <Skills />
      <Contact
        name={details.name}
        email={details.email}
        linkedinUrl={details.linkedinUrl}
        prompt={details.contactPrompt}
        responseTime={details.responseTime}
      />
      <Footer name={details.name} note={details.footerNote} githubUrl={details.githubUrl} linkedinUrl={details.linkedinUrl} />

    </main>
  );
}
