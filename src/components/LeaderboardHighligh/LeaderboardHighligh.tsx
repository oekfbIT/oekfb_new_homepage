import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  title: string;
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
    score: number;
  };
}

export const LeaderboardHighligh = ({
  className = "",
  title,
  player,
  team,
}: Props): JSX.Element => {
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
    <div
      className={`leaderboard-highligh ${className}`}
      onClick={handlePlayerClick}
      style={{ cursor: "pointer" }}
    >
      <div className="background-shadow-wrapper">
        <div className="background-shadow">
          <div className="header">
            <div className="text-wrapper-15">{title}</div>
          </div>

          <div className="player-detail-wrapper">
            <img
              className="player-detail"
              alt={`${player.name} detail`}
              src={player.image}
            />
          </div>

          <div className="div-5">
            <div className="div-6">
              <div className="div-7" />
              {/*TEAM IMG */}
              <img
                alt={`${team.name} detail`}
                src={team.image}
                style={{ width: "30px" }}
              />

              <div className="div-8">
                <div className="div-9">{player.number}</div>

                <p className="div-9">
                  <span className="text-wrapper-16">
                    {player.name.split(" ")[0]}
                  </span>

                  <span className="text-wrapper-17">
                    {" "}
                    {player.name.split(" ")[1]}
                  </span>
                </p>
              </div>
            </div>

            {/*<div className="leaderboard-highligh-wrapper">*/}
            {/*  <div className="text-wrapper-18">{player.score}</div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
