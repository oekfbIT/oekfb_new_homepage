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

// Utility function to split and capitalize player names
const splitAndCapitalizeName = (name) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const [firstName, ...lastNameParts] = name.split(" ");
    return {
        firstName: capitalize(firstName),
        lastName: lastNameParts.map(capitalize).join(" "),
    };
};

const formatNationality = (nationality: string): string => {
    return nationality
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/ /g, "")
        .replace(/[^a-z]/g, "");
};

export const ElementPlayerDetail = () => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900; // Determines whether the view is for mobile or desktop
    const navigate = useNavigate();
    const { id } = useParams();

    const clientController = new ClientController();
    const authService = new AuthService();

    const [upcoming, setUpcoming] = useState(null); // Holds upcoming match data
    const [playerData, setPlayerData] = useState(null); // Holds player details
    const [first, setFirst] = useState(""); // First name of the player
    const [second, setSecond] = useState(""); // Last name of the player
    const [nationality, setNationality] = useState(""); // Last name of the player
    const [loading, setLoading] = useState(true); // Tracks loading state

    // Fetches player details and updates state
    useEffect(() => {
        const fetchPlayerDetail = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const response = await clientController.fetchPlayerDetail(id);
                setPlayerData(response.player);
                setUpcoming(response.upcoming);

                console.log("STATSSSSS", response.player);
                if (response.player) {
                    const { firstName, lastName } = splitAndCapitalizeName(response.player.name);
                    setFirst(firstName);
                    setSecond(lastName);
                    setNationality(formatNationality(response.player.nationality));
                }
            } catch (error) {
                console.error("Error fetching player detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerDetail();
    }, [id]);

    const playerStats = playerData?.stats ? Object.entries(playerData?.stats) : [];

    return (
        <div
            className="element-player-detail"
            style={{
                minWidth: screenWidth < 1200 ? "390px" : "1200px", // Adjust layout width based on screen size
            }}
        >
            {/* Navigation bar, toggles between mobile and desktop */}
            {isMobile ? <Navigation /> : <DesktopNav />}

            {/* Header section containing player details */}
            <div className="player-detail-header">
                <div
                    className="player-detail-header-2"
                    style={{
                        alignItems:
                            screenWidth < 768
                                ? "flex-end"
                                : screenWidth >= 768 && screenWidth < 900
                                    ? "center"
                                    : undefined,
                        padding:
                            screenWidth < 768
                                ? "0px 10px"
                                : screenWidth >= 768 && screenWidth < 900
                                    ? "0px 32px"
                                    : undefined,
                    }}
                >
                    <div className="player-detail-header-3">
                        <div className="large-text-container">
                            {/* Player number */}
                            <div className="large-text-container-2">{playerData?.number || "0"}</div>

                            {/* Player name */}
                            <div
                                className="large-text-container-3"
                                style={{
                                    marginRight: screenWidth < 768 ? "-24.61px" : undefined,
                                }}
                            >
                                <div className="large-text-container-wrapper">
                                    <div className="large-text-container-4">{first}</div>
                                </div>

                                <div className="large-text-container-wrapper">
                                    <div className="large-text-container-5">{second}</div>
                                </div>
                            </div>
                        </div>

                        {/* Club information */}
                        <div
                            className="small-text-container"
                            style={{
                                alignSelf: screenWidth < 768 ? "stretch" : undefined,
                                marginRight:
                                    screenWidth >= 768 && screenWidth < 900
                                        ? "-168.00px"
                                        : screenWidth >= 900
                                            ? "-100.00px"
                                            : undefined,
                                width:
                                    screenWidth < 768
                                        ? "100%"
                                        : screenWidth >= 768 && screenWidth < 900
                                            ? "600px"
                                            : undefined,
                            }}
                        >
                            <div className="small-text-container-2">
                                {/* Each cell represents club details */}
                                <div className="small-text-cell">
                                    <div
                                        className="small-text-cell-key"
                                        style={{cursor: "pointer"}}
                                        onClick={() => {
                                            if (playerData?.team?.id) {
                                                navigate(`/team-detail/${playerData.team.id}`);
                                            } else {
                                                console.error("Team ID is undefined");
                                            }
                                        }}
                                    >
                                        Mannschaft
                                    </div>
                                    <div
                                        className="small-text-cell-2"
                                        style={{cursor: "pointer"}}
                                        onClick={() => {
                                            if (playerData?.team?.id) {
                                                navigate(`/team-detail/${playerData.team.id}`);
                                            } else {
                                                console.error("Team ID is undefined");
                                            }
                                        }}
                                    >
                                        {playerData?.team?.team_name || "Unknown"}
                                    </div>
                                </div>

                                <div className="small-text-cell">
                                    <div className="small-text-cell-key">SID</div>
                                    <div className="small-text-cell-2">{playerData?.sid || "Unknown"}</div>
                                </div>

                                <div className="small-text-cell">
                                    <div className="small-text-cell-key">Position</div>
                                    <div className="small-text-cell-2">{playerData?.position || "Unknown"}</div>
                                </div>

                                <div className="small-text-cell">
                                    <div className="small-text-cell-key">Status</div>
                                    <div className="small-text-cell-2">{playerData?.eligibility || "Unknown"}</div>
                                </div>

                                <div className="small-text-cell">
                                    <div className="small-text-cell-key">Jahrgang</div>
                                    <div className="small-text-cell-2">{playerData?.birthday || "Unknown"}</div>
                                </div>

                                <div className="small-text-cell">
                                    <div className="small-text-cell-key">Nationalität</div>
                                    <div className="small-text-cell-2">{playerData?.nationality || "Unknown"}</div>
                                    <img
                                        src={`https://www.zeitzonen.de/templates/2014/dist/images/flags/${nationality}.svg`}
                                        className="flagicon"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Player image and club logo */}
                    <div
                        className="player-detail-header-4"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            alignSelf:
                                (screenWidth >= 768 && screenWidth < 900) || screenWidth >= 900
                                    ? "stretch"
                                    : undefined,
                            justifyContent:
                                screenWidth < 768
                                    ? "flex-end"
                                    : screenWidth >= 768 && screenWidth < 900
                                        ? "center"
                                        : undefined,
                            minHeight: screenWidth < 768 ? "410px" : undefined,
                        }}
                    >
                        {screenWidth < 768 ? (
                            <>
                                <img className="player-detail-6" alt="Player" src={playerData?.image} />
                                <img className="player-detail-4" alt="Club logo" src={playerData?.team?.logo} />
                            </>
                        ) : (
                            <>
                                <img className="player-detail-4" alt="Club logo" src={playerData?.team?.logo} />
                                <img className="player-detail-6" alt="Player" src={playerData?.image} />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Page content section */}
            <div className="page-content" style={{ padding: "20px 0px" }}>
                {/* Stats Section */}
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">{playerData?.name || "Player"} Statistiken</h2>
                    <div className="stats-grid" style={{ justifyItems: "center" }}>
                        {playerStats.map(([statKey, statValue]) => (
                            <StatCell key={statKey} statKey={statKey} statValue={statValue} />
                        ))}
                    </div>
                </section>

                {/* Fixtures Section */}
                <section style={{ width: "-webkit-fill-available" }}>
                    <h2 className="secTitle">Spiele & Ergebnisse</h2>
                    <div style={{ width: "100%" }}>
                        {upcoming?.map((match) => (
                            <FixtureDataCell
                                key={match.id}
                                match={match}
                                state={screenWidth < 600 ? "mobile" : "desktop"}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};
