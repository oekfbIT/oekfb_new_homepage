import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { Dropdown } from "../../components/Dropdown";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";

export const ElementGamedayMobile = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGameday, setSelectedGameday] = useState<number | null>(null);
    const [uniqueGamedays, setUniqueGamedays] = useState<number[]>([]);

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
                const clubData = await clientController.fetchFirstSeasonMatches(leagueCode);

                // Filter out invalid dates
                const validClubData = clubData.filter((item: any) => {
                    const date = new Date(item.details?.date);
                    return item.details?.date && !isNaN(date.getTime());
                });

                setClubs(validClubData);

                // Extract unique game days
                const gamedays = Array.from(
                    new Set(validClubData.map((item: any) => item.details.gameday))
                ).sort((a, b) => a - b);
                setUniqueGamedays(gamedays);

                // Find the closest gameday to the current date
                const today = new Date();
                let closestGameday = gamedays[0];
                let smallestDifference = Infinity;

                validClubData.forEach((item: any) => {
                    const fixtureDate = new Date(item.details.date);
                    const difference = Math.abs(today.getTime() - fixtureDate.getTime());

                    if (difference < smallestDifference) {
                        smallestDifference = difference;
                        closestGameday = item.details.gameday;
                    }
                });

                // Set the closest gameday as the default
                setSelectedGameday(closestGameday);
            } catch (error) {
                console.error("Error fetching club data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    // Filter fixtures by selected gameday
    const filteredClubs = clubs.filter(
        (club: any) => club.details.gameday === selectedGameday
    );

    return (
        <div
            className="element-gameday-mobile"
            style={{ minWidth: isMobile ? "390px" : "900px" }}
        >
            {isMobile ? <Navigation /> : <DesktopNav />}

            <div className="page-frame-2">
                <div className="livescore-2">
                    <div className="page-frame-2">
                        <PageHeader
                            className="page-header-4"
                            text="Spielplan"
                        />
                    </div>

                    {/* Dropdown for selecting game day */}
                    <div className="page-frame-2">
                        <Dropdown
                            className="instance-node-7"
                            dropdownWrapper="/img/dropdown-wrapper-icon-3.svg"
                            dropdownWrapperClassName="dropdown-instance"
                            dropdownWrapperClassNameOverride="dropdown-3"
                            matLabelSelectAClassName="dropdown-2"
                            text="Spieltag"
                            placeholder="Spieltag"
                            options={uniqueGamedays.map((day) => ({
                                id: day,
                                value: day,
                                label: `Spieltag ${day}`,
                            }))}
                            displayKey="label"
                            valueKey="value"
                            onChange={(value) => setSelectedGameday(Number(value))}
                        />
                    </div>

                    {/* Render filtered fixtures */}
                    <div className="page-frame-2">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="gamedays">
                                {filteredClubs.map((fixture: any) => (
                                    <div key={fixture.id} className="livescore-header">
                                        <div className="gameday">
                                            <div className="gameday-header">
                                                <p className="gameday-header-date">
                          <span className="text-wrapper-91">
                            {new Date(fixture.details.date).toLocaleDateString(
                                "en-US",
                                { weekday: "long" }
                            )}
                          </span>
                                                    <span className="text-wrapper-92">
                            {new Date(fixture.details.date).toLocaleDateString(
                                "en-US",
                                { day: "2-digit", month: "long" }
                            )}
                          </span>
                                                </p>
                                                <p className="gameday-header-time">
                          <span className="text-wrapper-93">
                            {new Date(fixture.details.date).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>

                                                </p>
                                            </div>

                                            {/* Fixture Data */}
                                            <FixtureDataCell
                                                className="instance-node-7"
                                                state={isMobile ? "mobile" : "desktop"}
                                                img={fixture.away_blanket.logo}
                                                match={fixture}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
