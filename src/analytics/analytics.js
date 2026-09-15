export const MEASUREMENT_ID = "G-W36BNBYHGW";
export const CONSENT_KEY = "oekfb.analytics-consent.v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const routes = {
  "/": "Liga auswählen", "/liga": "Startseite", "/app": "App",
  "/spielplan": "Spielplan", "/livescore": "Livescore", "/search": "Suche",
  "/news": "News", "/teams": "Teams", "/tabelle": "Tabelle",
  "/leaderboards": "Bestenliste", "/register": "Team anmelden",
  "/kontakt": "Kontakt", "/privacy": "Datenschutz", "/impressum": "Impressum",
  "/mobilenav": "Navigation", "/strafsenat": "Strafsenat", "/sperren": "Sperren",
  "/transfers": "Transfers", "/ligaordnung": "Ligaordnung", "/spielregeln": "Spielregeln", "/bund": "Der Bund",
};

// Allowlist routes; never transmit search strings, verification tokens or player IDs.
export function describePage(pathname) {
  const path = pathname.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (routes[path]) return { path, title: routes[path] };
  const detail = path.match(/^\/(match|team-detail|news-detail)\/([0-9a-f-]+)$/i);
  if (detail) return { path, title: { match: "Spiel", "team-detail": "Team", "news-detail": "Nachricht" }[detail[1]], content_type: detail[1], content_id: detail[2] };
  if (path.startsWith("/player-detail/")) return { path: "/player-detail", title: "Spieler" };
  if (path.startsWith("/app/user/verify/")) return { path: "/app/user/verify", title: "Verifizierung" };
  if (path.startsWith("/postpone/")) return { path: "/postpone", title: "Spiel verschieben" };
  if (path.startsWith("/transfer/")) return { path: "/transfer", title: "Transfer" };
  return { path: "/unknown", title: "Seite" };
}

export function createAnalytics(win, doc, enabled) {
  let initialized = false;
  let choice;
  let previousPage = "";
  let previousPath = "";
  let page;
  let currentPath = "/";
  let consentAt = 0;
  const disabledKey = `ga-disable-${MEASUREMENT_ID}`;
  function readConsent() {
    try {
      const saved = JSON.parse(win.localStorage.getItem(CONSENT_KEY));
      if (saved && ["granted", "denied"].includes(saved.value) && Number.isFinite(saved.at) && Date.now() >= saved.at && Date.now() - saved.at < MAX_AGE) {
        consentAt = saved.at;
        return saved.value;
      }
    } catch { /* Storage may be blocked. Default to no tracking. */ }
    return null;
  }
  choice = readConsent();
  win[disabledKey] = choice !== "granted" || !enabled;
  function command() {
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push(arguments);
  }
  function allowed() {
    const result = enabled && choice === "granted" && Date.now() - consentAt < MAX_AGE;
    if (!result) win[disabledKey] = true;
    return result;
  }
  function start() {
    if (initialized || !allowed() || !page) return;
    initialized = true;
    win[disabledKey] = false;
    command("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    command("consent", "update", { analytics_storage: "granted" });
    command("js", new Date());
    command("config", MEASUREMENT_ID, {
      send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, cookie_expires: MAX_AGE / 1000,
      page_location: `https://www.oekfb.eu${page.path}`, page_title: page.title,
      page_referrer: safeReferrer(),
    });
    const script = doc.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.id = "oekfb-google-analytics";
    doc.head.appendChild(script);
  }
  function safeReferrer() {
    try { return new URL(doc.referrer).origin + "/"; } catch { return ""; }
  }
  function track(name, params = {}) {
    if (!allowed() || !page) return;
    start();
    // Call sites supply only explicit, non-personal fields. No DOM text/form scraping.
    command("event", name, { ...params, send_to: MEASUREMENT_ID });
  }
  function pageView(pathname) {
    currentPath = pathname;
    page = describePage(pathname);
    if (!allowed()) return;
    start();
    const location = `https://www.oekfb.eu${page.path}`;
    if (pathname === previousPath) return;
    const params = { page_location: location, page_title: `${page.title} | ÖKFB`, page_referrer: previousPage || safeReferrer() };
    command("set", params);
    command("config", MEASUREMENT_ID, { ...params, send_page_view: false });
    track("page_view", params);
    if (page.content_type) track("select_content", { content_type: page.content_type, item_id: page.content_id });
    previousPage = location;
    previousPath = pathname;
  }
  function clearCookies() {
    const names = doc.cookie.split(";").map(v => v.trim().split("=")[0]).filter(v => /^_ga(?:_|$)/.test(v));
    const domains = ["", win.location.hostname, ".oekfb.eu", "oekfb.eu"];
    for (const name of names) for (const domain of domains) {
      doc.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
    }
  }
  function setConsent(value) {
    if (!["granted", "denied"].includes(value)) return;
    choice = value;
    consentAt = Date.now();
    try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: consentAt })); } catch { /* Keep this visit's choice in memory. */ }
    if (value === "denied") {
      win[disabledKey] = true;
      clearCookies();
      // Reload removes Google's already-installed listeners without sending denial pings.
      if (initialized) win.location.reload();
    } else {
      win[disabledKey] = !enabled;
      if (page) pageView(currentPath);
    }
  }
  function suspend() {
    win[disabledKey] = true;
    clearCookies();
  }
  function expireConsent() {
    if (!choice || Date.now() - consentAt < MAX_AGE) return false;
    suspend();
    choice = null;
    try { win.localStorage.removeItem(CONSENT_KEY); } catch { /* fail closed */ }
    if (initialized) win.location.reload();
    return true;
  }
  return { pageView, track, setConsent, suspend, expireConsent, getConsent: () => choice };
}

export const analytics = typeof window !== "undefined"
  ? createAnalytics(window, document, process.env.NODE_ENV === "production" && ["oekfb.eu", "www.oekfb.eu"].includes(window.location.hostname))
  : null;

export function openAnalyticsSettings() {
  window.dispatchEvent(new Event("oekfb:analytics-settings"));
}
