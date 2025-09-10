import { useNavigate } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import "./style.css";

interface PostponeProps {
  className?: string;
  playerName: string;      // mapped to requester.team_name
  playerImage: string;     // mapped to requester.logo
  teamName: string;        // mapped to requestee.team_name
  message: string;         // composed message text
  teamID: string;          // mapped to requestee.id
  status: string;          // "warten" | "akzeptiert" | "abgelehnt"
  origin: string;          // optional image url; safe to be empty
  teamImage: string;       // mapped to requestee.logo
  playerID: string;        // mapped to requester.id
  transferID: string;      // postpone.id
  onAccept: () => void;
  onReject: () => void;
}

export const Postpone = ({
  className = "",
  playerName,
  playerImage,
  teamName,
  message,
  teamID,
  playerID,
  status,
  origin,
  teamImage,
  transferID, // reserved; not used in view but may be handy for test-ids
  onAccept,
  onReject,
}: PostponeProps): JSX.Element => {
  const navigate = useNavigate();

  const handleTeamNavigation = () => {
    if (teamID) navigate(`/team-detail/${teamID}`);
  };

  const handlePlayerNavigation = () => {
    if (playerID) navigate(`/team-detail/${playerID}`); // requester is a team; keep route semantics
  };

  // Completed / not actionable
  if (status) {
    return (
      <div className="postpone-completed">
        <p>Diese Spielverlegungsanfrage ist bereits abgeschlossen.</p>
      </div>
    );
  }


  // Safe name split
  const [first = "", ...rest] = (playerName ?? "").trim().split(" ");
  const last = rest.join(" ");

  return (
    <div className={`postpone ${className}`} data-testid={`postpone-${transferID}`}>
      <div onClick={handlePlayerNavigation} className="player-bio" role="button" tabIndex={0}>
        <div className="card">
          <div className="background-shadow">
            <div className="player-detail-wrapper">
              {playerImage ? (
                <img
                  className="player-detail"
                  alt={`${playerName} Wappen`}
                  src={playerImage}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = "hidden")}
                />
              ) : (
                <div className="player-detail placeholder" />
              )}
            </div>

            <div className="card-data">
              <div className="card-data-wrapper">
                {/* origin (e.g., league/logo) only if provided */}
                {origin ? (
                  <img
                    className="logo-5"
                    alt="Wettbewerbslogo"
                    src={origin}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                  />
                ) : (
                  <div className="logo-5 placeholder" />
                )}

                <div className="content-2">
                  <p className="div-3">
                    <span className="text-wrapper-9">{first}</span>
                    {last && <span className="text-wrapper-10">{` ${last}`}</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="subtitle-2">
        {teamImage ? (
          <img
            className="logo-5"
            alt={`${teamName} Wappen`}
            src={teamImage}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        ) : (
          <span className="logo-5 placeholder" />
        )}

        <span
          className="text-wrapper-11"
          onClick={handleTeamNavigation}
          onKeyDown={(e) => (e.key === "Enter" ? handleTeamNavigation() : null)}
          role="button"
          tabIndex={0}
          style={{ cursor: teamID ? "pointer" : "default", textDecoration: teamID ? "underline" : "none" }}
        >
          {teamName || "Unbekanntes Team"}
        </span>

        {/* message should already be corrected in the parent mapper */}
        <span className="text-wrapper-12">{` ${message}`}</span>
      </p>

      <div className="buttons">
        <ActionButton title="JA" onClick={onAccept} />
        <ActionButton title="NEIN" onClick={onReject} />
      </div>
    </div>
  );
};
