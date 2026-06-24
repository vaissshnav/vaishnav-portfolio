import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingNav } from "@/components/FloatingNav";
import { Annotation } from "@/components/Annotation";
import { JourneyRail } from "@/components/JourneyRail";
import { InterestMap } from "@/components/InterestMap";
import { ReadingList } from "@/components/ReadingList";
import { SectionRail } from "@/components/SectionRail";
import { ResumeDropdown } from "@/components/ResumeDropdown";
import { ConnectionProvider } from "@/components/ConnectionContext";
import { ParticleBackground } from "@/components/ParticleBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaishnav - A map of how the thinking evolved" },
      {
        name: "description",
        content:
          "A living map of how Vaishnav thinks; community, design, product, startups, and the turn toward hardware, semiconductors and AI infrastructure.",
      },
      { property: "og:title", content: "Vaishnav" },
      {
        property: "og:description",
        content:
          "not a portfolio.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <ConnectionProvider>
      <ParticleBackground />
      {/* relative + z-10 keeps page content above the connection overlay (z-0),
          so connection lines render behind cards but body bg still shows through. */}
      <div className="relative z-10 min-h-screen text-foreground">
        <FloatingNav />
        <ThemeToggle />

        {/* Top mast */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
          <a href="#about" className="font-serif text-lg tracking-tight">
            V<span style={{ color: "var(--accent)" }}>.</span>
          </a>
          <ResumeDropdown />
        </div>

        <About />
        <Divider />
        <Journey />
        {/* Rail continues through every following section to Contact */}
        <SectionRail height={120} withDot />
        <Interests />
        <SectionRail height={240} withDot />
        <Reading />
        <SectionRail height={140} />
        <Contact />

        <footer id="bottom" className="mx-auto max-w-6xl px-6 py-12">
          <div className="mono-label flex items-center justify-between">
            <span>© Vaishnav</span>
            <span>made with purpose</span>
          </div>
        </footer>
      </div>
    </ConnectionProvider>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-32 max-w-5xl px-6">
      <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mx-auto mb-16 flex max-w-5xl items-baseline gap-6 px-6">
      <span className="mono-label">{index}</span>
      <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{title}</h2>
    </div>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <section
      id="about"
      className="mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center px-6 pt-24"
    >
      <div className="mono-label mb-8">01 / About</div>
      <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Vaishnav<span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <div className="mt-12 max-w-2xl space-y-8 text-lg leading-[1.75] text-foreground/85 sm:text-xl">
        <p>
          EEE student at{" "}
          <Annotation
            label="MIT Manipal"
            meta="Education · 2026—2030"
            body="Electrical and Electronics Engineering."
            memory="just getting started"
            project="0 to 1"
            connId="a-manipal"
          >
            Manipal
          </Annotation>
          . Interested in{" "}
          <Annotation
            label="Semiconductors"
            meta="Curiosity"
            body="the layer underneath all of modern technology."
            memory="it all started from semiconductors during jee"
            project="trying to learn more about semiconductors"
            connId="a-semi"
          >
            semiconductors
          </Annotation>
          ,{" "}
          <Annotation
            label="Robotics"
            meta="Curiosity"
            body="intersection of hardware, software and control."
            memory="it started from breaking down old toys, piecing parts together, and building small robots"
            project="learning comp vision"
            connId="a-robotics"
          >
            robotics
          </Annotation>
          ,{" "}
          <Annotation
            label="AI"
            meta="Curiosity"
            body="the infra and data that makes modern AI possible"
            memory="being curious about how ml, neural networks and transformers work"
            project="learning the underlying math and building small scale models"
            connId="a-ai"
          >
            AI
          </Annotation>
          , and the people who build ambitious things.
        </p>
        <p>
          Currently exploring how hardware, software and business intersect to create{" "}
          <Annotation
            label="Leverage"
            meta="Working definition"
            body="how a proportionally small input, a process, a piece of infra, a relationship; redefines the output of a system."
            memory="how data companies, fabs and other manufacturing companies have insane leverage; high demand, low supply, and high switching costs"
            project="reading the almanac, understanding business"
            connId="a-leverage"
          >
            leverage
          </Annotation>
          .
        </p>
        <p className="text-foreground/70">
          This site isn't a portfolio. It's a map of curiosity. I'm still figuring out my niche.
          This site is where I keep track, and share to the world.
        </p>
      </div>

      <div className="mono-label mt-24 flex items-center gap-3 text-muted-foreground">
        <span className="block h-px w-8" style={{ backgroundColor: "var(--rail)" }} />
        Begin the path
      </div>
    </section>
  );
}

/* ---------------- Journey ---------------- */

function Journey() {
  return (
    <section id="journey" className="scroll-mt-24">
      <SectionHeader index="02 / Journey" title="How the thinking evolved" />
      <p className="mx-auto mb-16 max-w-2xl px-6 text-base leading-relaxed text-muted-foreground">
        A chain of cause and effect. Each milestone explains:{" "}
        <em className="font-serif text-foreground">what happened</em>,{" "}
        <em className="font-serif text-foreground">what I learned</em>, and{" "}
        <em className="font-serif text-foreground">what changed afterward</em>. The rail fills as
        you read.
      </p>
      <JourneyRail />
    </section>
  );
}

/* ---------------- Interests Map ---------------- */

function Interests() {
  return (
    <section id="interests" className="scroll-mt-24">
      <SectionHeader index="03 / Current Interests" title="A thinking map, not a list" />
      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1fr_0.9fr] md:items-start">
        <div className="space-y-6 text-foreground/85">
          <p className="text-base leading-[1.75]">
            These aren't isolated interests; they influence each other. Hover any node to see what
            it connects to. Everything eventually loops back to <em className="font-serif">NOW</em>.
          </p>
          <ul className="mono-label space-y-2 pt-2">
            <li>· Hardware ↔ Semiconductors</li>
            <li>· Semiconductors ↔ AI Infrastructure</li>
            <li>· AI Infrastructure ↔ Startups</li>
            <li>· Startups ↔ Design</li>
            <li>· Everything → NOW</li>
          </ul>
        </div>
        <InterestMap />
      </div>
    </section>
  );
}

/* ---------------- Reading ---------------- */

function Reading() {
  return (
    <section id="reading" className="scroll-mt-24">
      <SectionHeader index="05 / Reading" title="Influences, not recommendations" />
      <p className="mx-auto mb-12 max-w-2xl px-6 text-sm leading-[1.75] text-muted-foreground">
        Each book card carries four editable fields:{" "}
        <em className="font-serif text-foreground">why it mattered</em>,{" "}
        <em className="font-serif text-foreground">key idea</em>,{" "}
        <em className="font-serif text-foreground">related interests</em>, and{" "}
        <em className="font-serif text-foreground">related observations</em>.
      </p>
      <ReadingList />
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="contact" className="flex min-h-screen scroll-mt-24 items-center justify-center">
      <div className="mx-auto max-w-5xl px-6">
        {/* terminal rail dot — end of the path */}
        <div className="relative mx-auto flex flex-col items-center pb-10">
          <div aria-hidden className="h-20 w-px" style={{ backgroundColor: "var(--rail)" }} />
          <div
            aria-hidden
            className="-mt-1.5 h-4 w-4 rounded-full"
            style={{
              backgroundColor: "var(--accent)",
              boxShadow:
                "0 0 0 4px var(--background), 0 0 18px 2px color-mix(in oklab, var(--accent) 60%, transparent)",
            }}
          />
          <div className="mono-label mt-4 text-[0.6rem]">The path continues; through people</div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mono-label mb-6">06 / Contact</div>
          <h2 className="font-serif text-5xl leading-tight text-foreground sm:text-6xl">
            Let's talk.
          </h2>
          <p className="mt-6 font-serif text-xl text-muted-foreground">
            Hardware. Startups. Research. Interesting problems.
          </p>
          <a
            href="https://vaissshnav.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 mono-label text-[0.65rem] transition-colors hover:text-accent"
          >
            subscribe to my substack
            <ArrowUpRight className="h-3 w-3" style={{ color: "var(--accent)" }} />
          </a>

          <ul
            className="mx-auto mt-12 grid max-w-md gap-px overflow-hidden rounded-lg border text-left"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}
          >
            {[
              { label: "Email", href: "mailto:vaishnavkumarsw@gmail.com", hint: "fastest" },
              { label: "LinkedIn", href: "https://linkedin.com/in/panyamvk", hint: "/in/panyamvk" },
              { label: "X", href: "https://x.com", hint: "coming soon" },
              {
                label: "Calendly",
                href: "https://calendly.com/vaissshnav/1-on-1-personal-chat",
                hint: "15 min",
              },
            ].map((l) => (
              <li key={l.label} className="bg-background">
                <a
                  href={l.href}
                  className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
                >
                  <span className="font-serif text-lg text-foreground">{l.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="mono-label">{l.hint}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
