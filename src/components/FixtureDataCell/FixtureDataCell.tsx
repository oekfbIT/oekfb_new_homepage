/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  state: "desktop" | "mobile";
  className: any;
  fixtureDataClassName: any;
  homeTeamClassName: any;
  gamedayLivescoreClassName: any;
  awayTeamClassName: any;
  gamedayLivescoreClassNameOverride: any;
  stadiumImage: string;
  img: string;
}

export const FixtureDataCell = ({
  state,
  className,
  fixtureDataClassName,
  homeTeamClassName,
  gamedayLivescoreClassName,
  awayTeamClassName,
  gamedayLivescoreClassNameOverride,
  stadiumImage = "/img/stadium-image-1.svg",
  img = "/img/stadium-image.svg",
}: Props): JSX.Element => {
  return (
    <div className={`fixture-data-cell state-${state} ${className}`}>
      <div className={`fixture-data ${fixtureDataClassName}`}>
        <div className={`home-team ${homeTeamClassName}`}>
          <div className={`gameday-livescore ${gamedayLivescoreClassName}`}>
            <div className="gameday-livescore-2">Borussia Dortmund</div>

            <div className="gameday-livescore-wrapper">
              <div className="gameday-livescore-3" />
            </div>
          </div>
        </div>

        <div className="schedule-container">
          <div className="time-string">15:00</div>
        </div>

        <div className={`away-team ${awayTeamClassName}`}>
          <div
            className={`gameday-livescore ${gamedayLivescoreClassNameOverride}`}
          >
            <div className="gameday-livescore-4">
              <div className="gameday-livescore-3" />
            </div>

            <div className="gameday-livescore-5">Borussia Dortmund</div>
          </div>
        </div>
      </div>

      <div className="staium-wrapper">
        <img
          className="stadium-image"
          alt="Stadium image"
          src={state === "mobile" ? stadiumImage : img}
        />

        <div className="stadium-location">SV Donau, Wien</div>
      </div>

      <div className="fixture-btn-wrapper">
        <div className="fixture-btn">
          <div className="btn-txt">Spielbericht</div>
        </div>
      </div>
    </div>
  );
};

FixtureDataCell.propTypes = {
  state: PropTypes.oneOf(["desktop", "mobile"]),
  stadiumImage: PropTypes.string,
  img: PropTypes.string,
};
