import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
    className?: string;
    title: string;
    subtitle: string;
    youtubeUrl: string;
    linkTo: string;
}

// Function to convert YouTube URL to embed URL
const getEmbedUrl = (url: string): string => {
    try {
        const parsedUrl = new URL(url);

        // Handle shorts URL
        if (parsedUrl.pathname.includes("/shorts/")) {
            const videoId = parsedUrl.pathname.split("/shorts/")[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Handle standard YouTube URL
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url; // Return original URL if no valid video ID is found
    } catch (error) {
        console.error("Invalid YouTube URL:", error);
        return "";
    }
};

export const IFrame = ({
                           className = "",
                           title,
                           subtitle,
                           youtubeUrl,
                           linkTo = "#",
                       }: Props): JSX.Element => {
    return (
        <Link className={`action-cell ${className}`} to={linkTo} style={{ width: "100%" }}>
            <div className="iframe-wrapper">
                <iframe
                    className="youtube-iframe"
                    src={getEmbedUrl(youtubeUrl)}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="textwrapper">
                <div className="title-4">{title}</div>

                <p className="subtitle-4">{subtitle}</p>
            </div>
        </Link>
    );
};

IFrame.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    youtubeUrl: PropTypes.string.isRequired,
    linkTo: PropTypes.string,
};
