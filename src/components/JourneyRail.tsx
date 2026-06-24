import { useEffect, useLayoutEffect, useRef, useState, forwardRef } from "react";

export type JourneyNode = {
  id: string;
  connId: string;
  title: string;
  year: string;
  subtitle: string;
  summary: string;
  logo?: string;
  tags?: string[];
};

/**
 * STRICTLY CHRONOLOGICAL. Each node is a shift in thinking,
 * not just a project — including reading and pathway decisions.
 */
const NODES: JourneyNode[] = [
  {
    id: "early-design",
    connId: "j-early-design",
    title: "Early design period",
    year: "2022",
    subtitle: "The first serious craft",
    summary:
      "Long before the startups and electronics, the first real obsession was visual and interaction design; copying, redrawing and deconstructing interfaces to understand why they worked.",
    logo: "DSGN",
    tags: ["Design", "Craft", "Self-taught"],
  },
  {
    id: "eonforge",
    connId: "j-eonforge",
    title: "EonForge",
    year: "Aug 2023 — Nov 2023",
    subtitle: "UI/UX Design Intern",
    summary:
      "First professional experience; ERP software for schools. Real users, real constraints, real opinions.",
    logo: "EF",
    tags: ["Design", "UX", "Interfaces"],
  },
  {
    id: "whomr",
    connId: "j-whomr",
    title: "Whomr",
    year: "Dec 2023 — Present",
    subtitle: "Founder",
    summary:
      "Identified a roommate-discovery problem and built a startup around it. MVPs, surveys, user conversations, pitch, angel funding.",
    logo: "WHM",
    tags: ["Startup", "Validation", "Customer Discovery"],
  },
  {
    id: "wemus",
    connId: "j-wemus",
    title: "Wemus",
    year: "Oct 2024 — Apr 2025",
    subtitle: "Founder's Office & Operations Intern",
    summary:
      "Worked on 0 → 1; product research, onboarding, UX decisions, GTM conversations, the operational glue.",
    logo: "WMS",
    tags: ["Product", "Users", "Execution"],
  },
  {
    id: "afc",
    connId: "j-afc",
    title: "AFC",
    year: "2025 — Present",
    subtitle: "Aspiring Filmmakers Collective",
    summary:
      "Started a filmmaking community from scratch and grew it organically to 150+ members. Hosting sessions, challenges, conversations.",
    logo: "AFC",
    tags: ["Community", "Retention", "Behavior"],
  },
  {
    id: "reading-turn",
    connId: "j-reading-turn",
    title: "Reading — Understanding — Engineering",
    year: "2026",
    subtitle: "From inputs to direction to commitment",
    summary:
      "Amidst the AI boom, when everyone focused on the applications, I was stuck think about what made it possiblem, the compute, the hardware. and my curiosity led me to EEE at MIT M.",
    logo: "LIFE",
    tags: ["Books", "Hardware", "Semiconductors", "Robotics", "AI Infra"],
  },
];

export function JourneyRail() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // ----- Curved path geometry -----
  const [geom, setGeom] = useState<{
    w: number;
    h: number;
    anchors: Array<{ y: number; cx: number }>;
    path: string;
    length: number;
    isMd: boolean;
  } | null>(null);
  const pathMeasureRef = useRef<SVGPathElement | null>(null);

  const recomputeGeometry = () => {
    const c = containerRef.current;
    if (!c) return;
    const cRect = c.getBoundingClientRect();
    const w = cRect.width;
    const isMd = window.matchMedia("(min-width: 768px)").matches;
    const railCx = isMd ? w / 2 : 24;

    const anchors = dotRefs.current.map((el) => {
      if (!el) return { y: 0, cx: railCx };
      const r = el.getBoundingClientRect();
      const y = r.top - cRect.top + r.height / 2;
      return { y, cx: railCx };
    });

    if (anchors.length === 0) {
      setGeom(null);
      return;
    }

    const last = anchors[anchors.length - 1].y + 80;
    const h = Math.max(last, cRect.height);

    // S-curve through every anchor: control points offset horizontally,
    // alternating sign, magnitude proportional to vertical distance.
    const sway = isMd ? Math.min(120, w * 0.12) : 22;
    let d = `M ${railCx},${anchors[0].y}`;
    for (let i = 1; i < anchors.length; i++) {
      const prev = anchors[i - 1];
      const cur = anchors[i];
      const dy = cur.y - prev.y;
      const dir = i % 2 === 1 ? 1 : -1;
      const c1x = railCx + dir * sway;
      const c1y = prev.y + dy * 0.45;
      const c2x = railCx - dir * sway;
      const c2y = cur.y - dy * 0.45;
      d += ` C ${c1x},${c1y} ${c2x},${c2y} ${railCx},${cur.y}`;
    }

    // Measure length
    let length = 0;
    if (pathMeasureRef.current) {
      pathMeasureRef.current.setAttribute("d", d);
      try {
        length = pathMeasureRef.current.getTotalLength();
      } catch {
        length = h;
      }
    }

    setGeom({ w, h, anchors, path: d, length, isMd });
  };

  useLayoutEffect(() => {
    recomputeGeometry();
    // Also recompute after expand animation completes
    const timer = setTimeout(recomputeGeometry, 600);
    const onResize = () => recomputeGeometry();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;

      const railTop = rect.top;
      const railHeight = rect.height;
      const traveled = Math.min(Math.max(viewportMid - railTop, 0), railHeight);
      const p = railHeight > 0 ? traveled / railHeight : 0;
      setProgress(p);

      let nextActive = 0;
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top - 80 < viewportMid) nextActive = i;
      });
      setActiveIdx(nextActive);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl px-4 sm:px-6">
      {/* Curved curiosity path — sits behind cards (z-0) */}
      {geom && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
          width={geom.w}
          height={geom.h}
          style={{ zIndex: 0, overflow: "visible" }}
        >
          {/* base curve */}
          <path
            d={geom.path}
            fill="none"
            stroke="var(--rail)"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          {/* progressive filled curve */}
          <path
            d={geom.path}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={geom.length}
            strokeDashoffset={(1 - progress) * geom.length}
            style={{
              transition: "stroke-dashoffset 120ms linear",
              filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--accent) 35%, transparent))",
            }}
          />
          {/* top terminator dot */}
          <circle
            cx={geom.anchors[0]?.cx ?? 0}
            cy={(geom.anchors[0]?.y ?? 0) - 8}
            r={2.5}
            fill="var(--rail)"
          />
        </svg>
      )}

      {/* hidden path for measurement */}
      <svg aria-hidden width="0" height="0" style={{ position: "absolute", visibility: "hidden" }}>
        <path ref={pathMeasureRef} />
      </svg>

      <ol className="relative space-y-20 md:space-y-28" style={{ zIndex: 1 }}>
        {NODES.map((node, i) => {
          const isLeft = i % 2 === 0;
          const isActive = i === activeIdx;
          return (
            <li
              key={node.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="relative md:grid md:grid-cols-2 md:gap-12"
            >
              <RailDot
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                active={isActive}
                reached={i <= activeIdx}
              />

              <div
                className={`pl-12 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"
                  }`}
              >
                <JourneyCard node={node} isActive={isActive} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const RailDot = forwardRef<HTMLSpanElement, { active: boolean; reached: boolean }>(
  ({ active, reached }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden
        className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2"
        style={{
          width: active ? 14 : 11,
          height: active ? 14 : 11,
          borderRadius: 999,
          backgroundColor: reached ? "var(--accent)" : "var(--background)",
          border: `1.5px solid ${reached ? "var(--accent)" : "var(--rail)"}`,
          boxShadow: active
            ? "0 0 0 4px var(--background), 0 0 14px 2px color-mix(in oklab, var(--accent) 60%, transparent)"
            : "0 0 0 4px var(--background)",
          transition: "all 300ms ease",
        }}
      />
    );
  },
);
RailDot.displayName = "RailDot";

function JourneyCard({ node, isActive }: { node: JourneyNode; isActive: boolean }) {
  return (
    <article className="group relative block rounded-lg border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5">
      <div
        style={{
          borderRadius: 8,
          opacity: isActive ? 1 : 0.96,
          transition: "opacity 300ms ease",
        }}
      >
        <header className="flex items-start gap-4">
          <LogoSlot label={node.logo ?? node.title.slice(0, 3)} active={isActive} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-3">
              <h3 className="font-serif text-2xl leading-none text-foreground">{node.title}</h3>
              <span className="mono-label">{node.year}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{node.subtitle}</p>
          </div>
        </header>

        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{node.summary}</p>

        {node.tags && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {node.tags.map((t) => (
              <li
                key={t}
                className="mono-label rounded-full border px-2.5 py-1 text-[0.62rem]"
                style={{ borderColor: "var(--border)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function LogoSlot({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      aria-hidden
      className="font-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-md border text-[0.6rem] tracking-widest"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border)",
        color: active ? "var(--accent)" : "var(--muted-foreground)",
        backgroundColor: "color-mix(in oklab, var(--accent) 4%, var(--background))",
        transition: "all 300ms ease",
      }}
    >
      {label}
    </div>
  );
}

