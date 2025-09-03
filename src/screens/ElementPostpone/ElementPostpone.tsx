// ElementPostpone.jsx — mapped to new postpone API shape
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Postpone } from "../../components/Postpone";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementPostpone = () => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const { id } = useParams();
  const navigate = useNavigate();

  const clientController = useMemo(() => new ClientController(), []);

  const [postpone, setPostpone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Ungültige Postpone-ID.");
      setLoading(false);
      return;
    }

    const fetchPostpone = async () => {
      try {
        const response = await clientController.fetchPostpone(id);

        // Minimal shape validation for the new API
        if (!response?.requester?.team_name || !response?.requestee?.team_name) {
          setError("Keine gültigen Spielverlegungsdaten gefunden.");
          return;
        }

        setPostpone(response);
      } catch (e) {
        console.error("Fehler beim Laden der Spielverlegungsdaten:", e);
        setError("Fehler beim Laden der Spielverlegungsdaten.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostpone();
  }, [id, clientController]);

  const handleAccept = async () => {
    try {
      await clientController.approvePostpone(id);
      navigate("/");
    } catch (e) {
      console.error("Fehler beim Bestätigen der Spielverlegung:", e);
    }
  };

  const handleReject = async () => {
    try {
      await clientController.denyPostpone(id);
      navigate("/");
    } catch (e) {
      console.error("Fehler beim Ablehnen der Spielverlegung:", e);
    }
  };

  // Map new API -> legacy Postpone props (player/transfer naming kept for compatibility)
  const mappedProps = useMemo(() => {
    if (!postpone) return null;

    const requester = postpone.requester ?? {};
    const requestee = postpone.requestee ?? {};
    const match = postpone.match ?? {};

    const message =
      `${requester.team_name ?? "Ein Team"} hat Ihnen eine Spielverlegung angefragt. ` +
      `Wenn Sie annehmen, legt der Admin einen neuen Termin fest. ` +
      `Siehe Ligaordnung für Details.`;

    return {
      className: "postpone-card",
      // Treat "player*" as the requesting team (legacy prop names)
      playerName: requester.team_name ?? "",
      playerImage: requester.logo ?? "",
      // Treat "team*" as the receiving team
      teamName: requestee.team_name ?? "",
      teamID: requestee.id ?? "",
      // Legacy ids on the card
      transferID: postpone.id ?? "",
      playerID: requester.id ?? "",
      // Use API status if UI expects a status flag; default to false (pending)
      status: postpone.status ?? false,
      // Reuse "origin" to surface match id (or keep empty)
      origin: match.id ?? "",
      // If the card also shows the requestee crest
      teamImage: requestee.logo ?? "",
      message,
      onAccept: handleAccept,
      onReject: handleReject,
    };
  }, [postpone]);

  return (
    <div className="postpone-page">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <main className="postpone-content">
        {loading && (
          <div className="postpone-state postpone-loading">
            <h2 className="h2">⏳ Anfrage wird geladen…</h2>
          </div>
        )}

        {!loading && error && (
          <div className="postpone-state postpone-error">
            <p className="pb">{error}</p>
          </div>
        )}

        {!loading && !error && mappedProps && <Postpone {...mappedProps} />}
      </main>

      <Footer />
    </div>
  );
};
