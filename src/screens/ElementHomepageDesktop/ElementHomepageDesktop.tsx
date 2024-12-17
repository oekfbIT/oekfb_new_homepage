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

export const ElementHomepageDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const clientController = new ClientController();
  const authService = new AuthService();

  const [homepageData, setHomepageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
                {homepageData.upcoming.map((matchup: any) => (
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
                  />
              ))}
            </div>
          </div>

          {/*<ActionButton*/}
          {/*    actionButtonClassName="action-button-11"*/}
          {/*    className="action-button-10"*/}
          {/*/>*/}

        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
};
