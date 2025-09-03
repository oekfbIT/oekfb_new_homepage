// Partners.tsx
// -------------------------------------------------------------
// OFFIZIELLE PARTNER DES ÖKFB
// - Layout preserved 1:1 from your original
// - BEM-ish class names + global tokens
// - A11y: aria-labels, noopener, lazy images
// -------------------------------------------------------------

import PropTypes from "prop-types";
import "./style.css";

type Props = {
  className?: string;
  sponsorsContainerClassName?: string; // kept for back-compat
  vWhite?: string;
};

export function Partners({
  className = "",
  sponsorsContainerClassName = "",
  vWhite = "https://www.minifootball.eu/wp-content/uploads/2024/09/cropped-v_blue.png",
}: Props): JSX.Element {
  return (
    <section className={`partners ${className}`} aria-label="ÖKFB Partner">
      <div className={`partners__panel ${sponsorsContainerClassName}`}>
        {/* Title */}
        <p className="partners__title">
          <span className="partners__titlePart">OFFIZIELLE </span>
          <span className="partners__titleHighlight">PARTNER</span>
          <span className="partners__titlePart"> DES ÖKFB</span>
        </p>

        {/* Logos list */}
        <div className="partners__list">
          <a
            href="https://www.sports-selection.at"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sportsselection (öffnet in neuem Tab)"
          >
            <img
              className="partners__logo partners__logo--sportsselection"
              alt="Sportsselection"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fsportsselection-2zlg-subl-g-t-1.png?alt=media&token=eb2816ab-9b72-43ca-8a95-8aef1282ddbf"
            />
          </a>

          <a
            href="https://www.westsidesoccer.at/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Westside Soccer (öffnet in neuem Tab)"
          >
            <img
              className="partners__logo partners__logo--westsidesoccer"
              alt="Westside Soccer"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fimage-1-1.png?alt=media&token=aaa1f15a-378e-40aa-990c-497d950b9b5d"
            />
          </a>

          <a
            href="https://www.veo.co/de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Veo (öffnet in neuem Tab)"
          >
            <img
              className="partners__logo partners__logo--veo"
              alt="Veo"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fimage-2-1.png?alt=media&token=93cda297-1700-4e81-b782-99f746ec29a4"
            />
          </a>

          <a
            href="https://www.minifootball.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WMF (öffnet in neuem Tab)"
          >
            <img
              className="partners__logo partners__logo--wmf"
              alt="WMF"
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2FwmfLogo.png?alt=media&token=1508d0ab-bfc8-4126-aebc-10c43acf2b48"
            />
          </a>

          <a
            href="https://www.minifootball.eu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="EMF (öffnet in neuem Tab)"
          >
            <img
              className="partners__logo partners__logo--emf"
              alt="EMF"
              loading="lazy"
              src={vWhite}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

Partners.propTypes = {
  vWhite: PropTypes.string,
};

export default Partners;
