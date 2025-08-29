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

export const ElementGamedayMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [seasons, setSeasons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [selectedGameday, setSelectedGameday] = useState<number | null>(null);

  const [uniqueGamedays, setUniqueGamedays] = useState<
    { gameday: number; date: string }[]
  >([]);

  const authService = new AuthService();
  const clientController = new ClientController();

  useEffect(() => {
    const fetchSeasons = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const seasonData = await clientController.fetchAllSeasonMatches(leagueCode);
        setSeasons(seasonData);

        if (seasonData.length > 0) {
          // Prefer primary season if present, otherwise first
          const primary = seasonData.find((s: any) => s.primary);
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

  // Update gamedays whenever season changes
  useEffect(() => {
    if (!selectedSeasonId) return;

    const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);
    if (!selectedSeason) return;

    const matches = selectedSeason.matches || [];

    const gamedayMap = new Map<number, string>();
    matches.forEach((m: any) => {
      const gameday = m.details?.gameday;
      const date = new Date(m.details?.date);
      if (!gameday || !m.details?.date || isNaN(date.getTime())) return;

      const dd = String(date.getDate());
      const mm = String(date.getMonth() + 1);
      const yyyy = String(date.getFullYear());
      const formattedDate = `${dd}.${mm}.${yyyy}`;

      if (!gamedayMap.has(gameday) || date < new Date(gamedayMap.get(gameday)!)) {
        gamedayMap.set(gameday, formattedDate);
      }
    });

    const gamedaysWithDates = Array.from(gamedayMap.entries())
      .map(([gameday, date]) => ({ gameday, date }))
      .sort((a, b) => a.gameday - b.gameday);

    setUniqueGamedays(gamedaysWithDates);

    // Pick closest gameday to today
    const today = new Date();
    let closestGameday = gamedaysWithDates[0]?.gameday ?? null;
    let smallestDifference = Infinity;

    matches.forEach((m: any) => {
      const fixtureDate = new Date(m.details?.date);
      if (!m.details?.date || isNaN(fixtureDate.getTime())) return;
      const diff = Math.abs(today.getTime() - fixtureDate.getTime());
      if (diff < smallestDifference) {
        smallestDifference = diff;
        closestGameday = m.details.gameday;
      }
    });

    setSelectedGameday(closestGameday);
  }, [selectedSeasonId, seasons]);

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);
  const filteredMatches =
    selectedSeason?.matches.filter((m: any) => m.details?.gameday === selectedGameday) ?? [];

  return (
    <div className="element-gameday-mobile">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-frame-2">
        <div className="livescore-2">
          <div className="page-frame-2">
            <PageHeader className="page-header-4" text="Spielplan" />
          </div>

          {/* Filters row (keeps original look) */}
          <div className="page-frame-2 filters-row">
            <Dropdown
              className="instance-node-7"
              dropdownWrapper="/img/dropdown-wrapper-icon-3.svg"
              dropdownWrapperClassName="dropdown-instance"
              dropdownWrapperClassNameOverride="dropdown-3"
              matLabelSelectAClassName="dropdown-2"
              text="Saison"
              placeholder="Saison"
              options={seasons.map((s) => ({ id: s.id, value: s.id, label: s.name }))}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedSeasonId(val)}
              value={selectedSeasonId}
            />

            <Dropdown
              className="instance-node-7"
              dropdownWrapper="/img/dropdown-wrapper-icon-3.svg"
              dropdownWrapperClassName="dropdown-instance"
              dropdownWrapperClassNameOverride="dropdown-3"
              matLabelSelectAClassName="dropdown-2"
              text="Spieltag"
              placeholder="Spieltag"
              options={uniqueGamedays.map(({ gameday, date }) => ({
                id: gameday,
                value: gameday,
                label: `Spieltag ${gameday} - ${date}`,
              }))}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedGameday(Number(val))}
              value={selectedGameday ?? undefined}
            />
          </div>

          <div className="page-frame-2">
            {loading ? (
              <LoadingIndicator />
            ) : (
              <div className="gamedays">
                {filteredMatches.map((fixture: any) => (
                  <div key={fixture.id} className="livescore-header">
                    <FixtureDataCell
                      match={fixture}
                      state={isMobile ? "mobile" : "desktop"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
