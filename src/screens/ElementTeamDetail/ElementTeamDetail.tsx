// ElementTeamDetail.tsx
// -----------------------------------------------------------------------------
// Team detail view with SEASON + SPIELTAG filters (similar to ElementGamedayMobile).
// - Backend returns seasons (with `primary` flag) and each season contains `matches`.
// - Default season: the one with `primary: true` (fallback to first).
// - Default gameday: closest to "today" based on match date.
// - Filters appear directly ABOVE the matches section.
// - Each dropdown has a top "Alle" option to show all.
// - Defensive handling for optional fields to avoid runtime crashes.
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

const ALL_SEASONS = "__ALL__";
const ALL_GAMEDAYS = -1;

export const ElementTeamDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const navigate = useNavigate(); // kept for potential future use
  const { id } = useParams();

  // Prevent re-instantiation on re-renders
  const clientController = useMemo(() => new ClientController(), []);
  const authService = useMemo(() => new AuthService(), []);

  const [teamData, setTeamData] = useState<any>(null);

  // Seasons & selection
  const [seasons, setSeasons] = useState<SeasonWithMatches[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);

  // Gameday selection for the selected season(s)
  const [uniqueGamedays, setUniqueGamedays] = useState<{ gameday: number; date: string }[]>([]);
  const [selectedGameday, setSelectedGameday] = useState<number | null>(null);

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

        // Extract seasons array from backend (new shape shows under `upcoming`)
        const upcomingSeasons: SeasonWithMatches[] = Array.isArray(response?.upcoming)
          ? response.upcoming
          : [];

        setSeasons(upcomingSeasons);

        // Default season: primary, else first with matches, else first
        const primarySeason =
          upcomingSeasons.find((s) => s.primary) ??
          upcomingSeasons.find((s) => Array.isArray(s.matches) && s.matches.length > 0) ??
          upcomingSeasons[0] ??
          null;

        setSelectedSeasonId(primarySeason ? primarySeason.season_id : null);
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
      setSelectedGameday(null);
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
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return;

      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = String(date.getFullYear());
      const formatted = `${dd}.${mm}.${yyyy}`;

      // store the earliest date for a gameday
      const existing = map.get(gd);
      if (!existing) {
        map.set(gd, formatted);
      } else {
        const [eDD, eMM, eYYYY] = existing.split(".");
        const existingDate = new Date(`${eYYYY}-${eMM}-${eDD}T00:00:00Z`);
        if (date < existingDate) map.set(gd, formatted);
      }
    });

    const list = Array.from(map.entries())
      .map(([gameday, date]) => ({ gameday, date }))
      .sort((a, b) => a.gameday - b.gameday);

    // prepend "Alle Spieltage"
    const withAll = [{ gameday: ALL_GAMEDAYS, date: "Alle Spieltage" }, ...list];

    setUniqueGamedays(withAll);

    // Default gameday: closest fixture date to "today"
    const today = new Date();
    let closest: number | null = list[0]?.gameday ?? null;
    let minDiff = Infinity;

    matches.forEach((m: any) => {
      const whenStr = m?.details?.date;
      const gd = m?.details?.gameday;
      if (!whenStr || !gd) return;
      const when = new Date(whenStr);
      if (isNaN(when.getTime())) return;

      const diff = Math.abs(today.getTime() - when.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = gd;
      }
    });

    // If nothing found, fall back to ALL
    setSelectedGameday(closest ?? ALL_GAMEDAYS);
  }, [selectedSeasonId, seasons]);

  // Flatten club stats into entries for map()
  const teamStats = teamData?.club?.stats ? Object.entries(teamData.club.stats) : [];

  // Resolve selected season(s) and fixtures for selected gameday
  const usingAllSeasons = selectedSeasonId === ALL_SEASONS || !selectedSeasonId;
  const selectedSeason: SeasonWithMatches | null =
    seasons.find((s) => s.season_id === selectedSeasonId) ?? null;

  const baseMatches =
    usingAllSeasons
      ? seasons.flatMap((s) => s.matches || [])
      : (selectedSeason?.matches ?? []);

  const fixtures = baseMatches
    .filter((m: any) => {
      if (selectedGameday == null || selectedGameday === ALL_GAMEDAYS) return true;
      return m?.details?.gameday === selectedGameday;
    })
    .slice()
    .sort((a: any, b: any) => {
      // Sort by date asc, fallback to gameday asc
      const da = a?.details?.date ? new Date(a.details.date).getTime() : Infinity;
      const db = b?.details?.date ? new Date(b.details.date).getTime() : Infinity;
      if (da !== db) return da - db;
      const ga = Number(a?.details?.gameday ?? 0);
      const gb = Number(b?.details?.gameday ?? 0);
      return ga - gb;
    });

  if (loading) return <LoadingIndicator />;

  return (
    <div
      className="element-team-detail"
      // keep this dynamic minWidth inline—depends on runtime width
      style={{ minWidth: screenWidth < 1200 ? "390px" : "1200px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Header section – visuals delegated to TeamHeader */}
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
          <h2 className="sub_header md_base">{teamData?.club?.team_name} Ewige Statistiken</h2>
          <div className="h3 stats-grid" style={{ justifyItems: "center" }}>
            {teamStats.map(([statKey, statValue]) => (
              <StatCell
                key={String(statKey)}
                statKey={statKey}
                statValue={statValue}
                className="my-stat-cell"
              />
            ))}
          </div>
        </section>

        {/* Squad – Spielberechtigt first, then Gesperrt */}
        <section className="section">
          <h2 className="sub_header md_base">{teamData?.club?.team_name} Kader</h2>
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
              .map((player: any) => (
                <div key={player.id} style={{ cursor: "pointer" }}>
                  {/* If TeamDetailSquad expects numeric id, coerce if possible */}
                  <TeamDetailSquad player={{ ...player, id: Number(player.id) || player.id }} />
                </div>
              ))}
          </div>
        </section>

        {/* Fixtures section with filters placed directly ABOVE the list */}
        <section className="section">
          <h2 className="sub_header md_base">
            Spiele &amp; Ergebnisse{" "}
            {usingAllSeasons
              ? "– Alle Saisonen"
              : selectedSeason
              ? `– ${selectedSeason.season_name}`
              : ""}
            {selectedGameday != null && selectedGameday !== ALL_GAMEDAYS
              ? ` · Spieltag ${selectedGameday}`
              : ""}
          </h2>

          {/* Filters */}
          <div className="gameday__filters" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
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
              options={uniqueGamedays.map(({ gameday, date }) => ({
                id: gameday,
                value: gameday,
                label: gameday === ALL_GAMEDAYS ? "Alle Spieltage" : `Spieltag ${gameday} – ${date}`,
              }))}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedGameday(Number(val))}
              value={selectedGameday ?? ALL_GAMEDAYS}
            />
          </div>

          {/* Fixtures list */}
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
