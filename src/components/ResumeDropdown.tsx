import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";

const RESUMES = [
  { id: "engineering", label: "Engineering" },
  { id: "generalist", label: "Generalist" },
];

export function ResumeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = (resume: typeof RESUMES[0]) => {
    window.location.href = `/resume-${resume.id}.pdf`;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mono-label flex items-center gap-1.5 px-3 py-1 rounded text-[0.65rem] transition-colors hover:text-accent"
      >
        Get my resume
        <ChevronDown className="h-3 w-3" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-40 rounded border bg-background shadow-lg z-50"
          style={{ borderColor: "var(--border)" }}
        >
          {RESUMES.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between px-3 py-2 border-b last:border-b-0 hover:bg-accent hover:text-background transition-colors group text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              <span>{resume.label}</span>
              <button
                onClick={() => handleDownload(resume)}
                className="p-0.5 rounded transition-colors opacity-50 group-hover:opacity-100"
              >
                <Download className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
