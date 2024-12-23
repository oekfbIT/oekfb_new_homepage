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
import {DesktopNav} from "../../components/ViewDefaultWrapper";

export const ElementTeamDetail = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const navigate = useNavigate();
    const { id } = useParams();

    const clientController = new ClientController();
    const authService = new AuthService();

    const [teamData, setTeamData] = useState<any>(null);
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
                <section style={{width: "-webkit-fill-available"}}>
                    <h2 className="secTitle">
                        {teamData?.club?.team_name} SQUAD
                    </h2>
                    <div className="team-squad">
                        {teamData?.club?.players?.map((player: any) => (
                            <div
                                key={player.id}
                                style={{cursor: "pointer"}} // Add pointer cursor for visual feedback
                            >
                                <TeamDetailSquad player={player}/>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section with a for-loop */}
                <section style={{width: "-webkit-fill-available"}}>
                    <h2 className="secTitle">
                        {teamData?.club?.team_name} STATS
                    </h2>
                    <div className="stats-grid" style={{ justifyItems: "center"}}>
                        {teamStats.map(([statKey, statValue]) => (
                            <StatCell statKey={statKey} statValue={statValue} className="my-stat-cell"/>
                        ))}
                    </div>
                </section>

                {/* Fixtures Section */}
                <section style={{width: "-webkit-fill-available"}}>
                    <h2 className="secTitle">FIXTURES & RESULTS</h2>
                    <div>
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
                <section style={{width: "-webkit-fill-available"}}>
                    <h2 className="secTitle">NEWS & SPIELBERICHTE</h2>
                    <div className="news-wrapper">
                        <div className="news-grid">
                            {teamData?.news?.map((newsItem: any) => (
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

            <Footer/>
        </div>
    );
};
