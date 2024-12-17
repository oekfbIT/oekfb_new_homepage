import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ClubCard } from "../../components/ClubCard";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import "./style.css";

export const ElementClubsDesktop = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();
    const clientController = new ClientController();

    // Fetch clubs on component mount
    useEffect(() => {
        const fetchClubs = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const clubData = await clientController.fetchLeagueClubs(leagueCode);
                setClubs(clubData);
            } catch (error) {
                console.error("Error fetching club data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
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
                <PageHeader className="instance-node-4" text="Mannschaften" />

                <div className="club-grid">
                    {loading ? (
                        <p>Loading clubs...</p>
                    ) : clubs.length > 0 ? (
                        clubs.map((club) => (
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
            <Footer />
        </div>
    );
};
