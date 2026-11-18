import { useEffect, useState } from "react";
import ClientController from "../../network/ClientController";
import { Clip } from "../Videos/videoUtils";

export type Side = "home" | "away";
export type Pair<T> = { home?: T | null; away?: T | null };
export type Shot = { veo_id?: string; type: "goal" | "shot"; team?: Side; period?: number; video_second: number; x?: number; y?: number; jersey_number?: number };
export type Period = {
  period: number; start?: number; end?: number;
  possession_seconds?: Pair<number>; passes_completed?: Pair<number>; possession_won?: Pair<number>;
  pass_locations?: Pair<number[][]>; possession_thirds?: Pair<{ attacking?: number; middle?: number; defensive?: number }>;
  pass_strings?: Pair<number[][]>;
};
export type Analytics = { shots: Shot[]; periods: Period[] };
export type MatchVeo = { recordingUrl: string | null; clips: Clip[]; stats: Record<string, number[]> | null; analytics: Analytics | null };

const empty: MatchVeo = { recordingUrl: null, clips: [], stats: null, analytics: null };

/** One request for everything Veo has for a match: video, clips, stats, analytics. */
export function useMatchVeo(matchId?: string): MatchVeo {
  const [data, setData] = useState<MatchVeo>(empty);
  useEffect(() => {
    let active = true;
    setData(empty);
    if (!matchId) return;
    new ClientController().fetchMatchVideos(matchId)
      .then((d: any) => {
        if (!active) return;
        const analytics = d?.analytics && Array.isArray(d.analytics.shots) ? d.analytics : null;
        const stats = d?.stats && Object.keys(d.stats).length ? d.stats : null;
        setData({ recordingUrl: d?.recording_url || null, clips: Array.isArray(d?.clips) ? d.clips : [], stats, analytics });
      })
      .catch(() => {});
    return () => { active = false; };
  }, [matchId]);
  return data;
}
