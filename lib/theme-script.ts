const STORAGE_KEY = "automateit-theme";

// Runs before hydration to set data-theme on <html> from localStorage, so the
// toggle reflects the real theme on the very first client render. Kept in its
// own plain (non "use client") module so next.config.ts can import it too and
// hash its exact contents for the script-src CSP allowlist.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;
