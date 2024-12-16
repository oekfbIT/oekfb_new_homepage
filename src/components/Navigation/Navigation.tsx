import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import {ElementMobilenav} from "../../screens/ElementMobilenav";

// Import ElementMobilenav component

export const Navigation = ({
                               className = "",
                               navRowWrapper = "/img/nav-row-wrapper-content-logo-7.svg",
                               mobileBurgerMenu = "/img/mobile-burger-menu-7.svg",
                           }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Handle screen resizing
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Array for league row items
    const leagueRows = [
        { img: "/img/league-row-item-content-img-90.png", text: "W1", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "G1", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W2A", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W2B", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "G2", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W3A", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W3B", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W4A", separator: "/img/league-row-item-content-seperator-90.svg" },
        { img: "/img/league-row-item-content-img-90.png", text: "W4B", separator: "/img/league-row-item-content-seperator-90.svg" }
    ];

    return (
        <div className={`navigation-desktop ${className}`}>
            {/* League Rows */}
            <div className="league-rows">
                <div className="leauge-row-wrapper">
                    {leagueRows.map((item, index) => (
                        <LeagueRow
                            key={index}
                            img={item.img}
                            text={item.text}
                            separator={item.separator}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Row */}
            <div className="nav-row-wrapper">
                <div className="nav-row-wrapper-2">
                    <img
                        className="nav-row-logo"
                        alt="Nav row wrapper"
                        src={navRowWrapper}
                    />

                    {isMobile ? (
                        <img
                            className="mobile-burger-menu"
                            alt="Mobile Burger Menu"
                            src={mobileBurgerMenu}
                            onClick={() => setIsDrawerOpen(true)} // Open Drawer
                        />
                    ) : (
                        <div className="nav-login-button">Login</div>
                    )}
                </div>
            </div>

            {/* Drawer */}
            {isDrawerOpen && (
                <div className="drawer-overlay">
                    <div className="drawer-content">
                        <ElementMobilenav />
                        <img
                            className="close-button"
                            alt="Close"
                            src="/img/close.svg"
                            onClick={() => setIsDrawerOpen(false)} // Close Drawer
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Navigation.propTypes = {
    className: PropTypes.string,
    navRowWrapper: PropTypes.string,
    mobileBurgerMenu: PropTypes.string,
};

// Reusable LeagueRow Component
const LeagueRow = ({ img, text, separator }) => (
    <div className="league-row-item">
        <div className="link">
            <div className="div">
                <div className="content">
                    <img className="img" alt="League row item" src={img} />
                    <div className="text-wrapper">{text}</div>
                </div>
                <img className="league-row-item-2" alt="League row separator" src={separator} />
            </div>
        </div>
    </div>
);

LeagueRow.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    separator: PropTypes.string.isRequired,
};
