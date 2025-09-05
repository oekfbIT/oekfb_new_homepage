import React from "react";
import "./style.css";

interface Props {
    className?: string;
    title: string;
    content: string | React.ReactNode;
}

export const ParagraphWrapper = ({ className = "", title, content }: Props): JSX.Element => {
    const formattedContent =
        typeof content === "string"
            ? content.split("\n").map((line, index) => (
                <p key={index} className="formatted-line">
                    {line.trim()}
                </p>
            ))
            : content;

    return (
        <div className={`paragraph-wrapper ${className}`}>
            <div className="div-wrapper">
                <div className="h3_alt">{title}</div>
            </div>

            <div className="t">{formattedContent}</div>
        </div>
    );
};

