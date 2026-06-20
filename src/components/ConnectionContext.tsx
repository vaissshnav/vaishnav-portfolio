import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const CONNECTIONS: Record<string, string[]> = {
  "j-early-design": ["i-design", "j-eonforge"],
  "j-eonforge": ["i-design", "j-whomr", "b-3"],
  "j-whomr": ["i-startups", "i-design", "j-wemus", "n-1", "b-2"],
  "j-interninvy": ["i-startups", "j-wemus"],
  "j-pushnote": ["i-design", "i-startups"],
  "j-wemus": ["i-design", "i-startups", "j-whomr", "n-1"],
  "j-afc": ["i-design", "i-startups", "n-2", "b-2"],
  "j-reading-turn": ["b-1", "b-2", "i-semi", "j-electronics"],
  "j-mit-pathway": ["j-electronics", "i-hardware", "i-semi"],
  "j-electronics": ["i-hardware", "i-semi", "i-robotics", "i-ai", "b-1", "n-3"],
  "i-hardware": ["i-semi", "i-robotics", "i-ai", "j-electronics", "j-mit-pathway", "b-1"],
  "i-semi": ["i-hardware", "i-ai", "j-electronics", "b-1", "n-3", "n-4", "a-semi"],
  "i-robotics": ["i-hardware", "i-ai", "j-electronics", "a-robotics"],
  "i-ai": ["i-semi", "i-robotics", "i-hardware", "j-electronics", "a-ai"],
  "i-design": ["j-early-design", "j-wemus", "j-eonforge", "j-whomr", "j-afc", "i-startups"],
  "i-startups": ["j-whomr", "j-wemus", "j-interninvy", "i-design", "n-1", "b-2", "a-leverage"],
  "i-now": ["i-hardware", "i-semi", "i-robotics", "i-ai", "i-design", "i-startups"],
  "n-1": ["j-whomr", "i-startups", "b-2"],
  "n-2": ["j-afc", "i-design", "i-startups"],
  "n-3": ["i-semi", "i-hardware", "j-electronics", "b-1"],
  "n-4": ["i-semi", "i-ai", "b-1"],
  "b-1": ["i-semi", "i-hardware", "j-electronics", "j-reading-turn", "n-3", "n-4"],
  "b-2": ["i-startups", "j-whomr", "j-afc", "j-reading-turn", "n-1"],
  "b-3": ["i-design", "j-eonforge", "j-wemus"],
  "a-manipal": ["j-electronics", "j-mit-pathway"],
  "a-semi": ["i-semi", "j-electronics", "b-1"],
  "a-robotics": ["i-robotics"],
  "a-ai": ["i-ai"],
  "a-leverage": ["i-startups", "i-ai", "i-design"],
};

export const LABELS: Record<string, string> = {
  "j-early-design": "Early design",
  "j-eonforge": "EonForge",
  "j-wemus": "Wemus",
  "j-whomr": "Whomr",
  "j-interninvy": "InternInvy",
  "j-pushnote": "PushNote",
  "j-afc": "AFC",
  "j-reading-turn": "The reading turn",
  "j-mit-pathway": "MIT pathway",
  "j-electronics": "Electronics turn",
  "i-hardware": "Hardware",
  "i-semi": "Semiconductors",
  "i-robotics": "Robotics",
  "i-ai": "AI Infrastructure",
  "i-design": "Design",
  "i-startups": "Startups",
  "i-now": "Now",
  "n-1": "Distribution beats development",
  "n-2": "Communities behave like products",
  "n-3": "Manufacturing creates leverage",
  "n-4": "The layer below is the real layer",
  "b-1": "Chip War",
  "b-2": "Poor Charlie's Almanack",
  "b-3": "The Design of Everyday Things",
  "a-manipal": "Manipal",
  "a-semi": "Semiconductors",
  "a-robotics": "Robotics",
  "a-ai": "AI Infrastructure",
  "a-leverage": "Leverage",
};

export const RELATIONS: Record<string, string> = {
  "b-2->n-1": "influenced",
  "b-2->i-startups": "shaped my view of",
  "b-2->j-whomr": "kept me honest through",
  "b-2->j-afc": "informed",
  "b-2->j-reading-turn": "marked",
  "b-1->n-3": "inspired",
  "b-1->n-4": "inspired",
  "b-1->i-semi": "ignited curiosity in",
  "b-1->i-hardware": "ignited curiosity in",
  "b-1->j-electronics": "triggered",
  "b-1->j-reading-turn": "marked",
  "b-3->i-design": "shaped my view of",
  "b-3->j-eonforge": "set the lens for",
  "b-3->j-wemus": "set the lens for",
  "n-1->j-whomr": "came out of",
  "n-1->i-startups": "applies to",
  "n-1->b-2": "echoes",
  "n-2->j-afc": "originated from",
  "n-2->i-design": "applies to",
  "n-2->i-startups": "applies to",
  "n-3->i-semi": "applies to",
  "n-3->i-hardware": "applies to",
  "n-3->j-electronics": "drove me toward",
  "n-3->b-1": "echoes",
  "n-4->i-semi": "applies to",
  "n-4->i-ai": "applies to",
  "n-4->b-1": "echoes",
  "j-early-design->i-design": "seeded",
  "j-early-design->j-eonforge": "led to",
  "j-eonforge->i-design": "deepened",
  "j-eonforge->j-wemus": "led to",
  "j-eonforge->j-whomr": "led to",
  "j-whomr->i-startups": "pulled me into",
  "j-whomr->i-design": "kept tied to",
  "j-whomr->j-wemus": "ran alongside",
  "j-whomr->n-1": "produced",
  "j-whomr->b-2": "echoes",
  "j-interninvy->i-startups": "exposed me to",
  "j-interninvy->j-wemus": "led to",
  "j-pushnote->i-design": "exercised",
  "j-pushnote->i-startups": "exercised",
  "j-wemus->i-design": "deepened",
  "j-wemus->i-startups": "deepened",
  "j-wemus->j-whomr": "ran alongside",
  // removed: "j-wemus->j-eonforge": "built on",
  "j-wemus->n-1": "produced",
  "j-afc->i-design": "applied",
  "j-afc->i-startups": "applied",
  "j-afc->n-2": "produced",
  "j-afc->b-2": "echoes",
  "j-reading-turn->b-1": "centered on",
  "j-reading-turn->b-2": "centered on",
  "j-reading-turn->i-semi": "pulled me toward",
  "j-reading-turn->j-electronics": "set up",
  "j-mit-pathway->j-electronics": "channeled into",
  "j-mit-pathway->i-hardware": "committed to",
  "j-mit-pathway->i-semi": "committed to",
  "j-electronics->i-hardware": "committed to",
  "j-electronics->i-semi": "committed to",
  "j-electronics->i-robotics": "committed to",
  "j-electronics->i-ai": "committed to",
  "j-electronics->b-1": "echoes",
  "j-electronics->n-3": "produced",
  "i-hardware->i-semi": "depends on",
  "i-hardware->i-robotics": "powers",
  "i-hardware->i-ai": "powers",
  "i-semi->i-hardware": "underlies",
  "i-semi->i-ai": "underlies",
  "i-ai->i-semi": "demands more from",
  "i-ai->i-robotics": "enables",
  "i-ai->i-hardware": "demands more from",
  "i-robotics->i-hardware": "depends on",
  "i-robotics->i-ai": "depends on",
  "i-design->i-startups": "feeds",
  "i-startups->i-design": "demands",
  "a-manipal->j-electronics": "is the setting for",
  "a-manipal->j-mit-pathway": "is the setting for",
  "a-semi->i-semi": "names",
  "a-semi->j-electronics": "names",
  "a-semi->b-1": "echoes",
  "a-robotics->i-robotics": "names",
  "a-ai->i-ai": "names",
  "a-leverage->i-startups": "applies to",
  "a-leverage->i-ai": "applies to",
  "a-leverage->i-design": "applies to",
};

export function getRelation(a: string, b: string): string {
  return RELATIONS[`${a}->${b}`] ?? RELATIONS[`${b}->${a}`] ?? "connects to";
}

const NARRATIVE_CHAIN: string[] = [
  "j-early-design", "j-eonforge", "j-whomr", "j-wemus", "j-afc",
  "i-design", "i-startups", "j-reading-turn", "i-semi", "i-ai", "j-electronics",
];

type Ctx = {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  showAll: boolean;
  toggleShowAll: () => void;
  isConnected: (id: string) => boolean;
  isHovered: (id: string) => boolean;
  isRelevant: (id: string) => boolean;
  connectionsOf: (id: string) => string[];
};

const ConnectionCtx = createContext<Ctx | null>(null);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showAll] = useState(true);

  const value = useMemo<Ctx>(() => {
    const connectionsOf = (id: string) => CONNECTIONS[id] ?? [];
    const isHovered = (id: string) => hovered === id;
    const isConnected = (id: string) => {
      if (!hovered) return false;
      if (hovered === id) return false;
      return (CONNECTIONS[hovered] ?? []).includes(id);
    };
    const isRelevant = (id: string) => {
      if (!hovered) return true;
      if (hovered === id) return true;
      return (CONNECTIONS[hovered] ?? []).includes(id) || (CONNECTIONS[id] ?? []).includes(hovered);
    };
    return {
      hovered, setHovered, showAll,
      toggleShowAll: () => { },
      isConnected, isHovered, isRelevant, connectionsOf,
    };
  }, [hovered, showAll]);

  return (
    <ConnectionCtx.Provider value={value}>
      {children}
      <ConnectionOverlay />
    </ConnectionCtx.Provider>
  );
}

export function useConnections() {
  const ctx = useContext(ConnectionCtx);
  if (!ctx) throw new Error("useConnections must be used inside ConnectionProvider");
  return ctx;
}

export function Connectable({
  id, children, className, as = "div", showRefs = true,
}: {
  id: string; children: ReactNode; className?: string;
  as?: "div" | "article" | "section" | "li" | "span"; showRefs?: boolean;
}) {
  const { setHovered, isConnected, isHovered, isRelevant, hovered, showAll, connectionsOf } =
    useConnections();
  const connected = isConnected(id);
  const hoveredSelf = isHovered(id);
  const refs = connectionsOf(id);
  const As = as as "div";

  const handleEnter = useCallback(() => setHovered(id), [id, setHovered]);
  const handleLeave = useCallback(() => setHovered(null), [setHovered]);
  const faded = hovered ? !isRelevant(id) : false;

  return (
    <As
      data-conn-id={id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        position: "relative",
        zIndex: hoveredSelf || connected ? 20 : 2,
        transition: "outline-color 250ms ease, box-shadow 250ms ease, opacity 250ms ease",
        outline: hoveredSelf ? "1px solid var(--accent)" : "1px solid transparent",
        outlineOffset: hoveredSelf ? "6px" : "0px",
        borderRadius: 12,
        opacity: faded ? 0.32 : 1,
      }}
    >
      {children}
    </As>
  );
}

export function RefPill({ id, active, small }: { id: string; active?: boolean; small?: boolean }) {
  const { setHovered, hovered } = useConnections();
  const lit = hovered === id || active;
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(id)}
      onBlur={() => setHovered(null)}
      className={`mono-label rounded-sm border transition-colors ${small ? "px-1.5 py-0.5 text-[0.55rem]" : "px-2 py-0.5 text-[0.6rem]"}`}
      style={{
        borderColor: lit ? "var(--accent)" : "var(--rail)",
        color: lit ? "var(--accent)" : "var(--muted-foreground)",
        backgroundColor: lit ? "color-mix(in oklab, var(--accent) 8%, transparent)" : "transparent",
      }}
    >
      {LABELS[id] ?? id}
    </button>
  );
}

/** Returns a short label for a target node, e.g. "Design" or "Chip War" */
function shortLabel(id: string): string {
  return LABELS[id] ?? id;
}

interface PathData {
  d: string;
  key: string;
  strong: boolean;
  a: string;
  b: string;
  midX: number;
  midY: number;
}

function ConnectionOverlay() {
  const { showAll, hovered } = useConnections();
  const [paths, setPaths] = useState<PathData[]>([]);
  const [docHeight, setDocHeight] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number; a: string; b: string } | null>(null);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showAll && !hovered) {
      setPaths([]);
      setTip(null);
      return;
    }

    const compute = () => {
      const centers: Record<string, { cx: number; cy: number; bottom: number; left: number; right: number; w: number }> = {};
      document.querySelectorAll<HTMLElement>("[data-conn-id]").forEach((el) => {
        const id = el.dataset.connId!;
        if (centers[id]) return;
        const r = el.getBoundingClientRect();
        centers[id] = {
          cx: r.left + window.scrollX + r.width / 2,
          cy: r.top + window.scrollY + r.height / 2,
          bottom: r.top + window.scrollY + r.height,
          left: r.left + window.scrollX,
          right: r.right + window.scrollX,
          w: r.width,
        };
      });

      const next: PathData[] = [];
      let connCounts: Record<string, number> = {};

      const pushPath = (aId: string, bId: string, strong: boolean) => {
        const a = centers[aId];
        const b = centers[bId];
        if (!a || !b) return;

        // Spread origin points across bottom of source card
        if (!connCounts[aId]) connCounts[aId] = 0;
        const idx = connCounts[aId];
        connCounts[aId] = idx + 1;
        const total = (CONNECTIONS[aId] ?? []).length || 1;
        const spreadFraction = total > 1 ? idx / (total - 1) : 0.5;
        // Start from bottom of card, spread horizontally
        const aStartX = a.left + a.w * 0.15 + spreadFraction * a.w * 0.7;
        const aStartY = a.bottom;

        const dx = b.cx - aStartX;
        const dy = b.cy - aStartY;
        const c1x = aStartX + dx * 0.1;
        const c1y = aStartY + dy * 0.4;
        const c2x = aStartX + dx * 0.8;
        const c2y = b.cy + dy * 0.5;

        // Label position: very close to card (t=0.1)
        const t = 0.1;
        const mt = 1 - t;
        const midX = mt * mt * mt * aStartX + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * b.cx;
        const midY = mt * mt * mt * aStartY + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * b.cy;
        next.push({ d: `M ${aStartX},${aStartY} C ${c1x},${c1y} ${c2x},${c2y} ${b.cx},${b.cy}`, key: `${aId}->${bId}`, strong, a: aId, b: bId, midX, midY });
      };

      if (showAll) {
        for (let i = 0; i < NARRATIVE_CHAIN.length - 1; i++) {
          pushPath(NARRATIVE_CHAIN[i], NARRATIVE_CHAIN[i + 1], false);
        }
      }
      if (hovered) {
        (CONNECTIONS[hovered] ?? []).forEach((target) => pushPath(hovered, target, true));
      }

      setPaths(next);
      setDocHeight(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
    };

    const schedule = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const obs = new MutationObserver(schedule);
    obs.observe(document.body, { subtree: true, childList: true, attributes: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      obs.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [showAll, hovered]);

  if (paths.length === 0 || !ready) return null;

  return (
    <>
      <svg
        aria-hidden
        className="absolute left-0 top-0"
        width="100%"
        height={docHeight}
        style={{ position: "absolute", overflow: "visible", zIndex: 0, pointerEvents: "none" }}
      >
        {paths.map((p) => (
          <g key={p.key}>
            {/* Visible path */}
            <path
              d={p.d}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={p.strong ? 1.1 : 0.7}
              strokeOpacity={p.strong ? 0.55 : 0.22}
              strokeDasharray="3 6"
              strokeLinecap="round"
              style={{ transition: "stroke-opacity 250ms ease" }}
            >
              <animate attributeName="stroke-dashoffset" values="0;-18" dur={p.strong ? "1.6s" : "3.2s"} repeatCount="indefinite" />
            </path>
            {/* Invisible hover target */}
            <path
              d={p.d}
              fill="none"
              stroke="transparent"
              strokeWidth={14}
              style={{ pointerEvents: "stroke", cursor: "help" }}
              onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY, a: p.a, b: p.b })}
              onMouseLeave={() => setTip(null)}
            />
            {/* Label very close to card (skip for i-now — too crowded) */}
            {p.strong && p.a !== "i-now" && (
              <>
                <rect
                  x={p.midX - 24}
                  y={p.midY - 9}
                  width={48}
                  height={18}
                  rx={9}
                  fill="var(--background)"
                  fillOpacity={0.85}
                  stroke="var(--accent)"
                  strokeWidth={0.4}
                  strokeOpacity={0.4}
                />
                <text
                  x={p.midX}
                  y={p.midY + 4}
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize={7.5}
                  fontWeight={600}
                  fontFamily="monospace"
                  opacity={0.85}
                >
                  {shortLabel(p.b)}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-[60] rounded-md border bg-card px-3 py-2 text-left shadow-lg backdrop-blur-md"
          style={{
            left: tip.x + 14,
            top: tip.y + 14,
            borderColor: "var(--accent)",
            backgroundColor: "color-mix(in oklab, var(--background) 94%, transparent)",
            maxWidth: 240,
          }}
        >
          <div className="font-serif text-sm leading-tight text-foreground">{LABELS[tip.a] ?? tip.a}</div>
          <div className="mono-label my-1 text-[0.55rem]" style={{ color: "var(--accent)" }}>↓ {getRelation(tip.a, tip.b)} ↓</div>
          <div className="font-serif text-sm leading-tight text-foreground">{LABELS[tip.b] ?? tip.b}</div>
        </div>
      )}
    </>
  );
}