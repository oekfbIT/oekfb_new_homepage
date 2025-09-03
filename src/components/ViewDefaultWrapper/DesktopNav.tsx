// DesktopNav.jsx
// -------------------------------------------------------------
// Top navigation with a league strip + primary site links.
// - Uses semantic class names (BEM-ish)
// - No plugin-generated class soup
// - Replaces "Inter" one-off tokens with global.css tokens
// -------------------------------------------------------------

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../network/ApiService";
import AuthService from "../../network/AuthService";

// Styles
//  - global.css must be imported once at app root. If not, import here too.
//  - This file uses DesktopNav.css (clean, readable)
import "./style.css";

// Codes to exclude from the API result
const EXCLUDED_CODES = ["NONE"];

// Primary site links rendered in the center of the nav
const PRIMARY_LINKS = [
  { label: "Liga", to: "/liga" },
  { label: "Teams", to: "/teams" },
  { label: "Tabelle", to: "/tabelle" },
  { label: "Spielplan", to: "/spielplan" },
  { label: "Livescore", to: "/livescore" },
  { label: "Spielerstatistik", to: "/leaderboards" },
  { label: "News", to: "/news" },
  { label: "Strafsenat", to: "/strafsenat" },
  { label: "Transfers", to: "/transfers" },
  { label: "Sperren", to: "/sperren" },
];

export const DesktopNav = ({
  view = "default",
  className = "",
  // Assets (kept as props for flexibility)
  logoSrc = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0",
  loginIconSrc = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ficon_login.svg?alt=media&token=3ac3297f-bcd4-42e7-bb76-74acbf4c81c0",
  burgerIconSrc = "/img/mobile-burger-menu-10.svg",
  burgerTo = "/",
}) => {
  const [activeLeague, setActiveLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);

  const authService = new AuthService();
  const apiService = new ApiService();
  const navigate = useNavigate();

  // Fetch leagues on mount and seed active league from AuthService
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await apiService.get("client/leagueList?per=25");
        const filtered = Array.isArray(response)
          ? response.filter((l) => !EXCLUDED_CODES.includes(l.code))
          : [];
        setLeagues(filtered);
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      }
    };

    fetchLeagues();

    const savedLeagueCode = authService.getLeagueCode();
    if (savedLeagueCode) setActiveLeague(savedLeagueCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When a league is chosen, persist + navigate
  const handleLeagueClick = (code, id) => {
    authService.setLeagueData(code, id);

    // Preserve existing “reload on /liga” behavior
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
    <div className={`nav ${view} ${className}`}>
      {/* ===== League Strip ===== */}
      <div className="nav__leagues">
        <div className="nav__leagues-track u-scrollbar-hidden">
          {leagues.map((league) => (
            <LeaguePill
              key={league.id}
              code={league.code}
              id={league.id}
              text={league.code}
              isActive={league.code === activeLeague}
              onClick={handleLeagueClick}
            />
          ))}
        </div>
      </div>

      {/* ===== Main Bar ===== */}
      <div className="nav__bar">
        <div className="nav__bar-inner">
          {/* Brand */}
          <Link to="/" className="nav__brand" aria-label="Startseite">
            <img className="nav__brand-logo" alt="Logo" src={logoSrc} />
          </Link>

          {/* Desktop links */}
          {view === "default" && (
            <>
              <nav className="nav__links" aria-label="Hauptnavigation">
                {PRIMARY_LINKS.map((item) => (
                  <Link key={item.to} className="nav__link" to={item.to}>
                    <span className="nav__link-label">{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Team Login (right) */}
              <button
                className="nav__login"
                onClick={() => (window.location.href = "https://team.oekfb.eu")}
                type="button"
                aria-label="Team Login"
              >
                <img className="nav__login-icon" alt="" src={loginIconSrc} />
                <span className="nav__login-label">Team Login</span>
              </button>
            </>
          )}

          {/* Mobile burger */}
          {view === "mobile" && (
            <Link to={burgerTo} className="nav__burger" aria-label="Menü öffnen">
              <img className="nav__burger-icon" alt="" src={burgerIconSrc} />
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
  logoSrc: PropTypes.string,
  loginIconSrc: PropTypes.string,
  burgerIconSrc: PropTypes.string,
  burgerTo: PropTypes.string,
};

// --- LeaguePill (single item) ---------------------------------

const LeaguePill = ({ text, isActive, code, id, onClick }) => (
  <Link
    to="/liga"
    onClick={() => onClick(code, id)}
    reloadDocument
    className={`league ${isActive ? "league--active" : ""}`}
    aria-label={`Liga ${text}`}
  >
    <span className="league__code">{text}</span>
  </Link>
);

LeaguePill.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DesktopNav;
