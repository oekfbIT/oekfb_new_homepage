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
                <div className="text-wrapper-2">{title}</div>
            </div>

            <div className="p">{formattedContent}</div>
        </div>
    );
};


        // <div className={`paragraph-wrapper ${className}`}>
        //     <div className="div-wrapper">
        //         <div className="text-wrapper-2">{title}</div>
        //     </div>
        //
        //     <div className="div-wrapper">
        //         <p className="p">{content}</p>
        //     </div>
        // </div>

