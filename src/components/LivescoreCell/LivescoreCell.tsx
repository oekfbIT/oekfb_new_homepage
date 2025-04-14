import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import {
    formatMatchDate,
    formatMatchTime,
    getElapsedTime,
    getMatchStatusText
} from "../../utils/matchUtils";

const { DateTime } = require("luxon");
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

export const LivescoreCell = ({ match, state }: Props): JSX.Element => {
  const navigate = useNavigate();

    const [elapsedTime, setElapsedTime] = React.useState("0'");

    const status = match?.status;
    const isLive = status === "first" || status === "second";

    const firstHalfDate = match?.first_half_date;
    const secondHalfDate = match?.second_half_date;

    const halfStartTime =
      status === "second" && secondHalfDate
        ? secondHalfDate
        : status === "first"
        ? firstHalfDate
        : null;

          React.useEffect(() => {
            if (!isLive || !halfStartTime) return;

            const update = () => {
              const offset = status === "second" ? 25 : 0;
              const time = getElapsedTime(halfStartTime, offset);
              setElapsedTime(time);
            };

            update();
            const interval = setInterval(update, 60000);
            return () => clearInterval(interval);
          }, [halfStartTime, isLive, status]);


  // Format using Luxon
  const formattedTime = DateTime.fromISO(match?.details.date, {
    zone: "gmt",
  }).toFormat("HH:mm");

  const handleButtonClick = () => {
    navigate(`/match/${id}`);
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/team-detail/${teamId}`);
  };

    const formattedDate = match?.details?.date
      ? `${formatMatchDate(match.details.date)} - ${formatMatchTime(
          match.details.date
        )}`
      : "Datum nicht Zugewiesen";

        const matchStatusText = getMatchStatusText(
          status || "",
          firstHalfDate,
          secondHalfDate,
          formattedDate
        );


  return (
    <div className={`fixture-data-cell state-${state}`}>
      <div
        className="fixture-data"
        style={{ maxWidth: "100%", paddingRight: "15px" }}
      >
        <div
          className="home-team clickable"
          style={{ cursor: "pointer" }}
          onClick={() => handleTeamClick(match?.home_blanket.id)}
        >
          <div className="gameday-livescore justRight">
            <img
              src={match?.home_blanket.logo}
              alt={match?.home_blanket.name}
              className="gameday-livescore-3"
            />
            <div className="gameday-livescore-2 justRight">
              {match?.home_blanket.name}
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
              alt={match?.away_blanket.name}
              className="gameday-livescore-3"
            />
            <div className="gameday-livescore-5">{match?.away_blanket.name}</div>
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
