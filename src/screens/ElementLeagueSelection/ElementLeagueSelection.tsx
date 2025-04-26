import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { ActionCell } from "../../components/ActionCell";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import GalleryCarousel from "../../components/GalleryCarousel/GalleryCarousel";
import { IFrame } from "../../components/iFrame";
import { LeagueSelection } from "../../components/LeagueSelection";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { Partners } from "../../components/Partners/Partners";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementLeagueSelection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const clientController = new ClientController();
  const authService = new AuthService();
  const isMobile = screenWidth < 800;

  const [allLeagues, setAllLeagues] = useState<any[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<any[]>([]);
  const [homepageData, setHomepageData] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string>("wien");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);

        const [data, noneData] = await Promise.all([
          clientController.fetchLeagueSelection(),
          clientController.fetchHomepageData("NONE"),
        ]);

        setHomepageData(noneData);

        const validLeagues = data.filter(
          (league) => league.name !== "Mannschaft aus der Liga ausgetreten"
        );

        setAllLeagues(validLeagues);
        setFilteredLeagues(
          validLeagues.filter((league) => league.state === "wien")
        );
      } catch (error) {
        console.error("Error fetching leagues:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const filtered = allLeagues.filter((league) => league.state === state);
    setFilteredLeagues(filtered);
  };

  const handleLeagueSelect = (league: any) => {
    authService.setLeagueData(league.code, league.id);
    navigate("/liga");
  };

  return (
    <div
      className="element-league-selection"
      style={{
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
            ? "900px"
            : undefined,
      }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {homepageData?.data?.sliderdata?.length > 0 && (
            <div style={{ width: "100%", maxWidth: "1200px" }}>
              <GalleryCarousel sliderdata={homepageData.data.sliderdata.reverse()} />
            </div>
          )}

          <div className="page-content">
            <div className="leagues-wrapper">
              <Dropdown
                className="instance-node-2"
                options={austrianStates}
                displayKey="name"
                valueKey="value"
                text="Bundesland auswählen"
                placeholder="Wählen Sie ein Bundesland"
                onChange={handleStateChange}
                defaultValue="wien"
              />

              <div className="league-cell-list">
                {filteredLeagues.length > 0 ? (
                  filteredLeagues.map((league) => (
                    <LeagueSelection
                      key={league.id || `league-${league.code}`}
                      className="league-selection-cell"
                      name={league.name || "Unbekannte Liga"}
                      teams={league.teamcount || 0}
                      onClick={() => handleLeagueSelect(league)}
                    />
                  ))
                ) : (
                  <p className="no-results-text">
                    Aktuell haben wir keine Liga in diesem Bundesland.
                  </p>
                )}
              </div>
            </div>

            <div className="action-cell-2">
              <ActionCell
                className="custom-class"
                title="Livescore"
                subtitle="Live Spiele aller Ligen"
                imageUrl="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Flivescorelange.png?alt=media&token=75e717f4-ba8d-4b47-b0c8-0f609b09c18b"
                linkTo="/livescore"
              />

              <IFrame
                className="custom-class"
                title="Wir streamen Spiele Live jeden Sonntag!"
                subtitle="Folgt unseren YouTube-Kanal, um immer die beste Aktion zu sehen."
                youtubeUrl={homepageData?.league?.youtube || ""}
                linkTo={homepageData?.league?.youtube || "#"}
              />
            </div>

            <Sponsors className="instance-node-2" vWhite="/img/v-white-1-1.svg" />

            <div className="news-7">
              <div className="news-container-6">
                <div className="page-content-23">
                  <div className="page-content-24">NEWS</div>
                </div>
                <div className="news-container-grid-7">
                  {homepageData?.news?.slice().reverse().map((newsItem: any) => (
                    <NewsArticle
                      key={newsItem.id}
                      title={newsItem.title}
                      image={newsItem.image}
                      text={newsItem.text}
                      id={newsItem.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ paddingBottom: "40px" }}></div>
            <Partners className="partners-section" />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};
