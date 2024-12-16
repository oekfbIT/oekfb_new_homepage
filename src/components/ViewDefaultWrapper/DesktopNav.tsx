import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Reusable LeagueRowItem Component
const LeagueRowItem = ({ img, text, separator }) => (
    <div className="league-row-item-6">
        <div className="league-row-item-wrapper">
            <div className="league-row-item-7">
                <div className="content-2">
                    <img className="league-row-item-8" alt="League row item" src={img} />
                    <div className="league-row-item-9">{text}</div>
                </div>
                <img className="league-row-item-10" alt="Separator" src={separator} />
            </div>
        </div>
    </div>
);

LeagueRowItem.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    separator: PropTypes.string.isRequired,
};

// Main Component
export const DesktopNav = ({
                                       view = "default",
                                       className = "",
                                       navRowWrapper = "/img/nav-row-wrapper-content-logo-9.svg",
                                       navRowWrapper1 = "/img/nav-row-wrapper-content-login-wrapper-image-4.svg",
                                       mobileBurgerMenu1 = "/img/mobile-burger-menu-10.svg",
                                       to = "/",
                                   }) => {
    // League Rows Data
    const leagueRows = [
        { img: "/img/league-row-item-content-img-90.png", text: "2. Wiener Liga A", code: "W2A", id: "80B164B6-4015-4D95-A432-D85CBAD5AF8B" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Wiener Liga", code: "W1", id: "B236BAAD-404C-4451-9C30-122CBD9EB0DA" },
        { img: "/img/league-row-item-content-img-90.png", text: "2. Wiener Liga B", code: "W2B", id: "F6813EF5-BF80-4A2D-B9B3-3C5845A9CC98" },
        { img: "/img/league-row-item-content-img-90.png", text: "3. Wiener Liga A", code: "W3A", id: "69A15306-4F1E-4A5B-AE64-5487B7B99CDD" },
        { img: "/img/league-row-item-content-img-90.png", text: "3. Wiener Liga B", code: "W3B", id: "77F04A92-7E91-4C65-9E96-0FA1E1033805" },
        { img: "/img/league-row-item-content-img-90.png", text: "4. Wiener Liga A", code: "W4A", id: "F58269FD-DE67-4E5D-BBD2-780877555F2B" },
        { img: "/img/league-row-item-content-img-90.png", text: "4. Wiener Liga B", code: "W4B", id: "29FFA358-A32B-4F60-904B-D66B118E1661" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Linz", code: "L1", id: "D506E56C-3877-4581-90F0-26D144EFBE83" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Graz", code: "G1", id: "E171419D-C82E-4620-B691-B0D7BFEFB154" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Salzburg", code: "SBZ", id: "4C0521AB-B28B-4C5B-A147-E6BA50042348" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Innsbruck", code: "INS", id: "AD2C1309-7F78-4E31-9FFC-957D1A38A43E" },
        { img: "/img/league-row-item-content-img-90.png", text: "2. Liga Innsbruck", code: "INS2", id: "554ACBEE-A0D3-4E5E-8DCF-50825136C3C8" },
    ];

    // Navigation Links
    const navLinks = [
        { label: "Startseite", to: "/02u46-homepage-desktop" },
        { label: "Clubs", to: "#" },
        { label: "Tabelle", to: "#" },
        { label: "Spielplan", to: "#" },
        { label: "Leaderboards", to: "#" },
        { label: "News", to: "#" },
        { label: "Bund", to: "#" },
        { label: "Kontakt", to: "#" },
    ];

    return (
        <div className={`view-default-wrapper ${view} ${className}`}>
            {/* League Rows */}
            <div className="league-rows-2">
                <div className="leauge-row-wrapper-2">
                    {leagueRows.map((row, index) => (
                        <LeagueRowItem
                            key={index}
                            img={row.img}
                            text={row.code}
                            separator={row.separator}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Row */}
            <div className="nav-row-wrapper-4">
                <div className="nav-row-wrapper-5">
                    <img className="nav-row-wrapper-6" alt="Logo" src={navRowWrapper} />

                    {view === "default" && (
                        <>
                            <div className="nav-row-wrapper-7">
                                <div className="nav-row-wrapper-8">
                                    {navLinks.map((link, index) => (
                                        <Link key={index} className="item-3" to={link.to}>
                                            <div className="link-6">
                                                <div className="text-wrapper-8">{link.label}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="nav-row-wrapper-9">
                                <div className="nav-row-wrapper-10">
                                    <img
                                        className="nav-row-wrapper-11"
                                        alt="Login Icon"
                                        src={navRowWrapper1}
                                    />
                                    <div className="text-wrapper-10">Team Login</div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mobile View */}
                    {view === "mobile" && (
                        <Link to={to}>
                            <img
                                className="mobile-burger-menu-3"
                                alt="Mobile Burger Menu"
                                src={mobileBurgerMenu1}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

DesktopNav.propTypes = {
    view: PropTypes.oneOf(["mobile", "default"]),
    className: PropTypes.string,
    navRowWrapper: PropTypes.string,
    navRowWrapper1: PropTypes.string,
    mobileBurgerMenu1: PropTypes.string,
    to: PropTypes.string,
};
