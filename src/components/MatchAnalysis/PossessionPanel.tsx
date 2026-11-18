import { useState } from "react";
import Pitch, { PAD, PITCH_H, PITCH_W } from "./Pitch";
import SegmentedControl from "./SegmentedControl";
import { Analytics, Side } from "./useMatchVeo";

type Thirds = { attacking: number; middle: number; defensive: number };

/** Ball possession share + where each team had the ball (own third / middle / attacking third). */
export default function PossessionPanel({ analytics, stats, names }: { analytics: Analytics; stats?: Record<string, number[]> | null; names: { home: string; away: string } }) {
  const [half, setHalf] = useState<"all" | "1" | "2">("all");
  const periods = analytics.periods.filter((p) => half === "all" || String(p.period) === half);
  const secs = (side: Side) => periods.reduce((t, p) => t + (p.possession_seconds?.[side] || 0), 0);
  const thirds = (side: Side): Thirds => periods.reduce((t, p) => {
    const v = p.possession_thirds?.[side] || {};
    return { attacking: t.attacking + (v.attacking || 0), middle: t.middle + (v.middle || 0), defensive: t.defensive + (v.defensive || 0) };
  }, { attacking: 0, middle: 0, defensive: 0 });
  const h = secs("home"), a = secs("away");
  const homePct = half === "all" && stats?.possession_percentage ? stats.possession_percentage[0] : h + a ? Math.round((h / (h + a)) * 100) : 50;
  const pct = (t: Thirds) => { const s = t.attacking + t.middle + t.defensive || 1; return { d: Math.round((t.defensive / s) * 100), m: Math.round((t.middle / s) * 100), a: Math.round((t.attacking / s) * 100) }; };
  const hp = pct(thirds("home")), ap = pct(thirds("away"));
  const w = PITCH_W - 2 * PAD, h3 = PITCH_H - 2 * PAD, third = w / 3, halfH = h3 / 2;
  // Home attacks right: its defensive third is left. Away mirrored. Home on the top half, away below.
  const zones = [
    { side: "home", row: 0, values: [hp.d, hp.m, hp.a] },
    { side: "away", row: 1, values: [ap.a, ap.m, ap.d] },
  ];
  const maxV = Math.max(...zones.flatMap((z) => z.values), 1);
  const mm = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
  return (
    <section className="ma-panel">
      <div className="ma-panel__head">
        <SegmentedControl small value={half} onChange={setHalf} options={[{ value: "all", label: "Gesamt" }, { value: "1", label: "1. Halbzeit" }, { value: "2", label: "2. Halbzeit" }]} />
      </div>
      <div className="ma-possession">
        <div className="ma-possession__nums"><strong>{homePct} %</strong><span>Ballbesitz</span><strong>{100 - homePct} %</strong></div>
        <div className="ma-possession__bar"><i className="ma-possession__home" style={{ width: `${homePct}%` }} /><i className="ma-possession__away" style={{ width: `${100 - homePct}%` }} /></div>
        {(h > 0 || a > 0) && <div className="ma-possession__time"><span>{mm(h)} min</span><span>{mm(a)} min</span></div>}
      </div>
      <Pitch homeName={names.home} awayName={names.away}>
        {zones.map((z) => z.values.map((v, i) => (
          <g key={`${z.side}-${i}`}>
            <rect x={PAD + i * third + 4} y={PAD + z.row * halfH + 4} width={third - 8} height={halfH - 8} rx="8"
                  className={`ma-zone ma-zone--${z.side}`} style={{ opacity: 0.12 + 0.6 * (v / maxV) }} />
            <text x={PAD + i * third + third / 2} y={PAD + z.row * halfH + halfH / 2 + 14} className="ma-zone__label">{v} %</text>
          </g>
        )))}
      </Pitch>
      <div className="ma-legend"><span><i className="ma-dot ma-dot--home" /> oben: {names.home}</span><span><i className="ma-dot ma-dot--away" /> unten: {names.away}</span></div>
    </section>
  );
}
