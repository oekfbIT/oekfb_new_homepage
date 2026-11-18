// Shared helpers for Veo clips on the homepage (API returns snake_case).
export type VideoMatch = {
  id: string; gameday: number; date?: string; home_name: string; away_name: string;
  home_logo?: string; away_logo?: string; home_team_id?: string; away_team_id?: string;
  score?: { home: number; away: number };
};
export type Clip = {
  id: string; match_id: string; type: string; event_second: number; start_second: number; end_second: number;
  team?: "home" | "away"; player_id?: string; player_name?: string; jersey_number?: number;
  score_after?: { home: number; away: number }; video_url?: string; thumbnail_url?: string;
};
export type ClipCardData = { clip: Clip; match?: VideoMatch };

export const typeLabels: Record<string, string> = {
  goal: "Tor", shot: "Torschuss", chance: "Chance", save: "Parade", penalty: "Elfmeter", corner: "Ecke",
  free_kick: "Freistoß", yellow_card: "Gelbe Karte", red_card: "Rote Karte", foul: "Foul", kickoff: "Anstoß",
};
export const typeIcon = (type: string) => (type === "goal" || type === "penalty" ? "⚽" : type.includes("card") ? "🟨" : "▶");

export const clock = (seconds: number) => {
  const t = Math.max(0, Math.round(seconds || 0));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};
export const clipDuration = (c: Clip) => clock((c.end_second || 0) - (c.start_second || 0));
export const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};
export const matchTitle = (m?: VideoMatch) =>
  m ? `${m.home_name} ${m.score ? `${m.score.home}–${m.score.away}` : "–"} ${m.away_name}` : "";
export const clipTitle = (c: Clip) => `${typeLabels[c.type] ?? c.type}${c.player_name ? ` · ${c.player_name}` : ""}`;

/** Video source for a clip: its own file, or the full recording with a media fragment. */
export const clipSource = (c: Clip, recordingUrl?: string | null) =>
  c.video_url || (recordingUrl ? `${recordingUrl}#t=${Math.floor(c.start_second)},${Math.ceil(c.end_second)}` : undefined);
