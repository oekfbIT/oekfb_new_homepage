import { useEffect } from "react";
import { Clip, VideoMatch, clipSource, clipTitle, formatDate, matchTitle } from "./videoUtils";
import { Link } from "react-router-dom";

type Props = { clip: Clip; match?: VideoMatch; onClose: () => void };

export default function VideoModal({ clip, match, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [onClose]);
  const src = clipSource(clip);
  return (
    <div className="video-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="video-modal__body" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="video-modal__close" onClick={onClose} aria-label="Schließen">✕</button>
        {src ? <video key={src} src={src} poster={clip.thumbnail_url} controls autoPlay playsInline /> : <div className="video-modal__missing">Video nicht verfügbar</div>}
        <div className="video-modal__meta">
          <div className="h3">{clipTitle(clip)}</div>
          {match && (
            <Link className="p video-modal__link" to={`/match/${match.id}`} onClick={onClose}>
              {matchTitle(match)} · {match.gameday}. Spieltag{match.date ? ` · ${formatDate(match.date)}` : ""}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
