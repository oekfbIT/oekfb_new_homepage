import React from "react";
import "./style.css";

interface ActionButtonProps {
    className?: string;
    actionButtonClassName?: string;
    title: string;
    onClick: () => void;
}

export const ActionButton = ({
                                 className = "",
                                 actionButtonClassName = "",
                                 title,
                                 onClick,
                             }: ActionButtonProps): JSX.Element => {
    return (
        <div className={`action-button ${className}`} onClick={onClick}>
            <div className={`button-title-wrapper ${actionButtonClassName}`}>
                <div className="button-title">{title}</div>
            </div>
        </div>
    );
};
