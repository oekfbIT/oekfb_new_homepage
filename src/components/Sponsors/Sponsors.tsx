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

export const Sponsors = ({
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
            <a href=" https://at.coca-colahellenic.com/de" target="_blank" rel="noopener noreferrer">
              <img
                  className="sponsor"
                  alt="Coca Cola"
                  src="https://1000logos.net/wp-content/uploads/2021/05/Coca-Cola-logo-500x281.png"
              />
            </a>
            <a href="https://aircash.eu/de/" target="_blank" rel="noopener noreferrer">
              <img
                  className="sponsorc"
                  alt="Aircash"
                  src="https://egt-digital.com/wp-content/uploads/2024/07/aircash-900x720-1.png"
              />
            </a>
            <a href="https://kaddur.at/" target="_blank" rel="noopener noreferrer">
              <img
                  className="sponsor"
                  alt="Kaddur"
                  src="https://kaddur.at/cdn/shop/files/Bildschirmfoto_2024-06-05_um_16.03.49.png?v=1717596335&width=500"
              />
            </a>
          </div>
        </div>
      </div>
  );
};

Sponsors.propTypes = {
  vWhite: PropTypes.string,
};
