import React from "react";
import "./style.css";

interface Props {
  className?: string;
  title: string;
  player: {
    image: string;
    number: string;
    name: string;
    score: number;
  };
}

export const LeaderboardHighligh = ({ className = "", title, player }: Props): JSX.Element => {
  return (
      <div className={`leaderboard-highligh ${className}`}>
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

                <div className="div-8">
                  <div className="div-9">{player.number}</div>

                  <p className="div-9">
                    <span className="text-wrapper-16">{player.name.split(" ")[0]}</span>

                    <span className="text-wrapper-17"> {player.name.split(" ")[1]}</span>
                  </p>
                </div>
              </div>

              <div className="leaderboard-highligh-wrapper">
                <div className="text-wrapper-18">{player.score}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};