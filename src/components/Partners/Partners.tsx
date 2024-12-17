/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  vWhite: string;
  sponsorsContainerClassName: any;
}

export const Partners = ({
  className,
  vWhite = "/img/v-white-1.svg",
  sponsorsContainerClassName,
}: Props): JSX.Element => {
  return (
    <div className={`sponsors ${className}`}>
      <div className={`sponsors-container ${sponsorsContainerClassName}`}>
        <p className="p">
          <span className="span">OFFIZIELLE </span>

          <span className="text-wrapper-2">SPONSOREN</span>

          <span className="span"> DES ÖKFB</span>
        </p>

        <div className="sponsors-container-2">
          <img
              className="sportsselection"Ron
              alt="Sportsselection"
              src="/img/sportsselection-2zlg-subl-g-t-1.png"
          />

          <img className="image-2" alt="Image" src="/img/image-1-1.png"/>

          <img className="image-3" alt="Image" src="/img/image-2-1.png"/>

          <img className="image-4" alt="Image" src="/img/wmfLogo.png"/>

          <img className="v-white" alt="V white" src={vWhite}/>
        </div>
      </div>
    </div>
  );
};

Partners.propTypes = {
  vWhite: PropTypes.string,
};
