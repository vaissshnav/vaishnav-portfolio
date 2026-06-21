import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "journey", label: "journey" },
  { id: "interests", label: "interests" },
  { id: "reading", label: "reading" },
  { id: "contact", label: "contact" },
];

export function FloatingNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      const extraOffset =
        id === "contact"
          ? window.innerHeight * 0.15
          : id === "reading"
            ? window.innerHeight * 0.01
            : id === "journey"
              ? -window.innerHeight * 0.8
              : id === "interests"
                ? -window.innerHeight * -0.035
                : 0;
      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        element.getBoundingClientRect().height / 2 +
        extraOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block">
      <ul className="flex flex-col gap-5">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="group flex w-full items-center justify-end gap-3"
              >
                <span
                  className="whitespace-nowrap text-right text-[0.6rem] lowercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.12em",
                    color: isActive ? "var(--ink)" : "var(--muted-foreground)",
                    transition: "color 200ms ease",
                  }}
                >
                  {section.label}
                </span>
                <span
                  className="block rounded-full"
                  style={{
                    width: isActive ? 18 : 5,
                    height: 5,
                    backgroundColor: isActive ? "var(--accent)" : "var(--rail)",
                    transition: "width 300ms ease, background-color 300ms ease",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
