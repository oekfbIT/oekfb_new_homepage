import React, { useState } from "react";
import { analytics } from "../../analytics/analytics";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";

import ClientController from "../../network/ClientController";
import "./style.css";

const trimContact = (contact: {
  first: string;
  last: string;
  phone: string;
  email: string;
  identification: string;
}) => ({
  ...contact,
  first: contact.first.trim(),
  last: contact.last.trim(),
  phone: contact.phone.trim(),
  email: contact.email.trim(),
});

export const ElementRegister = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const clientController = new ClientController();
  const initial_password = "";

  // State Management
  const [formData, setFormData] = useState({
    primaryContact: {
      first: "",
      last: "",
      phone: "",
      email: "",
      identification: "",
    },
    secondaryContact: {
      first: "",
      last: "",
      phone: "",
      email: "",
      identification: "",
    },
    teamName: "",
    verein: "",
    bundesland: "",
    type: "",
    acceptedAGB: false,
    referCode: "",
    initial_password: initial_password,
  });

  // Additional State for Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle Other Field Changes
  const handleOtherChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: nextValue,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || successMessage) return;

    // Reset feedback messages
    setSuccessMessage(null);
    setErrorMessage(null);

    const primaryContact = trimContact(formData.primaryContact);
    const secondaryContact = trimContact(formData.secondaryContact);
    const teamName = formData.teamName.trim();
    const verein = formData.verein.trim();
    const bundesland = formData.bundesland.trim();
    const type = formData.type.trim();
    const missingRequiredField =
      !primaryContact.first ||
      !primaryContact.last ||
      !primaryContact.phone ||
      !primaryContact.email ||
      !secondaryContact.first ||
      !secondaryContact.last ||
      !secondaryContact.phone ||
      !secondaryContact.email ||
      !teamName ||
      !type ||
      !bundesland;

    if (missingRequiredField) {
      setErrorMessage("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!formData.acceptedAGB) {
      setErrorMessage("Bitte akzeptieren Sie die Allgemeinen Geschäftsbedingungen.");
      return;
    }

    // Format the data as specified
    const formattedData = {
      primaryContact,
      secondaryContact,
      teamName,
      verein,
      bundesland,
      type,
      acceptedAGB: formData.acceptedAGB,
      referCode: formData.referCode.trim(),
      initial_password: formData.initial_password,
    };

    analytics?.track("registration_submit");

    // Set submitting state
    setIsSubmitting(true);

    try {
      const response = await clientController.register(formattedData);
      analytics?.track("registration_complete");

      // You can adjust the success message based on your API response
      setSuccessMessage("Ihre Anfrage ist eingegangen. Sie erhalten eine Willkommens-E-Mail. Die Administration prüft Ihre Anmeldung und sendet Ihnen bei Bedarf einen Link für Vertrag und Ausweise. Ein Teamzugang wird erst nach Freigabe eingerichtet.");

      // Optionally, reset the form
      setFormData({
        primaryContact: {
          first: "",
          last: "",
          phone: "",
          email: "",
          identification: "",
        },
        secondaryContact: {
          first: "",
          last: "",
          phone: "",
          email: "",
          identification: "",
        },
        teamName: "",
        verein: "",
        bundesland: "",
        type: "",
        acceptedAGB: false,
        referCode: "",
        initial_password: "",
      });

      // Optionally, redirect the user after successful registration
      // For example, using React Router's useHistory hook:
      // history.push('/login');
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Extract error message from response if available
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bundeslandOptions = [
    { label: "Wien", value: "wien" },
    { label: "Niederösterreich", value: "niederoesterreich" },
    { label: "Oberösterreich", value: "oberoesterreich" },
    { label: "Steiermark", value: "steiermark" },
    { label: "Kärnten", value: "kaernten" },
    { label: "Salzburg", value: "salzburg" },
    { label: "Tirol", value: "tirol" },
    { label: "Vorarlberg", value: "vorarlberg" },
    { label: "Burgenland", value: "burgenland" },
  ];

  const vereinOptions = [
    { label: "Privat", value: "privat" },
    { label: "Bestehender Verein", value: "verein" },
  ];

  return (
    <div className="team-registration-page">
      {isMobile ? <Navigation /> : <DesktopNav />}
      <main className="registration-layout">
        <aside className="registration-intro">
          <span className="registration-eyebrow">DEIN TEAM. DEINE LIGA.</span>
          <h1>Gemeinsam auf<br />den Platz.</h1>
          <p>Meldet eure Mannschaft beim ÖKFB an. Wir begleiten euch vom ersten Kontakt bis zum Anpfiff.</p>
          <ol className="registration-steps">
            <li><span>01</span><div><strong>Anfrage senden</strong><p>Team und zwei Kontaktpersonen angeben. Ihr bekommt eine Willkommens-E-Mail.</p></div></li>
            <li><span>02</span><div><strong>Unterlagen ergänzen</strong><p>Auf Einladung der Administration: Vertrag und Ausweise über euren persönlichen Link hochladen.</p></div></li>
            <li><span>03</span><div><strong>Freigabe erhalten</strong><p>Nach Prüfung, Ligazuweisung und Zahlung entscheidet die Administration über eure Aufnahme.</p></div></li>
          </ol>
          <div className="registration-help"><strong>Noch Fragen?</strong><a href="mailto:office@oekfb.eu">office@oekfb.eu ↗</a></div>
        </aside>
        <section className="registration-panel">
          <header><span className="registration-eyebrow">MANNSCHAFTSANMELDUNG</span><h2>Euer nächstes Spiel beginnt hier.</h2><p>Für die erste Anfrage braucht ihr noch keine Dokumente. Mit * markierte Angaben sind erforderlich.</p></header>
          {successMessage ? <div className="registration-feedback success" role="status"><h2>Anfrage eingegangen</h2><p>{successMessage}</p><a href="#/">Zur Startseite →</a></div> : <form onSubmit={handleSubmit}>
            {errorMessage && <div className="registration-feedback error" role="alert">{errorMessage}</div>}
            <fieldset disabled={isSubmitting}>
              <legend><span>01</span> Eure Mannschaft</legend>
              <div className="registration-grid">
                <label>Teamname *<input name="teamName" value={formData.teamName} onChange={handleOtherChange} required placeholder="z. B. FC Donaustadt" /></label>
                <label>Bundesland *<select name="bundesland" value={formData.bundesland} onChange={handleOtherChange} required><option value="" disabled>Bitte auswählen</option>{bundeslandOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                <label>Organisation *<select name="type" value={formData.type} onChange={handleOtherChange} required><option value="" disabled>Bitte auswählen</option>{vereinOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                <label>Vereinsname <small>(optional)</small><input name="verein" value={formData.verein} onChange={handleOtherChange} placeholder="Name eures Vereins" /></label>
              </div>
            </fieldset>
            {(["primaryContact", "secondaryContact"] as const).map((contact, index) => <fieldset key={contact} disabled={isSubmitting}>
              <legend><span>0{index + 2}</span> {index === 0 ? "Erste Kontaktperson" : "Zweite Kontaktperson"}</legend>
              <p className="registration-field-help">{index === 0 ? "An diese E-Mail senden wir alle Informationen zu eurer Anmeldung." : "Die zweite Person, die euren Mannschaftsvertrag unterzeichnet."}</p>
              <div className="registration-grid">
                {([["first", "Vorname", "text"], ["last", "Nachname", "text"], ["phone", "Telefonnummer", "tel"], ["email", "E-Mail-Adresse", "email"]] as const).map(([field, label, type]) => <label key={field}>{label} *<input name={`${contact}.${field}`} type={type} value={formData[contact][field]} onChange={handleChange} required autoComplete={field === "email" ? "email" : field === "phone" ? "tel" : field === "first" ? "given-name" : "family-name"} /></label>)}
              </div>
            </fieldset>)}
            <div className="registration-submit">
              <label className="registration-consent"><input type="checkbox" name="acceptedAGB" checked={formData.acceptedAGB} onChange={handleOtherChange} required disabled={isSubmitting} /><span>Ich akzeptiere die <a href="#/ligaordnung" target="_blank" rel="noopener noreferrer">Ligaordnung</a> und habe die <a href="#/privacy" target="_blank" rel="noopener noreferrer">Datenschutzhinweise</a> gelesen.</span></label>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Anfrage wird gesendet …" : "Mannschaft anmelden"}<span aria-hidden="true">→</span></button>
              <p>Die Anmeldung wird zuerst geprüft. Ein Team wird erst nach Freigabe angelegt.</p>
            </div>
          </form>}
        </section>
      </main>
      <Footer />
    </div>
  );
};
