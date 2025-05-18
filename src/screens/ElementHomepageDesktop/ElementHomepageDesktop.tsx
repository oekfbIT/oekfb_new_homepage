import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { ActionCell } from "../../components/ActionCell";
import { ClubCell } from "../../components/ClubCell";
import { Footer } from "../../components/Footer";
import GalleryCarousel from "../../components/GalleryCarousel/GalleryCarousel";
import { IFrame } from "../../components/iFrame";
import { LeagueTable } from "../../components/LeagueTable";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { MatchupCell } from "../../components/MatchupCell";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { Partners } from "../../components/Partners/Partners";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

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
    return <LoadingIndicator />;
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

      {/* Hero Section
      {homepageData?.data?.sliderdata?.length > 0 && (
        <Hero
          className="hero-instance"
          title={homepageData.data.sliderdata[0].title}
          description={homepageData.data.sliderdata[0].description}
          image={homepageData.data.sliderdata[0].image}
        />
      )} */}

      {/* gallery Section */}
      {homepageData?.data?.sliderdata?.length > 0 && (
        <div style={{ width: "100%", maxWidth: "1200px", justifyContent: "center" }}>
          <GalleryCarousel sliderdata={homepageData?.data?.sliderdata.slice().reverse()} />
        </div>
      )}
      {/* ADD THE TABLE HERE PLEASE  */}
      <LeagueTable />
      {/* Sponsors */}
      <Sponsors
        className="design-component-instance-node"
        vWhite="/img/v-white-1-9.svg"
      />
      {/* Action Cells */}
      <div className="action-cell-2">
        <ActionCell
          className="custom-class"
          title="Strafsenat Urteile"
          subtitle="Liste der Strafsenat Entscheidungen werden wöchentlich gepostet."
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMeAU1ZwwAFhvAaeD-s8jtsP16Wkw9YSQRA&s"
          linkTo="/strafsenat"
        />
        <ActionCell
          className="custom-class"
          title="Livescore - Alle Ligen Spiele Live jeden Sonntag!"
          subtitle="Alle Ligen, alle Spiele "
          imageUrl="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Flogooekfblivescore.jpg?alt=media&token=7750f426-a583-478c-8781-e041b5ee7b67"
          linkTo="/livescore"
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
      <Partners
        className="design-component-instance-node"
        vWhite="/img/v-white-1-9.svg"
      />
      {/* News Section */}
      <div className="news-7">
        <div className="news-container-6">
          <div className="page-content-23">
            <div className="page-content-24">NEWS UND SPIELBERICHTE</div>
          </div>
          <div className="news-container-grid-7">
            {homepageData?.news
              ?.slice()
              .reverse()
              .map((newsItem: any) => (
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
