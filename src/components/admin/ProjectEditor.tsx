import type { Project } from "@/types/project";
import type { MediaAsset } from "@/types/media";
import { saveProject } from "@/app/admin/actions";
import MediaPicker from "@/components/admin/MediaPicker";

export default function ProjectEditor({ project, mediaAssets, mediaError }: { project?: Project; mediaAssets: MediaAsset[]; mediaError?: string | null }) {
  const facts = Object.fromEntries((project?.facts ?? []).map((fact) => [fact.label.toLowerCase(), fact.value]));
  return (
    <form action={saveProject} className="mt-10 space-y-10">
      <section><h2 className="admin-section-title">Project identity</h2><div className="admin-form-grid">
        <label className="admin-label">Name<input className="admin-input" name="name" defaultValue={project?.name} required /></label>
        <label className="admin-label">ID<input className="admin-input" name="id" defaultValue={project?.id} required /></label>
        <label className="admin-label">Slug<input className="admin-input" name="slug" defaultValue={project?.slug ?? project?.id} pattern="[a-z0-9-]+" required /></label>
        <label className="admin-label">Issue<input className="admin-input" name="issue" defaultValue={project?.issue ?? "01"} required /></label>
        <label className="admin-label sm:col-span-2">Summary<textarea className="admin-input min-h-24" name="dek" defaultValue={project?.dek} required /></label>
        <MediaPicker assets={mediaAssets} initialUrl={project?.image} libraryError={mediaError} />
        <label className="admin-label sm:col-span-2">Tags, comma separated<input className="admin-input" name="tags" defaultValue={project?.tags.join(", ")} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Project facts</h2><div className="admin-form-grid">
        <label className="admin-label">Role<input className="admin-input" name="role" defaultValue={facts.role} required /></label>
        <label className="admin-label">Focus<input className="admin-input" name="focus" defaultValue={facts.focus} required /></label>
        <label className="admin-label sm:col-span-2">Format<input className="admin-input" name="format" defaultValue={facts.format} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Case study</h2><div className="admin-form-grid">
        <label className="admin-label">Kicker<input className="admin-input" name="kicker" defaultValue={project?.caseStudy.kicker} required /></label>
        <label className="admin-label">Headline<input className="admin-input" name="headline" defaultValue={project?.caseStudy.headline} required /></label>
        <label className="admin-label sm:col-span-2">Sections, one paragraph per line<textarea className="admin-input min-h-52" name="sections" defaultValue={project?.caseStudy.sections.join("\n")} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Publishing</h2><div className="admin-form-grid">
        <label className="admin-label">Live URL<input className="admin-input" name="liveUrl" defaultValue={project?.links.live ?? ""} /></label>
        <label className="admin-label">Repository URL<input className="admin-input" name="codeUrl" defaultValue={project?.links.code ?? ""} /></label>
        <label className="admin-label">Status<select className="admin-input" name="status" defaultValue={project?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="admin-label">Display order<input className="admin-input" type="number" min="0" name="displayOrder" defaultValue={project?.displayOrder ?? 0} /></label>
        <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4 accent-[#b8ff47]" />Featured project</label>
      </div></section>
      <button className="admin-primary">Save project</button>
    </form>
  );
}
