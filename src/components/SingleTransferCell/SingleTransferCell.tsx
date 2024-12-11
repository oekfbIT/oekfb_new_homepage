/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className: any;
}

export const SingleTransferCell = ({
  property1,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`single-transfer-cell property-1-${property1} ${className}`}
    >
      <div className="frame-2">
        <div className="left-container">
          <div className="image-4" />

          <p className="name-2">
            <span className="text-wrapper-11">Jonathan</span>

            <span className="text-wrapper-12">
              {" "}
              Burkardt&nbsp;&nbsp;(ID: 3005)
            </span>
          </p>
        </div>

        <Link className="left-container-2" to="/13u46-team-detail-mobile">
          {property1 === "desktop" && (
            <>
              <div className="team-logo">
                <div className="image-5" />
              </div>

              <div className="team-name">
                <div className="team-name-2">FC Bayern Muenchen</div>
              </div>
            </>
          )}

          {property1 === "mobile" && (
            <div className="left-container-3">
              <div className="team-logo">
                <div className="image-5" />
              </div>

              <div className="team-name">
                <div className="team-name-2">FC Bayern Muenchen</div>
              </div>
            </div>
          )}
        </Link>
      </div>

      <div className="left-container">
        <p className="name-3">
          <span className="text-wrapper-11">Gesperrt bis</span>

          <span className="text-wrapper-12"> 24.12.2024</span>
        </p>
      </div>
    </div>
  );
};

SingleTransferCell.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]),
};
