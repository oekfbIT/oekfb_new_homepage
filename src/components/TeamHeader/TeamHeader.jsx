import React from "react";
import "./style.css";

export const TeamHeader = ({
                             team,
                             className,
                             teamDetailClassName,
                             teamDetailClassNameOverride,
                           }) => {
  if (!team) return null;

  const { team_name, logo, trikot } = team;

  return (
      <div className={`team-header ${className}`}>
        <div className={`team-detail ${teamDetailClassName}`}>
          <div className="team-detail-header">
            <div className="team-detail-header-wrapper">
              <div className="team-detail-header-2">
                <img className="image-2" alt="Image" src={team.logo}
                     style={{backgroundColor: "white", padding: "5px", objectFit: "contain"}}/>

                <div className="team-detail-header-3">
                  <div className="team-detail-text">
                    <div className="team-detail-text-2">{team_name?.toUpperCase()}</div>

                    <div className="team-detail-text-3">
                      Mitglied Seit: {team.membership_since?.toUpperCase() || "SAISON 2024/2025"}
                    </div>
                  </div>

                  <div className="team-detail-header-4">
                    <img
                        className="team-detail-header-5"
                        alt="Team detail header"
                        src={trikot.home}
                    />

                    <img
                        className="team-detail-header-5"
                        alt="Team detail header"
                        src={trikot.away}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="team-detail-wrapper">
            <div className="team-detail-2">
              <div className="team-detail-scroll">
                <div className="team-detail-3">SQUAD</div>
                <div className="team-detail-4">TABLE</div>
                <div className="team-detail-4">FIXTURES &amp; RESULTS</div>
                <div className="team-detail-4">STATS</div>
                <div className={`team-detail-4 ${teamDetailClassNameOverride}`}>
                  NEWS &amp; VIDEOS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
