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

export const ElementNewsDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = new ClientController();
  const authService = new AuthService();

  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [id]);

  if (loading) return <div>Loading news details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!newsDetail) return <div className="error-message">News details not available.</div>;

  return (
    <div
      className="element-news-detail"
      style={{
        minWidth: screenWidth < 900 ? "390px" : "900px",
      }}
    >
      {screenWidth < 900 ? <Navigation /> : <DesktopNav />}

      <div className="content-frame-2">
        <div className="news-detail-2">
          <div className="news-detail-wrapper">
            <div className="news-detail-content">
              <div className="news-detail-content-2">
                <div className="news-detail-content-3">
                  <div className="news-detail-content-4">
                    {newsDetail.tag || "No Tag"}
                  </div>

                  <p className="news-detail-content-5">
                    {newsDetail.title || "Untitled"}
                  </p>

                  <div className="news-detail-content-6">
                    Datum: {newsDetail.created
                      ? new Intl.DateTimeFormat("de-DE", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(newsDetail.created))
                      : "No Date"}
                  </div>
                </div>

                {/* Always show the image */}
                <div className="hero-img">
                  <div
                    className="image-12"
                    style={{
                      backgroundImage: `url(${newsDetail.image || ""})`,
                    }}
                  />
                </div>

                {/* Conditionally show YouTube iframe if URL exists */}
                {newsDetail.youtube?.trim() && (
                  <div className="hero-img">
                    <IFrame
                      className="custom-class"
                      title=""
                      subtitle=""
                      youtubeUrl={newsDetail.youtube}
                      linkTo={newsDetail.youtube}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="news-detail-content-wrapper">
              <div className="news-detail-content-7">
                <div
                  className="news-detail-content-8"
                  dangerouslySetInnerHTML={{
                    __html: newsDetail.text || "No content available.",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
