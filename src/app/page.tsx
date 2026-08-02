import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { getPublishedProjects } from "@/lib/projects";
import { getPortfolioSettings } from "@/lib/site-settings";
import { absoluteUrl, serializeJsonLd, SITE_URL } from "@/lib/seo";


// Portrait and resume selections are managed from the admin workspace and must
// be reflected immediately instead of waiting for an ISR snapshot to expire.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, settings] = await Promise.all([getPublishedProjects(), getPortfolioSettings()]);
  const details = settings.personalDetails;
  const personId = `${SITE_URL}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${details.name} Portfolio`,
        description: details.heroIntro,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile-page`,
        url: SITE_URL,
        name: `${details.name} — ${details.role}`,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: details.name,
        jobTitle: details.role,
        url: SITE_URL,
        image: absoluteUrl(settings.profile.imageUrl),
        email: `mailto:${details.email}`,
        address: { "@type": "PostalAddress", addressLocality: details.location },
        sameAs: [details.linkedinUrl, details.githubUrl].filter(Boolean),
      },
    ],
  };
  return (
    <main className="w-full overflow-x-hidden signal-site bg-signal-bg text-signal-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
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
