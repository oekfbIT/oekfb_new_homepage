import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import ClientController from "../../network/ClientController";
import "./style.css";

interface TransferProps {
    className?: string;
    playerName: string;
    playerImage: string;
    teamName: string;
    message: string;
    teamID: string;
    status: string;
    playerID: string;
    transferID: string;
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
                             transferID,
                         }: TransferProps): JSX.Element => {
    const navigate = useNavigate();
    const clientController = new ClientController();

    const handleTeamNavigation = () => {
        navigate(`/team-detail/${teamID}`);
    };

    const handlePlayerNavigation = () => {
        navigate(`/player-detail/${playerID}`);
    };

    const handleAccept = async () => {
        try {
            await clientController.confirmTransfer(transferID);
            console.log("Transfer accepted successfully");
            navigate("/"); // Navigate to home after successful confirmation
        } catch (error) {
            console.error("Error confirming transfer:", error);
        }
    };

    const handleReject = async () => {
        try {
            await clientController.rejectTransfer(transferID);
            console.log("Transfer rejected successfully");
            navigate("/"); // Navigate to home after successful rejection
        } catch (error) {
            console.error("Error rejecting transfer:", error);
        }
    };

    if (status !== "warten") {
        return (
            <div className="transfer-completed">
                <p>Diese Transferanfrage ist schon abgeschlossen.</p>
            </div>
        );
    }

    return (
        <div className={`transfer ${className}`}>
            <div onClick={handlePlayerNavigation}
                className="player-bio">
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
        <span
            className="text-wrapper-11"
            onClick={handleTeamNavigation}
            style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {teamName}
        </span>
                <span className="text-wrapper-12">{` ${message}`}</span>
            </p>

            <div className="buttons">
                <ActionButton title="JA" onClick={handleAccept} />
                <ActionButton title="NEIN" onClick={handleReject} />
            </div>
        </div>
    );
};
