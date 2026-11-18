import { Clip, VideoMatch, clipDuration, clipTitle, formatDate, matchTitle, typeIcon } from "./videoUtils";

type Props = { clip: Clip; match?: VideoMatch; onPlay: () => void; active?: boolean; compact?: boolean };

export default function ClipCard({ clip, match, onPlay, active, compact }: Props) {
  return (
    <button type="button" className={`clip-card${active ? " clip-card--active" : ""}${compact ? " clip-card--compact" : ""}`} onClick={onPlay}>
      <span className="clip-card__thumb">
        {clip.thumbnail_url ? <img src={clip.thumbnail_url} alt="" loading="lazy" /> : <span className="clip-card__placeholder" />}
        <span className="clip-card__badge">{clipDuration(clip)} <span className="clip-card__play">▶</span></span>
        <span className="clip-card__type" aria-hidden>{typeIcon(clip.type)}</span>
        <span className="clip-card__caption">
          <span className="clip-card__title">{clipTitle(clip)}</span>
          {!compact && match && <span className="clip-card__sub">{matchTitle(match)}{match.date ? ` · ${formatDate(match.date)}` : ""}</span>}
        </span>
      </span>
    </button>
  );
}
