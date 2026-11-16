import { getTeamDisplayName } from "../../utils/teamUtils";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useMatchStatusText } from "../../hooks/useMatchStatusText";

import { formatMatchDate, formatMatchTime } from "../../utils/matchUtils";

interface Match {
  id: string;
  home_blanket: {
    id: string;
    name: string;
    shortName?: string | null;
    short_name?: string | null;
    logo: string;
  };
  away_blanket: {
    id: string;
    name: string;
    shortName?: string | null;
    short_name?: string | null;
    logo: string;
  };
  details: {
    date: string;
    location?: string;
    gameday?: number;
  };
  score: {
    home: number;
    away: number;
  };
  status: string;
  first_half_date?: string | { $date: string };
  second_half_date?: string | { $date: string };
}

interface Props {
  match: Match;
  state: "desktop" | "mobile";
}

export const LivescoreCell = ({ match, state }: Props): JSX.Element => {
  const navigate = useNavigate();

  const status = match?.status;
  const firstHalfDate = match?.first_half_date;
  const secondHalfDate = match?.second_half_date;

  const handleButtonClick = () => {
    navigate(`/match/${match.id}`);
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/team-detail/${teamId}`);
  };

  const formattedDate = match?.details?.date
    ? `${formatMatchDate(match.details.date)} - ${formatMatchTime(match.details.date)}`
    : "Datum nicht Zugewiesen";

  const matchStatusText = useMatchStatusText(
    status || "",
    firstHalfDate,
    secondHalfDate,
    formattedDate
  );


  return (
    <div className={`fixture-data-cell state-${state}`}>
      <div
        className="fixture-data"
      >
        <div
          className="home-team clickable"
          style={{ cursor: "pointer" }}
          onClick={() => handleTeamClick(match?.home_blanket.id)}
        >
          <div className="gameday-livescore justRight">
            <img
              src={match?.home_blanket.logo}
              alt={getTeamDisplayName(match?.home_blanket)}
              className="gameday-livescore-3"
            />
            <div className="gameday-livescore-2 justRight">
              {getTeamDisplayName(match?.home_blanket)}
            </div>
          </div>
        </div>

        <div className="score-container">
          <div className="score-string">{`${match?.score.home}:${match?.score.away}`}</div>
        </div>

        <div
          className="away-team clickable"
          style={{ cursor: "pointer" }}
          onClick={() => handleTeamClick(match?.away_blanket.id)}
        >
          <div className="gameday-livescore">
            <img
              src={match?.away_blanket.logo}
              alt={getTeamDisplayName(match?.away_blanket)}
              className="gameday-livescore-3"
            />
            <div className="gameday-livescore-5">{getTeamDisplayName(match?.away_blanket)}</div>
          </div>
        </div>
      </div>

      <div className="ticker-container">
        <div className="ticker-string">{matchStatusText}</div>
      </div>


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
        <div className="stadium-location">
          {match?.details.location || "Unbekanntes Stadium"}
        </div>
      </div>

      <div className="schedule-container">
        <div className="time-string">Spieltag: {match.details.gameday}</div>
      </div>


      <div className="fixture-btn-wrapper">
        <button className="fixture-btn" onClick={handleButtonClick}>
          <div className="btn-txt">
            {status === "cancelled" ? "Abgesagt" : "Spielbericht"}
          </div>
        </button>
      </div>
    </div>
  );
};

LivescoreCell.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    home_blanket: PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortName: PropTypes.string,
      short_name: PropTypes.string,
      logo: PropTypes.string.isRequired,
    }),
    away_blanket: PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortName: PropTypes.string,
      short_name: PropTypes.string,
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
