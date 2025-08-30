import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../network/ApiService";
import AuthService from "../../network/AuthService";
import "./style.css";

// codes to exclude from the API result
const EXCLUDED_CODES = ["NONE",];

export const DesktopNav = ({
  view = "default",
  className = "",
  navRowWrapper = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0",
  navRowWrapper1 = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ficon_login.svg?alt=media&token=3ac3297f-bcd4-42e7-bb76-74acbf4c81c0",
  mobileBurgerMenu1 = "/img/mobile-burger-menu-10.svg",
  to = "/",
}) => {
  const [activeLeague, setActiveLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const authService = new AuthService();
  const apiService = new ApiService();
  const navigate = useNavigate();

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
    <div className={`view-default-wrapper ${view} ${className}`}>
      {/* League Rows */}
      <div className="league-rows-2">
        <div className="leauge-row-wrapper-2" style={{ cursor: "pointer" }}>
          {leagues.map((league) => (
            <LeagueRowItem
              key={league.id}
              code={league.code}
              id={league.id}
              img="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fleague-row-item-content.png?alt=media&token=78fbe411-ed2f-4779-947c-6390725f56dc"
              text={league.code} // or league.name if you prefer the full name
              separator="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/league-row-item-content-seperator-90.svg?alt=media&token=0537078e-f6b3-49be-b352-fefe162bcebd"
              isActive={league.code === activeLeague}
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
                onClick={() => (window.location.href = "https://team.oekfb.eu")}
                style={{ cursor: "pointer" }}
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
  handleLeagueClick,
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
