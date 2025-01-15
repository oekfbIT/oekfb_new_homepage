import React, { useEffect, useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { Navigation } from "../../components/Navigation";
import { Hero } from "../../components/Hero";
import { MatchupCell } from "../../components/MatchupCell";
import { NewsArticle } from "../../components/NewsArticle";
import { Sponsors } from "../../components/Sponsors";
import { Footer } from "../../components/Footer";
import { Loading } from "../Loading/Loading";
import { useWindowWidth } from "../../breakpoints";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import "./style.css";
import { ClubCell } from "../../components/ClubCell";
import { useNavigate } from "react-router-dom";
import { Partners } from "../../components/Partners/Partners";
import { ActionCell } from "../../components/ActionCell";
import { IFrame } from "../../components/iFrame";

export const ElementHomepageDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const clientController = new ClientController();
  const authService = new AuthService();
  const navigate = useNavigate();
  const [homepageData, setHomepageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getEmbedUrl = (url: string) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const response = await clientController.fetchHomepageData(leagueCode);
        setHomepageData(response);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isMobile = screenWidth < 800;

  if (loading) {
    return <Loading message="Loading homepage data..." />;
  }

  return (
      <div
          className="element-homepage-desktop"
          style={{
            minWidth: isMobile ? "390px" : "900px",
          }}
      >
        {/* Conditional Navigation */}
        {isMobile ? <Navigation /> : <DesktopNav />}

        {/* Matchup Row */}
        {homepageData?.upcoming?.length > 0 && (
            <div className="div-17">
              <div className="matchup-row-list">
                {homepageData.upcoming
                    .sort(
                        (a: any, b: any) =>
                            new Date(a.details.date).getTime() -
                            new Date(b.details.date).getTime()
                    )
                    .map((matchup: any) => (
                        <MatchupCell
                            key={matchup.id}
                            className="matchup-cell-2"
                            matchup={matchup}
                            state="fixture-w-top"
                        />
                    ))}
              </div>
            </div>
        )}

        {/* Hero Section */}
        {homepageData?.data?.sliderdata?.length > 0 && (
            <Hero
                className="hero-instance"
                title={homepageData.data.sliderdata[0].title}
                description={homepageData.data.sliderdata[0].description}
                image={homepageData.data.sliderdata[0].image}
            />
        )}

        {/* Sponsors */}
        <Sponsors className="design-component-instance-node" vWhite="/img/v-white-1-9.svg" />

        {/* Action Cells */}
        <div className="action-cell-2">
          <ActionCell
              className="custom-class"
              title="Strafsenat Urteile"
              subtitle="Liste der Strafsenat Entscheidungen werden wöchentlich gepostet."
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMeAU1ZwwAFhvAaeD-s8jtsP16Wkw9YSQRA&s"
              linkTo="/strafsenat"
          />
          <div>
            {/* Embed YouTube Shorts */}
            <IFrame
                className="custom-class"
                title="Wir streamen Spiele Live jeden Sonntag!"
                subtitle="Folgt unseren YouTube-Kanal, um immer die beste Aktion zu sehen."
                youtubeUrl={homepageData?.league?.youtube || ""}
                linkTo={homepageData?.league?.youtube || "#"}
            />
          </div>
        </div>

        {/* Team Carousel */}
        {homepageData?.teams?.length > 0 && (
            <div className="div-17">
              <div className="club-carousel-header">
                <div className="club-carousel-title">CLUBS</div>
                <div
                    className="club-carousel-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/teams")}
                >
                  ALLE MANNSCHAFTEN
                </div>
              </div>
              <div className="club-carousel-list">
                {homepageData.teams.map((team: any) => (
                    <ClubCell key={team.id} team={team} />
                ))}
              </div>
            </div>
        )}

        {/* Partners */}
        <Partners className="design-component-instance-node" vWhite="/img/v-white-1-9.svg" />

        {/* News Section */}
        <div className="news-7">
          <div className="news-container-6">
            <div className="page-content-23">
              <div className="page-content-24">NEWS UND SPIELBERICHTE</div>
            </div>
            <div className="news-container-grid-7">
              {homepageData?.news?.map((newsItem: any) => (
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

        {/* Footer */}
        <Footer />
      </div>
  );
};
