import { useMemo, useState } from "react";
import Pitch, { px, py } from "./Pitch";
import SegmentedControl from "./SegmentedControl";
import { Analytics, Side } from "./useMatchVeo";
import { mirrorByPeriod, place } from "./analysisUtils";

/** Where each team's passes were played (one dot per pass), per team and half. */
export default function PassMap({ analytics, names }: { analytics: Analytics; names: { home: string; away: string } }) {
  const [team, setTeam] = useState<Side>("home");
  const [half, setHalf] = useState<"all" | "1" | "2">("all");
  const mirror = useMemo(() => mirrorByPeriod(analytics), [analytics]);
  const periods = analytics.periods.filter((p) => half === "all" || String(p.period) === half);
  const points = periods.flatMap((p) => (p.pass_locations?.[team] || []).map(([x, y]) => place(x, y, !!mirror[p.period])));
  const sum = (side: Side, k: "passes_completed" | "possession_won") => analytics.periods.filter((p) => half === "all" || String(p.period) === half).reduce((t, p) => t + (p[k]?.[side] || 0), 0);
  const ownHalf = points.filter((p) => (team === "home" ? p.x < 0.5 : p.x > 0.5)).length;
  return (
    <section className="ma-panel">
      <div className="ma-panel__head">
        <SegmentedControl small value={team} onChange={setTeam} options={[{ value: "home", label: names.home }, { value: "away", label: names.away }]} />
        <SegmentedControl small value={half} onChange={setHalf} options={[{ value: "all", label: "Gesamt" }, { value: "1", label: "1. HZ" }, { value: "2", label: "2. HZ" }]} />
      </div>
      <div className="ma-summary">
        <div><strong>{sum("home", "passes_completed")}</strong> angekommene Pässe</div>
        <div><strong>{sum("away", "passes_completed")}</strong> angekommene Pässe</div>
      </div>
      <Pitch homeName={names.home} awayName={names.away}>
        {points.map((p, i) => <circle key={i} cx={px(p.x)} cy={py(p.y)} r="8" className={`ma-pass ma-pass--${team}`} />)}
      </Pitch>
      {points.length > 0 && (
        <div className="ma-legend">
          <span>{Math.round((ownHalf / points.length) * 100)} % in der eigenen Hälfte</span>
          <span>{100 - Math.round((ownHalf / points.length) * 100)} % in der gegnerischen Hälfte</span>
        </div>
      )}
    </section>
  );
}
