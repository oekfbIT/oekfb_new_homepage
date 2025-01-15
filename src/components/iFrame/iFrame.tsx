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

export const IFrame = ({
                           className = "",
                           title,
                           subtitle,
                           youtubeUrl,
                           linkTo = "#",
                       }: Props): JSX.Element => {
    return (
        <Link className={`action-cell ${className}`} to={linkTo} style={{width: "100%"}}>
            <div className="iframe-wrapper">
                <iframe
                    className="youtube-iframe"
                    src={youtubeUrl}
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
