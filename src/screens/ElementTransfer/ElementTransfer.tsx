import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Transfer } from "../../components/Transfer";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";

import "./style.css";

export const ElementTransfer = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const { id } = useParams();

    const [transfer, setTransfer] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const clientController = new ClientController();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔍 Mounted with transfer ID:", id);

        if (!id) {
            setError("Ungültige Transfer-ID.");
            setLoading(false);
            return;
        }

        const fetchTransfer = async () => {
            try {
                const response = await clientController.fetchTransfer(id);
                console.log("✅ Fetched transfer:", response);

                if (!response || !response.playerName) {
                    setError("Keine gültigen Transferdaten gefunden.");
                    return;
                }

                setTransfer(response);
            } catch (error) {
                console.error("❌ Fehler beim Laden der Transferdaten:", error);
                setError("Fehler beim Laden der Transferdaten.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransfer();
    }, [id]);

    const handleAccept = async () => {
        try {
            await clientController.confirmTransfer(id);
            console.log("✅ Transfer accepted");
            navigate(`/player-detail/${transfer.player}`);
        } catch (error) {
            console.error("❌ Fehler beim Bestätigen des Transfers:", error);
        }
    };

    const handleReject = async () => {
        try {
            await clientController.rejectTransfer(id);
            console.log("✅ Transfer abgelehnt");
            navigate(`/player-detail/${transfer.player}`);
        } catch (error) {
            console.error("❌ Fehler beim Ablehnen des Transfers:", error);
        }
    };

    return (
        <div className="element-transfer">
            {isMobile ? <Navigation /> : <DesktopNav />}

            {loading ? (
                <div style={{ padding: 24, textAlign: "center" }}>
                    <h2>⏳ Transfer wird geladen...</h2>
                </div>
            ) : error ? (
                <div style={{ padding: 24, textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                </div>
            ) : (
                <Transfer
                    className="transfer-confirmation"
                    playerName={transfer.playerName}
                    playerImage={transfer.playerImage}
                    teamName={transfer.teamName}
                    teamID={transfer.team}
                    transferID={transfer._id}
                    playerID={transfer.player}
                    status={transfer.status}
                    origin={transfer.originImage ?? ""} // fallback if null
                    teamImage={transfer.teamImage}
                    message="hat dir eine Anfrage geschickt, ihrer Mannschaft beizutreten und deine derzeitige zu verlassen. Willst du diese Anfrage annehmen?"
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}

            <Footer />
        </div>
    );
};
