import { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";

import "./style.css";

/**
 * News listing page (mobile + desktop)
 * - Fetches league news
 * - Renders a responsive grid (max 3 columns)
 */
export const ElementNewsMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const authService = new AuthService();
  const clientController = new ClientController();

  // Fetch news on mount
  useEffect(() => {
    const fetchNews = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const newsData = await clientController.fetchLeagueNews(leagueCode);
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Never mutate React state directly: make a reversed copy for newest-first
  const orderedNews = [...news].reverse();

  return (
    <div
      className="news-page"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {/* Global Navigation */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Page Title */}
      <PageHeader className="news-page__header" text="News & Spielberichte" />

      {/* News Grid */}
      <section className="news-page__section">
        {loading ? (
          <p className="news-page__status">Laden…</p>
        ) : orderedNews.length === 0 ? (
          <p className="news-page__status">Keine Artikel verfügbar.</p>
        ) : (
          <div className="news-grid">
            {orderedNews.map((item: any) => (
              <NewsArticle
                key={item.id}
                title={item.title}
                image={item.image}
                text={item.text}
                id={item.id}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
