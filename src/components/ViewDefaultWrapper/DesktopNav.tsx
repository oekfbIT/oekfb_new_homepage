import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import AuthService from "../../network/AuthService";

export const DesktopNav = ({
                               view = "default",
                               className = "",
                               navRowWrapper = "/img/nav-row-wrapper-content-logo-9.svg",
                               navRowWrapper1 = "/img/nav-row-wrapper-content-login-wrapper-image-4.svg",
                               mobileBurgerMenu1 = "/img/mobile-burger-menu-10.svg",
                               to = "/",
                           }) => {
    const [activeLeague, setActiveLeague] = useState(null);
    const authService = new AuthService();
    const navigate = useNavigate();

    // League Rows Data
    const leagueRows = [
        { img: "/img/league-row-item-content-img-90.png", text: "1. Wiener Liga", code: "W1", id: "B236BAAD-404C-4451-9C30-122CBD9EB0DA" },
        { img: "/img/league-row-item-content-img-90.png", text: "2. Wiener Liga A", code: "W2A", id: "80B164B6-4015-4D95-A432-D85CBAD5AF8B" },
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

    // Fetch active league from cookie on mount
    useEffect(() => {
        const savedLeagueCode = authService.getLeagueCode();
        if (savedLeagueCode) setActiveLeague(savedLeagueCode);
    }, []);

    // If the user is already on #/liga or the site’s #/liga, reload
    const handleLeagueClick = (code, id) => {
        authService.setLeagueData(code, id);

        if (
            window.location.hash === "#/liga" ||
            window.location.href === "https://oekfb.eu/#/liga"
        ) {
            window.location.reload();
        } else {
            navigate("/liga");
        }
    };

    return (
        <div className={`view-default-wrapper ${view} ${className}`}>
            {/* League Rows */}
            <div className="league-rows-2">
                <div className="leauge-row-wrapper-2" style={{ cursor: "pointer" }}>
                    {leagueRows.map((row) => (
                        <LeagueRowItem
                            key={row.id}
                            code={row.code}
                            id={row.id}
                            img={row.img}
                            text={row.code}
                            separator="/img/league-row-item-content-seperator-90.svg"
                            isActive={row.code === activeLeague}
                            handleLeagueClick={handleLeagueClick}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Row */}
            <div className="nav-row-wrapper-4">
                <div className="nav-row-wrapper-5">
                    <Link to="/">
                        <img className="nav-row-wrapper-6" alt="Logo" src={navRowWrapper} />
                    </Link>

                    {view === "default" && (
                        <>
                            <div className="nav-row-wrapper-7">
                                <div className="nav-row-wrapper-8">
                                    {[
                                        {label: "Startseite", to: "/homepage"},
                                        {label: "Teams", to: "/teams"},
                                        {label: "Tabelle", to: "/tabelle"},
                                        {label: "Spielplan", to: "/spielplan"},
                                        {label: "Leaderboards", to: "/leaderboards"},
                                        {label: "News", to: "/news"},
                                        {label: "Strafsenat", to: "/strafsenat"},
                                        {label: "Sperren", to: "/sperren"},
                                        {label: "Bund", to: "/bund"},
                                        {label: "Kontakt", to: "/kontakt"},
                                    ].map((link, index) => (
                                        <Link key={index} className="item-3" to={link.to}>
                                            <div className="link-6">
                                                <div className="text-wrapper-8">{link.label}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="nav-row-wrapper-9"
                                onClick={() => window.location.href = 'https://team.oekfb.eu'}
                                style={{cursor: 'pointer'}} // Add a pointer cursor to indicate it's clickable
                            >
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


// A Link-wrapping league row
const LeagueRowItem = ({
                           img,
                           text,
                           separator,
                           isActive,
                           code,
                           id,
                           handleLeagueClick
                       }) => (
    <Link
        to="/liga"
        onClick={() => handleLeagueClick(code, id)}
        reloadDocument
        style={{ textDecoration: "none", color: "inherit" }}
    >
        <div
            className={`league-row-item-6 ${isActive ? "active" : ""}`}
            style={{ cursor: "pointer" }}
        >
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
    </Link>
);

LeagueRowItem.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    separator: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    code: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleLeagueClick: PropTypes.func.isRequired,
};