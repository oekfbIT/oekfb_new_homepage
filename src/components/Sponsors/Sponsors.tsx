/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
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
                  src="https://careerdate.fer.hr/wp-content/uploads/2024/10/aircash-logo-red-pdf-1.png"
              />
            </a>
            <a href="https://www.erima.at/" target="_blank" rel="noopener noreferrer">
              <img
                  className="sponsor"
                  alt="Erima"
                  src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ferima.png?alt=media&token=37f57c16-fcd2-467b-a132-b6e5a179da2b"
              />
            </a>
            <a href="https://radosport.at/" target="_blank" rel="noopener noreferrer">
              <img
                  className="sponsor"
                  alt="Radosport"
                  src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fats.jpeg?alt=media&token=835dca80-9546-4c2e-9a4f-630fcdb53fce"
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
