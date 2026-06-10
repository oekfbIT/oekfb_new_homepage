import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

const PEOPLE_EVENT_ID = "BBE0F77D-6377-408E-BFB6-542904D48B6F";
const API_BASE_URL = "https://api.oekfb.eu/";

type RegistrationFormState = {
  name: string;
  team: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  notes: string;
};

type RegistrationResponse = {
  id?: string;
  eventID?: string;
  name?: string;
  team?: string;
  email?: string;
  phone?: string;
  numberOfPeople?: number;
  status?: string;
  notes?: string;
  created?: string;
};

const initialFormState: RegistrationFormState = {
  name: "",
  team: "",
  email: "",
  phone: "",
  numberOfPeople: "1",
  notes: "",
};

export const EventRegistration = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 800;

  const [formData, setFormData] =
    useState<RegistrationFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] =
    useState<RegistrationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEventIdPlaceholder = useMemo(
    () => PEOPLE_EVENT_ID.includes("PASTE_PEOPLE_EVENT_ID_HERE"),
    [],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setSuccessResponse(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    if (isEventIdPlaceholder) {
      setErrorMessage(
        "Bitte zuerst die PEOPLE_EVENT_ID im EventRegistration Component mit der echten Event-ID aus dem Admin ersetzen.",
      );
      return;
    }

    const trimmedName = formData.name.trim();
    const peopleCount = Number(formData.numberOfPeople || "1");

    if (!trimmedName) {
      setErrorMessage("Bitte gib deinen Namen ein.");
      return;
    }

    if (!Number.isFinite(peopleCount) || peopleCount < 1) {
      setErrorMessage("Die Anzahl der Personen muss mindestens 1 sein.");
      return;
    }

    const payload = {
      name: trimmedName,
      team: formData.team.trim() || undefined,
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      numberOfPeople: peopleCount,
      status: "open",
      notes: formData.notes.trim() || undefined,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/people-events/${PEOPLE_EVENT_ID}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const responseText = await response.text();
      let responseData: any = null;

      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = null;
      }

      if (!response.ok) {
        throw new Error(
          responseData?.reason ||
            responseData?.message ||
            responseText ||
            "Die Anmeldung konnte nicht gespeichert werden.",
        );
      }

      setSuccessResponse(responseData ?? payload);
      setFormData(initialFormState);
    } catch (error: any) {
      console.error("Event registration failed:", error);
      setErrorMessage(
        error?.message ||
          "Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="eventRegistrationPage">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <main className="eventRegistrationPage__main">
        <section className="eventRegistrationHero">
          <div className="eventRegistrationHero__content">
            <div className="eventRegistrationHero__eyebrow">ÖKFB Event</div>
            <h1 className="eventRegistrationHero__title">
              Gala Night Anmeldung
            </h1>
            <p className="eventRegistrationHero__text">
              Melde dich hier schnell und unkompliziert für den Event an. Die
              genaue Detailerfassung mit individuellen Namen für deine
              Gästeliste wird zusätzlich in der App verfügbar sein.
            </p>
          </div>
        </section>

        <section className="eventRegistrationPage__section">
          <div className="eventRegistrationCard">
            <div className="eventRegistrationCard__intro">
              <p className="eventRegistrationCard__kicker">Reservierung</p>
              <h2 className="eventRegistrationCard__title">Plätze sichern</h2>
              <p className="eventRegistrationCard__copy">
                Gib bitte die wichtigsten Daten zur Reservierung an. Nach dem
                Absenden wird dein Eintrag direkt in der Gästeliste im Backend
                gespeichert.
              </p>
            </div>

            {/* {isEventIdPlaceholder && (
              <div className="eventRegistrationNotice eventRegistrationNotice--warning">
                Developer Hinweis: Ersetze <strong>PEOPLE_EVENT_ID</strong> in dieser Datei mit der
                echten Event-ID aus deinem Admin, bevor du das Formular live verwendest.
              </div>
            )} */}

            {successResponse && (
              <div className="eventRegistrationSuccess" role="status">
                <div className="eventRegistrationSuccess__icon">✓</div>
                <div>
                  <h3 className="eventRegistrationSuccess__title">
                    Anmeldung bestätigt
                  </h3>
                  <p className="eventRegistrationSuccess__text">
                    Danke
                    {successResponse.name ? `, ${successResponse.name}` : ""}.
                    Deine Anmeldung für {successResponse.numberOfPeople || 1}{" "}
                    Person
                    {(successResponse.numberOfPeople || 1) === 1
                      ? ""
                      : "en"}{" "}
                    wurde gespeichert.
                  </p>
                  {successResponse.id && (
                    <p className="eventRegistrationSuccess__meta">
                      Reservierungs-ID: {successResponse.id}
                    </p>
                  )}
                  <button
                    className="eventRegistrationForm__secondaryButton"
                    type="button"
                    onClick={resetForm}
                  >
                    Weitere Anmeldung erfassen
                  </button>
                </div>
              </div>
            )}

            {errorMessage && (
              <div
                className="eventRegistrationNotice eventRegistrationNotice--error"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            {!successResponse && (
              <form className="eventRegistrationForm" onSubmit={handleSubmit}>
                <div className="eventRegistrationForm__grid">
                  <label className="eventRegistrationForm__field">
                    <span>Name *</span>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Max Mustermann"
                      required
                    />
                  </label>

                  <label className="eventRegistrationForm__field">
                    <span>Team</span>
                    <input
                      name="team"
                      type="text"
                      value={formData.team}
                      onChange={handleChange}
                      placeholder="z.B. Marketing, Verein, Mannschaft"
                    />
                  </label>

                  <label className="eventRegistrationForm__field">
                    <span>E-Mail</span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="max@beispiel.at"
                    />
                  </label>

                  <label className="eventRegistrationForm__field">
                    <span>Telefon</span>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+43 660 1234567"
                    />
                  </label>

                  <label className="eventRegistrationForm__field">
                    <span>Anzahl Personen *</span>
                    <input
                      name="numberOfPeople"
                      type="number"
                      min="1"
                      step="1"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <label className="eventRegistrationForm__field eventRegistrationForm__field--full">
                  <span>Anmerkungen</span>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Allergien, besondere Wünsche, Fragen, etc."
                    rows={5}
                  />
                </label>

                <div className="eventRegistrationInfoBox">
                  <strong>Hinweis:</strong> Die detaillierte Gästeliste mit
                  einzelnen Namen der Begleitpersonen wird in der App verfügbar
                  sein. Hier geht es nur um die schnelle Event-Reservierung.
                </div>

                <div className="eventRegistrationForm__actions">
                  <button
                    className="eventRegistrationForm__submitButton"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Wird gespeichert ..."
                      : "Anmeldung absenden"}
                  </button>
                  <Link className="eventRegistrationForm__backLink" to="/">
                    Zurück zur Startseite
                  </Link>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
