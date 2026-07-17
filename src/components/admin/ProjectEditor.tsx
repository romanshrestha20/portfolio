import type { Project } from "@/types/project";
import type { MediaAsset } from "@/types/media";
import { saveProject } from "@/app/admin/actions";
import MediaPicker from "@/components/admin/MediaPicker";

export default function ProjectEditor({ project, mediaAssets, mediaError }: { project?: Project; mediaAssets: MediaAsset[]; mediaError?: string | null }) {
  const facts = Object.fromEntries((project?.facts ?? []).map((fact) => [fact.label.toLowerCase(), fact.value]));
  return (
    <form action={saveProject} className="mt-10 space-y-10">
      <section><h2 className="admin-section-title">Project identity</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Name<input className="signal-control" name="name" defaultValue={project?.name} required /></label>
        <label className="signal-label flex flex-col gap-2">ID<input className="signal-control" name="id" defaultValue={project?.id} required /></label>
        <label className="signal-label flex flex-col gap-2">Slug<input className="signal-control" name="slug" defaultValue={project?.slug ?? project?.id} pattern="[a-z0-9-]+" required /></label>
        <label className="signal-label flex flex-col gap-2">Issue<input className="signal-control" name="issue" defaultValue={project?.issue ?? "01"} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Summary<textarea className="signal-control min-h-24" name="dek" defaultValue={project?.dek} required /></label>
        <MediaPicker assets={mediaAssets} initialUrl={project?.image} libraryError={mediaError} />
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Tags, comma separated<input className="signal-control" name="tags" defaultValue={project?.tags.join(", ")} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Project facts</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Role<input className="signal-control" name="role" defaultValue={facts.role} required /></label>
        <label className="signal-label flex flex-col gap-2">Focus<input className="signal-control" name="focus" defaultValue={facts.focus} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Format<input className="signal-control" name="format" defaultValue={facts.format} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Case study</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Kicker<input className="signal-control" name="kicker" defaultValue={project?.caseStudy.kicker} required /></label>
        <label className="signal-label flex flex-col gap-2">Headline<input className="signal-control" name="headline" defaultValue={project?.caseStudy.headline} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Sections, one paragraph per line<textarea className="signal-control min-h-52" name="sections" defaultValue={project?.caseStudy.sections.join("\n")} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Publishing</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Live URL<input className="signal-control" name="liveUrl" defaultValue={project?.links.live ?? ""} /></label>
        <label className="signal-label flex flex-col gap-2">Repository URL<input className="signal-control" name="codeUrl" defaultValue={project?.links.code ?? ""} /></label>
        <label className="signal-label flex flex-col gap-2">Status<select className="signal-control" name="status" defaultValue={project?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="signal-label flex flex-col gap-2">Display order<input className="signal-control" type="number" min="0" name="displayOrder" defaultValue={project?.displayOrder ?? 0} /></label>
        <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="checkbox" name="featured" defaultChecked={project?.featured} className="admin-checkbox h-4 w-4" />Featured project</label>
      </div></section>
      <button className="signal-button signal-button-primary">Save project</button>
    </form>
  );
}
