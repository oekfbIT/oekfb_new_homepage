// ElementPostpone.jsx — mapped to new postpone API shape
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const clientController = useMemo(() => new ClientController(), []);

  const [postpone, setPostpone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id || !token) {
      setError("Dieser Bestätigungslink ist ungültig. Bitte verwenden Sie den vollständigen Link aus der E-Mail.");
      setLoading(false);
      return;
    }

    const fetchPostpone = async () => {
      try {
        const response = await clientController.fetchPostpone(id, token);

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
  }, [id, token, clientController]);

  const handleAccept = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      setPostpone(await clientController.approvePostpone(id, token));
    } catch (e) {
      setError(e.message || "Die Spielverlegung konnte nicht bestätigt werden.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      setPostpone(await clientController.denyPostpone(id, token));
    } catch (e) {
      setError(e.message || "Die Spielverlegung konnte nicht abgelehnt werden.");
    } finally {
      setSubmitting(false);
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
  }, [postpone, submitting]);

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
