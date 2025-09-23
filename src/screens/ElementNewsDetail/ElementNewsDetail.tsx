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

// utils/youtube.ts
export function toYouTubeEmbed(url: string): { embedUrl: string; isShort: boolean } {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let id = "";
    let isShort = false;

    if (host === "youtu.be") {
      id = u.pathname.slice(1);
    } else if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") id = u.searchParams.get("v") ?? "";
      else if (u.pathname.startsWith("/shorts/")) {
        id = u.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
        isShort = true;
      } else if (u.pathname.startsWith("/embed/")) {
        id = u.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
      }
    }

    // Fallback: try to grab an 11-char ID from the path
    if (!id) {
      const m = u.pathname.match(/([a-zA-Z0-9_-]{11})/);
      if (m) id = m[1];
    }

    if (!id) return { embedUrl: "", isShort: false };

    // Support t= / start= like t=1m30s or t=90
    const t = u.searchParams.get("t") || u.searchParams.get("start") || "";
    const start = t ? `?start=${toSeconds(t)}` : "";

    return { embedUrl: `https://www.youtube.com/embed/${id}${start}`, isShort };
  } catch {
    return { embedUrl: "", isShort: false };
  }
}

function toSeconds(t: string): number {
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!m) return 0;
  const [_, h, mnt, s] = m;
  return (parseInt(h || "0") * 3600) + (parseInt(mnt || "0") * 60) + parseInt(s || "0");
}


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
            {newsDetail.youtube?.trim() && (() => {
            const { embedUrl, isShort } = toYouTubeEmbed(newsDetail.youtube);
            if (!embedUrl) return null;

            return (
                <div className="news-detail-page__media news-detail-page__media--video">
                <IFrame
                    className="news-detail-page__video"
                    title={newsDetail.title || "Video"}
                    subtitle=""
                    youtubeUrl={embedUrl}   // <-- pass the normalized EMBED url
                    linkTo={newsDetail.youtube}
                    // if your IFrame supports style/props, keep Shorts vertical:
                    style={{ aspectRatio: isShort ? "9 / 16" : "16 / 9" }}
                />
                </div>
            );
            })()}

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
