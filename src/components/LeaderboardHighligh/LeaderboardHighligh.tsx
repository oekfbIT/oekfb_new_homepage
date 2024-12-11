/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const LeaderboardHighligh = ({ className }: Props): JSX.Element => {
  return (
    <div className={`leaderboard-highligh ${className}`}>
      <div className="background-shadow-wrapper">
        <div className="background-shadow">
          <div className="header">
            <div className="text-wrapper-15">Goals</div>
          </div>

          <div className="player-detail-wrapper">
            <img
              className="player-detail"
              alt="Player detail"
              src="/img/player-detail-background-container-player-1.png"
            />
          </div>

          <div className="div-5">
            <div className="div-6">
              <div className="div-7" />

              <div className="div-8">
                <div className="div-9">2</div>

                <p className="div-9">
                  <span className="text-wrapper-16">Ermedin</span>

                  <span className="text-wrapper-17"> Demirović</span>
                </p>
              </div>
            </div>

            <div className="leaderboard-highligh-wrapper">
              <div className="text-wrapper-18">5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
