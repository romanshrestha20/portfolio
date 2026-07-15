import Link from "next/link";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { getMediaAssets } from "@/lib/media";

export default async function NewProjectPage() {
  const { assets, error } = await getMediaAssets();
  return <div className="mx-auto max-w-5xl"><Link href="/admin/projects" className="admin-kicker">← Projects</Link><h1 className="admin-title mt-5">New project</h1><p className="admin-subtitle">Create a draft first, then publish when the case study is ready.</p><ProjectEditor mediaAssets={assets} mediaError={error} /></div>;
}
