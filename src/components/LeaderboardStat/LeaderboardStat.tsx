import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className?: string;
  team: {
    image: string;
    name: string;
    id: string;
  };
  player: {
    image: string;
    number: string;
    name: string;
    count: number;
    teamName: string;
  };
}

export const LeaderboardStat = ({ property1, className = "", player, team }: Props): JSX.Element => {
  return (
      <div className={`leaderboard-stat property-1-4-${property1} ${className}`}>
        <div className="left-container-5">
          <img
              className="image-10"
              src={player.image}
              alt={player.name}
          />

          <p className="name-5">
            <span className="text-wrapper-19">{player.name.split(" ")[0]}</span>

            <span className="text-wrapper-20"> {player.name.split(" ")[1]}</span>
          </p>

          <div style={{paddingLeft: "10px"}}
              className="team-logo-wrapper">
            <div
                className="team-logo-3"
                style={{backgroundImage: `url(${team.image})`}}
            />
          </div>

        </div>

        <div className="right-container">

          <div className="team-name-4">
            <div className="team-name-5">{player.teamName}</div>
          </div>

          <div className="count">{player.count} Tore</div>
        </div>
      </div>
  );
};

LeaderboardStat.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
  className: PropTypes.string,
  player: PropTypes.shape({
    image: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    teamName: PropTypes.string.isRequired,
  }).isRequired,
};
