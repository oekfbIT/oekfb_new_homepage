import { useRef, useState } from "react";
import ClipCard from "./ClipCard";
import VideoModal from "./VideoModal";
import { ClipCardData } from "./videoUtils";

/** Horizontal, scrollable row of clip cards with arrows (Bundesliga-style). Clicking a card opens the player. */
export default function ClipRail({ title, items, label }: { title?: string; items: ClipCardData[]; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<ClipCardData | null>(null);
  if (!items.length) return null;
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="clip-rail">
      {title && <h2 className="sub_header md_base">{title}</h2>}
      {label && <div className="clip-rail__label"><span>{label}</span></div>}
      <div className="clip-rail__frame">
        <button type="button" className="clip-rail__arrow clip-rail__arrow--left" onClick={() => scroll(-1)} aria-label="Zurück">‹</button>
        <div className="clip-rail__track" ref={ref}>
          {items.map((it) => <ClipCard key={it.clip.id} clip={it.clip} match={it.match} onPlay={() => setOpen(it)} />)}
        </div>
        <button type="button" className="clip-rail__arrow clip-rail__arrow--right" onClick={() => scroll(1)} aria-label="Weiter">›</button>
      </div>
      {open && <VideoModal clip={open.clip} match={open.match} onClose={() => setOpen(null)} />}
    </div>
  );
}
