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
        <div className={`hero ${className}`} style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat", /* Prevent tiling */
            backgroundPosition: "top left", /* Align to top-left */
            width: "100%", /* or a specific width */
            // minHeight: "430px",
            aspectRatio: "4 / 3", // Aspect ratio for mobile

        }}>
            <div className="overlay">
                <p className="subheader">{description}</p>
                <div className="header-2">{title}</div>
            </div>
        </div>
    );
};
