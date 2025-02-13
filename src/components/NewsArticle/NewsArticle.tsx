import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
    className?: string;
    title: string;
    image: string;
    text: string;
    id: string;
}

export const NewsArticle = ({ className, title, image, text, id }: Props): JSX.Element => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/news-detail/${id}`);
    };

    return (
        <div
            className={`news-article ${className || ""}`}
            onClick={handleNavigate}
            style={{ cursor: "pointer" }}
        >
            <div className="div-2">
                <img src={image} alt={title} className="news-article-img" />

                <div className="div-3">
                    <div className="title-3">{title}</div>

                    {/* Ensure formatted text (bold, underline, etc.) renders correctly */}
                    <div className="subtitle-3" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
            </div>
        </div>
    );
};
