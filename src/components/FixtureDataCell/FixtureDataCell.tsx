import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Match {
  id: string;
  home_blanket: {
    name: string;
    logo: string;
  };
  away_blanket: {
    name: string;
    logo: string;
  };
  details: {
    date: string;
    location?: string;
  };
  score: {
    home: number;
    away: number;
  };
  status: string;
}

interface Props {
  match: Match;
  state: "desktop" | "mobile";
}

export const FixtureDataCell = ({ match, state }: Props): JSX.Element => {
  const { id, home_blanket, away_blanket, details, status } = match;
  const navigate = useNavigate(); // React Router hook for navigation

  const formattedTime = details.date
      ? new Date(details.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "TBD";

  const getStatusText = (status: string) => {
    if (status === "Pending") return "Vorschau";
    if (["done", "submitted", "completed"].includes(status)) return "Spielbericht";
    if (["first", "second"].includes(status)) return "Live";
    if (status === "abgebrochen") return "Abgebrochen";
    if (status === "cancelled") return "Abgesagt";
    return "Vorschau";
  };

  const handleButtonClick = () => {
    navigate(`/match/${id}`);
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/team-detail/${teamId}`);
  };

  return (
      <div className={`fixture-data-cell state-${state}`}>
        <div className="fixture-data" style={{ maxWidth: "100%" }}>
          {/* Home Team */}
          <div
              style={{cursor: "pointer"}}
              className="home-team clickable"
              onClick={() => handleTeamClick(home_blanket.id)}
          >
            <div className="gameday-livescore justRight">
              <img
                  src={home_blanket.logo}
                  alt={home_blanket.name}
                  className="gameday-livescore-3"
              />
              <div className="gameday-livescore-2 justRight"
                   style={{cursor: "pointer"}}>
                {home_blanket.name}
              </div>
            </div>
          </div>

          {/* Match Time */}
          <div className="schedule-container">
            <div className="time-string">{formattedTime}</div>
          </div>

          {/* Away Team */}
          <div
              className="away-team clickable"
              onClick={() => handleTeamClick(away_blanket.id)}
          >
            <div className="gameday-livescore">
              <img
                  src={away_blanket.logo}
                  alt={away_blanket.name}
                  className="gameday-livescore-3"
              />
              <div className="gameday-livescore-5">{away_blanket.name}</div>
            </div>
          </div>
        </div>

        {/* Stadium Section */}
        <div className="stadium-wrapper">
          <img
              className="stadium-image"
              alt="Stadium image"
              src={
                state === "mobile"
                    ? "/img/stadium-image-1.svg"
                    : "/img/stadium-image.svg"
              }
          />
          <div className="stadium-location">{details.location || "Unbekanntes Stadium"}</div>
        </div>

        {/* Button Section */}
        <div className="fixture-btn-wrapper">
          <button className="fixture-btn" onClick={handleButtonClick}>
            <div className="btn-txt">{getStatusText(status)}</div>
          </button>
        </div>
      </div>
  );
};

FixtureDataCell.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    home_blanket: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }),
    away_blanket: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }),
    details: PropTypes.shape({
      date: PropTypes.string.isRequired,
      location: PropTypes.string,
    }),
    score: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
  state: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
};
