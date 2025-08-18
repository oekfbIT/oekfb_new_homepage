import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../network/ApiService";
import AuthService from "../../network/AuthService";
import { ElementMobilenav } from "../../screens/ElementMobilenav";
import "./style.css";

// codes to exclude from the API result
const EXCLUDED_CODES = ["NONE", "W2A"];

export const Navigation = ({
  className = "",
  navRowWrapper =
    "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0",
  mobileBurgerMenu =
    "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fmobile-burger-menu-7.svg?alt=media&token=4f55528e-3719-41ee-b137-311723b3a4b9",
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);

  const authService = new AuthService();
  const apiService = new ApiService();
  const navigate = useNavigate();

  // load leagues from API + active league from cookie
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await apiService.get("client/leagueList?per=25");
        const filtered = Array.isArray(response)
          ? response.filter((l) => !EXCLUDED_CODES.includes(l.code))
          : [];
        setLeagues(filtered);
      } catch (e) {
        console.error("Failed to fetch leagues:", e);
        setLeagues([]); // fail-safe
      }
    };

    fetchLeagues();

    const leagueCode = authService.getLeagueCode();
    if (leagueCode) setActiveLeague(leagueCode);
  }, []);

  // responsive
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
          {leagues.map((item) => (
            <LeagueRow
              key={item.id}
              img="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fleague-row-item-content.png?alt=media&token=78fbe411-ed2f-4779-947c-6390725f56dc"
              text={item.code} // or item.name
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
            <img
              className="nav-row-logo"
              alt="Nav row wrapper"
              src={navRowWrapper}
            />
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

// Presentational row wrapped by Link
const LeagueRow = ({
  img,
  text,
  separator,
  isActive,
  code,
  id,
  handleLeagueClick,
}) => (
  <Link
    to="/liga"
    onClick={() => handleLeagueClick(code, id)}
    reloadDocument
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div
      className={`league-row-item ${isActive ? "active" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <div className="link">
        <div className="div">
          <div className="content">
            <img className="img" alt="League row item" src={img} />
            <div className="text-wrapper">{text}</div>
          </div>
          <img
            className="league-row-item-2"
            alt="League row separator"
            src={separator}
          />
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
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleLeagueClick: PropTypes.func.isRequired,
};
