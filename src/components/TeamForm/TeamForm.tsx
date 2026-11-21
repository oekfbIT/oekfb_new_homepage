import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { formatMatchDate } from "../../utils/matchUtils";
import type { ISODate } from "../../utils/matchUtils";
import "./style.css";

type FormItem = {
  result: "W" | "D" | "L";
  match_id?: string;
  matchID?: string;
  home?: string;
  away?: string;
  home_logo?: string;
  away_logo?: string;
  date?: ISODate;
  gameday?: number;
  score?: { home: number; away: number };
};

const results = { W: { label: "Sieg", style: "win" }, D: { label: "Unentschieden", style: "draw" }, L: { label: "Niederlage", style: "loss" } };

function FormBadge({ item, latest }: { item: FormItem; latest: boolean }) {
  const id = useId();
  const wrapper = useRef<HTMLSpanElement>(null);
  const touch = useRef(false);
  const [position, setPosition] = useState<{ left: number; top?: number; bottom?: number } | null>(null);
  const result = results[item.result];
  const matchId = item.match_id || item.matchID;
  const home = item.home || "Heim";
  const away = item.away || "Auswärts";
  const score = item.score ? `${item.score.home}:${item.score.away}` : null;
  const date = item.date ? formatMatchDate(item.date) : null;
  const gameday = item.gameday != null ? `${item.gameday}. Spieltag` : null;
  const label = `${latest ? "Letztes Spiel: " : ""}${result.label} · ${home} ${score || "gegen"} ${away}`;

  const show = () => {
    const rect = wrapper.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(280, document.documentElement.clientWidth - 24);
    const left = Math.max(12, Math.min(rect.left + (rect.width - width) / 2, document.documentElement.clientWidth - width - 12));
    const above = window.innerHeight - rect.bottom < 170 && rect.top > window.innerHeight - rect.bottom;
    setPosition(above ? { left, bottom: window.innerHeight - rect.top } : { left, top: rect.bottom });
  };

  const dismiss = () => setPosition(null);
  const open = position !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    const onOutside = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) dismiss();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", dismiss);
    window.addEventListener("scroll", dismiss, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("scroll", dismiss, true);
    };
  }, [open]);

  const onClick = (event: MouseEvent<HTMLElement>) => {
    if (!matchId || (event.detail > 0 && touch.current && !open)) {
      event.preventDefault();
      if (open) dismiss();
      else show();
    }
  };

  const Badge = matchId ? "a" : "button";
  return (
    <span
      ref={wrapper}
      className="team-form__item"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") show(); }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !event.currentTarget.querySelector(":focus-visible")) dismiss();
      }}
    >
      <Badge
        href={matchId ? `#/match/${matchId}` : undefined}
        type={matchId ? undefined : "button"}
        className={`team-form__badge team-form__badge--${result.style}${latest ? " team-form__badge--latest" : ""}`}
        aria-label={label}
        aria-describedby={id}
        onPointerDown={(event) => { touch.current = event.pointerType !== "mouse"; }}
        onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) show(); }}
        onBlur={dismiss}
        onClick={onClick}
      >
        {item.result}
      </Badge>
      <span id={id} role="tooltip" className="team-form__tooltip" hidden={!open} style={position || undefined}>
        <span className="team-form__card">
          <span className="team-form__match">
            <span className="team-form__side">
              {item.home_logo && <img src={item.home_logo} alt="" />}
              <span>{home}</span>
            </span>
            <strong>{score ?? "–"}</strong>
            <span className="team-form__side">
              {item.away_logo && <img src={item.away_logo} alt="" />}
              <span>{away}</span>
            </span>
          </span>
          {(date || gameday) && <span className="team-form__meta">{[date, gameday].filter(Boolean).join(" · ")}</span>}
        </span>
      </span>
    </span>
  );
}

export default function TeamForm({ items = [], teamName, unavailable = false, loading = false }: { items?: FormItem[]; teamName: string; unavailable?: boolean; loading?: boolean }) {
  const recent = items.filter((item) => results[item.result]).slice(0, 5).reverse();
  const slots: (FormItem | null)[] = [...Array(5 - recent.length).fill(null), ...recent];
  return <div className="team-form" role="group" aria-label={`Form ${teamName}: neuestes Spiel rechts`}>
    <div className="team-form__results">
      {slots.map((item, index) => {
        if (!item) return <span key={`empty-${index}`} className="team-form__badge team-form__badge--empty" title="Kein früheres Ergebnis vorhanden" aria-label="Kein früheres Ergebnis">–</span>;
        return <FormBadge key={`${item.match_id || item.matchID}-${index}`} item={item} latest={index === slots.length - 1} />;
      })}
    </div>
    <span className="team-form__caption">{loading ? "Form wird geladen …" : unavailable ? "Form derzeit nicht verfügbar" : recent.length ? "Letzte Spiele" : "Noch keine früheren Spiele"}</span>
  </div>;
}
