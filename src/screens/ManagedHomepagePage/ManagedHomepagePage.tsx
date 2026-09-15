import { useCallback, useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";

type DocumentType = "kontakt" | "impressum" | "privacy";
type PageVariant = "contact" | "legal";

interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

interface LegalDocumentResponse {
  sections: LegalSection[];
}

interface Props {
  documentType: DocumentType;
  title: string;
  variant: PageVariant;
}

const clientController = new ClientController();

export const ManagedHomepagePage = ({ documentType, title, variant }: Props): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const [page, setPage] = useState<LegalSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPage = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await clientController.fetchLegalDocument(documentType) as LegalDocumentResponse;
      setPage(Array.isArray(response?.sections) ? response.sections[0] || null : null);
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : "Der Seiteninhalt konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [documentType]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  useEffect(() => {
    const refreshWhenActive = () => {
      if (window.document.visibilityState === "visible") loadPage();
    };
    window.addEventListener("focus", refreshWhenActive);
    window.document.addEventListener("visibilitychange", refreshWhenActive);
    return () => {
      window.removeEventListener("focus", refreshWhenActive);
      window.document.removeEventListener("visibilitychange", refreshWhenActive);
    };
  }, [loadPage]);

  const rootClass = variant === "contact" ? "element-contact-mobile" : "element-impressium-mobile";
  const panelClass = variant === "contact" ? "contact" : "impressium";
  const headerClass = variant === "contact" ? "contact-header" : "impressium-header";
  const contentClass = variant === "contact" ? undefined : "impressium-content";

  return (
    <div className={rootClass}>
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        <div className={panelClass}>
          <div className={headerClass}>
            <div className="title">{page?.heading || title}</div>
            <div className="sub_header">ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND</div>
          </div>

          <div className={contentClass}>
            {documentType === "privacy" && <section aria-labelledby="website-analytics-privacy">
              <h2 id="website-analytics-privacy">Website-Analyse mit Google Analytics</h2>
              <p className="t">Wenn du zustimmst, verwenden wir Google Analytics von Google Ireland Limited zur statistischen Auswertung unserer Website. Dabei werden unter anderem Seitenaufrufe, Nutzungsdauer, Gerätedaten und ausgewählte Interaktionen verarbeitet und Cookies gespeichert. Daten können auch auf Servern außerhalb der EU verarbeitet werden. Die Analyse startet erst nach deiner Einwilligung. Suchbegriffe, Formularinhalte und Verifizierungscodes werden von unserer Analyse-Integration nicht übertragen.</p>
              <p className="t">Deine Auswahl speichern wir für bis zu 180 Tage in deinem Browser. Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ widerrufen. Weitere Informationen zur Verarbeitung durch Google findest du in der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p>
            </section>}
            {loading && <p className="t">Inhalt wird geladen …</p>}
            {!loading && error && (
              <div role="alert">
                <p className="t">Der Inhalt konnte nicht geladen werden.</p>
                <button type="button" className="pb" onClick={loadPage}>Erneut versuchen</button>
              </div>
            )}
            {!loading && !error && !page && (
              <p className="t">Für diese Seite ist noch kein Inhalt hinterlegt.</p>
            )}
            {!loading && !error && page && (
              <p className="t" style={{ whiteSpace: "pre-wrap" }}>{page.content}</p>
            )}
          </div>
        </div>

        <Sponsors className="sponsors" vWhite="/img/v-white-1-3.svg" />
      </div>

      <Footer />
    </div>
  );
};
