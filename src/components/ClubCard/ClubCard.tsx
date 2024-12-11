/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const ClubCard = ({ className }: Props): JSX.Element => {
  return (
    <div className={`club-card ${className}`}>
      <div className="club-card-content">
        <div className="image-wrapper">
          <div className="image-6" />
        </div>

        <div className="club-card-content-2">
          <div className="club-card-content-3">FC Invicta</div>

          <p className="club-card-content-4">
            Im Verband seit: Saison 2017/2018
          </p>
        </div>
      </div>
    </div>
  );
};
