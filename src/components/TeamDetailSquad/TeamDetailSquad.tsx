/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "image" | "no-image";
  className: any;
}

export const TeamDetailSquad = ({
  property1,
  className,
}: Props): JSX.Element => {
  return (
    <div className={`team-detail-squad ${className}`}>
      <div className={`team-detail-squad-wrapper-2 ${property1}`}>
        <div className="div-10">
          <div className="image-11" />

          <div className="team-detail-squad-wrapper-3">
            <div className="text-wrapper-21">18</div>
          </div>

          <div className="team-detail-squad-wrapper-4">
            <div className="div-11">
              <div className="text-wrapper-22">Daniel</div>

              <div className="text-wrapper-23">Peretz</div>
            </div>
          </div>

          <div className="nationality-flags">
            <div className="nationality-flags-2">
              <div className="flagicon" />

              <div className="flagicon-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TeamDetailSquad.propTypes = {
  property1: PropTypes.oneOf(["image", "no-image"]),
};
