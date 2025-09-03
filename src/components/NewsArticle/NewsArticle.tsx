import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  className?: string;
  title: string;
  image: string;
  text: string; // HTML string from CMS
  id: string;
}

/**
 * Single news card
 * - Clickable container that navigates to the full article
 * - Preserves basic HTML formatting from CMS in the excerpt
 */
export const NewsArticle = ({ className, title, image, text, id }: Props): JSX.Element => {
  const navigate = useNavigate();
  const openDetail = () => navigate(`/news-detail/${id}`);

  return (
    <article
      className={`news-card ${className || ""}`}
      onClick={openDetail}
      role="button"
      tabIndex={0}
      aria-label={title}
    >
      <div className="news-card__inner">
        <img src={image} alt={title} className="news-card__image" />

        <div className="news-card__content">
          <h3 className="h3">{title}</h3>

          {/* Render formatted text (bold/underline/italics) from CMS safely */}
          <div
            className="p news-card__excerpt"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </article>
  );
};
