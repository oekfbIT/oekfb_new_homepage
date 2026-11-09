import { useEffect, useMemo, useRef, useState } from "react";
import ClientController from "../../network/ClientController";
import { createVisitorId, getVisitorId, nextVote, readVote, saveVote } from "./storage.mjs";
import "./style.css";

type Vote = "like" | "dislike" | null;
type Counts = { likes: number; dislikes: number };
const storage = () => { try { return window.localStorage; } catch { return null; } };

export default function PreviewFeedback({ matchId, version }: { matchId: string; version?: string }) {
  const api = useMemo(() => new ClientController(), []);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [selected, setSelected] = useState<Vote>(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [stale, setStale] = useState(false);
  const visitor = useRef<string | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    const ticket = ++sequence.current;
    setCounts(null); setPending(false); setStale(false); setStatus("");
    setSelected(version ? readVote(storage(), matchId, version) : null);
    if (version) api.fetchPreviewFeedback(matchId, version).then((result: Counts) => {
      if (sequence.current === ticket) setCounts(result);
    }).catch((error: any) => {
      if (sequence.current !== ticket) return;
      setStale(error.status === 409);
      setStatus(error.status === 409 ? "Die Vorschau wurde aktualisiert. Bitte lade die Seite neu." : "Bewertungen sind momentan nicht verfügbar.");
    });
    return () => { sequence.current += 1; };
  }, [api, matchId, version]);

  const vote = async (clicked: Exclude<Vote, null>) => {
    if (!version || pending || stale) return;
    const ticket = ++sequence.current;
    const choice = nextVote(selected, clicked);
    setPending(true); setStatus("Feedback wird gespeichert …");
    try {
      // No identifier is created until the reader actively submits feedback.
      if (!visitor.current) visitor.current = getVisitorId(storage(), () => createVisitorId(window.crypto));
      const result = await api.submitPreviewFeedback(matchId, version, visitor.current, choice);
      if (sequence.current !== ticket) return;
      setCounts(result); setSelected(choice); saveVote(storage(), matchId, version, choice);
      setStatus(choice ? "Danke für dein Feedback!" : "Bewertung entfernt.");
    } catch (error: any) {
      if (sequence.current !== ticket) return;
      setStale(error.status === 409);
      setStatus(error.status === 409 ? "Die Vorschau wurde aktualisiert. Bitte lade die Seite neu." : "Dein Feedback konnte nicht gespeichert werden. Bitte versuche es erneut.");
    } finally { if (sequence.current === ticket) setPending(false); }
  };

  return <div className="preview-feedback">
    <p className="preview-feedback__disclaimer">Diese Spielvorschau wurde mit KI erstellt. Dein Feedback hilft uns, die Texte zu verbessern.</p>
    {version && <>
      <div className="preview-feedback__buttons" role="group" aria-label="Spielvorschau bewerten">
        <button type="button" aria-label="Spielvorschau gefällt mir" aria-pressed={selected === "like"} disabled={pending || stale} onClick={() => vote("like")}>
          <span aria-hidden="true">👍</span> Gefällt mir {counts && <span className="preview-feedback__count">{counts.likes}</span>}
        </button>
        <button type="button" aria-label="Spielvorschau gefällt mir nicht" aria-pressed={selected === "dislike"} disabled={pending || stale} onClick={() => vote("dislike")}>
          <span aria-hidden="true">👎</span> Gefällt mir nicht {counts && <span className="preview-feedback__count">{counts.dislikes}</span>}
        </button>
      </div>
      <span className="preview-feedback__status" role="status" aria-live="polite">{status || "Ohne Anmeldung · Zum Entfernen erneut klicken"}</span>
    </>}
  </div>;
}
