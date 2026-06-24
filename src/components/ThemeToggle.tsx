import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-all hover:scale-105"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--muted-foreground)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-colors group-hover:text-accent" />
      ) : (
        <Moon className="h-4 w-4 transition-colors group-hover:text-accent" />
      )}
    </button>
  );
}