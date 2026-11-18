import { useState } from "react";
import SegmentedControl from "./SegmentedControl";

const ROWS: [string, string][] = [
  ["goal", "Tore"], ["attempts", "Torschüsse gesamt"], ["shots", "Schüsse aufs Tor"], ["possession_percentage", "Ballbesitz %"],
  ["passes_completed", "Angekommene Pässe"], ["corner", "Ecken"], ["free_kick", "Freistöße"], ["throw_in", "Einwürfe"],
  ["goal_kick", "Abstöße"], ["foul", "Fouls"], ["penalty", "Elfmeter"], ["save", "Paraden"], ["tackle", "Tacklings"],
  ["duel", "Zweikämpfe"], ["dribble", "Dribblings"], ["interception", "Abgefangene Bälle"],
];

/** Veo stats as two bars per row (home left, away right), whole match or per half. */
export default function StatsPanel({ stats, names }: { stats: Record<string, number[]>; names: { home: string; away: string } }) {
  const [half, setHalf] = useState<"all" | "h1" | "h2">("all");
  const key = (k: string) => (half === "all" ? k : `${k}_${half}`);
  const rows = ROWS.filter(([k]) => stats[key(k)] && (stats[key(k)][0] || stats[key(k)][1] || k === "goal"));
  return (
    <section className="ma-panel">
      <div className="ma-panel__head">
        <SegmentedControl small value={half} onChange={setHalf}
          options={[{ value: "all", label: "Gesamt" }, { value: "h1", label: "1. Halbzeit" }, { value: "h2", label: "2. Halbzeit" }]} />
      </div>
      <div className="ma-teams"><span><i className="ma-dot ma-dot--home" />{names.home}</span><span>{names.away}<i className="ma-dot ma-dot--away" /></span></div>
      {rows.length === 0 && <p className="p ma-empty">Keine Werte für diese Halbzeit.</p>}
      {rows.map(([k, label]) => {
        const [h, a] = stats[key(k)];
        const max = Math.max(h, a, 1);
        return (
          <div className="ma-stat" key={k}>
            <div className="ma-stat__label">{label}</div>
            <div className="ma-stat__row">
              <span className={`ma-stat__value${h > a ? " is-lead" : ""}`}>{h}</span>
              <span className="ma-bar ma-bar--home"><i style={{ width: `${(h / max) * 100}%` }} /></span>
              <span className="ma-bar ma-bar--away"><i style={{ width: `${(a / max) * 100}%` }} /></span>
              <span className={`ma-stat__value${a > h ? " is-lead" : ""}`}>{a}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
