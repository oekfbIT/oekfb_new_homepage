import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  goal: boolean;
  className?: string;
  team: {
    image: string;
    name: string;
    id: string;
  };
  player: {
    id: string;
    image: string;
    number: string;
    name: string;
    count: number;
    teamName: string;
  };
}

export const LeaderboardStat = ({
  property1,
  goal,
  className = "",
  player,
  team,
}: Props): JSX.Element => {
  const redCard = "/img/redCard.svg";
  const yellowCard = "/img/yellowCard.svg";
  const yellowredCard = "/img/yellowRedCard.svg";
  const goalimg = "/img/goal.svg";
  const navigate = useNavigate();

  const handlePlayerClick = () => {
    const id = player?.id;
    if (id) navigate(`/player-detail/${id}`);
  };

  const handleTeamClick = () => {
    const id = team?.id;
    if (id) navigate(`/team-detail/${id}`);
  };

  return (
    <div className={`leaderboard-stat property-1-4-${property1} ${className}`}>
      <div className="left-container-5">
        <img
          className="image-10"
          src={player.image}
          alt={player.name}
          onClick={handlePlayerClick}
          style={{ cursor: "pointer" }}
        />

        <p
          className="name-5"
          onClick={handlePlayerClick}
          style={{ cursor: "pointer" }}
        >
          <span className="text-wrapper-19">{player.name.split(" ")[0]}</span>
          <span className="text-wrapper-20"> {player.name.split(" ")[1]}</span>
        </p>

        <div
          style={{ paddingLeft: "10px", cursor: "pointer" }}
          className="team-logo-wrapper"
          onClick={handleTeamClick}
        >
          <div
            className="team-logo-3"
            style={{ backgroundImage: `url(${team.image})`, cursor: "pointer" }}
            onClick={handleTeamClick}
          />
        </div>
      </div>

      <div className="right-container">
        <div className="team-name-4">
          <div className="team-name-5">{player.teamName}</div>
        </div>

        <div className="count">
          <img
            className="event-card-type-img"
            src={goal ? goalimg : yellowCard}
          />
          {player.count} {goal ? "Tore" : "Gelbe Karten"}
        </div>
      </div>
    </div>
  );
};

LeaderboardStat.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
  goal: PropTypes.bool,
  className: PropTypes.string,
  team: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    teamName: PropTypes.string.isRequired,
  }).isRequired,
};
