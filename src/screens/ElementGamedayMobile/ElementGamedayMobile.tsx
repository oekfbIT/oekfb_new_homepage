// ElementGamedayMobile.tsx
// -------------------------------------------------------------
// Matchday view with season + gameday filters and a fixtures list.
// - Reuses Navigation / DesktopNav header
// - Clean class names + token-driven CSS (see style.css)
// - Picks closest gameday to "today" for the default selection
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type Season = {
  id: string;
  name: string;
  primary?: boolean;
  matches?: any[];
};

export const ElementGamedayMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [selectedGameday, setSelectedGameday] = useState<number | null>(null);

  const [uniqueGamedays, setUniqueGamedays] = useState<
    { gameday: number; date: string }[]
  >([]);

  const authService = new AuthService();
  const clientController = new ClientController();

  // Load seasons for current league
  useEffect(() => {
    const fetchSeasons = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const seasonData: Season[] = await clientController.fetchAllSeasonMatches(
          leagueCode
        );
        setSeasons(seasonData);

        if (seasonData.length > 0) {
          const primary = seasonData.find((s) => s.primary);
          setSelectedSeasonId((primary ?? seasonData[0]).id);
        }
      } catch (error) {
        console.error("Error fetching season data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build gameday choices whenever season changes
  useEffect(() => {
    if (!selectedSeasonId) return;

    const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);
    if (!selectedSeason) return;

    const matches = selectedSeason.matches || [];
    const map = new Map<number, string>();

    matches.forEach((m: any) => {
      const gd = m.details?.gameday;
      const date = new Date(m.details?.date);
      if (!gd || !m.details?.date || isNaN(date.getTime())) return;

      const dd = String(date.getDate());
      const mm = String(date.getMonth() + 1);
      const yyyy = String(date.getFullYear());
      const formatted = `${dd}.${mm}.${yyyy}`;

      // store the earliest date for a gameday
      const existing = map.get(gd);
      if (!existing || date < new Date(existing)) map.set(gd, formatted);
    });

    const list = Array.from(map.entries())
      .map(([gameday, date]) => ({ gameday, date }))
      .sort((a, b) => a.gameday - b.gameday);

    setUniqueGamedays(list);

    // default: closest fixture date to "today"
    const today = new Date();
    let closest: number | null = list[0]?.gameday ?? null;
    let minDiff = Infinity;

    matches.forEach((m: any) => {
      const when = new Date(m.details?.date);
      if (!m.details?.date || isNaN(when.getTime())) return;
      const diff = Math.abs(today.getTime() - when.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = m.details.gameday;
      }
    });

    setSelectedGameday(closest);
  }, [selectedSeasonId, seasons]);

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);
  const fixtures =
    selectedSeason?.matches?.filter(
      (m: any) => m.details?.gameday === selectedGameday
    ) ?? [];

  return (
    <div className="gameday">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <main className="gameday__main" role="main">
        <PageHeader className="gameday__header" text="Spielplan" />

        {/* Filters */}
        <div className="gameday__filters">
          <Dropdown
            className="gameday__filter"
            text="Saison"
            placeholder="Saison Auswahl"
            options={seasons.map((s) => ({ id: s.id, value: s.id, label: s.name }))}
            displayKey="label"
            valueKey="value"
            onChange={(val) => setSelectedSeasonId(val)}
            value={selectedSeasonId ?? undefined}
          />

          <Dropdown
            className="gameday__filter"
            text="Spieltag"
            placeholder="Spieltag Auswahl"
            options={uniqueGamedays.map(({ gameday, date }) => ({
              id: gameday,
              value: gameday,
              label: `Spieltag ${gameday} – ${date}`,
            }))}
            displayKey="label"
            valueKey="value"
            onChange={(val) => setSelectedGameday(Number(val))}
            value={selectedGameday ?? undefined}
          />
        </div>

        {/* Fixtures list */}
        {loading ? (
          <div className="gameday__loading">
            <LoadingIndicator />
          </div>
        ) : (
          <section className="gameday__list" aria-live="polite">
            {fixtures.map((fixture: any) => (
              <div key={fixture.id} className="gameday__item">
                <FixtureDataCell
                  match={fixture}
                  state={isMobile ? "mobile" : "desktop"}
                />
              </div>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
