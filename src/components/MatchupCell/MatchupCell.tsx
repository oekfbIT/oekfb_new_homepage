import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import {useNavigate} from "react-router-dom";

interface Team {
  id?: string;
  name?: string;
  logo?: string;
}

interface Matchup {
  id?: string;
  home_blanket?: Team;
  away_blanket?: Team;
  status?: string;
  details?: {
    location?: string;
    date?: string;
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

export const MatchupCell = ({ matchup, state, className }: Props): JSX.Element => {
  const navigate = useNavigate();

  console.log("Debug - Matchup:", matchup);

  const formattedDate = matchup?.details?.date
      ? new Date(matchup.details.date).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "N/A";

  const backgroundColorClass =
      matchup?.status === "pending"
          ? "state-gray"
          : ["first", "second", "halftime"].includes(matchup?.status || "")
              ? "state-red"
              : "";

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
                  <div className="matchup-cell-bottom-7">{matchup?.score?.home ?? 0}</div>
                </div>
                <div className={`matchup-cell-bottom-8 state-1-${state}`}>
                  <div className="matchup-cell-bottom-9">{matchup?.score?.away ?? 0}</div>
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
                <div className="vorschau"
                     onClick={() => navigate(`/match/${matchup.id}`)}>
                  {matchup?.status === "pending" ? "Vorschau" : `Live - ${formattedDate}`}
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
    id: PropTypes.string, // Expect string now
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
    details: PropTypes.shape({
      location: PropTypes.string,
      date: PropTypes.string,
      gameday: PropTypes.number,
    }),
    score: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }),
  }),
  state: PropTypes.oneOf(["fixture-w-top", "fixture-no-top", "live-top", "live-w-top"]).isRequired,
  className: PropTypes.string,
};
