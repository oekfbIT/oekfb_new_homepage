// ElementLeagueSelection.tsx
// -------------------------------------------------------------
// League landing page
// - Hero/slider (optional), state filter dropdown, league cards grid
// - Keeps your data flow & navigation logic
// - Uses clean class names + global design tokens in CSS
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { ActionCell } from "../../components/ActionCell";
import Banner from "../../components/Banner";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import GalleryCarousel from "../../components/GalleryCarousel/GalleryCarousel";
import { IFrame } from "../../components/iFrame";
import { LeagueSelection } from "../../components/LeagueSelection";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { NewsRow } from "../../components/NewsRow";
import { Partners } from "../../components/Partners/Partners";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementLeagueSelection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 800;

  const clientController = new ClientController();
  const authService = new AuthService();

  const [allLeagues, setAllLeagues] = useState<any[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<any[]>([]);
  const [homepageData, setHomepageData] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // Static list of Austrian states
  const austrianStates = [
    { name: "Wien", value: "wien" },
    { name: "Niederösterreich", value: "niederoesterreich" },
    { name: "Oberösterreich", value: "oberoesterreich" },
    { name: "Steiermark", value: "steiermark" },
    { name: "Kärnten", value: "kaernten" },
    { name: "Salzburg", value: "salzburg" },
    { name: "Tirol", value: "tirol" },
    { name: "Vorarlberg", value: "vorarlberg" },
    { name: "Burgenland", value: "burgenland" },
  ];

  // Load league selection + homepage data
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);

        const [leaguesResp, homepageResp] = await Promise.all([
          clientController.fetchLeagueSelection(),
          clientController.fetchHomepageData("HME"),
        ]);

        setHomepageData(homepageResp);

        // Normalize once: hide placeholder + enforce visibility
        const visible = (leaguesResp || [])
          .filter((l: any) => l?.name !== "Mannschaft aus der Liga ausgetreten")
          .filter((l: any) => l?.visibility === true);

        setAllLeagues(visible);
        setFilteredLeagues(visible);
      } catch (err) {
        console.error("Error fetching leagues:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // State filter
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (!state) {
      setFilteredLeagues(allLeagues);
    } else {
      setFilteredLeagues(allLeagues.filter((l) => l.state === state));
    }
  };

  // Navigate on league choose
  const handleLeagueSelect = (league: any) => {
    authService.setLeagueData(league.code, league.id);
    navigate("/liga");
  };

  // Root min-width logic preserved
  const rootMinWidth =
    screenWidth < 900 ? "390px" : screenWidth >= 900 ? "900px" : undefined;

  return (
    <div className="leaguePage" style={{ minWidth: rootMinWidth }}>
      {/* Top nav: mobile vs desktop */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {/* Optional hero slider */}
          {homepageData?.data?.sliderdata?.length > 0 && (
            <div className="leaguePage__hero">
              <GalleryCarousel
                sliderdata={homepageData.data.sliderdata.slice().reverse()}
              />
            </div>
          )}

          <main className="leaguePage__content">
            {/* Filter + Grid */}
            <section className="leaguePage__section">
              <div className="leaguePage__filter">
                <Dropdown
                  className="leaguePage__stateDropdown"
                  options={austrianStates}
                  displayKey="name"
                  valueKey="value"
                  text="Bundesland auswählen"
                  placeholder="Wählen Sie ein Bundesland"
                  onChange={handleStateChange}
                  defaultValue=""
                />
              </div>

              <div className="leagueGrid">
                {filteredLeagues.length > 0 ? (
                  filteredLeagues.map((league) => (
                    <LeagueSelection
                      key={league.id || `league-${league.code}`}
                      className="leagueGrid__item"
                      name={league.name || "Unbekannte Liga"}
                      teams={league.teamcount || 0}
                      onClick={() => handleLeagueSelect(league)}
                    />
                  ))
                ) : (
                  <p className="leaguePage__empty">
                    Aktuell haben wir keine Liga in diesem Bundesland.
                  </p>
                )}
              </div>
            </section>

            {/* Banner */}
            <section className="leaguePage__section">
              <Banner />
            </section>

            {/* Action + streaming promo (keep your 2-column -> 1-column on small) */}
            <section className="leaguePage__section">
              <div className="leaguePage__actions">
                <ActionCell
                  title="Livescore"
                  subtitle="Live Spiele aller Ligen"
                  imageUrl="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Flivescorelange.png?alt=media&token=75e717f4-ba8d-4b47-b0c8-0f609b09c18b"
                  linkTo="/livescore"
                />
                <IFrame
                  title="DIE SPIELE DER WOCHE – JEDEN SONNTAG AUF YOUTUBE!"
                  subtitle="Folgt unseren YouTube-Kanal, um immer die beste Aktion zu sehen."
                  youtubeUrl={homepageData?.league?.youtube || ""}
                  linkTo={homepageData?.league?.youtube || "#"}
                />
              </div>
            </section>

            {/* Sponsors */}
            <section className="leaguePage__section">
              <Sponsors />
            </section>

            {/* News */}
            <section className="leaguePage__section">
              <div className="news">
                <div className="news__header">
                  <h2 className="h3">NEWS UND SPIELBERICHTE</h2>
                </div>

                <div className="news__grid">
                  {homepageData?.news
                    ?.slice(-6)
                    .reverse()
                    .map((n: any) => (
                      <NewsRow
                        key={n.id}
                        title={n.title}
                        image={n.image}
                        text={n.created}
                        id={n.id}
                        youtubeUrl={n.youtube}
                      />
                    ))}
                </div>

                <div className="news__cta">
                  <Link to="/news">
                    <button className="btn btn--ghost">Zu allen News Artikeln</button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Partners */}
            <section className="leaguePage__section leaguePage__section--padBottom">
              <Partners />
            </section>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};
