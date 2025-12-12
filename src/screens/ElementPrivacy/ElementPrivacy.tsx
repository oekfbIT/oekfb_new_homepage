import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementPrivacy = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  return (
    <div className="element-impressium-mobile">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        <div className="impressium">
          <div className="impressium-header">
            <div className="title">Datenschutzerklärung</div>
            <div className="sub_header">
              ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND
            </div>
          </div>

          <div className="impressium-content">
            <p className="t">
              Der Schutz Ihrer personenbezogenen Daten ist uns ein besonderes
              Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage
              der gesetzlichen Bestimmungen (DSGVO, DSG, TKG 2003).
              <br />
              <br />
              Diese Datenschutzerklärung informiert Sie über Art, Umfang und
              Zweck der Verarbeitung personenbezogener Daten im Rahmen unserer
              Website und unserer Tätigkeiten als Fußballverband.
            </p>

            <p className="t">
              <strong>1. Verantwortlicher</strong>
              <br />
              ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND (Eingetragener Verein)
              <br />
              <strong>ZVR-Nummer:</strong> 046132504
              <br />
              <strong>Sitz:</strong> 1020 Wien, Pazmanitengasse 15/7
              <br />
              <strong>Kontakt:</strong>
              <br />
              Tel: +43 665 6700 9191 (Mo – Fr, 10:00 – 17:00)
              <br />
              E-Mail: office@oekfb.eu, support@oekfb.eu, strafsenat@oekfb.eu
              <br />
              <strong>Vertreten durch:</strong> Avi Ben-Or (Obmann)
              <br />
            </p>

            <p className="t">
              <strong>2. Verarbeitung personenbezogener Daten</strong>
              <br />
              Wir verarbeiten personenbezogene Daten von Spielern, Trainern,
              Schiedsrichtern, Vereinsverantwortlichen und Funktionären, soweit
              dies für die Organisation und Durchführung des Spielbetriebs
              erforderlich ist.
              <br />
              <br />
              <strong>Verarbeitete Daten können insbesondere sein:</strong>
              <br />
              • Vor- und Nachname
              <br />
              • Geburtsdatum / Alter
              <br />
              • Mannschafts- und Vereinszugehörigkeit
              <br />
              • Spieler- oder Lizenznummer
              <br />
              • Position, Einsatzdaten, Statistiken
              <br />
              • Kontaktdaten (z. B. E-Mail, Telefonnummer – sofern erforderlich)
              <br />
              • Bilder und Videos (z. B. Spielerfotos, Mannschaftsfotos,
              Spielaufnahmen)
              <br />
            </p>

            <p className="t">
              <strong>3. Zweck der Datenverarbeitung</strong>
              <br />
              Die Verarbeitung erfolgt zu folgenden Zwecken:
              <br />
              • Organisation, Durchführung und Verwaltung des Ligabetriebs
              <br />
              • Spielerregistrierung und Spielberechtigung
              <br />
              • Veröffentlichung von Spieler- und Mannschaftsinformationen
              <br />
              • Darstellung von Spielergebnissen, Tabellen und Statistiken
              <br />
              • Öffentlichkeitsarbeit und Berichterstattung über Spiele und
              Veranstaltungen
              <br />
              • Einhaltung gesetzlicher und verbandsinterner Verpflichtungen
              <br />
            </p>

            <p className="t">
              <strong>4. Verarbeitung von Bildern und Videos</strong>
              <br />
              Im Rahmen von Spielen, Turnieren und Veranstaltungen können Fotos
              und Videoaufnahmen angefertigt werden, auf denen Spieler und
              Beteiligte erkennbar sind. Diese Aufnahmen können auf unseren
              Websites, in sozialen Medien sowie in Spielberichten, Tabellen
              oder Vereinsdarstellungen veröffentlicht werden.
              <br />
              <br />
              <strong>Rechtsgrundlage:</strong>
              <br />
              • Art. 6 Abs. 1 lit. b DSGVO (Vertrag / Teilnahme am Spielbetrieb)
              <br />
              • Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              Öffentlichkeitsarbeit und Dokumentation des Spielbetriebs)
              <br />
              Sofern gesetzlich erforderlich, erfolgt die Verarbeitung auf Basis
              einer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              <br />
            </p>

            <p className="t">
              <strong>5. Weitergabe von Daten</strong>
              <br />
              Personenbezogene Daten werden nicht verkauft. Eine Weitergabe
              erfolgt nur, wenn dies erforderlich ist (z. B. an Verbandsorgane,
              Schiedsrichter oder Ligaverantwortliche, an technische
              Dienstleister wie Hosting/IT-Systeme oder zur Erfüllung
              gesetzlicher Verpflichtungen). Auftragsverarbeiter sind gemäß Art.
              28 DSGVO vertraglich verpflichtet.
              <br />
            </p>

            <p className="t">
              <strong>6. Speicherdauer</strong>
              <br />
              Personenbezogene Daten werden nur so lange gespeichert, wie dies
              für die jeweiligen Zwecke erforderlich ist oder gesetzliche
              Aufbewahrungspflichten bestehen. Spiel- und Statistikdaten können
              aus sporthistorischen Gründen länger gespeichert bleiben.
              <br />
            </p>

            <p className="t">
              <strong>7. Cookies und Server-Logs</strong>
              <br />
              Unsere Website kann Cookies verwenden, um grundlegende Funktionen
              sicherzustellen. Beim Besuch der Website werden automatisch Daten
              (z. B. IP-Adresse, Browsertyp, Betriebssystem, Datum und Uhrzeit
              des Zugriffs) erhoben. Diese Daten dienen der technischen
              Sicherheit und Optimierung der Website.
              <br />
            </p>

            <p className="t">
              <strong>8. Ihre Rechte</strong>
              <br />
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung (sofern keine gesetzlichen Pflichten entgegenstehen),
              Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
              Widerspruch gegen die Verarbeitung.
              <br />
              <br />
              Anfragen richten Sie bitte an: <strong>office@oekfb.eu</strong>
              <br />
            </p>

            <p className="t">
              <strong>9. Beschwerderecht</strong>
              <br />
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen
              Datenschutzrecht verstößt, haben Sie das Recht, Beschwerde bei der
              zuständigen Aufsichtsbehörde einzulegen:
              <br />
              <br />
              Österreichische Datenschutzbehörde
              <br />
              Barichgasse 40–42
              <br />
              1030 Wien
              <br />
              www.dsb.gv.at
              <br />
            </p>

            <p className="t">
              <strong>10. Änderungen dieser Datenschutzerklärung</strong>
              <br />
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
              anzupassen, um sie an rechtliche oder technische Änderungen
              anzupassen. Die jeweils aktuelle Version ist auf unserer Website
              abrufbar.
              <br />
            </p>
          </div>
        </div>

        <Sponsors className="sponsors" vWhite="/img/v-white-1-3.svg" />
      </div>

      <Footer />
    </div>
  );
};
