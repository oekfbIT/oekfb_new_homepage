import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { DateTime } from "luxon";

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
  const { id, home_blanket, away_blanket, details, score, status } = match;
  const navigate = useNavigate();

  // Format using Luxon
  const formattedTime = DateTime.fromISO(details.date, { zone: "gmt" })
      .toFormat("HH:mm");

  const handleButtonClick = () => {
    navigate(`/match/${id}`);
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/team-detail/${teamId}`);
  };

  return (
      <div className={`fixture-data-cell state-${state}`}>
        <div className="fixture-data" style={{ maxWidth: "100%", paddingRight: "15px" }}>
          <div className="home-team clickable" style={{ cursor: "pointer" }} onClick={() => handleTeamClick(home_blanket.id)}>
            <div className="gameday-livescore justRight">
              <img
                  src={home_blanket.logo}
                  alt={home_blanket.name}
                  className="gameday-livescore-3"
              />
              <div className="gameday-livescore-2 justRight">
                {home_blanket.name}
              </div>
            </div>
          </div>

          <div className="score-container">
            <div className="score-string">{`${score.home}:${score.away}`}</div>
          </div>

          <div className="away-team clickable" style={{ cursor: "pointer" }} onClick={() => handleTeamClick(away_blanket.id)}>
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

        <div className="stadium-wrapper">
          <img
              className="stadium-image"
              alt="Stadium image"
              src={state === "mobile" ? "/img/stadium-image-1.svg" : "/img/stadium-image.svg"}
          />
          <div className="stadium-location">{details.location || "Unbekanntes Stadium"}</div>
        </div>

        <div className="schedule-container">
          <div className="time-string">{formattedTime}</div>
        </div>

        <div className="fixture-btn-wrapper">
          <button className="fixture-btn" onClick={handleButtonClick}>
            <div className="btn-txt">{status === "cancelled" ? "Abgesagt" : "Details"}</div>
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
