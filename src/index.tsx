import { createRoot } from "react-dom/client";
import { App } from "./App";

// --- Fix bad deep-links like #/postpone/Optional(<id>) BEFORE React boots ---
(function normalizeOptionalAndReload() {
  if (typeof window === "undefined") return;

  const { origin, pathname, search, hash } = window.location;

  // decode once so "%28" and "%29" are handled; 'hash' includes the leading '#'
  const decodedHash = decodeURIComponent(hash || "");

  // Replace ONLY the Optional(<id>) segment anywhere in the hash
  const cleanedDecoded = decodedHash.replace(/Optional\(([^)]+)\)/i, "$1");

  if (cleanedDecoded !== decodedHash) {
    const cleanHref = `${origin}${pathname}${search}${cleanedDecoded}`;
    // Replace current history entry (so it won't stay in the back stack)
    window.history.replaceState(null, "", cleanHref);
    // Hard reload into the corrected route
    window.location.reload();
  }
})();

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);
