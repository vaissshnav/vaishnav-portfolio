import { Connectable } from "@/components/ConnectionContext";

export type Book = {
  id: string;
  connId: string;
  title: string;
  author: string;
  whyItMattered: string;
  keyIdea: string;
};

const BOOKS: Book[] = [
  {
    id: "b-1",
    connId: "b-1",
    title: "Chip War",
    author: "Chris Miller",
    whyItMattered:
      "Turned a vague interest in hardware into a specific interest in semiconductors — the slow, expensive, geopolitical layer underneath everything.",
    keyIdea:
      "Compute is a physical asset. Whoever controls the manufacturing controls the ceiling of what the rest of the stack can do.",
  },
  {
    id: "b-2",
    connId: "b-2",
    title: "Poor Charlie's Almanack",
    author: "Charles T. Munger",
    whyItMattered:
      "Reframed how I think about leverage — not as effort, but as a chosen position. Quietly reorganized how I evaluate every decision around Whomr.",
    keyIdea:
      "Worldly wisdom is a latticework of mental models. The person with more models sees the same situation more clearly.",
  },
  {
    id: "b-3",
    connId: "b-3",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    whyItMattered:
      "The first book that made design feel like a discipline instead of a taste. Everything I noticed at EonForge and Wemus had a name in here.",
    keyIdea:
      "Good design makes the right action obvious and the wrong action awkward. Bad design blames the user.",
  },
];

export function ReadingList() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {BOOKS.map((b, i) => (
          <Connectable
            key={b.id}
            id={b.connId}
            as="article"
            className={`rounded-lg border border-border bg-card p-4 ${
              i === 0 ? "md:col-span-2 md:grid md:grid-cols-[1fr_2fr] md:gap-4" : ""
            }`}
          >
            <div style={{ borderColor: "var(--border)" }}>
              <h3 className="font-serif text-2xl text-foreground">{b.title}</h3>
              <div className="mono-label mt-1">{b.author}</div>
              <div className="mono-label mt-3" style={{ color: "var(--accent)" }}>
                Influence
              </div>
            </div>
            <div
              className={`${i === 0 ? "" : "mt-4 "}space-y-3 text-[15px] leading-relaxed text-foreground/85`}
            >
              <Field label="Why it mattered">{b.whyItMattered}</Field>
              <Field label="Key idea">{b.keyIdea}</Field>
            </div>
          </Connectable>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono-label mb-1 text-[0.6rem]" style={{ color: "var(--accent)" }}>
        {label}
      </div>
      <p>{children}</p>
    </div>
  );
}
