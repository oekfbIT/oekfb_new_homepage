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
  icnArrowRight: string;
  img: string;
}

export const PropertyDesktopWrapper = ({
  property1,
  className,
  icnArrowRight = "/img/icn-arrow-right-15.svg",
  img = "/img/icn-arrow-right-14.svg",
}: Props): JSX.Element => {
  return (
    <div
      className={`property-desktop-wrapper property-1-2-${property1} ${className}`}
    >
      <Link className="left-container-4" to="/14u46-player-detail-mobile">
        <div className="image-7" />

        <p className="name-4">
          <span className="text-wrapper-13">Jonathan</span>

          <span className="text-wrapper-14"> Burkardt</span>
        </p>
      </Link>

      <div className="transfer-details">
        <Link className="div-4" to="/13u46-team-detail-mobile">
          <div className="team-logo-2">
            <div className="image-8" />
          </div>

          <div className="team-name-wrapper">
            <div className="team-name-3">FC Bayern Muenchen</div>
          </div>
        </Link>

        <img
          className="icn-arrow-right"
          alt="Icn arrow right"
          src={property1 === "mobile" ? icnArrowRight : img}
        />

        <div className="div-4">
          <div className="team-logo-2">
            <div className="image-9" />
          </div>

          <div className="team-name-wrapper">
            <div className="team-name-3">FC Schwarze Weisen</div>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyDesktopWrapper.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]),
  icnArrowRight: PropTypes.string,
  img: PropTypes.string,
};
