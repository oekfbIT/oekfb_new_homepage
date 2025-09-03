// ActionCell.tsx
// -------------------------------------------------------------
// Clickable card with image, title, subtitle.
// - Named + default export (so index.ts can `export { ActionCell }`)
// - Uses global tokens via CSS
// -------------------------------------------------------------

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

type Props = {
  className?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkTo?: string;
};

function ActionCell({ className = "", title, subtitle, imageUrl, linkTo = "#" }: Props) {
  return (
    <article className={`home__card ${className}`}>
      <Link to={linkTo} className="home__cardLink" aria-label={`${title} – ${subtitle}`}>
        <div className="home__mediaBox">
          <img src={imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="home__body">
          <h3 className="h3">{title}</h3>
          <p className="p">{subtitle}</p>
        </div>
      </Link>
    </article>
  );
}

// Optional: keep PropTypes for runtime validation even though we're in TS
ActionCell.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};

export { ActionCell }; // <-- named export
export default ActionCell;       // <-- default export
