import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { IFrame } from "../../components/iFrame";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

interface NewsDetail {
  tag: string;
  title: string;
  date: string;
  image: string;
  text: string;
  youtube: string;
  created: string;
}

/**
 * News Detail Page
 * - Fetches a single news item by :id
 * - Renders hero image and optional YouTube embed
 * - Shows formatted rich-text content from CMS
 */
export const ElementNewsDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = new ClientController();
  const authService = new AuthService();

  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news detail on mount / id change
  useEffect(() => {
    const fetchNewsDetail = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setError("Unable to load news details. League code is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await clientController.fetchNewsDetail(id);
        setNewsDetail(response);
      } catch (err) {
        console.error("Error fetching news details:", err);
        setError("Failed to load news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="news-detail-page__status">Loading news details...</div>;
  if (error) return <div className="news-detail-page__error">{error}</div>;
  if (!newsDetail) return <div className="news-detail-page__error">News details not available.</div>;

  // Date formatting helper (DE locale)
  const createdText = newsDetail.created
    ? new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(newsDetail.created))
    : "No Date";

  return (
    <div
      className="news-detail-page"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {/* Navigation */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      <main className="news-detail-page__outer">
        {/* Constrains content width */}
        <article className="news-detail-page__container">
          {/* Header block: tag, title, date */}
          <header className="news-detail-page__header">
            <div className="news-detail-page__heading">
              <div className="news-detail-page__tag">{newsDetail.tag || "Ohne Kategorie"}</div>
              <h1 className="news-detail-page__title">{newsDetail.title || "Untitled"}</h1>
              <div className="news-detail-page__meta">
                Datum: <time>{createdText}</time>
              </div>
            </div>

            {/* Media: hero image */}
            <div className="news-detail-page__media">
              <div
                className="news-detail-page__hero"
                style={{ backgroundImage: `url(${newsDetail.image || ""})` }}
                aria-label="Artikelbild"
                role="img"
              />
            </div>

            {/* Optional: YouTube video */}
            {newsDetail.youtube?.trim() && (
              <div className="news-detail-page__media news-detail-page__media--video">
                <IFrame
                  className="news-detail-page__video"
                  title=""
                  subtitle=""
                  youtubeUrl={newsDetail.youtube}
                  linkTo={newsDetail.youtube}
                />
              </div>
            )}
          </header>

          {/* Body: rich text from CMS */}
          <section className="news-detail-page__body">
            <div
              className="news-detail-page__content"
              // CMS-provided HTML
              dangerouslySetInnerHTML={{
                __html: newsDetail.text || "No content available.",
              }}
            />
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};
