/**
 * A short vertical rail segment used between sections to make the page
 * feel like a continuous path from Journey → Contact (per spec). Sits
 * inline in place of the horizontal Divider.
 */
export function SectionRail({
  height = 96,
  withDot = false,
}: {
  height?: number;
  withDot?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-6xl flex-col items-center px-6"
      style={{ paddingTop: 40, paddingBottom: 40 }}
    >
      <div
        className="w-px md:ml-0"
        style={{
          height,
          backgroundColor: "var(--rail)",
          position: "relative",
        }}
      >
        {withDot && (
          <span
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: "var(--rail)",
              boxShadow: "0 0 0 4px var(--background)",
            }}
          />
        )}
      </div>
    </div>
  );
}
