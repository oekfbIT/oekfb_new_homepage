import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    formatMatchDate,
    formatMatchTime,
    getElapsedTime,
    getMatchStatusText
} from "../../utils/matchUtils";
import "./style.css";

interface Team {
  id?: string;
  name?: string;
  logo?: string;
}

type ISODate = string | { $date: string };

interface Matchup {
  id?: string;
  home_blanket?: Team;
  away_blanket?: Team;
  first_half_date: ISODate;
  second_half_date: ISODate;
  status?: string;
  details?: {
    location?: string;
    date?: ISODate;
    gameday?: number;
  };
  score?: {
    home?: number;
    away?: number;
  };
}

interface Props {
  matchup?: Matchup;
  state: "fixture-w-top" | "fixture-no-top" | "live-top" | "live-w-top";
  className?: string;
}

const fallbackLogo = "/img/fallback-logo.png";

export const MatchupCell = ({
  matchup,
  state,
  className,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = React.useState("0'");

  const status = matchup?.status;
  const isLive = status === "first" || status === "second";

  const firstHalfDate = matchup?.first_half_date;
  const secondHalfDate = matchup?.second_half_date;

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

  const formattedDate = matchup?.details?.date
    ? `${formatMatchDate(matchup.details.date)} - ${formatMatchTime(
        matchup.details.date
      )}`
    : "Datum nicht Zugewiesen";

  const backgroundColorClass = ["pending"].includes(status || "")
    ? "state-gray"
    : ["first", "second", "halftime"].includes(status || "")
    ? "state-red"
    : "";

  const matchStatusText = getMatchStatusText(
    status || "",
    firstHalfDate,
    secondHalfDate,
    formattedDate
  );

  return (
    <div className={`matchup-cell ${className || ""}`}>
      <div className="matchup-cell-top">
        <div className={`line ${state}`} />
        {["fixture-w-top", "live-w-top"].includes(state) && (
          <div className="txt-overlay">
            <div className="date-txt">{formattedDate}</div>
          </div>
        )}
      </div>

      <div className="matchup-cell-bottom">
        <div className="matchup-cell-bottom-2">
          <div className="link-9">
            <div className="matchup-cell-bottom-wrapper">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${matchup?.home_blanket?.logo || fallbackLogo})`,
                }}
              />
            </div>

            <div className="matchup-cell-bottom-4">
              <div className={`matchup-cell-bottom-6 state-${state}`}>
                <div className="matchup-cell-bottom-7">
                  {matchup?.score?.home ?? 0}:{matchup?.score?.away ?? 0}
                </div>
              </div>
            </div>

            <div className="matchup-cell-bottom-wrapper">
              <img
                src={matchup?.away_blanket?.logo || fallbackLogo}
                alt={matchup?.away_blanket?.name || "Away Team"}
                className="team-logo"
              />
            </div>
          </div>

          <div className={`background ${backgroundColorClass}`}>
            <div className="container">
              <div
                className="vorschau"
                onClick={() => navigate(`/match/${matchup?.id}`)}
              >
                {matchStatusText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MatchupCell.propTypes = {
  matchup: PropTypes.shape({
    id: PropTypes.string,
    home_blanket: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    away_blanket: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    status: PropTypes.string,
    first_half_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $date: PropTypes.string }),
    ]),
    second_half_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $date: PropTypes.string }),
    ]),
    details: PropTypes.shape({
      location: PropTypes.string,
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ $date: PropTypes.string }),
      ]),
      gameday: PropTypes.number,
    }),
    score: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }),
  }),
  state: PropTypes.oneOf([
    "fixture-w-top",
    "fixture-no-top",
    "live-top",
    "live-w-top",
  ]).isRequired,
  className: PropTypes.string,
};
