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

                const validClubData = clubData.filter((item: any) => {
                    const date = new Date(item.details?.date);
                    return item.details?.date && !isNaN(date.getTime());
                });

                setClubs(validClubData);

                const gamedays = Array.from(new Set(validClubData.map((item: any) => item.details.gameday))).sort((a, b) => a - b);
                setUniqueGamedays(gamedays);

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

                setSelectedGameday(closestGameday);
            } catch (error) {
                console.error("Error fetching club data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    const filteredClubs = clubs.filter(
        (club: any) => club.details.gameday === selectedGameday
    );

    return (
        <div className="element-gameday-mobile">
            {isMobile ? <Navigation /> : <DesktopNav />}

            <div className="page-frame-2">
                <div className="livescore-2">
                    <div className="page-frame-2">
                        <PageHeader className="page-header-4" text="Spielplan" />
                    </div>

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

                    <div className="page-frame-2">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="gamedays">
                                {filteredClubs.map((fixture: any) => (
                                    <div key={fixture.id} className="livescore-header">
                                        <FixtureDataCell
                                            match={fixture}
                                            state={isMobile ? "mobile" : "desktop"}
                                        />
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