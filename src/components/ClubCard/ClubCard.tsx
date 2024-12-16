import React from "react";
import "./style.css";

interface ClubCardProps {
  className?: string;
  club: object;
}

export const ClubCard = ({ className, club }: ClubCardProps): JSX.Element => {
  return (
      <div className={`club-card ${className}`}>
        <div className="club-card-content">
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
