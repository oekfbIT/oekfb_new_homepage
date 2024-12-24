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
            <span className="text-wrapper-2">PARTNER</span>
            <span className="span"> DES ÖKFB</span>
          </p>

          <div className="sponsors-container-2">
            <a href="https://www.sports-selection.at" target="_blank" rel="noopener noreferrer">
              <img
                  className="sportsselection"
                  alt="Sportsselection"
                  src="/img/sportsselection-2zlg-subl-g-t-1.png"
              />
            </a>

            <a href="https://www.westsidesoccer.at/" target="_blank" rel="noopener noreferrer">
              <img className="image-2" alt="Image" src="/img/image-1-1.png" />
            </a>

            <a href="https://www.veo.co/de" target="_blank" rel="noopener noreferrer">
              <img className="image-3" alt="Image" src="/img/image-2-1.png" />
            </a>

            <a href="https://www.minifootball.com/" target="_blank" rel="noopener noreferrer">
              <img className="image-4" alt="Image" src="/img/wmfLogo.png" />
            </a>

            <a href="https://www.minifootball.eu/" target="_blank" rel="noopener noreferrer">
              <img className="v-white" alt="V white" src={vWhite} />
            </a>
          </div>
        </div>
      </div>
  );
};

Partners.propTypes = {
  vWhite: PropTypes.string,
};
