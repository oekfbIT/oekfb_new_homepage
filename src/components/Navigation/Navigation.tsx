import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../network/AuthService";
import { ElementMobilenav } from "../../screens/ElementMobilenav";
import "./style.css";

export const Navigation = ({
                               className = "",
                               navRowWrapper = "/img/nav-row-wrapper-content-logo-7.svg",
                               mobileBurgerMenu = "/img/mobile-burger-menu-7.svg",
                           }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeLeague, setActiveLeague] = useState(null);

    const authService = new AuthService();
    const navigate = useNavigate();

    // League data
    const leagueData = [
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
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Innsbruck", code: "IBK", id: "AD2C1309-7F78-4E31-9FFC-957D1A38A43E" },
        { img: "/img/league-row-item-content-img-90.png", text: "2. Liga Innsbruck", code: "IBK2", id: "554ACBEE-A0D3-4E5E-8DCF-50825136C3C8" },
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Niederösterreich", code: "NÖ1", id: "B844ED89-6766-49BC-9996-5572AA7B1FB7" }, // new
        { img: "/img/league-row-item-content-img-90.png", text: "1. Liga Bregenz", code: "BGZ", id: "32B5B0E6-7F8E-4F82-8837-F6A9EE103D91" }, // new
    ];

    // On mount, load active league from cookie
    useEffect(() => {
        const leagueCode = authService.getLeagueCode();
        if (leagueCode) setActiveLeague(leagueCode);
    }, []);

    // Listen for window resizing
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div className={`navigation-desktop ${className}`}>
            {/* League Rows */}
            <div className="league-rows">
                <div className="league-row-wrapper">
                    {leagueData.map((item) => (
                            <LeagueRow
                                img={item.img}
                                text={item.code}
                                separator="/img/league-row-item-content-seperator-90.svg"
                                isActive={item.code === activeLeague}
                                handleLeagueClick={handleLeagueClick}
                                code={item.code}
                                id={item.id}


                            />
                    ))}
                </div>
            </div>

            {/* Navigation Row */}
            <div className="nav-row-wrapper">
                <div className="nav-row-wrapper-2">
                    <Link to="/">
                        <img className="nav-row-logo" alt="Nav row wrapper" src={navRowWrapper} />
                    </Link>
                    {isMobile ? (
                        <img
                            className="mobile-burger-menu"
                            alt="Mobile Burger Menu"
                            src={mobileBurgerMenu}
                            onClick={() => setIsDrawerOpen(true)}
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
                            onClick={() => setIsDrawerOpen(false)}
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

// A pure presentational row; no onClick here because the Link wraps it above
const LeagueRow = ({ img, text, separator, isActive, code, id, handleLeagueClick }) => (
    <Link
        to="/liga"
        onClick={() => handleLeagueClick(code, id)}
        reloadDocument
        style={{ textDecoration: "none", color: "inherit" }}
    >
        <div
            className={`league-row-item ${isActive ? "active" : ""}`}
            style={{cursor: "pointer"}}
        >
            <div className="link">
                <div className="div">
                    <div className="content">
                        <img className="img" alt="League row item" src={img}/>
                        <div className="text-wrapper">{text}</div>
                    </div>
                    <img className="league-row-item-2" alt="League row separator" src={separator}/>
                </div>
            </div>
        </div>
    </Link>
);

LeagueRow.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    separator: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};
