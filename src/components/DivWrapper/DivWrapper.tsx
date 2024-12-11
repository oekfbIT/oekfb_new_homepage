/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
  frameClassName: any;
  teamDetailSquadClassName: any;
  frameClassNameOverride: any;
  flagiconClassName: any;
  flagiconClassNameOverride: any;
}

export const DivWrapper = ({
  className,
  frameClassName,
  teamDetailSquadClassName,
  frameClassNameOverride,
  flagiconClassName,
  flagiconClassNameOverride,
}: Props): JSX.Element => {
  return (
    <div className={`div-wrapper ${className}`}>
      <div className="team-detail-squad-4">
        <div className="team-detail-squad-5">
          <div className={`frame-3 ${frameClassName}`}>
            <div
              className={`team-detail-squad-6 ${teamDetailSquadClassName}`}
            />

            <div className="team-detail-squad-7">
              <div className="team-detail-squad-8">
                <div className="team-detail-squad-9">Patrik</div>

                <div className="team-detail-squad-10">Kikosaschvili</div>
              </div>
            </div>
          </div>

          <div className={`frame-4 ${frameClassNameOverride}`}>
            <div className="nationality-flags-wrapper">
              <div className="nationality-flags-3">
                <div className={`flagicon-3 ${flagiconClassName}`} />

                <div className={`flagicon-4 ${flagiconClassNameOverride}`} />
              </div>
            </div>

            <div className="team-detail-squad-7">
              <div className="team-detail-squad-11">18</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
