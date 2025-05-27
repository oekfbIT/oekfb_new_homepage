import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  className?: string;
  title: string;
  image: string;
  text: string; // ISO date string
  id: string;
  youtubeUrl: string;
}

export const NewsRow = ({ className, title, image, text, id, youtubeUrl }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/news-detail/${id}`);
  };

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}: ${hours}:${minutes}`;
  };

  return (
    <div
      className={`news-row ${className || ""}`}
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      <div className="news-row-img-wrapper">
        <img src={image} alt={title} className="news-row-img" />
        {youtubeUrl && <div className="play-icon">▶</div>}
      </div>
      <div className="news-row-content">
        <div className="news-row-title">{title}</div>
        <div className="news-row-description">{formatDate(text)}</div>
      </div>
    </div>
  );
};
