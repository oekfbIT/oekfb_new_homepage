import { useEffect, useMemo, useRef, useState } from "react";
import ClientController from "../../network/ClientController";
import ClipCard from "./ClipCard";
import { Clip, clipSource, clipTitle, clock } from "./videoUtils";
import "./style.css";

/**
 * Small player on the match page. Highlights are separate clips, so they play one after another
 * like a playlist (thumbnails below to jump). "Ganzes Spiel" switches to the full recording.
 */
export default function MatchHighlights({ matchId }: { matchId?: string }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [recording, setRecording] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"highlights" | "full">("highlights");
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let active = true;
    setClips([]); setRecording(null); setIndex(0);
    if (!matchId) return;
    new ClientController().fetchMatchVideos(matchId)
      .then((data: any) => {
        if (!active) return;
        const list: Clip[] = Array.isArray(data?.clips) ? data.clips : [];
        setClips(list);
        setRecording(data?.recording_url || null);
        setMode(list.length ? "highlights" : "full");
      })
      .catch(() => {});
    return () => { active = false; };
  }, [matchId]);

  const playable = useMemo(() => clips.filter((c) => clipSource(c, recording)), [clips, recording]);
  if (!playable.length && !recording) return null;

  const current = playable[index];
  const src = mode === "full" ? recording ?? undefined : current && clipSource(current, recording);
  const onEnded = () => {
    if (mode === "highlights" && index < playable.length - 1) { setAutoplay(true); setIndex(index + 1); }
  };
  // Clip played from the full recording: stop at the clip end.
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (mode === "highlights" && current && !current.video_url && v && v.currentTime >= current.end_second) { v.pause(); onEnded(); }
  };

  return (
    <section className="match-highlights" aria-label="Videos">
      <div className="match-highlights__head">
        <h2 className="h2">Videos</h2>
        <div className="match-highlights__tabs">
          {playable.length > 0 && <button type="button" className={mode === "highlights" ? "is-active" : ""} onClick={() => setMode("highlights")}>Highlights ({playable.length})</button>}
          {recording && <button type="button" className={mode === "full" ? "is-active" : ""} onClick={() => setMode("full")}>Ganzes Spiel</button>}
        </div>
      </div>
      <div className="match-highlights__player">
        {src && <video ref={videoRef} key={`${mode}-${src}`} src={src} poster={mode === "highlights" ? current?.thumbnail_url : undefined}
                       controls playsInline autoPlay={autoplay} onEnded={onEnded} onTimeUpdate={onTimeUpdate} onPlay={() => setAutoplay(true)} />}
        {mode === "highlights" && current && (
          <div className="match-highlights__now">
            <span className="h3">{clipTitle(current)}</span>
            <span className="p">{index + 1} / {playable.length} · Spielzeit {clock(current.event_second)}</span>
          </div>
        )}
      </div>
      {mode === "highlights" && playable.length > 1 && (
        <div className="match-highlights__strip">
          {playable.map((c, i) => (
            <ClipCard key={c.id} clip={c} compact active={i === index} onPlay={() => { setAutoplay(true); setIndex(i); }} />
          ))}
        </div>
      )}
    </section>
  );
}
