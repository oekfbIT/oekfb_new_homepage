/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
  clubImgClassName: any;
}

export const TeamDetailSquadWrapper = ({
  className,
  clubImgClassName,
}: Props): JSX.Element => {
  return (
    <div className={`team-detail-squad-wrapper ${className}`}>
      <div className="team-detail-team">
        <div className="team-detail-team-wrapper">
          <div className="team-detail-team-2">
            <div className={`club-img ${clubImgClassName}`} />

            <div className="team-detail-team-3">
              <div className="team-detail-team-4">
                <div className="team-detail-squad-2">Aufstellung</div>

                <div className="team-detail-squad-3">FC Bayern München</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
