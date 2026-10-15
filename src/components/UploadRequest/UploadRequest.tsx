import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ApiService from "../../network/ApiService";

type Contact = { first: string; last: string; phone: string; email: string; identification_uploaded: boolean };
type Registration = { team_name: string; status: string; primary: Contact; secondary: Contact; customer_signed_contract_uploaded: boolean; team_logo_uploaded: boolean; editable: boolean; contract_url?: string };
const fields = [
  ["primaryIdentification", "Ausweis der ersten Kontaktperson"],
  ["secondaryIdentification", "Ausweis der zweiten Kontaktperson"],
  ["signedContract", "Unterschriebener Vertrag"],
  ["teamLogo", "Mannschaftslogo (optional)"],
];

export const UploadRequest = ({ className = "" }: { className?: string }) => {
  const { id } = useParams();
  const [search] = useSearchParams();
  const token = search.get("token");
  const api = useMemo(() => new ApiService(), []);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const endpoint = `email-actions/registration/${encodeURIComponent(id || "")}`;

  useEffect(() => {
    let active = true;
    setLoading(true);
    if (!id || !token) { setError("Bitte öffnen Sie den vollständigen Link aus Ihrer E-Mail."); setLoading(false); return; }
    api.get(endpoint, { "X-Email-Action-Token": token })
      .then(data => { if (active) setRegistration(data); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [api, endpoint, id, token]);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!registration || saving || !registration.editable) return;
    setSaving(true); setError(""); setSuccess("");
    const form = event.currentTarget;
    const body = new FormData();
    for (const key of ["primary", "secondary"] as const) {
      for (const field of ["first", "last", "phone", "email"] as const) {
        body.append(`${key}[${field}]`, registration[key][field].trim());
      }
    }
    Object.entries(files).forEach(([key, file]) => body.append(key, file));
    try {
      const updated = await api.post(endpoint, body, { "X-Email-Action-Token": token || "" });
      setRegistration(updated); setFiles({});
      form.reset();
      setSuccess(updated.primary.identification_uploaded && updated.secondary.identification_uploaded && updated.customer_signed_contract_uploaded ? "Ihre Unterlagen sind vollständig gespeichert. Die Administration prüft Ihre Anmeldung." : "Ihre Angaben wurden gespeichert. Bitte ergänzen Sie noch die fehlenden Pflichtunterlagen.");
    } catch (err) { setError(err instanceof Error ? err.message : "Upload fehlgeschlagen. Bitte erneut versuchen."); }
    finally { setSaving(false); }
  };

  return <section className={`registration-panel registration-upload ${className}`} style={{ maxWidth: 720, margin: "32px auto", padding: 24, background: "white", color: "#172b4d", borderRadius: 12 }}>
    <a href="#/register">ÖKFB · Mannschaftsanmeldung</a>
    <h1>Unterlagen zur Mannschaftsanmeldung</h1>
    <p>Bitte prüfen Sie die Namen beider Vertragspartner und laden Sie den unterschriebenen Vertrag und beide Ausweise hoch. PDF, JPG oder PNG, maximal 10 MB pro Datei.</p>
    {loading && <p role="status">Anmeldung wird geladen …</p>}
    {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
    {success && <p role="status" style={{ color: "#067647" }}>{success}</p>}
    {registration && <form onSubmit={save}>
      <h2>{registration.team_name}</h2>
      {registration.contract_url && <p><a href={registration.contract_url} target="_blank" rel="noopener noreferrer">Vertrag herunterladen ↗</a></p>}
      {!registration.editable && <p>Diese Anmeldung ist abgeschlossen. Änderungen sind nicht mehr möglich.</p>}
      <fieldset disabled={saving || !registration.editable} style={{ border: 0, padding: 0 }}>
        {(["primary", "secondary"] as const).map((key, index) => <fieldset key={key} style={{ margin: "20px 0", padding: 16 }}>
          <legend>Kontaktperson {index + 1}</legend>
          {([["first", "Vorname"], ["last", "Nachname"], ["phone", "Telefon"], ["email", "E-Mail"]] as const).map(([field, label]) => <label key={field} style={{ display: "block", marginBottom: 12 }}>
            {label} *<input required type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} value={registration[key][field]}
              style={{ display: "block", padding: 10, width: "100%", boxSizing: "border-box" }}
              onChange={event => setRegistration({ ...registration, [key]: { ...registration[key], [field]: event.target.value } })} />
          </label>)}
        </fieldset>)}
        {fields.map(([key, label]) => {
          const uploaded = key === "primaryIdentification" ? registration.primary.identification_uploaded : key === "secondaryIdentification" ? registration.secondary.identification_uploaded : key === "signedContract" ? registration.customer_signed_contract_uploaded : registration.team_logo_uploaded;
          return <label key={key} style={{ display: "block", marginBottom: 20 }}>
            <strong>{label}</strong><p>{uploaded ? "Bereits gespeichert – bei Bedarf ersetzen." : "Noch nicht hochgeladen."}</p>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={event => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (file.size > 10 * 1024 * 1024 || !/\.(pdf|jpe?g|png)$/i.test(file.name)) {
                setError("Bitte PDF, JPG oder PNG mit maximal 10 MB wählen."); event.target.value = ""; return;
              }
              setError(""); setFiles(current => ({ ...current, [key]: file }));
            }} />
          </label>;
        })}
        <button type="submit" style={{ padding: "12px 24px", cursor: "pointer" }}>{saving ? "Wird gespeichert …" : "Angaben und Unterlagen speichern"}</button>
      </fieldset>
    </form>}
    <p><a href="mailto:office@oekfb.eu">Hilfe: office@oekfb.eu</a></p>
  </section>;
};
