// Sponsors.tsx
// -------------------------------------------------------------
// Sponsors strip (title + row of logos).
// - Layout preserved 1:1 with your current version
// - Semantic class names (BEM-ish) + global tokens
// - Accessibility: descriptive alt, noopener, lazy imgs
// -------------------------------------------------------------

import PropTypes from "prop-types";
import "./style.css";

type Props = {
  className?: string;
  /** optional extra class for the container (kept for back-compat) */
  sponsorsContainerClassName?: string;
  /** legacy prop (unused visually but kept for API compatibility) */
  vWhite?: string;
};

export function Sponsors({
  className = "",
  sponsorsContainerClassName = "",
  vWhite = "/img/v-white-1.svg",
}: Props): JSX.Element {
  return (
    <section className={`sponsors ${className}`} aria-label="ÖKFB Sponsoren">
      <div className={`sponsors__panel ${sponsorsContainerClassName}`}>
        {/* Title line: OFFIZIELLE SPONSOREN DES ÖKFB */}
        <p className="sponsors__title">
          <span className="sponsors__titlePart">OFFIZIELLE</span>
          <span className="sponsors__titleHighlight">SPONSOREN</span>
          <span className="sponsors__titlePart"> DES ÖKFB</span>
        </p>

        {/* Logo row */}
        <div className="sponsors__list">
          <a
            href="https://at.coca-colahellenic.com/de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Coca-Cola HBC (öffnet in neuem Tab)"
          >
            <img
              className="sponsors__logo"
              alt="Coca-Cola HBC"
              loading="lazy"
              src="https://1000logos.net/wp-content/uploads/2021/05/Coca-Cola-logo-500x281.png"
            />
          </a>

          <a
            href="https://aircash.eu/de/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aircash (öffnet in neuem Tab)"
          >
            <img
              className="sponsors__logo sponsors__logo--wider"
              alt="Aircash"
              loading="lazy"
              src="https://careerdate.fer.hr/wp-content/uploads/2024/10/aircash-logo-red-pdf-1.png"
            />
          </a>

          <a
            href="https://erima.shop/oekfb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Erima (öffnet in neuem Tab)"
          >
            <img
              className="sponsors__logo"
              alt="Erima"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ferima.png?alt=media&token=37f57c16-fcd2-467b-a132-b6e5a179da2b"
            />
          </a>

          <a
            href="https://radosport.at/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Radosport (öffnet in neuem Tab)"
          >
            <img
              className="sponsors__logo"
              alt="Radosport"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fats.jpeg?alt=media&token=835dca80-9546-4c2e-9a4f-630fcdb53fce"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

Sponsors.propTypes = {
  vWhite: PropTypes.string,
};
export default Sponsors;
