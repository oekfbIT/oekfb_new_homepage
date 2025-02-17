import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Transfer } from "../../components/Transfer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import { useWindowWidth } from "../../breakpoints";

import "./style.css";

export const ElementTransfer = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const { transferID } = useParams<{ transferID: string }>();

    const [transfer, setTransfer] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const clientController = new ClientController();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransfer = async () => {
            try {
                const response = await clientController.fetchTransfer(transferID);
                if (!response) {
                    setError("Keine gültigen Transferdaten gefunden.");
                    return;
                }
                setTransfer(response);
            } catch (error) {
                setError("Fehler beim Laden der Transferdaten.");
            } finally {
                setLoading(false);
            }
        };

        if (transferID) {
            fetchTransfer();
        }
    }, [transferID]);

    const handleAccept = async () => {
        try {
            await clientController.confirmTransfer(transferID);
            console.log("Transfer accepted successfully");
            navigate(`/player-detail/${transfer.player}`);
        } catch (error) {
            console.error("Error confirming transfer:", error);
        }
    };

    const handleReject = async () => {
        try {
            await clientController.rejectTransfer(transferID);
            console.log("Transfer rejected successfully");
            navigate(`/player-detail/${transfer.player}`);
        } catch (error) {
            console.error("Error rejecting transfer:", error);
        }
    };

    return (
        <div className="element-transfer">
            {isMobile ? <Navigation /> : <DesktopNav />}

            {loading ? (
                <p>Laden...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Transfer
                    className="transfer-confirmation"
                    // Map the API response keys to the expected prop names
                    playerName={transfer.player_name}
                    playerImage={transfer.player_image}
                    teamName={transfer.team_name}
                    teamID={transfer.team}
                    transferID={transfer.id}
                    playerID={transfer.player}
                    status={transfer.status}
                    origin={transfer.origin_image}
                    teamImage={transfer.team_image}
                    message="hat dir eine Anfrage geschickt, ihrer Mannschaft beizutreten und deine derzeitige zu verlassen. Willst du diese Anfrage annehmen?"
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}

            <Footer />
        </div>
    );
};
