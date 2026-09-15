import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { analytics, CONSENT_KEY, openAnalyticsSettings } from "./analytics";
import "./style.css";

export function AnalyticsProvider() {
  const location = useLocation();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(() => !analytics?.getConsent());
  useEffect(() => {
    if (open && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [open]);
  useEffect(() => { analytics?.pageView(location.pathname); }, [location.pathname]);
  useEffect(() => {
    const show = () => setOpen(true);
    const storage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) {
        analytics?.suspend();
        window.location.reload();
      }
    };
    window.addEventListener("oekfb:analytics-settings", show);
    window.addEventListener("storage", storage);
    const expiry = window.setInterval(() => { if (analytics?.expireConsent()) setOpen(true); }, 60000);
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      let url: URL;
      try { url = new URL(target.href); } catch { return; }
      if (!["https:", "http:"].includes(url.protocol)) return;
      if (target.dataset.analyticsSponsor) {
        analytics?.track("click_sponsor", { sponsor_id: target.dataset.analyticsSponsor });
      } else if (["apps.apple.com", "play.google.com"].includes(url.hostname)) {
        analytics?.track("click_app_download", { store: url.hostname === "apps.apple.com" ? "apple" : "google" });
      } else if (url.origin !== window.location.origin) {
        analytics?.track("click", { outbound: true, link_domain: url.hostname });
      }
      const extension = url.pathname.match(/\.(pdf|docx?|xlsx?|csv|zip)$/i)?.[1];
      if (extension) analytics?.track("file_download", { file_extension: extension.toLowerCase() });
    };
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("oekfb:analytics-settings", show);
      window.removeEventListener("storage", storage);
      window.clearInterval(expiry);
      document.removeEventListener("click", click);
    };
  }, []);
  const choose = (value: "granted" | "denied") => {
    analytics?.setConsent(value);
    setOpen(false);
  };
  return <>
    {open && <dialog ref={dialog} className="analytics-consent" aria-labelledby="analytics-consent-title" onCancel={(event) => { event.preventDefault(); choose("denied"); }}>
      <h2 id="analytics-consent-title">Analyse-Cookies</h2>
      <p>Mit deiner Zustimmung verwenden wir Google Analytics, um Besuche, gelesene Seiten und die Nutzung unserer Website auszuwerten. Dabei werden Cookies gesetzt und Nutzungsdaten an Google übermittelt. Ohne Zustimmung bleibt die Analyse deaktiviert.</p>
      <p>Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ ändern. <a href="#/privacy" onClick={() => setOpen(false)}>Mehr zum Datenschutz</a></p>
      {analytics?.getConsent() && <p><strong>Aktuelle Auswahl:</strong> {analytics.getConsent() === "granted" ? "Analyse-Cookies erlaubt" : "Analyse-Cookies abgelehnt"}</p>}
      <div className="analytics-consent__actions">
        <button type="button" onClick={() => choose("denied")}>Analyse-Cookies ablehnen</button>
        <button type="button" onClick={() => choose("granted")}>Analyse-Cookies akzeptieren</button>
      </div>
      {analytics?.getConsent() && <button className="analytics-consent__close" type="button" onClick={() => setOpen(false)}>Schließen</button>}
    </dialog>}
    {!open && <button className="analytics-settings" type="button" onClick={openAnalyticsSettings}>Cookie-Einstellungen</button>}
  </>;
}
