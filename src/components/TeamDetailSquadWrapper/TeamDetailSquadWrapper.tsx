import React from "react";
import "./style.css";

interface Props {
  teamName: string;
  teamLogo: string; // URL for the team logo image
  className?: string; // Optional className for wrapper
}

export const TeamDetailSquadWrapper = ({
                                         teamName,
                                         teamLogo,
                                         className = "",
                                       }: Props): JSX.Element => {
  return (
      <div className={`team-detail-squad-wrapper ${className}`}>
        <div className="team-detail-team">
          <div className="team-detail-team-wrapper">
            <div className="team-detail-team-2">
              {/* Dynamic Team Logo */}
              <img src={teamLogo} alt={`${teamName} logo`} className="club-img" />

              <div className="team-detail-team-3">
                <div className="team-detail-team-4">
                  <div className="team-detail-squad-2">Aufstellung</div>
                  <div className="team-detail-squad-3">{teamName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
