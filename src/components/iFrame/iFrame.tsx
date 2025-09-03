// IFrame.tsx
// -------------------------------------------------------------
// Card that matches ActionCell's look & structure but shows a
// YouTube iframe instead of an <img>.
// Reuses the same class names as ActionCell:
//   .home__card, .home__cardLink, .home__mediaBox, .home__body
// -------------------------------------------------------------

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

type Props = {
  className?: string;
  title: string;
  subtitle: string;
  youtubeUrl: string;
  linkTo?: string;
};

// Convert common YouTube URLs to embed form (supports /watch and /shorts)
const getEmbedUrl = (url: string): string => {
  try {
    const u = new URL(url);
    // shorts
    if (u.pathname.includes("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    // standard
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    // already an embed or unknown → pass through
    return url;
  } catch {
    return "";
  }
};

export function IFrame({
  className = "",
  title,
  subtitle,
  youtubeUrl,
  linkTo = "#",
}: Props) {
  return (
    <article className={`home__card ${className}`}>
      <Link to={linkTo} className="home__cardLink" aria-label={`${title} – ${subtitle}`}>
        <div className="home__mediaBox home__mediaBox--iframe">
          <iframe
            className="home__iframe"
            src={getEmbedUrl(youtubeUrl)}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="home__body">
          <h3 className="h3">{title}</h3>
          <p className="p">{subtitle}</p>
        </div>
      </Link>
    </article>
  );
}

// (Optional) runtime validation
IFrame.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  youtubeUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};

export default IFrame;
