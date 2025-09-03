import "./style.css";

interface Props {
  teamName: string;
  trikot: string;
  teamLogo: string; // URL for the team logo image
  assign: string; // Determines whether it's Heim or Auswärts
  className?: string; // Optional className for wrapper
}

export const TeamDetailSquadWrapper = ({
  teamName,
  teamLogo,
  trikot,
  className = "",
  assign = "",
}: Props): JSX.Element => {
  return (
    <div className={`team-detail-squad-wrapper ${className}`}>
      <div className="team-detail-team">
        <div className="team-detail-team-wrapper">
          <div className="team-detail-team-2">
            <div style={{ alignItems: "center", display: "flex" }}>
              {/* Dynamic Team Logo */}
              <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="club-img"
              />

              <div className="team-detail-team-3">
                <div className="team-detail-team-4">
                  {/* Conditional Text Based on Assign */}
                  <div className="h3_alt white">
                    {assign ? "Aufstellung (Heim)" : "Aufstellung (Auswärts)"}
                  </div>
                  <div className="h3_alt white">{teamName}</div>
                </div>
              </div>
            </div>

            {trikot && (
              <img
                src={trikot}
                alt={`${teamName} logo`}
                className="dress-img"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
