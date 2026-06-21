import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const CONNECTIONS: Record<string, string[]> = {
  "j-early-design": ["i-design"],
  "j-eonforge": ["i-design"],
  "j-whomr": ["i-startups", "i-design"],
  "j-interninvy": ["i-startups"],
  "j-pushnote": ["i-design", "i-startups"],
  "j-wemus": ["i-design", "i-startups"],
  "j-afc": ["i-design", "i-startups"],
  "j-reading-turn": ["i-semi", "i-hardware", "i-robotics", "i-ai"],
  "i-hardware": ["i-semi", "i-robotics", "i-ai", "b-1"],
  "i-semi": ["i-hardware", "i-ai", "b-1", "n-3", "n-4", "a-semi"],
  "i-robotics": ["i-hardware", "i-ai", "a-robotics"],
  "i-ai": ["i-semi", "i-robotics", "i-hardware", "a-ai"],
  "i-design": ["i-startups"],
  "i-startups": ["i-design", "n-1", "b-2", "a-leverage"],
  "i-now": ["i-hardware", "i-semi", "i-robotics", "i-ai", "i-design", "i-startups"],
  "n-1": ["j-whomr", "i-startups", "b-2"],
  "n-2": ["j-afc", "i-design", "i-startups"],
  "n-3": ["i-semi", "i-hardware", "b-1"],
  "n-4": ["i-semi", "i-ai", "b-1"],
  "b-1": ["i-semi", "i-hardware", "j-reading-turn", "n-3", "n-4"],
  "b-2": ["i-startups", "j-whomr", "j-afc", "j-reading-turn", "n-1"],
  "b-3": ["i-design", "j-eonforge", "j-wemus"],
  "a-manipal": [],
  "a-semi": ["i-semi", "b-1"],
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

type Ctx = {
  hovered: string | null;
  setHovered: (id: string | null) => void;
};

const ConnectionCtx = createContext<Ctx | null>(null);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const value = useMemo<Ctx>(() => ({ hovered, setHovered }), [hovered]);

  return (
    <ConnectionCtx.Provider value={value}>
      {children}
    </ConnectionCtx.Provider>
  );
}

export function useConnections() {
  const ctx = useContext(ConnectionCtx);
  if (!ctx) throw new Error("useConnections must be used inside ConnectionProvider");
  return ctx;
}

export function Connectable({
  id, children, className, as = "div",
}: {
  id: string; children: ReactNode; className?: string;
  as?: "div" | "article" | "section" | "li" | "span";
}) {
  const { setHovered } = useConnections();
  const As = as as "div";

  const handleEnter = useCallback(() => setHovered(id), [id, setHovered]);
  const handleLeave = useCallback(() => setHovered(null), [setHovered]);

  return (
    <As
      data-conn-id={id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </As>
  );
}

