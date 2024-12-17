import React from "react";
import "./style.css";

interface Props {
    className?: string;
    title: string;
    description: string;
    image: string;
}

export const Hero = ({ className, title, description, image }: Props): JSX.Element => {
    return (
        <div className={`hero ${className}`} style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay">
                <p className="subheader">{description}</p>
                <div className="header-2">{title}</div>
            </div>
        </div>
    );
};
