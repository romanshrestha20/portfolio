import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { getAllProjects } from "@/lib/projects";
import { getMediaAssets } from "@/lib/media";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [projects, media] = await Promise.all([getAllProjects(), getMediaAssets()]);
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  return <div className="mx-auto max-w-5xl"><Link href="/admin/projects" className="admin-kicker">← Projects</Link><h1 className="admin-title mt-5">Edit {project.name}</h1><p className="admin-subtitle">Changes to published projects refresh the public portfolio.</p><ProjectEditor project={project} mediaAssets={media.assets} mediaError={media.error} /></div>;
}
