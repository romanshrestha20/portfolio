import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-signal-line bg-signal-bg px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 text-sm text-signal-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Roman Shrestha · Built in Helsinki</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/romanshrestha20" target="_blank" rel="noreferrer" className="hover:text-signal-text">GitHub</a>
          <a href="https://www.linkedin.com/in/romanshrr/" target="_blank" rel="noreferrer" className="hover:text-signal-text">LinkedIn</a>
          <a href="#home" className="flex items-center gap-2 hover:text-signal-text">Back to signal <ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
