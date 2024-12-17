import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import { LeagueSelection } from "../../components/LeagueSelection";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import { useNavigate } from "react-router-dom";

export const ElementLeagueSelection = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const clientController = new ClientController();
    const authService = new AuthService(); // Initialize AuthService

    // States for leagues and selected state
    const [allLeagues, setAllLeagues] = useState<any[]>([]);
    const [filteredLeagues, setFilteredLeagues] = useState<any[]>([]);
    const [selectedState, setSelectedState] = useState<string>("wien"); // Default selected state
    const navigate = useNavigate(); // Initialize the navigate function

    // Austrian states for the dropdown
    const austrianStates = [
        { name: "Wien", value: "wien" },
        { name: "Niederösterreich", value: "niederoesterreich" },
        { name: "Oberösterreich", value: "oberoesterreich" },
        { name: "Steiermark", value: "steiermark" },
        { name: "Kärnten", value: "kaernten" },
        { name: "Salzburg", value: "salzburg" },
        { name: "Tirol", value: "tirol" },
        { name: "Vorarlberg", value: "vorarlberg" },
        { name: "Burgenland", value: "burgenland" },
    ];

    // Fetch all leagues on mount
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const data = await clientController.fetchLeagueSelection();

                // Filter out unwanted leagues
                const validLeagues = data.filter(
                    (league) => league.name !== "Mannschaft aus der Liga ausgetreten"
                );

                setAllLeagues(validLeagues);

                // Set filtered leagues for "wien"
                setFilteredLeagues(validLeagues.filter((league) => league.state === "wien"));
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchLeagues();
    }, []);

    // Handle dropdown selection change
    const handleStateChange = (state: string) => {
        setSelectedState(state);
        const filtered = allLeagues.filter((league) => league.state === state);
        setFilteredLeagues(filtered);
    };

    // Handle LeagueSelection click and set cookie
    const handleLeagueSelect = (league: any) => {
        authService.setLeagueData(league.code, league.id);
        console.log(`League selected: Code = ${league.code}, ID = ${league.id}`);

        // Navigate to the homepage
        navigate("/homepage");

    };

    return (
        <div
            className="element-league-selection"
            style={{
                minWidth: screenWidth < 900 ? "390px" : screenWidth >= 900 ? "900px" : undefined,
            }}
        >
            {screenWidth < 900 && (
                <>
                    <Navigation />
                    <div className="page-header-wrapper">
                        <div className="page-header-2">
                            <div className="page-header-wrapper-2">
                                <div className="page-header-wrapper-3">Ligen Auswahl</div>
                                <p className="page-header-wrapper-4">
                                    Wählen Sie ein Bundesland aus, um die Ligen anzuzeigen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="page-content">
                        <div className="leagues-wrapper">
                            <Dropdown
                                className="instance-node-2"
                                options={austrianStates}
                                displayKey="name"
                                valueKey="value"
                                text="Bundesland auswählen"
                                placeholder="Wählen Sie ein Bundesland"
                                onChange={handleStateChange}
                                defaultValue="wien"
                            />
                            <div className="league-cell-list">
                                {filteredLeagues.length > 0 ? (
                                    filteredLeagues.map((league) => (
                                        <LeagueSelection
                                            key={league.id}
                                            className="league-selection-cell"
                                            name={league.name}
                                            teams={league.teamcount}
                                            onClick={() => handleLeagueSelect(league)} // Set cookie on click
                                        />
                                    ))
                                ) : (
                                    <p className="no-results-text">
                                        Aktuell haben wir keine Liga in diesem Bundesland.
                                    </p>
                                )}
                            </div>
                        </div>

                        <Sponsors className="instance-node-2" vWhite="/img/v-white-1-1.svg" />
                    </div>

                    <Footer
                        className="footer-instance"
                        footerContent="/img/footer-content-wrapper-left-logo-8.png"
                        href="https://www.facebook.com/kleinfeldliga/"
                        href1="https://www.youtube.com/@OEKFB"
                        href2="https://www.instagram.com/oekfb/?hl=en"
                        img="/img/link-33.svg"
                        link="/img/link-32.svg"
                        link1="/img/link-34.svg"
                        link2="/img/link-35.svg"
                    />
                </>
            )}

            {screenWidth >= 900 && (
                <>
                    <DesktopNav
                        className="instance-node"
                        img="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem="/img/league-row-item-content-img-1090.png"
                        view="default"
                    />

                    <div className="page-header-wrapper">
                        <div className="page-header-2">
                            <div className="page-header-wrapper-2">
                                <div className="page-header-wrapper-3">Ligen Auswahl</div>
                                <p className="page-header-wrapper-4">
                                    Wählen Sie ein Bundesland aus, um die Ligen anzuzeigen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="page-content-2">
                        <div className="leagues-wrapper-2">
                            <Dropdown
                                className="instance-node"
                                options={austrianStates}
                                displayKey="name"
                                valueKey="value"
                                text="Bundesland auswählen"
                                placeholder="Wählen Sie ein Bundesland"
                                onChange={handleStateChange}
                                defaultValue="wien"
                            />
                            <div className="league-cell-list-2">
                                {filteredLeagues.length > 0 ? (
                                    filteredLeagues.map((league) => (
                                        <LeagueSelection
                                            key={league.id}
                                            className="league-selection-cell"
                                            name={league.name}
                                            teams={league.teamcount}
                                            onClick={() => handleLeagueSelect(league)} // Set cookie on click
                                        />
                                    ))
                                ) : (
                                    <p className="no-results-text">
                                        Aktuell haben wir keine Liga in diesem Bundesland.
                                    </p>
                                )}
                            </div>
                        </div>

                        <Sponsors className="sponsors-3" vWhite="/img/v-white-1-2.svg"/>
                    </div>

                    <Footer/>
                </>
            )}
        </div>
    );
};
