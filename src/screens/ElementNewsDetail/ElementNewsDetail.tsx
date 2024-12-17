import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import "./style.css";

export const ElementNewsDetail = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const navigate = useNavigate();
    const { id } = useParams(); // Get 'id' from URL parameters

    const clientController = new ClientController();
    const authService = new AuthService();

    const [newsDetail, setNewsDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const response = await clientController.fetchNewsDetail(id);
                setNewsDetail(response);
            } catch (error) {
                console.error("Error fetching news details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return <div>Loading news details...</div>;
    }

    return (
        <div
            className="element-news-detail"
            style={{
                minWidth: screenWidth < 900 ? "390px" : "900px",
            }}
        >
            {/* Conditional Navigation */}
            {screenWidth < 900 ? <Navigation/> : <DesktopNav/>}

            <div className="content-frame-2">
                <div className="news-detail-2">
                    <div className="news-detail-wrapper">
                        <div className="news-detail-content">
                            <div className="news-detail-content-2">
                                <div className="news-detail-content-3">
                                    <div className="news-detail-content-4">{newsDetail.tag}</div>

                                    <p className="news-detail-content-5">
                                        {newsDetail.title}
                                    </p>

                                    <div className="news-detail-content-6">
                                        {newsDetail?.date}
                                    </div>
                                </div>

                                <div className="hero-img">
                                    <div className="image-12"/>
                                </div>
                            </div>
                        </div>

                        <div className="news-detail-content-wrapper">
                            <div className="news-detail-content-7">
                                <p className="news-detail-content-8">
                                    {newsDetail?.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};
