import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface LeagueSelectionProps {
    className: string;
    name: string;
    teams: number;
}

export const LeagueSelection = ({
                                    className,
                                    name,
                                    teams,
                                }: LeagueSelectionProps): JSX.Element => {
    return (
        <Link className={`league-selection ${className}`} to="/homepage">
            <div className="name">{name}</div>
            <div className="subtitle">{teams} TEAMS</div>
        </Link>
    );
};
