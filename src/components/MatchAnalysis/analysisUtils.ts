import { Analytics, Side } from "./useMatchVeo";

export const HALF_MINUTES = 25;

/** Match minute (1-based, 25-min halves) for a second in the Veo recording. */
export function matchMinute(second: number, analytics?: Analytics | null): number | null {
  const periods = analytics?.periods || [];
  for (let i = periods.length - 1; i >= 0; i--) {
    const p = periods[i];
    if (p.start != null && second >= p.start - 5) return Math.max(1, Math.floor((second - p.start) / 60) + 1) + i * HALF_MINUTES;
  }
  return null;
}

/**
 * Veo positions are "as filmed", and teams change ends at half-time. Returns, per half, whether to mirror
 * so that HOME always attacks to the right (and away to the left). Decided by where each team's shots are.
 */
export function mirrorByPeriod(analytics: Analytics): Record<number, boolean> {
  const votes: Record<number, number> = {};
  for (const s of analytics.shots) {
    if (s.x == null || !s.period || !s.team) continue;
    const towardsRight = s.x > 0.5;
    const ok = s.team === "home" ? towardsRight : !towardsRight; // no mirror needed
    votes[s.period] = (votes[s.period] || 0) + (ok ? -1 : 1);
  }
  const out: Record<number, boolean> = {};
  const periods = analytics.periods.map((p) => p.period);
  for (const p of periods) if (votes[p]) out[p] = votes[p] > 0;
  for (const p of periods) {
    if (out[p] !== undefined) continue;
    const other = periods.find((q) => q !== p && out[q] !== undefined);
    out[p] = other !== undefined ? !out[other] : false;
  }
  return out;
}

export const place = (x: number, y: number, mirror: boolean) => {
  const cx = Math.min(1, Math.max(0, mirror ? 1 - x : x));
  const cy = Math.min(1, Math.max(0, mirror ? 1 - y : y));
  return { x: cx, y: cy };
};

export const sideLabel = (side: Side, names: { home: string; away: string }) => (side === "home" ? names.home : names.away);

export type LineupPlayer = { id?: string; name?: string; number?: number; image?: string };
export type Lineups = { home: LineupPlayer[]; away: LineupPlayer[] };

/** Player from the match lineup: by id first, else by team + shirt number. */
export function findPlayer(lineups: Lineups | undefined, opts: { id?: string; team?: Side; number?: number; name?: string }): LineupPlayer | undefined {
  if (!lineups) return undefined;
  const all = [...lineups.home, ...lineups.away];
  if (opts.id) { const p = all.find((x) => x.id?.toLowerCase() === opts.id!.toLowerCase()); if (p) return p; }
  if (opts.team && opts.number != null) { const p = lineups[opts.team].find((x) => Number(x.number) === Number(opts.number)); if (p) return p; }
  if (opts.name) return all.find((x) => x.name === opts.name);
  return undefined;
}
