import { useNavigate } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import "./style.css";

interface PostponeProps {
  className?: string;
  playerName: string;      // requester.team_name
  playerImage: string;     // requester.logo
  teamName: string;        // requestee.team_name
  message: string;         // composed message text
  teamID: string;          // requestee.id
  status: string;          // "warten" | "akzeptiert" | "abgelehnt"
  origin: string;          // optional image url
  teamImage: string;       // requestee.logo
  playerID: string;        // requester.id (team id)
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
  transferID,
  onAccept,
  onReject,
}: PostponeProps): JSX.Element => {
  const navigate = useNavigate();

  const handleTeamNavigation = () => {
    if (teamID) navigate(`/team-detail/${teamID}`);
  };

  const handlePlayerNavigation = () => {
    if (playerID) navigate(`/team-detail/${playerID}`); // requester is a team
  };

  if (!status) {
    return (
      <div className="postpone-completed">
        <p>Diese Spielverlegungsanfrage ist bereits abgeschlossen.</p>
      </div>
    );
  }

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

        <span className="text-wrapper-12">{` ${message}`}</span>
      </p>

      <div className="buttons">
        <ActionButton title="JA" onClick={onAccept} />
        <ActionButton title="NEIN" onClick={onReject} />
      </div>
    </div>
  );
};
