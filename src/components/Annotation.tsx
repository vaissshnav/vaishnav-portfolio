import { type ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useConnections, LABELS } from "@/components/ConnectionContext";

export function Annotation({
  children,
  label,
  meta,
  body,
  memory,
  project,
  connId,
}: {
  children: ReactNode;
  label: string;
  meta?: string;
  body?: string;
  memory?: string;
  project?: string;
  connId?: string;
}) {
  const { setHovered, connectionsOf } = useConnections();
  const refs = connId ? connectionsOf(connId) : [];

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <span
          className="annotated annotated-trigger"
          data-conn-id={connId}
          onMouseEnter={() => connId && setHovered(connId)}
          onMouseLeave={() => connId && setHovered(null)}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-72 border-border bg-card p-4 shadow-[0_8px_30px_-12px_rgba(60,40,20,0.18)]"
      >
        <div className="mono-label mb-2">{meta ?? "Annotation"}</div>
        <div className="font-serif text-lg leading-snug text-foreground">{label}</div>
        {body && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
        )}
        {(memory || project) && (
          <div
            className="mt-3 space-y-2 border-t pt-3 text-xs leading-relaxed"
            style={{ borderColor: "var(--border)" }}
          >
            {memory && (
              <div>
                <span className="mono-label text-[0.55rem]" style={{ color: "var(--accent)" }}>
                  Memory ·{" "}
                </span>
                <span className="text-foreground/75">{memory}</span>
              </div>
            )}
            {project && (
              <div>
                <span className="mono-label text-[0.55rem]" style={{ color: "var(--accent)" }}>
                  Now ·{" "}
                </span>
                <span className="text-foreground/75">{project}</span>
              </div>
            )}
          </div>
        )}
        {refs.length > 0 && (
          <div className="mono-label mt-3 flex flex-wrap gap-1 text-[0.55rem]">
            <span style={{ color: "var(--accent)" }}>↳</span>
            {refs.slice(0, 4).map((r) => (
              <span
                key={r}
                className="rounded-sm border px-1.5 py-0.5"
                style={{ borderColor: "var(--rail)", color: "var(--muted-foreground)" }}
              >
                {LABELS[r] ?? r}
              </span>
            ))}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
