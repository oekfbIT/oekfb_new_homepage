import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { ActionCell } from "../../components/ActionCell";
import Banner from "../../components/Banner";
import { ClubCell } from "../../components/ClubCell";
import { Footer } from "../../components/Footer";
import GalleryCarousel from "../../components/GalleryCarousel/GalleryCarousel";
import { IFrame } from "../../components/iFrame";
import { LeagueTable } from "../../components/LeagueTable";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { MatchupCell } from "../../components/MatchupCell";
import { Navigation } from "../../components/Navigation";
import { NewsRow } from "../../components/NewsRow";
import { Partners } from "../../components/Partners/Partners";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

/**
 * Types kept intentionally light-weight to avoid coupling to backend shape.
 */
type HomepageData = {
  upcoming?: Array<any>;
  news?: Array<any>;
  teams?: Array<any>;
  data?: { sliderdata?: Array<any> };
  league?: { youtube?: string };
};

export const Homepage = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const clientController = new ClientController();
  const authService = new AuthService();
  const navigate = useNavigate();

  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch homepage payload for current league.
   * Handles: missing league code, network errors, and loading state.
   */
  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const isMobile = screenWidth < 800;

  // Derived data kept memoized to avoid recomputation on every render.
  const slides = useMemo(() => {
    const slider = homepageData?.data?.sliderdata;
    const news = homepageData?.news;
    // Prefer explicit slider data; fall back to news if absent.
    return (slider?.length ? slider : news) ?? [];
  }, [homepageData]);

  const sortedUpcoming = useMemo(() => {
    const list = homepageData?.upcoming ?? [];
    return [...list].sort(
      (a, b) =>
        new Date(a.details?.date ?? 0).getTime() -
        new Date(b.details?.date ?? 0).getTime(),
    );
  }, [homepageData]);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="home">
      {/* Navigation switches based on viewport */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Upcoming Fixtures */}
      {sortedUpcoming.length > 0 && (
        <section className="home__section home__matchups">
          <div className="home__matchups-list">
            {sortedUpcoming.map((matchup: any) => (
              <MatchupCell
                key={matchup.id}
                className="home__matchup"
                matchup={matchup}
                state="fixture-w-top"
              />
            ))}
          </div>
        </section>
      )}

      {/* Hero/Carousel */}
      {slides.length > 0 && (
        <section className="home__section home__carousel">
          {/* clone to avoid child mutation */}
          <GalleryCarousel sliderdata={[...slides]} />
        </section>
      )}

      {/* App promo banner */}
      <section className="home__section">
        <div
          className="appPromoBanner"
          onClick={() => navigate("/app")}
          role="button"
          aria-label="Zur App"
        />
      </section>

      {/* League Table */}
      <section className="home__section home__table">
        <LeagueTable />
      </section>

      {/* Clubs carousel */}
      {homepageData?.teams?.length ? (
        <section className="home__section home__clubs">
          <div className="home__clubs-header">
            <div className="h2">CLUBS</div>
            {/* <button
              className="home__clubs-link"
              onClick={() => navigate("/teams")}
              type="button"
            >
              ALLE MANNSCHAFTEN
            </button> */}
          </div>

          <div className="home__clubs-list">
            {homepageData.teams!.map((team: any) => (
              <ClubCell key={team.id} team={team} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Banner slot */}
      <section className="home__section home__banner">
        <Banner />
      </section>

      {/* Sponsors / Partners */}
      <Sponsors
        className="home__fullwidth-slot"
        vWhite="/img/v-white-1-9.svg"
      />

      {/* Action shortcuts */}
      <section className="home__section home__actions">
        <ActionCell
          title="Strafsenat Urteile"
          subtitle="Liste der Strafsenat Entscheidungen werden wöchentlich gepostet."
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMeAU1ZwwAFhvAaeD-s8jtsP16Wkw9YSQRA&s"
          linkTo="/strafsenat"
        />
        <ActionCell
          title="Livescore - Alle Ligen Spiele Live jeden Sonntag!"
          subtitle="Alle Ligen, alle Spiele"
          imageUrl="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Flogooekfblivescore.jpg?alt=media&token=7750f426-a583-478c-8781-e041b5ee7b67"
          linkTo="/livescore"
        />
        <IFrame
          className="home__iframe"
          title="Topspiele - Jede Woche auf Yotube!"
          subtitle="Folgt unseren YouTube-Kanal, um immer die beste Aktion zu sehen."
          youtubeUrl={homepageData?.league?.youtube || ""}
          linkTo={homepageData?.league?.youtube || "#"}
        />
      </section>

      <Partners
        className="home__fullwidth-slot"
        vWhite="/img/v-white-1-9.svg"
      />

      {/* News */}
      <section className="home__section home__news">
        <div className="home__news-container">
          <header className="home__news-header">
            <h2 className="h2">NEWS UND SPIELBERICHTE</h2>
          </header>

          <div className="home__news-grid">
            {homepageData?.news
              ?.slice(-6)
              .reverse()
              .map((newsItem: any) => (
                <NewsRow
                  key={newsItem.id}
                  title={newsItem.title}
                  image={newsItem.image}
                  text={newsItem.created}
                  id={newsItem.id}
                  youtubeUrl={newsItem.youtube}
                />
              ))}
          </div>

          <Link className="home__news-link" to="/news">
            <button className="home__button" type="button">
              ALLE NEWS
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
