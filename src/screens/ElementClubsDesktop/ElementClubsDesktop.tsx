import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ClubCard } from "../../components/ClubCard";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementClubsDesktop = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();
    const clientController = new ClientController();

    // Fetch clubs on component mount
    useEffect(() => {
        const fetchMatches = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const clubData = await clientController.fetchLeagueClubs(leagueCode);
                const sortedClubs = clubData.sort((a, b) => Number(a.sid) - Number(b.sid));
                setMatches(sortedClubs);
            } catch (error) {
                console.error("Error fetching club data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);


    return (
        <div className="element-clubs-desktop" style={{ minWidth: isMobile ? "390px" : "900px" }}>
            {isMobile ? (
                <>
                    <Navigation />
                </>
            ) : (
                <>
                    <DesktopNav />
                </>
            )}
            <div
                className="page-content-3"
                style={{
                    alignItems: "center",
                    flexDirection: "column",
                    gap: isMobile ? "20px" : "10px",
                    justifyContent: !isMobile ? "center" : undefined,
                    maxWidth: isMobile ? "1200px" : undefined,
                    padding: isMobile ? "0px 20px" : undefined,
                }}
            >
                <PageHeader className="instance-node-4" text="Mannschaften"/>

                <div className="club-grid">
                    {loading ? (
                        <LoadingIndicator/>
                    ) : matches.length > 0 ? (
                        matches.map((club) => (
                            <ClubCard
                                key={club.id}
                                className="club-card-instance"
                                club={club}
                            />
                        ))
                    ) : (
                        <p>No clubs available for this league.</p>
                    )}
                </div>

            </div>
            <Footer/>
        </div>
    );
};
