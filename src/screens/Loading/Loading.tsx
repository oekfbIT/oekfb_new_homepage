import React from "react";
import "./style.css";

interface Props {
    message?: string;
}

export const Loading = ({ message = "Loading..." }: Props): JSX.Element => {
    return (
        <div className="loading-container">
            <p className="loading-text">{message}</p>
        </div>
    );
};
