import "./style.css";

type FormItem = {
  result: "W" | "D" | "L";
  match_id?: string;
  matchID?: string;
  home?: string;
  away?: string;
  score?: { home: number; away: number };
};

const results = { W: { label: "Sieg", style: "win" }, D: { label: "Unentschieden", style: "draw" }, L: { label: "Niederlage", style: "loss" } };

export default function TeamForm({ items = [], teamName, unavailable = false, loading = false }: { items?: FormItem[]; teamName: string; unavailable?: boolean; loading?: boolean }) {
  const recent = items.filter((item) => results[item.result]).slice(0, 5).reverse();
  const slots: (FormItem | null)[] = [...Array(5 - recent.length).fill(null), ...recent];
  return <div className="team-form" role="group" aria-label={`Form ${teamName}: neuestes Spiel rechts`}>
    <div className="team-form__results">
      {slots.map((item, index) => {
        if (!item) return <span key={`empty-${index}`} className="team-form__badge team-form__badge--empty" title="Kein früheres Ergebnis vorhanden" aria-label="Kein früheres Ergebnis">–</span>;
        const result = results[item.result];
        const score = item.score ? ` · ${item.home || "Heim"} ${item.score.home}:${item.score.away} ${item.away || "Auswärts"}` : "";
        const label = `${result.label}${score}`;
        const matchId = item.match_id || item.matchID;
        const className = `team-form__badge team-form__badge--${result.style}`;
        return matchId ? <a key={`${matchId}-${index}`} href={`#/match/${matchId}`} className={className} title={label} aria-label={label}>{item.result}</a>
          : <span key={index} className={className} title={label} aria-label={label}>{item.result}</span>;
      })}
    </div>
    <span className="team-form__caption">{loading ? "Form wird geladen …" : unavailable ? "Form derzeit nicht verfügbar" : recent.length ? "Letzte Spiele" : "Noch keine früheren Spiele"}</span>
  </div>;
}
