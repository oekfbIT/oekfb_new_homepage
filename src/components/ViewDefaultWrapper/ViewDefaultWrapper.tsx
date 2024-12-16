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
export const ViewDefaultWrapper = ({
                                       view = "default",
                                       className = "",
                                       navRowWrapper = "/img/nav-row-wrapper-content-logo-9.svg",
                                       navRowWrapper1 = "/img/nav-row-wrapper-content-login-wrapper-image-4.svg",
                                       mobileBurgerMenu1 = "/img/mobile-burger-menu-10.svg",
                                       to = "/",
                                   }) => {
    // League Rows Data
    const leagueRows = [
        { img: "/img/league-row-item-content-img-108.png", text: "W1", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "G1", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W2A", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W2B", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "G2", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W3A", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W3B", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W4A", separator: "/img/league-row-item-content-seperator-108.svg" },
        { img: "/img/league-row-item-content-img-108.png", text: "W4B", separator: "/img/league-row-item-content-seperator-108.svg" },
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
                            text={row.text}
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

ViewDefaultWrapper.propTypes = {
    view: PropTypes.oneOf(["mobile", "default"]),
    className: PropTypes.string,
    navRowWrapper: PropTypes.string,
    navRowWrapper1: PropTypes.string,
    mobileBurgerMenu1: PropTypes.string,
    to: PropTypes.string,
};
