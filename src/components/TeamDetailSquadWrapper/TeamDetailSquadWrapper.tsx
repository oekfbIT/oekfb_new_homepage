import React from "react";
import "./style.css";

interface Props {
    teamName: string;
    teamLogo: string; // URL for the team logo image
    assign: string; // Determines whether it's Heim or Auswärts
    className?: string; // Optional className for wrapper
}

export const TeamDetailSquadWrapper = ({
                                           teamName,
                                           teamLogo,
                                           className = "",
                                           assign = "",
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
                                {/* Conditional Text Based on Assign */}
                                <div className="team-detail-squad-2">
                                    {assign ? "Aufstellung (Heim)" : "Aufstellung (Auswärts)"}
                                </div>
                                <div className="team-detail-squad-3">{teamName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
