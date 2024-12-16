import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface LeagueSelectionProps {
    className: string;
    name: string;
    teams: number;
    onClick?: () => void;
}

export const LeagueSelection = ({
                                    className,
                                    name,
                                    teams,
                                    onClick,
                                }: LeagueSelectionProps): JSX.Element => {
    return (
        <div className={`league-selection ${className}`} onClick={onClick}>
            <div className="name">{name}</div>
            <div className="subtitle">{teams} TEAMS</div>
        </div>
    );
};
