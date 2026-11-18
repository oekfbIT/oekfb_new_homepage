import { useMemo, useState } from "react";
import Pitch, { px, py } from "./Pitch";
import SegmentedControl from "./SegmentedControl";
import { Analytics, Side } from "./useMatchVeo";
import { matchMinute, mirrorByPeriod, place } from "./analysisUtils";

/** Every shot as a dot (goals filled), home attacking right, away left. */
export default function ShotMap({ analytics, names }: { analytics: Analytics; names: { home: string; away: string } }) {
  const [team, setTeam] = useState<"both" | Side>("both");
  const [hover, setHover] = useState<string | null>(null);
  const mirror = useMemo(() => mirrorByPeriod(analytics), [analytics]);
  const shots = analytics.shots.filter((s) => s.x != null && s.y != null && s.team && (team === "both" || s.team === team));
  const count = (side: Side, type?: string) => analytics.shots.filter((s) => s.team === side && (!type || s.type === type)).length;
  const hovered = shots.find((s) => (s.veo_id ?? `${s.video_second}`) === hover);
  return (
    <section className="ma-panel">
      <div className="ma-panel__head">
        <SegmentedControl small value={team} onChange={setTeam}
          options={[{ value: "both", label: "Beide" }, { value: "home", label: names.home }, { value: "away", label: names.away }]} />
      </div>
      <div className="ma-summary">
        <div><strong>{count("home", "goal")}</strong> Tore · <strong>{count("home")}</strong> Schüsse</div>
        <div><strong>{count("away", "goal")}</strong> Tore · <strong>{count("away")}</strong> Schüsse</div>
      </div>
      <Pitch homeName={names.home} awayName={names.away}>
        {shots.map((s) => {
          const id = s.veo_id ?? `${s.video_second}`;
          const p = place(s.x!, s.y!, !!mirror[s.period ?? 1]);
          return (
            <circle key={id} cx={px(p.x)} cy={py(p.y)} r={s.type === "goal" ? 14 : 11}
              className={`ma-shot ma-shot--${s.team}${s.type === "goal" ? " is-goal" : ""}${hover === id ? " is-hover" : ""}`}
              onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} />
          );
        })}
      </Pitch>
      <div className="ma-legend">
        <span><i className="ma-legend__shot is-goal" /> Tor</span><span><i className="ma-legend__shot" /> Schuss</span>
        {hovered && <span className="ma-legend__info">{hovered.type === "goal" ? "Tor" : "Schuss"} · {matchMinute(hovered.video_second, analytics) ?? "–"}'{hovered.jersey_number ? ` · #${hovered.jersey_number}` : ""}</span>}
      </div>
    </section>
  );
}
