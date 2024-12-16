import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import { LeagueSelection } from "../../components/LeagueSelection";
import { Sponsors } from "../../components/Sponsors";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";

export const ElementLeagueSelection = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const clientController = new ClientController();

    // State to store league options and selected value
    const [leagues, setLeagues] = useState<any[]>([]);
    const [selectedLeague, setSelectedLeague] = useState<string>("W1"); // Default selection "W1"

    // Fetch league options
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const data = await clientController.fetchLeagueSelection();

                // Filter out unwanted leagues (name = "Mannschaft aus der Liga ausgetreten")
                const filteredLeagues = data.filter(
                    (league) => league.name !== "Mannschaft aus der Liga ausgetreten"
                );

                setLeagues(filteredLeagues);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchLeagues();
    }, []);

    // Handle dropdown selection change
    const handleDropdownChange = (selectedCode: string) => {
        setSelectedLeague(selectedCode);
        console.log("Selected League Code:", selectedCode);
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
                                <div className="page-header-wrapper-3">TITLE</div>
                                <p className="page-header-wrapper-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec varius lorem,
                                    eget faucibus ex. Vivamus vehicula dui non leo laoreet luctus. Etiam congue
                                    consequat placerat.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="page-content">
                        <div className="leagues-wrapper">
                            <Dropdown
                                className="instance-node-2"
                                options={leagues}
                                displayKey="name"
                                valueKey="code"
                                text="Select a League"
                                placeholder="Choose a league"
                                onChange={handleDropdownChange}
                            />
                            <div className="league-cell-list">
                                <LeagueSelection className="league-selection-cell" />
                                <LeagueSelection className="league-selection-cell" />
                            </div>
                        </div>

                        <Sponsors className="instance-node-2" vWhite="/img/v-white-1-1.svg" />
                    </div>

                    <Footer
                        className="footer-instance"
                        footerContent="/img/footer-content-wrapper-left-logo-8.png"
                        footerContentClassName="footer-2"
                        footerContentClassNameOverride="footer-3"
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
                    <ViewDefaultWrapper
                        className="instance-node"
                        img="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem="/img/league-row-item-content-img-1090.png"
                        view="default"
                    />
                    <div className="page-content-2">
                        <div className="leagues-wrapper-2">
                            <Dropdown
                                className="instance-node"
                                options={leagues}
                                displayKey="name"
                                valueKey="code"
                                text="Select a League"
                                placeholder="Choose a league"
                                onChange={handleDropdownChange}
                            />
                            <div className="league-cell-list-2">
                                <LeagueSelection className="league-selection-cell" />
                                <LeagueSelection className="league-selection-cell" />
                            </div>
                        </div>

                        <Sponsors className="sponsors-3" vWhite="/img/v-white-1-2.svg" />
                    </div>

                    <Footer
                        className="footer-instance"
                        footerContent="/img/footer-content-wrapper-left-logo-8.png"
                        href="https://www.facebook.com/kleinfeldliga/"
                        href1="https://www.youtube.com/@OEKFB"
                        href2="https://www.instagram.com/oekfb/?hl=en"
                        img="/img/link-45.svg"
                        link="/img/link-44.svg"
                        link1="/img/link-46.svg"
                        link2="/img/link-47.svg"
                    />
                </>
            )}
        </div>
    );
};
