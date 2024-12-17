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
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleNavigate = () => {
        navigate(`/news-detail/${id}`); // Navigate to /news-detail/{id}
    };

    return (
        <div
            className={`news-article ${className || ""}`}
            onClick={handleNavigate}
            style={{ cursor: "pointer" }} // Make it visually clickable
        >
            <div className="div-2">
                <img src={image} alt={title} className="news-article-img" />

                <div className="div-3">
                    <div className="title-3">{title}</div>
                    <p className="subtitle-3">{text}</p>
                </div>
            </div>
        </div>
    );
};
