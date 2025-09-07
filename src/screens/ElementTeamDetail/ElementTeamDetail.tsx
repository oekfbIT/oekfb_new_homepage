// ElementTeamDetail.tsx
// -----------------------------------------------------------------------------
// Team detail view with SEASON + SPIELTAG filters.
// Updated for TeamStatsPair { all, season } and Dropdown string values.
// Fixes:
//  - Render stats from stats.all & stats.season (numbers only)
//  - Dropdown value types as strings
//  - Safe numeric id for TeamDetailSquad
// -----------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { StatCell } from "../../components/StatCell";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import { TeamHeader } from "../../components/TeamHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type SeasonWithMatches = {
  season_name: string;
  league_name: string;
  primary: boolean;
  season_id: string;
  league_id: string;
  matches: any[];
};

type TeamStats = {
  wins: number;
  draws: number;
  losses: number;
  totalScored: number;
  totalAgainst: number;
  goalDifference: number;
  totalPoints: number;
  totalYellowCards: number;
  totalRedCards: number;
} | {
  // also accept snake_case from backend just in case
  wins: number;
  draws: number;
  losses: number;
  total_scored: number;
  total_against: number;
  goal_difference: number;
  total_points: number;
  total_yellow_cards: number;
  total_red_cards: number;
};

type TeamStatsPair = {
  all?: TeamStats;
  season?: TeamStats;
};

const ALL_SEASONS = "__ALL__";
const ALL_GAMEDAYS = "__ALL__";

const toMs = (iso?: string) => (iso ? new Date(iso).getTime() : NaN);
const formatDateDMY = (iso?: string) => {
  const ms = toMs(iso);
  if (Number.isNaN(ms)) return "";
  const d = new Date(ms);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export const ElementTeamDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = useMemo(() => new ClientController(), []);
  const authService = useMemo(() => new AuthService(), []);

  const [teamData, setTeamData] = useState<any>(null);

  // Seasons & selection
  const [seasons, setSeasons] = useState<SeasonWithMatches[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);

  // Gameday selection (string for Dropdown)
  const [uniqueGamedays, setUniqueGamedays] = useState<{ gameday: number; date: string }[]>([]);
  const [selectedGameday, setSelectedGameday] = useState<string>(ALL_GAMEDAYS);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const response = await clientController.fetchClubDetail(id);
        setTeamData(response);

        const upcomingSeasons: SeasonWithMatches[] = Array.isArray(response?.upcoming)
          ? response.upcoming
          : [];

        setSeasons(upcomingSeasons);

        const primarySeason =
          upcomingSeasons.find((s) => s.primary) ??
          upcomingSeasons.find((s) => Array.isArray(s.matches) && s.matches.length > 0) ??
          upcomingSeasons[0] ??
          null;

        setSelectedSeasonId(primarySeason ? primarySeason.season_id : ALL_SEASONS);
      } catch (error) {
        console.error("Error fetching team detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetail();
  }, [id, authService, clientController]);

  // Build gameday options when season changes
  useEffect(() => {
    if (!seasons.length) {
      setUniqueGamedays([]);
      setSelectedGameday(ALL_GAMEDAYS);
      return;
    }

    const useAllSeasons = selectedSeasonId === ALL_SEASONS || !selectedSeasonId;
    const pool = useAllSeasons ? seasons : seasons.filter((s) => s.season_id === selectedSeasonId);

    const matches = pool.flatMap((s) => s.matches || []);
    const map = new Map<number, string>();

    matches.forEach((m: any) => {
      const gd = m?.details?.gameday;
      const dateStr = m?.details?.date;
      if (!gd || !dateStr) return;
      const ms = toMs(dateStr);
      if (Number.isNaN(ms)) return;

      const formatted = formatDateDMY(dateStr);
      const existing = map.get(gd);
      if (!existing) {
        map.set(gd, formatted);
      } else {
        // keep earliest date for the gameday
        const [eDD, eMM, eYYYY] = existing.split(".");
        const prev = new Date(`${eYYYY}-${eMM}-${eDD}T00:00:00Z`).getTime();
        if (ms < prev) map.set(gd, formatted);
      }
    });

    const list = Array.from(map.entries())
      .map(([gameday, date]) => ({ gameday, date }))
      .sort((a, b) => a.gameday - b.gameday);

    setUniqueGamedays(list);

    // Default gameday: closest to "now"
    const today = Date.now();
    let closest: number | null = null;
    let minDiff = Infinity;

    matches.forEach((m: any) => {
      const whenStr = m?.details?.date;
      const gd = m?.details?.gameday;
      const ms = toMs(whenStr);
      if (!gd || Number.isNaN(ms)) return;
      const diff = Math.abs(today - ms);
      if (diff < minDiff) {
        minDiff = diff;
        closest = gd;
      }
    });

    setSelectedGameday(closest ? String(closest) : ALL_GAMEDAYS);
  }, [selectedSeasonId, seasons]);

  // Resolve selections
  const usingAllSeasons = selectedSeasonId === ALL_SEASONS || !selectedSeasonId;
  const selectedSeason: SeasonWithMatches | null =
    seasons.find((s) => s.season_id === selectedSeasonId) ?? null;

  const baseMatches =
    usingAllSeasons
      ? seasons.flatMap((s) => s.matches || [])
      : (selectedSeason?.matches ?? []);

  const fixtures = baseMatches
    .filter((m: any) => {
      if (!selectedGameday || selectedGameday === ALL_GAMEDAYS) return true;
      return Number(m?.details?.gameday) === Number(selectedGameday);
    })
    .slice()
    .sort((a: any, b: any) => {
      const da = a?.details?.date ? toMs(a.details.date) : Infinity;
      const db = b?.details?.date ? toMs(b.details.date) : Infinity;
      if (da !== db) return (da as number) - (db as number);
      const ga = Number(a?.details?.gameday ?? 0);
      const gb = Number(b?.details?.gameday ?? 0);
      return ga - gb;
    });

  // Stats: flatten pair into entries (numbers only)
  const statsPair: TeamStatsPair | undefined = teamData?.club?.stats;
  const allStatsEntries = Object.entries(statsPair?.all ?? {}) as [string, number | any][];
  const seasonStatsEntries = Object.entries(statsPair?.season ?? {}) as [string, number | any][];

  // club name helper (snake/camel fallback)
  const clubName: string =
    teamData?.club?.teamName ?? teamData?.club?.team_name ?? "Team";

  if (loading) return <LoadingIndicator />;

  return (
    <div
      className="element-team-detail"
      style={{ minWidth: screenWidth < 1200 ? "390px" : "1200px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Header */}
      <div className="team-detail-top">
        {teamData?.club ? (
          <TeamHeader team={teamData.club} />
        ) : (
          <div>Keine Teamdaten verfügbar</div>
        )}
      </div>

      <div className="page-content">
        {/* All-time stats */}
        <section className="section">
          <h2 className="sub_header md_base">{clubName} Ewige Statistiken</h2>
          <div className="h3 stats-grid" style={{ justifyItems: "center" }}>
            {allStatsEntries.map(([k, v]) => (
              <StatCell
                key={`all-${String(k)}`}
                statKey={k}
                statValue={typeof v === "number" ? v : Number(v) || 0}
                className="my-stat-cell"
              />
            ))}
          </div>
        </section>

        {/* Season stats */}
        <section className="section">
          <h2 className="sub_header md_base">{clubName} Saison Statistiken</h2>
          <div className="h3 stats-grid" style={{ justifyItems: "center" }}>
            {seasonStatsEntries.map(([k, v]) => (
              <StatCell
                key={`season-${String(k)}`}
                statKey={k}
                statValue={typeof v === "number" ? v : Number(v) || 0}
                className="my-stat-cell"
              />
            ))}
          </div>
        </section>

        {/* Squad */}
        <section className="section">
          <h2 className="sub_header md_base">{clubName} Kader</h2>
          <div className="team-squad">
            {teamData?.club?.players
              ?.filter(
                (p: any) =>
                  p.eligibility === "Spielberechtigt" || p.eligibility === "Gesperrt"
              )
              .sort((a: any, b: any) => {
                if (a.eligibility === "Spielberechtigt" && b.eligibility !== "Spielberechtigt")
                  return -1;
                if (a.eligibility !== "Spielberechtigt" && b.eligibility === "Spielberechtigt")
                  return 1;
                return 0;
              })
              .map((player: any, idx: number) => {
                const safeId =
                  player.id ||
                  Number(player.sid) ||
                  Number(player.number) ||
                  idx;
                return (
                  <div key={`${player.id ?? player.sid ?? idx}`} style={{ cursor: "pointer" }}>
                    <TeamDetailSquad player={{ ...player, id: safeId }} />
                  </div>
                );
              })}
          </div>
        </section>

        {/* Fixtures + Filters */}
        <section className="section">
          <h2 className="sub_header md_base">
            Spiele &amp; Ergebnisse{" "}
            {usingAllSeasons
              ? "– Alle Saisonen"
              : selectedSeason
              ? `– ${selectedSeason.season_name}`
              : ""}
            {selectedGameday && selectedGameday !== ALL_GAMEDAYS
              ? ` · Spieltag ${selectedGameday}`
              : ""}
          </h2>

          <div
            className="gameday__filters"
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}
          >
            <Dropdown
              className="gameday__filter"
              text="Saison"
              placeholder="Saison Auswahl"
              options={[
                { id: ALL_SEASONS, value: ALL_SEASONS, label: "Alle Saisonen (Alle Spiele)" },
                ...seasons.map((s) => ({
                  id: s.season_id,
                  value: s.season_id,
                  label: `${s.season_name}${s.primary ? " ★" : ""}`,
                })),
              ]}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedSeasonId(val)}
              value={selectedSeasonId ?? ALL_SEASONS}
            />

            <Dropdown
              className="gameday__filter"
              text="Spieltag"
              placeholder="Spieltag Auswahl"
              options={[
                { id: ALL_GAMEDAYS, value: ALL_GAMEDAYS, label: "Alle Spieltage" },
                ...uniqueGamedays.map(({ gameday, date }) => ({
                  id: String(gameday),
                  value: String(gameday),
                  label: `Spieltag ${gameday} – ${date}`,
                })),
              ]}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedGameday(val)}
              value={selectedGameday}
            />
          </div>

          <div className="full-width">
            {fixtures.length === 0 ? (
              <div>Keine Spiele vorhanden.</div>
            ) : (
              fixtures.map((match: any, idx: number) => {
                const key =
                  match?.id ??
                  `${match?.details?.date ?? ""}-${match?.home_blanket?.id ?? ""}-${match?.away_blanket?.id ?? ""}-${idx}`;
                return (
                  <FixtureDataCell
                    key={key}
                    match={match}
                    state={screenWidth < 600 ? "mobile" : "desktop"}
                  />
                );
              })
            )}
          </div>
        </section>

        <section aria-hidden className="spacer-35" />
      </div>

      <Footer />
    </div>
  );
};

export default ElementTeamDetail;
