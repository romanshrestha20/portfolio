import { ArrowUp } from "lucide-react";

export default function Footer({
  name = "Roman Shrestha",
  note = "Built in Helsinki",
  githubUrl = "https://github.com/romanshrestha20",
  linkedinUrl = "https://www.linkedin.com/in/romanshrr/",
}) {
  return (
    <footer className="border-t border-signal-line bg-signal-bg px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 text-sm text-signal-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {name} · {note}</p>
        <div className="flex items-center gap-6">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-signal-text">GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-signal-text">LinkedIn</a>
          <a href="#home" className="flex items-center gap-2 hover:text-signal-text">Back to top <ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
