import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { ParagraphWrapper } from "../../components/ParagraphWrapper";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import "../ElementLigaordnung/style.css";

export type LegalDocumentType = "regeln" | "ligaordnung" | "bund";

interface LegalSection {
  id: string;
  position: number;
  heading: string;
  title: string;
  content: string;
}

interface LegalDocumentResponse {
  document_type: LegalDocumentType;
  updated_at?: string;
  sections: LegalSection[];
}

interface Props {
  documentType: LegalDocumentType;
  title: string;
  intro: string;
}

const clientController = new ClientController();

export const LegalDocumentPage = ({ documentType, title, intro }: Props): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const [document, setDocument] = useState<LegalDocumentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const loadDocument = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await clientController.fetchLegalDocument(documentType);
      setDocument(response as LegalDocumentResponse);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Die Inhalte konnten nicht geladen werden.",
      );
    } finally {
      setLoading(false);
    }
  }, [documentType]);

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  useEffect(() => {
    const refreshWhenActive = () => {
      if (window.document.visibilityState === "visible") {
        loadDocument();
      }
    };

    window.addEventListener("focus", refreshWhenActive);
    window.document.addEventListener("visibilitychange", refreshWhenActive);
    return () => {
      window.removeEventListener("focus", refreshWhenActive);
      window.document.removeEventListener("visibilitychange", refreshWhenActive);
    };
  }, [loadDocument]);

  const lastChanged = document?.updated_at
    ? new Intl.DateTimeFormat("de-AT", { dateStyle: "long" }).format(
        new Date(document.updated_at),
      )
    : null;

  return (
    <div className="element-ligaordnung">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="content-frame">
        <div className="page-content">
          <div className="terms">
            <div className="terms-header-wrapper">
              <p className="title">{title}</p>
              <div className="div-wrapper-2">
                <p className="h3_alt">{intro}</p>
              </div>
            </div>

            {loading && <p className="h3_alt">Inhalte werden geladen …</p>}

            {!loading && error && (
              <div className="legal-document-error" role="alert">
                <p className="h3_alt">Die Inhalte konnten nicht geladen werden.</p>
                <p>{error}</p>
                <button className="pb" type="button" onClick={loadDocument}>
                  Erneut versuchen
                </button>
              </div>
            )}

            {!loading && !error && document?.sections.length === 0 && (
              <p className="h3_alt">Für diese Seite sind noch keine Inhalte hinterlegt.</p>
            )}

            {!loading && !error && document && document.sections.length > 0 && (
              <>
                <div className="table-of-contents">
                  <ul className="toc-list">
                    {document.sections.map((section) => (
                      <li key={section.id}>
                        <button
                          className="pb"
                          type="button"
                          onClick={() => sectionRefs.current[section.id]?.scrollIntoView({
                            behavior: "smooth",
                          })}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {document.sections.map((section) => (
                  <div
                    key={section.id}
                    ref={(node) => {
                      sectionRefs.current[section.id] = node;
                    }}
                    className="paragraph-section"
                  >
                    <ParagraphWrapper
                      className="custom-class"
                      title={section.title}
                      content={section.content}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {lastChanged && (
            <p className="h3_alt legal-document-updated">
              Letzte Änderung: {lastChanged}
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
