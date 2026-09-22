"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";

export { THEME_INIT_SCRIPT } from "./theme-script";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "automateit-theme";

// The inline script (see ./theme-script) runs before hydration and sets data-theme on
// <html> from localStorage. Reading it back here (rather than defaulting to
// "light" and correcting in an effect) means the toggle reflects the real
// theme on the very first client render, at the cost of a one-frame
// hydration mismatch on the toggle's pressed state — suppressed where it's
// rendered in SiteHeader.
function initialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // The inline script (THEME_INIT_SCRIPT) sets data-theme on <html> before
  // hydration to avoid a flash, but React's hydration reconciliation clears
  // attributes on <html> it doesn't itself render — re-apply it here so the
  // stored theme survives past hydration instead of silently reverting to
  // light. Runs before paint (unlike useEffect) so there's no visible flash.
  useLayoutEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // localStorage unavailable — nothing to re-apply.
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
