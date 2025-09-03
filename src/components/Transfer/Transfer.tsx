import { useNavigate } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import "./style.css";

interface TransferProps {
    className?: string;
    playerName: string;
    playerImage: string;
    teamName: string;
    message: string;
    teamID: string;
    status: string;
    origin: string;
    teamImage: string;
    playerID: string;
    transferID: string;
    onAccept: () => void;
    onReject: () => void;
}

export const Transfer = ({
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
                         }: TransferProps): JSX.Element => {
    const navigate = useNavigate();

    const handleTeamNavigation = () => {
        navigate(`/team-detail/${teamID}`);
    };

    const handlePlayerNavigation = () => {
        navigate(`/player-detail/${playerID}`);
    };

    // If the transfer status is not "warten", the transfer is already completed.
    if (status !== "warten") {
        return (
            <div className="transfer-completed">
                <p>Diese Transferanfrage ist schon abgeschlossen.</p>
            </div>
        );
    }

    return (
        <div className={`transfer ${className}`}>
            <div onClick={handlePlayerNavigation} className="player-bio">
                <div className="card">
                    <div className="background-shadow">
                        <div className="player-detail-wrapper">
                            <img
                                className="player-detail"
                                alt={`${playerName} detail`}
                                src={playerImage}
                            />
                        </div>
                        <div className="card-data">
                            <div className="card-data-wrapper">
                                <div className="logo-5" />
                                <div className="content-2">
                                    <img
                                        className="logo-5"
                                        alt={`${origin} `}
                                        src={origin}
                                    />

                                    <div className="div-3">2</div>
                                    <p className="div-3">
                    <span className="text-wrapper-9">
                      {playerName.split(" ")[0]}
                    </span>
                                        <span className="text-wrapper-10">
                      {` ${playerName.split(" ").slice(1).join(" ")}`}
                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="subtitle-2">
                <img
                    className="logo-5"
                    alt={`${teamImage} `}
                    src={teamImage}
                />
                <span
                    className="text-wrapper-11"
                    onClick={handleTeamNavigation}
                    style={{cursor: "pointer", textDecoration: "underline"}}
                >
          {teamName}
        </span>
                <span className="text-wrapper-12">{` ${message}`}</span>
            </p>

            <div className="buttons">
                <ActionButton title="JA" onClick={onAccept}/>
                <ActionButton title="NEIN" onClick={onReject}/>
            </div>
        </div>
    );
};
