import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface Club {
    id: string;
    logo: string;
    team_name: string;
    sid: string;
}

interface ClubCardProps {
    className?: string;
    club: Club;
}

export const ClubCard = ({ className, club }: ClubCardProps): JSX.Element => {
    const navigate = useNavigate(); // React Router hook for navigation

    const handleNavigation = () => {
        navigate(`/team-detail/${club.id}`);
    };

    return (
        <div className={`club-card ${className}`} onClick={handleNavigation}>
            <div className="club-card-content" style={{ cursor: "pointer" }}>
                <div className="image-wrapper">
                    <img src={club.logo} alt={club.team_name} className="image-6" />
                </div>
                <div className="club-card-content-2">
                    <div className="club-card-content-3">{club.team_name}</div>
                    <p className="club-card-content-4">{`ID: ${club.sid}`}</p>
                </div>
            </div>
        </div>
    );
};
