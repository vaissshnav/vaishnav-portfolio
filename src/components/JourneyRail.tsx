import { useEffect, useLayoutEffect, useRef, useState, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  CONNECTIONS,
  Connectable,
  RefPill,
  useConnections,
} from "@/components/ConnectionContext";

export type JourneyNode = {
  id: string;
  connId: string;
  title: string;
  year: string;
  subtitle: string;
  summary: string;
  logo?: string;
  tags?: string[];
  story: {
    happened: string;
    learned: string;
    changed: string;
  };
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
      "Long before the startups and electronics, the first real obsession was visual and interaction design — copying, redrawing, deconstructing interfaces to understand why they worked.",
    logo: "DSGN",
    tags: ["Design", "Craft", "Self-taught"],
    story: {
      happened:
        "Spent months obsessively studying interfaces, type, color and motion. Rebuilt apps from scratch, read design writing, made a lot of small things just to feel the medium.",
      learned:
        "Taste is built by doing the work, not by consuming opinions. Looking carefully is a skill, and it transfers everywhere.",
      changed:
        "Gave me the aesthetic instincts that every later decision — product, startup, even hardware — quietly rests on.",
    },
  },
  {
    id: "eonforge",
    connId: "j-eonforge",
    title: "EonForge",
    year: "Aug 2023 — Nov 2023",
    subtitle: "UI/UX Design Intern",
    summary:
      "First professional design work — ERP software for schools. Real users, real constraints, real opinions.",
    logo: "EF",
    tags: ["Design", "UX", "Interfaces"],
    story: {
      happened:
        "Collaborated on the design of an ERP product used by schools. Learned the working vocabulary of interface design and product decisions in a team setting.",
      learned:
        "Interfaces are opinions. Every small decision quietly tells the user what is and isn't possible.",
      changed:
        "Gave me the foundation in design that made later product and startup work possible.",
    },
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
    story: {
      happened:
        "Spotted the roommate-discovery problem, ran validation experiments and surveys, built MVPs, talked to users, pitched, and secured angel funding.",
      learned:
        "Building is the easy part. Understanding the user — what they actually want, how they actually decide — is the entire job.",
      changed:
        "Made customer discovery the default instinct, and pulled me toward founders, operators and the people who do the hard, slow work of starting things.",
    },
  },
  {
    id: "wemus",
    connId: "j-wemus",
    title: "Wemus",
    year: "Oct 2024 — Apr 2025",
    subtitle: "Founder's Office & Operations Intern",
    summary:
      "Worked close to 0 → 1 — product research, onboarding, UX decisions, GTM conversations, the operational glue.",
    logo: "WMS",
    tags: ["Product", "Users", "Execution"],
    story: {
      happened:
        "Observed an early-stage startup up close. Contributed to product research, onboarding analysis, UX decisions, and operational work; sat in on positioning and GTM discussions.",
      learned:
        "Products shape behavior. Onboarding friction is a story about what a user is being asked to believe.",
      changed:
        "Turned a vague interest in design into a concrete interest in product thinking and user journeys.",
    },
  },
  {
    id: "afc",
    connId: "j-afc",
    title: "AFC",
    year: "2025 — Present",
    subtitle: "Aspiring Filmmakers Collective",
    summary:
      "Started a filmmaking community from scratch and grew it organically to 150+ members. Sessions, challenges, conversations.",
    logo: "AFC",
    tags: ["Community", "Retention", "Behavior"],
    story: {
      happened:
        "Built AFC from zero — designed the on-ramp, ran sessions, challenges and reviews, and spent a lot of time talking to members individually.",
      learned:
        "Communities behave like products. They grow on rituals, ownership and a low-friction first contribution, not on enthusiasm.",
      changed:
        "Pulled me toward systems thinking — incentives, participation, feedback loops — and the idea that human behavior can be designed for.",
    },
  },
  {
    id: "reading-turn",
    connId: "j-reading-turn",
    title: "The reading turn",
    year: "2025",
    subtitle: "Books that bent the direction",
    summary:
      "A stretch where the inputs changed faster than the outputs. Chip War, Poor Charlie's Almanack and a handful of others quietly redirected what I cared about.",
    logo: "READ",
    tags: ["Books", "Direction", "Inputs"],
    story: {
      happened:
        "Read deliberately and slowly through a sequence of books on hardware, capital, behavior and decision-making. Took notes, argued with them, revisited the ones that didn't sit right.",
      learned:
        "Your inputs become your taste. If you only read what everyone around you reads, you'll only see what everyone around you sees.",
      changed:
        "Moved my attention from the application layer toward the layers under it — manufacturing, infrastructure, leverage.",
    },
  },
  {
    id: "mit-pathway",
    connId: "j-mit-pathway",
    title: "MIT pathway",
    year: "2025",
    subtitle: "Committing to the hardware track",
    summary:
      "A deliberate decision to orient education and research around hardware, semiconductors and the infrastructure beneath AI — not as a side interest, but as the main one.",
    logo: "MIT",
    tags: ["Pathway", "Hardware", "Commitment"],
    story: {
      happened:
        "Restructured what I was studying, who I was talking to, and what I was building around the hardware track. Started taking the work — courses, labs, reading — seriously as a long-horizon bet.",
      learned:
        "Direction is a decision, not a discovery. You commit and then the world starts giving you better material.",
      changed:
        "Turned a curiosity into a path. Set up the electronics turn that followed.",
    },
  },
  {
    id: "electronics",
    connId: "j-electronics",
    title: "Electronics turn",
    year: "2025 — Now",
    subtitle: "Where the curiosity is pointing",
    summary:
      "Increasingly moved toward Electronics & Computer Engineering — semiconductors, robotics, AI infrastructure, systems that create leverage.",
    logo: "NOW",
    tags: ["Semiconductors", "Robotics", "AI Infra"],
    story: {
      happened:
        "Shifted focus away from purely software work and toward hardware, semiconductors, robotics and the infrastructure underneath modern AI.",
      learned:
        "The most interesting leverage tends to sit one layer below where most people are looking.",
      changed:
        "Set the current direction — and the lens this site is built around.",
    },
  },
];

export function JourneyRail() {
  const [open, setOpen] = useState<string | null>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;

      const railTop = rect.top;
      const railHeight = rect.height;
      const traveled = Math.min(
        Math.max(viewportMid - railTop, 0),
        railHeight,
      );
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
              filter:
                "drop-shadow(0 0 6px color-mix(in oklab, var(--accent) 35%, transparent))",
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
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", visibility: "hidden" }}
      >
        <path ref={pathMeasureRef} />
      </svg>

      <ol className="relative space-y-20 md:space-y-28" style={{ zIndex: 1 }}>
        {NODES.map((node, i) => {
          const isLeft = i % 2 === 0;
          const isOpen = open === node.id;
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
                ref={(el) => { dotRefs.current[i] = el; }}
                active={isActive}
                reached={i <= activeIdx}
              />

              <div
                className={`pl-12 md:pl-0 ${
                  isLeft
                    ? "md:col-start-1 md:pr-10 md:text-right"
                    : "md:col-start-2 md:pl-10"
                }`}
              >
                <JourneyCard
                  node={node}
                  isOpen={isOpen}
                  isActive={isActive}
                  align={isLeft ? "right" : "left"}
                  onToggle={() => setOpen(isOpen ? null : node.id)}
                />
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
  }
);
RailDot.displayName = "RailDot";

function JourneyCard({
  node,
  isOpen,
  isActive,
  align,
  onToggle,
}: {
  node: JourneyNode;
  isOpen: boolean;
  isActive: boolean;
  align: "left" | "right";
  onToggle: () => void;
}) {
  return (
    <Connectable
      id={node.connId}
      as="article"
      className="group relative block rounded-lg border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div
        style={{
          borderRadius: 8,
          opacity: isActive ? 1 : 0.96,
          transition: "opacity 300ms ease",
        }}
      >
        <header
          className={`flex items-start gap-4 ${
            align === "right" ? "md:flex-row-reverse md:text-right" : ""
          }`}
        >
          <LogoSlot label={node.logo ?? node.title.slice(0, 3)} active={isActive} />
          <div className="min-w-0 flex-1">
            <div
              className={`flex items-baseline gap-3 ${
                align === "right" ? "md:justify-end" : ""
              }`}
            >
              <h3 className="font-serif text-2xl leading-none text-foreground">
                {node.title}
              </h3>
              <span className="mono-label">{node.year}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{node.subtitle}</p>
          </div>
        </header>

        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
          {node.summary}
        </p>

        {node.tags && (
          <ul
            className={`mt-4 flex flex-wrap gap-2 ${
              align === "right" ? "md:justify-end" : ""
            }`}
          >
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

        <button
          type="button"
          onClick={onToggle}
          className={`mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground ${
            align === "right" ? "md:ml-auto" : ""
          }`}
          aria-expanded={isOpen}
        >
          <span className="mono-label text-[0.62rem]">
            {isOpen ? "Collapse story" : "Read the story"}
          </span>
          <ChevronDown
            className="h-3 w-3 transition-transform"
            style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
          />
        </button>

        <div
          className="grid overflow-hidden transition-all duration-500 ease-out"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="min-h-0">
            <div
              className={`mt-5 space-y-4 border-t pt-5 text-sm leading-relaxed text-foreground/85 ${
                align === "right" ? "md:text-right" : ""
              }`}
              style={{ borderColor: "var(--border)" }}
            >
              <Beat label="What happened">{node.story.happened}</Beat>
              <Beat label="What I learned">{node.story.learned}</Beat>
              <Beat label="What changed afterward">{node.story.changed}</Beat>
              <Ripples connId={node.connId} align={align} />
            </div>
          </div>
        </div>
      </div>
    </Connectable>
  );
}

function Ripples({
  connId,
  align,
}: {
  connId: string;
  align: "left" | "right";
}) {
  const refs = (CONNECTIONS[connId] ?? []).slice(0, 5);
  if (refs.length === 0) return null;
  return (
    <div className="pt-2">
      <div
        className="mono-label mb-2 text-[0.6rem]"
        style={{ color: "var(--accent)" }}
      >
        Ripples
      </div>
      <div
        className={`flex flex-wrap items-center gap-1.5 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        {refs.map((id, i) => (
          <span key={id} className="flex items-center gap-1.5">
            {i > 0 && (
              <span
                aria-hidden
                className="mono-label text-[0.6rem]"
                style={{ color: "var(--rail)" }}
              >
                →
              </span>
            )}
            <RefPill id={id} small />
          </span>
        ))}
      </div>
    </div>
  );
}

function Beat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono-label mb-1 text-[0.6rem]" style={{ color: "var(--accent)" }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
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

// Re-export for index to use in continuation rail.
export { useConnections as _useConn };