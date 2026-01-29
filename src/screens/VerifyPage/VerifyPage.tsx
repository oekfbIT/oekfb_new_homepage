// VerifyPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import "./style.css";

type VerifyState =
  | { status: "idle" | "loading" }
  | { status: "success"; message?: string }
  | { status: "error"; message: string };

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;

  if (typeof err === "object" && err !== null) {
    const e = err;
    // axios-ish shape
    // @ts-expect-error - tolerate unknown error shapes
    const msg =
      e?.response?.data?.message ??
      e?.response?.data?.error ??
      e?.response?.statusText;
    if (typeof msg === "string" && msg.trim().length > 0) return msg;
  }

  return "Verifizierung fehlgeschlagen. Bitte versuche es später erneut.";
}

export const VerifyPage = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const { id } = useParams<{ id: string }>();
  const controller = useMemo(() => new ClientController(), []);

  const [state, setState] = useState<VerifyState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!id) {
        setState({
          status: "error",
          message:
            "Ungültiger Verifizierungslink. Bitte überprüfe den Link in deiner E-Mail oder fordere einen neuen an.",
        });
        return;
      }

      setState({ status: "loading" });

      try {
        const res = await controller.verifyUserEmail(id);
        if (cancelled) return;

        const backendMsg =
          typeof res?.message === "string" ? res.message : undefined;

        setState({
          status: "success",
          message:
            backendMsg ?? "Deine E-Mail-Adresse wurde erfolgreich bestätigt.",
        });
      } catch (e) {
        if (cancelled) return;
        setState({ status: "error", message: toErrorMessage(e) });
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [controller, id]);

  const title =
    state.status === "success"
      ? "E-Mail bestätigt ✅"
      : state.status === "error"
        ? "Verifizierung fehlgeschlagen"
        : "E-Mail wird bestätigt…";

  const subtitle =
    state.status === "success"
      ? (state.message ?? "Deine E-Mail-Adresse wurde bestätigt.")
      : state.status === "error"
        ? state.message
        : "Bitte einen Moment warten.";

  return (
    <div className="element-app-page">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        <div className="verifyBox">
          <div className="verifyCard">
            <div className="verifyCard__header">
              <h2 className="verifyCard__title">{title}</h2>
              <p className="verifyCard__subtitle">{subtitle}</p>
            </div>

            {state.status === "loading" && (
              <div className="verifyCard__body">
                <div className="verifySpinner" aria-label="Loading" />
                <div className="verifyHint">Bitte nicht schließen…</div>
              </div>
            )}

            {(state.status === "success" || state.status === "error") && (
              <div className="verifyCard__body">
                <div
                  className={
                    state.status === "success"
                      ? "verifyBadge verifyBadge--success"
                      : "verifyBadge verifyBadge--error"
                  }
                >
                  {state.status === "success" ? "Bestätigt" : "Fehler"}
                </div>

                <div className="verifyActions">
                  <a className="verifyBtn" href="/#/app">
                    Zur App-Übersicht
                  </a>

                  {state.status === "error" && id && (
                    <button
                      className="verifyBtn verifyBtn--secondary"
                      type="button"
                      onClick={() => {
                        setState({ status: "loading" });
                        controller
                          .verifyUserEmail(id)
                          .then((res) => {
                            const backendMsg =
                              typeof res?.message === "string"
                                ? res.message
                                : undefined;
                            setState({
                              status: "success",
                              message:
                                backendMsg ??
                                "Deine E-Mail-Adresse wurde erfolgreich bestätigt.",
                            });
                          })
                          .catch((e) =>
                            setState({
                              status: "error",
                              message: toErrorMessage(e),
                            }),
                          );
                      }}
                    >
                      Erneut versuchen
                    </button>
                  )}
                </div>

                <div className="verifyFootnote">
                  Wenn du weiterhin Probleme hast, schreib an{" "}
                  <a className="verifyLink" href="mailto:support@oekfb.eu">
                    support@oekfb.eu
                  </a>
                  .
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
