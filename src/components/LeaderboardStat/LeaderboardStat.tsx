/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className: any;
}

export const LeaderboardStat = ({
  property1,
  className,
}: Props): JSX.Element => {
  return (
    <div className={`leaderboard-stat property-1-4-${property1} ${className}`}>
      <div className="left-container-5">
        <div className="image-10" />

        <p className="name-5">
          <span className="text-wrapper-19">Jonathan</span>

          <span className="text-wrapper-20"> Burkardt</span>
        </p>
      </div>

      <div className="right-container">
        <div className="team-logo-wrapper">
          <div className="team-logo-3" />
        </div>

        <div className="team-name-4">
          <div className="team-name-5">1. FSV Mainz 05</div>
        </div>

        <div className="count">5 Tore</div>
      </div>
    </div>
  );
};

LeaderboardStat.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]),
};
