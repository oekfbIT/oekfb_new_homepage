import { useMemo, useRef, useState } from "react";
import { MatchVeo } from "../MatchAnalysis/useMatchVeo";
import { Lineups, findPlayer, matchMinute } from "../MatchAnalysis/analysisUtils";
import PlayerAvatar from "../MatchAnalysis/PlayerChip";
import { Clip, clipSource, typeIcon, typeLabels } from "./videoUtils";
import "./style.css";

/**
 * Highlights tab: player on top, the clips as a list of events below (minute, scorer, score).
 * Clips play one after another; "Ganzes Spiel" switches to the full recording when there is one.
 */
export default function MatchHighlights({ data, names, lineups }: { data: MatchVeo; names: { home: string; away: string }; lineups?: Lineups }) {
  const { clips, recordingUrl: recording, analytics } = data;
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"highlights" | "full">("highlights");
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playable = useMemo(() => clips.filter((c) => clipSource(c, recording)).sort((a, b) => a.event_second - b.event_second), [clips, recording]);
  if (!playable.length && !recording) return <p className="p ma-empty">Für dieses Spiel gibt es noch keine Videos.</p>;

  const current: Clip | undefined = playable[Math.min(index, playable.length - 1)];
  const src = mode === "full" || !current ? recording ?? undefined : clipSource(current, recording);
  const next = () => { if (mode === "highlights" && index < playable.length - 1) { setAutoplay(true); setIndex(index + 1); } };
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (mode === "highlights" && current && !current.video_url && v && v.currentTime >= current.end_second) { v.pause(); next(); }
  };

  return (
    <section className="match-highlights" aria-label="Highlights">
      {recording && playable.length > 0 && (
        <div className="match-highlights__tabs">
          <button type="button" className={mode === "highlights" ? "is-active" : ""} onClick={() => setMode("highlights")}>Highlights</button>
          <button type="button" className={mode === "full" ? "is-active" : ""} onClick={() => setMode("full")}>Ganzes Spiel</button>
        </div>
      )}
      <div className="match-highlights__player">
        {src && <video ref={videoRef} key={`${mode}-${src}`} src={src} poster={mode === "highlights" ? current?.thumbnail_url : undefined}
                       controls playsInline autoPlay={autoplay} onEnded={next} onTimeUpdate={onTimeUpdate} onPlay={() => setAutoplay(true)} />}
      </div>
      {mode === "highlights" && playable.length > 0 && (
        <ol className="match-highlights__list">
          {playable.map((c, i) => {
            const minute = matchMinute(c.event_second, analytics);
            const team = c.team === "home" ? names.home : c.team === "away" ? names.away : "";
            const player = findPlayer(lineups, { id: c.player_id, team: c.team, number: c.jersey_number, name: c.player_name });
            return (
              <li key={c.id}>
                <button type="button" className={`match-highlights__item match-highlights__item--${c.team ?? "none"}${i === index ? " is-active" : ""}`}
                        onClick={() => { setAutoplay(true); setIndex(i); videoRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }}>
                  <span className="match-highlights__minute">{minute != null ? `${minute}'` : ""}</span>
                  <PlayerAvatar player={player} number={c.jersey_number} size={48} />
                  <span className="match-highlights__text">
                    <span className="h3">{player?.name || c.player_name || typeLabels[c.type] || c.type}</span>
                    <span className="p">{typeIcon(c.type)} {typeLabels[c.type] ?? c.type}{player?.number != null ? ` · #${player.number}` : ""}{team ? ` · ${team}` : ""}</span>
                  </span>
                  {c.score_after && <span className="match-highlights__score">{c.score_after.home}:{c.score_after.away}</span>}
                  <span className="match-highlights__play" aria-hidden>{i === index ? "❚❚" : "▶"}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
