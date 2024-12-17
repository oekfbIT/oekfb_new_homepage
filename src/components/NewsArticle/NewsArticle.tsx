import React from "react";
import "./style.css";

interface Props {
    className?: string;
    title: string;
    image: string;
    text: string;
}

export const NewsArticle = ({ className, title, image, text }: Props): JSX.Element => {
    return (
        <div className={`news-article ${className || ""}`}>
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
