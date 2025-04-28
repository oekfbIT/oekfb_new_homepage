import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { StatCell } from "../../components/StatCell";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import { TeamHeader } from "../../components/TeamHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

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

    const teamStats = teamData?.club?.stats
        ? Object.entries(teamData.club.stats)
        : [];

    if (loading) {
        return <LoadingIndicator/>;
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
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">{teamData?.club?.team_name} Kader</h2>
                    <div className="team-squad">
                        {teamData?.club?.players
                            ?.filter(
                                (player: any) => player.eligibility === "Spielberechtigt" || player.eligibility === "Gesperrt"
                            )
                            .sort((a: any, b: any) => {
                                if (a.eligibility === "Spielberechtigt" && b.eligibility !== "Spielberechtigt") return -1;
                                if (a.eligibility !== "Spielberechtigt" && b.eligibility === "Spielberechtigt") return 1;
                                return 0;
                            })
                            .map((player: any) => (
                                <div key={player.id} style={{ cursor: "pointer" }}>
                                    <TeamDetailSquad player={player} />
                                </div>
                            ))}
                    </div>
                </section>

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

                <section style={{ width: "-webkit-fill-available", justifyItems: "center" }}>
                    <h2 className="secTitle">Spiele & Ergebnisse</h2>
                    <div style={{ width: "100%" }}>
                        {teamData?.upcoming
                            ?.slice()
                            .sort((a, b) => new Date(a.details.date.$date).getTime() - new Date(b.details.date.$date).getTime())
                            .map((match: any) => (
                                <FixtureDataCell
                                    key={match.id}
                                    match={match}
                                    state={screenWidth < 600 ? "mobile" : "desktop"}
                                />
                            ))}
                    </div>
                </section>

                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">News & Spielberichte</h2>
                    <div className="news-wrapper">
                        <div className="news-grid">
                            {news?.reverse().map((newsItem: any) => (
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
