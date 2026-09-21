"use client";

import { createContext, useCallback, useContext, useState } from "react";

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
