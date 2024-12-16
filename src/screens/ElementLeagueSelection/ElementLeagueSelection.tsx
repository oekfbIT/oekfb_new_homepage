import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import { LeagueSelection } from "../../components/LeagueSelection";
import { Sponsors } from "../../components/Sponsors";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { Navigation } from "../../components/Navigation";

export const ElementLeagueSelection = (): JSX.Element => {
    const screenWidth = useWindowWidth();

    const leagues = [
        {
            state: "wien",
            teamcount: 12,
            name: "1. Wiener Liga",
            id: "B236BAAD-404C-4451-9C30-122CBD9EB0DA",
            code: "W1",
        },
        {
            state: "wien",
            teamcount: 14,
            name: "2. Wiener Liga A",
            id: "80B164B6-4015-4D95-A432-D85CBAD5AF8B",
            code: "W2A",
        },
    ];

    const handleDropdownChange = (selectedCode: string) => {
        console.log("Selected League Code:", selectedCode);
    };

    return (
        <div
            className="element-league-selection"
            style={{
                minWidth:
                    screenWidth < 900
                        ? "390px"
                        : screenWidth >= 900
                            ? "900px"
                            : undefined,
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                                    nec varius lorem, eget faucibus ex. Vivamus vehicula dui non
                                    leo laoreet luctus. Etiam congue consequat placerat.
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

                        <Sponsors
                            className="instance-node-2"
                            vWhite="/img/v-white-1-1.svg"
                        />
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
                        leagueRowItem1="/img/league-row-item-content-img-1090.png"
                        leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem11="/img/league-row-item-content-img-1090.png"
                        leagueRowItem12="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem13="/img/league-row-item-content-img-1090.png"
                        leagueRowItem14="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem15="/img/league-row-item-content-img-1090.png"
                        leagueRowItem16="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem3="/img/league-row-item-content-img-1090.png"
                        leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem5="/img/league-row-item-content-img-1090.png"
                        leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem7="/img/league-row-item-content-img-1090.png"
                        leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
                        leagueRowItem9="/img/league-row-item-content-img-1090.png"
                        mobileBurgerMenu="/img/mobile-burger-menu-13.svg"
                        navRowWrapper="/img/nav-row-wrapper-content-logo-13.svg"
                        navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-6.svg"
                        view="default"
                    />
                    <div className="div-14">
                        <div className="page-header-wrapper">
                            <div className="page-header-3">
                                <div className="page-header-wrapper-2">
                                    <div className="page-header-wrapper-3">TITLE</div>
                                    <p className="page-header-wrapper-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Cras nec varius lorem, eget faucibus ex. Vivamus vehicula
                                        dui non leo laoreet luctus. Etiam congue consequat placerat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

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

                        <div className="div-14">
                            <Sponsors
                                className="sponsors-3"
                                sponsorsContainerClassName="sponsors-instance"
                                vWhite="/img/v-white-1-2.svg"
                            />
                        </div>
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
