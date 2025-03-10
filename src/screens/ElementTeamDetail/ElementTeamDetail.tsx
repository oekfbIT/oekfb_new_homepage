import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { StatCell } from "../../components/StatCell";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import { TeamHeader } from "../../components/TeamHeader";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import { DesktopNav } from "../../components/ViewDefaultWrapper";

export const ElementTeamDetail = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const navigate = useNavigate();
    const { id } = useParams();

    const clientController = new ClientController();
    const authService = new AuthService();

    const [teamData, setTeamData] = useState<any>(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamDetail = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const response = await clientController.fetchClubDetail(id);
                setTeamData(response);

                const uniqueNews = response?.news
                    ?.filter((item, index, self) =>
                        index === self.findIndex((n) => n.id === item.id)
                    );

                setNews(uniqueNews);
            } catch (error) {
                console.error("Error fetching team detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDetail();
    }, [id]);

    // Turn the teamData?.club?.stats object into an array so we can map over it
    const teamStats = teamData?.club?.stats
        ? Object.entries(teamData.club.stats)
        : [];

    if (loading) {
        return (
            <div className="loading-screen">
                <h2>Laden...</h2>
            </div>
        );
    }

    return (
        <div
            className="element-team-detail"
            style={{
                minWidth: screenWidth < 1200 ? "390px" : "1200px",
            }}
        >
            {isMobile ? <Navigation /> : <DesktopNav />}

            <div className="team-detail-top">
                {teamData?.club ? (
                    <TeamHeader team={teamData.club} />
                ) : (
                    <div>No team data available</div>
                )}
            </div>

            <div className="page-content">
                {/* Squad Section */}
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">{teamData?.club?.team_name} Kader</h2>
                    <div className="team-squad">
                        {teamData?.club?.players
                            ?.filter(
                                (player: any) => player.eligibility === "Spielberechtigt" || player.eligibility === "Gesperrt"
                            ) // Filter out players with other eligibility statuses
                            .sort((a: any, b: any) => {
                                // Sort by eligibility: "Spielberechtigt" first, then "Gesperrt"
                                if (a.eligibility === "Spielberechtigt" && b.eligibility !== "Spielberechtigt") return -1;
                                if (a.eligibility !== "Spielberechtigt" && b.eligibility === "Spielberechtigt") return 1;
                                return 0; // Keep original order otherwise
                            })
                            .map((player: any) => (
                                <div key={player.id} style={{ cursor: "pointer" }}>
                                    <TeamDetailSquad player={player} />
                                </div>
                            ))}
                    </div>
                </section>

                {/* Stats Section with a for-loop */}
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">
                        {teamData?.club?.team_name} Statistiken
                    </h2>
                    <div className="stats-grid" style={{ justifyItems: "center" }}>
                        {teamStats.map(([statKey, statValue]) => (
                            <StatCell statKey={statKey} statValue={statValue} className="my-stat-cell" />
                        ))}
                    </div>
                </section>

                {/* Fixtures Section */}
                <section style={{ width: "-webkit-fill-available", justifyItems: "center" }}>
                    <h2 className="secTitle">Spiele & Ergebnisse</h2>
                    <div style={{ width: "100%" }}>
                        {teamData?.upcoming?.map((match: any) => (
                            <FixtureDataCell
                                key={match.id}
                                match={match}
                                state={screenWidth < 600 ? "mobile" : "desktop"}
                            />
                        ))}
                    </div>
                </section>

                {/* News Section */}
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">News & Spielberichte</h2>
                    <div className="news-wrapper">
                        <div className="news-grid">
                            {news?.map((newsItem: any) => (
                                <NewsArticle
                                    key={newsItem.id}
                                    id={newsItem.id}
                                    title={newsItem.title}
                                    image={newsItem.image}
                                    text={newsItem.text}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};
