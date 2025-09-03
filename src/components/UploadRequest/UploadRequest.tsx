// views/UploadRequest.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ApiService from "../../network/ApiService";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import FirebaseStorageManager from "../../utils/storage/FirebaseStorageManager";
import "./style.css";

type Registration = {
  _id: string;
  teamLogo?: string | null;
  customerSignedContract?: string | null;
  primary?: { identification?: string | null } | null;
  secondary?: { identification?: string | null } | null;
};

const ICONS = {
  upload: "https://cdn-icons-png.flaticon.com/512/2983/2983788.png",
  success: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
  error: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
};

const notify = {
  success: (msg: string) => alert(`✅ ${msg}`),
  error: (msg: string) => alert(`❌ ${msg}`),
  info: (msg: string) => alert(`ℹ️ ${msg}`),
};

const sanitize = (s: string) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const buildFileName = (registrationId: string, keySuffix: string, original: string) => {
  const ext = (original?.split(".").pop() || "bin").toLowerCase();
  return `${sanitize(registrationId)}_${sanitize(keySuffix)}.${sanitize(ext)}`;
};

const isImage = (url?: string) =>
  !!url && [".png", ".jpeg", ".jpg", ".gif", ".webp"].some((ext) => url.toLowerCase().includes(ext));
const isPDF = (url?: string) => !!url && url.toLowerCase().includes(".pdf");

async function safePatchRegistration(
  api: ApiService,
  registrationId: string,
  partial: Record<string, any>
) {
  if ((api as any).patch) {
    return (api as any).patch(`registrations/${registrationId}`, partial);
  }
  if ((api as any).post) {
    return (api as any).post(`registrations/${registrationId}`, partial, { method: "PATCH" });
  }
  const res = await fetch(`/registrations/${registrationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
  return res.json();
}

const nestedDelta = (path: string[], value: any) =>
  path.reduceRight((acc, key) => ({ [key]: acc }), value);

export const UploadRequest = (): JSX.Element => {
  const { id } = useParams();
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const _authService = useMemo(() => new AuthService(), []);
  const _clientController = useMemo(() => new ClientController(), []);
  const api = useMemo(() => new ApiService(), []);

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await (api as any).get(`registrations/${id}`);
        if (mounted) setRegistration(data);
      } catch (e) {
        console.error("Failed to fetch registration", e);
        notify.error("Registrierung konnte nicht geladen werden.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [api, id]);

  const storageBase = `registrations/${id}`;
  const fields = [
    {
      id: "teamLogo",
      labelTop: "Bitte laden sie ihr Wappen/Logo für ihre Mannschaft hoch",
      helper: "FÜR OPTIMALE QUALITÄT BITTE LADEN SIE EINE PDF ODER JPEG/PNG DATEI",
      storagePath: `${storageBase}/branding`,
      fieldPath: ["teamLogo"],
      filenameSuffix: "logo",
      buttonText: "Wappen/Logo hochladen",
      existingUrl: registration?.teamLogo || undefined,
    },
    {
      id: "customerSignedContract",
      labelTop: "Kunde: unterschriebener Vertrag",
      helper: "FÜR OPTIMALE QUALITÄT BITTE LADEN SIE EINE PDF ODER JPEG/PNG DATEI",
      storagePath: `${storageBase}/contracts`,
      fieldPath: ["customerSignedContract"],
      filenameSuffix: "kunden_vertrag_unterschrieben",
      buttonText: "Kunden-Vertrag hochladen",
      existingUrl: registration?.customerSignedContract || undefined,
    },
    {
      id: "primaryIdentification",
      labelTop: "Ausweis: Primäre Kontaktperson",
      helper: "FÜR OPTIMALE QUALITÄT BITTE LADEN SIE EINE PDF ODER JPEG/PNG DATEI",
      storagePath: `${storageBase}/ids`,
      fieldPath: ["primary", "identification"],
      filenameSuffix: "primary_identification",
      buttonText: "Ausweis (Primär) hochladen",
      existingUrl: registration?.primary?.identification || undefined,
    },
    {
      id: "secondaryIdentification",
      labelTop: "Ausweis: Sekundäre Kontaktperson",
      helper: "FÜR OPTIMALE QUALITÄT BITTE LADEN SIE EINE PDF ODER JPEG/PNG DATEI",
      storagePath: `${storageBase}/ids`,
      fieldPath: ["secondary", "identification"],
      filenameSuffix: "secondary_identification",
      buttonText: "Ausweis (Sekundär) hochladen",
      existingUrl: registration?.secondary?.identification || undefined,
    },
  ] as const;

  const handleFileSelect =
    (fieldPath: string[], storagePath: string, filenameSuffix: string, existing?: string) =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        if (existing) {
          notify.info("Bereits vorhanden – bestehender Wert wird nicht überschrieben.");
          return;
        }

        const filename = buildFileName(String(id), filenameSuffix, file.name);
        const url = await FirebaseStorageManager.uploadFile(file, storagePath, filename);

        notify.success(`${file.name} erfolgreich hochgeladen.`);

        const delta = nestedDelta(fieldPath, url);
        await safePatchRegistration(api, String(id), delta);

        setRegistration((prev) => {
          const next: any = { ...(prev || {}) };
          let cursor = next;
          for (let i = 0; i < fieldPath.length - 1; i++) {
            const k = fieldPath[i];
            cursor[k] = cursor[k] || {};
            cursor = cursor[k];
          }
          cursor[fieldPath[fieldPath.length - 1]] = url;
          return next;
        });
      } catch (error) {
        console.error("Upload/Patch error:", error);
        notify.error(`${file?.name || "Datei"} Upload fehlgeschlagen.`);
      }
    };

  return (
    <div
      className="element-register"
      style={{ overflow: "hidden", minWidth: isMobile ? "366px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="frame-wrapper">
        <div className="frame-5">
          <div className="authentication-form-14">
            <div className="authentication-form">
              <div className="div-15">
                <div className="div-wrapper-3">
                  <div className="authentication">
                    <div className="authentication-2">Dokumente hochladen</div>
                    <p className="authentication-3">
                      Laden Sie hier die geforderten Dokumente für Ihre Registrierung hoch.
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <p>Lädt…</p>
              ) : !registration ? (
                <p>Registrierung nicht gefunden.</p>
              ) : (
                <div className="upload-request">
                  {fields.map(
                    ({
                      id: fieldId,
                      labelTop,
                      helper,
                      storagePath,
                      fieldPath,
                      filenameSuffix,
                      buttonText,
                      existingUrl,
                    }) => (
                      <div key={fieldId} style={{ marginBottom: 16 }}>
                        <p>{labelTop}</p>
                        <p>{helper}</p>

                        {existingUrl && (
                          <div style={{ marginBottom: 8 }}>
                            {isImage(existingUrl) ? (
                              <img
                                src={existingUrl}
                                alt="Uploaded File"
                                style={{ height: "120px", margin: 20 }}
                              />
                            ) : isPDF(existingUrl) ? (
                              <img src={ICONS.pdf} alt="PDF Icon" style={{ height: "70px", margin: 20 }} />
                            ) : null}
                            <a href={existingUrl} target="_blank" rel="noopener noreferrer">
                              Öffnen/herunterladen
                            </a>
                          </div>
                        )}

                        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <img src={ICONS.upload} alt="" style={{ width: 16, height: 16 }} />
                          {buttonText}
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileSelect(
                              fieldPath as unknown as string[],
                              storagePath,
                              filenameSuffix,
                              existingUrl
                            )}
                          />
                        </label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadRequest;
