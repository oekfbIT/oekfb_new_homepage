import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";

import "./style.css";

export const Strafsenat = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();
    const clientController = new ClientController();

    // Fetch news on component mount
    useEffect(() => {
        const fetchNews = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const newsData = await clientController.fetchStrafsenatNews();
                setNews(newsData);
            } catch (error) {
                console.error("Error fetching club data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);
  return (
    <div
      className="element-news-mobile" style={{ minWidth: isMobile ? "390px" : "900px", gap: "30px" }}>

        {/*NAVIGATION */}
        {isMobile ? (
            <>
                <Navigation />
            </>
        ) : (
            <>
                <DesktopNav />
            </>
        )}

        <PageHeader className="instance-node-4"
                    text="Strafsenat Urteile"/>


        {/* News Section */}
        <div className="news-7">
            <div className="news-container-6">
                <div className="news-container-grid-7">
                    {news?.map((newsItem: any) => (
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
        <Footer/>

    </div>
  );
};
