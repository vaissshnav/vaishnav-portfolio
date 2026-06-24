import { useState } from "react";
import { useConnections } from "@/components/ConnectionContext";

type NodeId =
    | "now"
    | "hardware"
    | "semi"
    | "ai"
    | "robotics"
    | "design"
    | "startups";

const POS: Record<NodeId, { x: number; y: number }> = {
    now: { x: 50, y: 50 },
    hardware: { x: 50, y: 18 },
    semi: { x: 78, y: 32 },
    ai: { x: 82, y: 66 },
    robotics: { x: 55, y: 82 },
    startups: { x: 22, y: 68 },
    design: { x: 22, y: 36 },
};

const LABEL: Record<NodeId, string> = {
    now: "NOW",
    hardware: "Hardware",
    semi: "Semiconductors",
    ai: "AI Infrastructure",
    robotics: "Robotics",
    design: "Design",
    startups: "Startups",
};

const CONN_ID: Record<NodeId, string> = {
    now: "i-now",
    hardware: "i-hardware",
    semi: "i-semi",
    ai: "i-ai",
    robotics: "i-robotics",
    design: "i-design",
    startups: "i-startups",
};

const RELATION_EDGES: Array<[NodeId, NodeId]> = [
    ["hardware", "now"],
    ["semi", "now"],
    ["ai", "now"],
    ["robotics", "now"],
    ["startups", "now"],
    ["design", "now"],
];

const PRIMARY_EDGES: Array<[NodeId, NodeId]> = [
    ["hardware", "semi"],
    ["semi", "ai"],
    ["hardware", "robotics"],
    ["ai", "startups"],
    ["startups", "design"],
    ["robotics", "startups"],
    ["ai", "hardware"],
];

export function InterestMap() {
    const [hover, setHover] = useState<NodeId | null>(null);
    const { setHovered, hovered: globalHover } = useConnections();

    const externalActive = (id: NodeId): boolean => {
        if (!globalHover) return false;
        return globalHover === CONN_ID[id];
    };

    const isEdgeActive = (a: NodeId, b: NodeId) => {
        if (!hover) return false;
        return a === hover || b === hover;
    };

    const isNodeActive = (id: NodeId) => {
        if (hover) {
            if (id === hover) return true;

            return [...PRIMARY_EDGES, ...RELATION_EDGES].some(
                ([a, b]) =>
                    (a === hover && b === id) ||
                    (b === hover && a === id)
            );
        }

        return externalActive(id) || id === "now";
    };

    const isNodeFaded = (id: NodeId) => {
        if (!hover) return false;
        return !isNodeActive(id);
    };

    const handleEnter = (id: NodeId) => {
        setHover(id);
        setHovered(CONN_ID[id]);
    };

    const handleLeave = () => {
        setHover(null);
        setHovered(null);
    };

    return (
        <div
            className="relative mx-auto aspect-square w-full max-w-2xl rounded-lg border overflow-hidden"
            style={{
                borderColor: "var(--border)",
                backgroundImage:
                    "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--rail) 70%, transparent) 1px, transparent 0)",
                backgroundSize: "22px 22px",
            }}
        >
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
            >
                {/* Persistent base lines — always visible, subtle */}
                {PRIMARY_EDGES.map(([a, b], i) => (
                    <line
                        key={`primary-${i}`}
                        x1={POS[a].x}
                        y1={POS[a].y}
                        x2={POS[b].x}
                        y2={POS[b].y}
                        stroke="var(--rail)"
                        strokeWidth={0.2}
                        vectorEffect="non-scaling-stroke"
                        style={{ opacity: 0.5, transition: "all 250ms ease" }}
                    />
                ))}

                {/* Hover-highlighted primary lines */}
                {PRIMARY_EDGES.map(([a, b], i) => {
                    const active =
                        hover && (hover === a || hover === b);

                    return (
                        <line
                            key={`primary-active-${i}`}
                            x1={POS[a].x}
                            y1={POS[a].y}
                            x2={POS[b].x}
                            y2={POS[b].y}
                            stroke="var(--accent)"
                            strokeWidth={active ? 0.5 : 0}
                            vectorEffect="non-scaling-stroke"
                            style={{
                                opacity: active ? 1 : 0,
                                transition: "all 250ms ease",
                            }}
                        />
                    );
                })}

                {/* Persistent relation lines (loops to NOW) */}
                {RELATION_EDGES.map(([a, b], i) => {
                    const x1 = POS[a].x;
                    const y1 = POS[a].y;
                    const x2 = POS[b].x;
                    const y2 = POS[b].y;

                    const mx = (x1 + x2) / 2;
                    const my = (y1 + y2) / 2;

                    const dx = x2 - x1;
                    const dy = y2 - y1;

                    const len = Math.max(
                        Math.sqrt(dx * dx + dy * dy),
                        0.001
                    );

                    const curve = 10;

                    const cx = mx - (dy / len) * curve;
                    const cy = my + (dx / len) * curve;

                    const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

                    const active =
                        hover && (hover === a || hover === b);

                    return (
                        <path
                            key={`relation-${i}`}
                            d={path}
                            fill="none"
                            stroke="var(--rail)"
                            strokeWidth={0.18}
                            strokeDasharray="3 4"
                            vectorEffect="non-scaling-stroke"
                            style={{
                                opacity: active ? 0.7 : 0.35,
                                transition: "all 250ms ease",
                            }}
                        >
                            {active && (
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-60"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            )}
                        </path>
                    );
                })}

                {/* Hover-highlighted relation lines */}
                {RELATION_EDGES.map(([a, b], i) => {
                    const active =
                        hover && (hover === a || hover === b);

                    const x1 = POS[a].x;
                    const y1 = POS[a].y;
                    const x2 = POS[b].x;
                    const y2 = POS[b].y;

                    const mx = (x1 + x2) / 2;
                    const my = (y1 + y2) / 2;

                    const dx = x2 - x1;
                    const dy = y2 - y1;

                    const len = Math.max(
                        Math.sqrt(dx * dx + dy * dy),
                        0.001
                    );

                    const curve = 10;

                    const cx = mx - (dy / len) * curve;
                    const cy = my + (dx / len) * curve;

                    const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

                    return (
                        <path
                            key={`relation-active-${i}`}
                            d={path}
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth={active ? 0.45 : 0}
                            strokeDasharray="3 4"
                            vectorEffect="non-scaling-stroke"
                            style={{
                                opacity: active ? 1 : 0,
                                transition: "all 250ms ease",
                            }}
                        >
                            {active && (
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-60"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            )}
                        </path>
                    );
                })}
            </svg>

            {(Object.keys(POS) as NodeId[]).map((id) => {
                const isCenter = id === "now";
                const active = isNodeActive(id);
                const faded = isNodeFaded(id);

                return (
                    <button
                        key={id}
                        type="button"
                        onMouseEnter={() => handleEnter(id)}
                        onMouseLeave={handleLeave}
                        data-conn-id={CONN_ID[id]}
                        className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                        style={{
                            left: `${POS[id].x}%`,
                            top: `${POS[id].y}%`,
                        }}
                        aria-label={LABEL[id]}
                    >
                        <span
                            className={`flex items-center justify-center border transition-all duration-300 ${isCenter
                                ? "font-mono text-[0.65rem] tracking-widest rounded-full"
                                : "font-serif whitespace-nowrap rounded-lg"
                                }`}
                            style={{
                                width: isCenter ? 84 : undefined,
                                minWidth: isCenter
                                    ? undefined
                                    : 110,
                                height: isCenter ? 84 : 38,
                                padding: isCenter
                                    ? undefined
                                    : "0 14px",
                                borderColor: active
                                    ? "var(--accent)"
                                    : "var(--border)",
                                backgroundColor: isCenter
                                    ? "var(--foreground)"
                                    : active
                                        ? "color-mix(in oklab, var(--accent) 10%, var(--background))"
                                        : "var(--background)",
                                color: isCenter
                                    ? "var(--background)"
                                    : active
                                        ? "var(--accent)"
                                        : "var(--foreground)",
                                opacity: faded ? 0.35 : 1,
                                boxShadow:
                                    active && !isCenter
                                        ? "0 6px 22px -10px color-mix(in oklab, var(--accent) 60%, transparent)"
                                        : "none",
                            }}
                        >
                            {LABEL[id]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}