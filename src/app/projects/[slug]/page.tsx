import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublishedProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { absoluteUrl, serializeJsonLd, SITE_URL } from "@/lib/seo";
import { getPortfolioSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };

  const path = `/projects/${project.slug ?? project.id}`;
  const socialImage = `${path}/opengraph-image`;
  return {
    title: `${project.name} Case Study`,
    description: project.dek,
    alternates: { canonical: path },
    openGraph: {
      title: project.caseStudy.headline,
      description: project.dek,
      url: path,
      type: "article",
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${project.name} case study` }],
    },
    twitter: { card: "summary_large_image", title: project.name, description: project.dek, images: [socialImage] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([
    getPublishedProjectBySlug(slug),
    getPublishedProjects(),
    getPortfolioSettings(),
  ]);
  if (!project) notFound();

  const details = settings.personalDetails;
  const projectPath = `/projects/${project.slug ?? project.id}`;
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}${projectPath}#project`,
    name: project.name,
    headline: project.caseStudy.headline,
    description: project.dek,
    url: `${SITE_URL}${projectPath}`,
    image: absoluteUrl(project.image),
    keywords: project.tags,
    creator: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: details.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${projectPath}` },
  };

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-signal-bg text-signal-text signal-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <header className="border-b border-signal-line">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-signal-text transition hover:text-signal">
            {details.name} / Portfolio
          </Link>
          <Link href="/#projects" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-signal-muted transition hover:text-signal">
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
        </div>
      </header>

      <article>
        <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-16 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="signal-kicker">Case file / {project.issue} / {project.caseStudy.kicker}</p>
              <h1 className="mt-6 max-w-[11ch] text-[clamp(3.8rem,10vw,9rem)] leading-[.82] tracking-[-.07em] text-signal-text">
                {project.name}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-lg leading-8 text-signal-muted">{project.caseStudy.headline}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {project.tags.map((tag) => <span key={tag} className="font-mono text-[10px] uppercase tracking-[.16em] text-signal">{tag}</span>)}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="project-media relative aspect-[16/9] overflow-hidden border border-signal-line">
            <Image src={project.image} alt={`${project.name} product interface`} fill priority sizes="(max-width: 1600px) 100vw, 1536px" className="object-cover" />
            <span className="absolute left-4 top-4 z-20 bg-signal px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-signal-bg">Published transmission</span>
          </div>
        </div>

        <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid border-y border-signal-line sm:grid-cols-3">
            {project.facts.map((fact) => (
              <div key={fact.label} className="border-b border-signal-line py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <p className="font-mono text-[9px] uppercase tracking-[.18em] text-signal-muted">{fact.label}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-.03em]">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="signal-kicker">Build notes / recorded decisions</p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-signal-muted">{project.dek}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {project.caseStudy.sections.map((section, index) => (
                <section key={section} className="grid gap-4 border-t border-signal-line py-9 sm:grid-cols-[5rem_1fr]">
                  <h2 className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-signal">Note {String(index + 1).padStart(2, "0")}</h2>
                  <p className="text-lg leading-8 text-signal-muted sm:text-xl sm:leading-9">{section}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3 border-t border-signal-line pt-10">
            {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="signal-button signal-button-primary">View live project <ArrowUpRight className="h-4 w-4" /></a>}
            {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer" className="signal-button">Source code <Github className="h-4 w-4" /></a>}
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-signal-line px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1600px]">
              <p className="signal-kicker mb-6">Continue through the archive</p>
              <div className="border-t border-signal-line">
                {related.map((item) => (
                  <Link key={item.id} href={`/projects/${item.slug ?? item.id}`} className="group grid gap-2 border-b border-signal-line py-6 transition hover:pl-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
                    <span className="text-2xl font-semibold tracking-[-.04em]">{item.name}</span>
                    <span className="text-sm text-signal-muted">{item.tags.join(" · ")}</span>
                    <ArrowUpRight className="h-5 w-5 text-signal transition group-hover:rotate-45" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <footer className="border-t border-signal-line px-5 py-8 text-sm text-signal-muted sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] justify-between gap-4">
          <p>© {new Date().getFullYear()} {details.name}</p>
          <a href="#top" className="transition hover:text-signal">Back to top</a>
        </div>
      </footer>
    </main>
  );
}
