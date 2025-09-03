// ElementTransfer.jsx — refactored for readability (plain JS), tokens-first styling
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Transfer } from "../../components/Transfer";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementTransfer = () => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const { id } = useParams();
  const navigate = useNavigate();

  // Avoid re-instantiating controller on each render
  const clientController = useMemo(() => new ClientController(), []);

  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Guard invalid route params early
    if (!id) {
      setError("Ungültige Transfer-ID.");
      setLoading(false);
      return;
    }

    const fetchTransfer = async () => {
      try {
        const response = await clientController.fetchTransfer(id);
        if (!response || !response.player_name) {
          setError("Keine gültigen Transferdaten gefunden.");
          return;
        }
        setTransfer(response);
      } catch (e) {
        console.error("Fehler beim Laden der Transferdaten:", e);
        setError("Fehler beim Laden der Transferdaten.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransfer();
  }, [id, clientController]);

  // Actions (preserve behavior)
  const handleAccept = async () => {
    try {
      await clientController.confirmTransfer(id);
      navigate(`/player-detail/${transfer.player}`);
    } catch (e) {
      console.error("Fehler beim Bestätigen des Transfers:", e);
    }
  };

  const handleReject = async () => {
    try {
      await clientController.rejectTransfer(id);
      navigate(`/player-detail/${transfer.player}`);
    } catch (e) {
      console.error("Fehler beim Ablehnen des Transfers:", e);
    }
  };

  return (
    <div className="transfer-page">
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Content wrapper keeps max-width and centers content */}
      <main className="transfer-content">
        {loading && (
          <div className="transfer-state transfer-loading">
            <h2 className="h2">⏳ Transfer wird geladen…</h2>
          </div>
        )}

        {!loading && error && (
          <div className="transfer-state transfer-error">
            <p className="pb">{error}</p>
          </div>
        )}

        {!loading && !error && transfer && (
          <Transfer
            className="transfer-card"
            playerName={transfer.player_name}
            playerImage={transfer.player_image}
            teamName={transfer.team_name}
            teamID={transfer.team}
            transferID={transfer.id}
            playerID={transfer.player}
            status={transfer.status}
            origin={transfer.origin_image ?? ""}
            teamImage={transfer.team_image}
            message="hat dir eine Anfrage geschickt, ihrer Mannschaft beizutreten und deine derzeitige zu verlassen. Willst du diese Anfrage annehmen?"
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};
