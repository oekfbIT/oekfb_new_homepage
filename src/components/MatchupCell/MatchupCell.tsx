import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    formatMatchDate,
    formatMatchTime,
    getElapsedTime,
    getMatchStatusText,
} from "../../utils/matchUtils";
import "./style.css";

/**
 * Lightweight models mirroring the minimum data surface used by this cell.
 * Avoids tight coupling to backend response shapes.
 */
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
  status?: string; // "pending" | "first" | "halftime" | "second" | "finished" | etc.
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
  /** Layout/state style flags used throughout the app */
  state: "fixture-w-top" | "fixture-no-top" | "live-top" | "live-w-top";
  className?: string;
}

const FALLBACK_LOGO = "/img/fallback-logo.png";

export const MatchupCell = ({ matchup, state, className }: Props): JSX.Element => {
  const navigate = useNavigate();

  // Live clock (minute) — updated each minute while status is "first" or "second".
  const [elapsedTime, setElapsedTime] = React.useState("0'");

  const status = matchup?.status ?? "";
  const isLive = status === "first" || status === "second";

  const firstHalfDate = matchup?.first_half_date;
  const secondHalfDate = matchup?.second_half_date;

  // Determine which half start we should base the live clock on.
  const halfStartTime: ISODate | null =
    status === "second" && secondHalfDate
      ? secondHalfDate
      : status === "first"
      ? firstHalfDate
      : null;

  React.useEffect(() => {
    if (!isLive || !halfStartTime) return;

    const update = () => {
      const offset = status === "second" ? 25 : 0;
      setElapsedTime(getElapsedTime(halfStartTime, offset));
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [halfStartTime, isLive, status]);

  // Example: "12.08.2025 - 19:30" or fallback text when absent
  const formattedDate =
    matchup?.details?.date
      ? `${formatMatchDate(matchup.details.date)} - ${formatMatchTime(
          matchup.details.date
        )}`
      : "Datum nicht Zugewiesen";

  // Background tone for the footer strip (pending vs live).
  const footerTone =
    ["first", "second", "halftime"].includes(status) ? "live" : ["pending"].includes(status) ? "pending" : "default";

  // Primary status line shown in the footer; includes live minute indirectly via utils if applicable.
  const matchStatusText = getMatchStatusText(
    status,
    firstHalfDate,
    secondHalfDate,
    formattedDate
  );

  const homeScore = matchup?.score?.home ?? 0;
  const awayScore = matchup?.score?.away ?? 0;

  return (
    <div
      className={[
        "matchup",
        className,
        `matchup--${state}`, // layout modifier
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Top ribbon + optional date overlay */}
      <div className="matchup__top">
        <div className={`matchup__ribbon matchup__ribbon--${state}`} />
        {["fixture-w-top", "live-w-top"].includes(state) && (
          <div className="matchup__date-badge">
            <div className="matchup__date-text">{formattedDate}</div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="matchup__body">
        {/* Teams + score row */}
        <div className="matchup__row">
          {/* Home team logo */}
          <div className="matchup__team">
            <img
              className="matchup__team-logo"
              src={matchup?.home_blanket?.logo || FALLBACK_LOGO}
              alt={matchup?.home_blanket?.name || "Home Team"}
              loading="lazy"
            />
          </div>

          {/* Score block (colors depend on 'state') */}
          <div className={`matchup__score matchup__score--${state}`}>
            <div className="matchup__score-text">
              {homeScore}:{awayScore}
            </div>
          </div>

          {/* Away team logo */}
          <div className="matchup__team">
            <img
              className="matchup__team-logo"
              src={matchup?.away_blanket?.logo || FALLBACK_LOGO}
              alt={matchup?.away_blanket?.name || "Away Team"}
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer status bar */}
        <div
          className={[
            "matchup__footer",
            footerTone === "live" ? "matchup__footer--live" : "",
            footerTone === "pending" ? "matchup__footer--pending" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            className="matchup__cta"
            onClick={() => navigate(`/match/${matchup?.id}`)}
          >
            {/* If you want to explicitly append the minute, you can combine both: */}
            {/* {isLive ? `${matchStatusText} • ${elapsedTime}` : matchStatusText} */}
            {matchStatusText}
          </button>
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
