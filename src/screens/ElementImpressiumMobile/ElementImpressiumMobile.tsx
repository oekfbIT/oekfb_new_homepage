import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementImpressiumMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  return (
    <div className="element-impressium-mobile">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        <div className="impressium">
          <div className="impressium-header">
            <div className="title">Impressum</div>
            <div className="sub_header">ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND</div>
          </div>

          <div className="impressium-content">
            <p className="t">
              <strong>Vereinsname:</strong> ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND <br />
              <strong>Rechtsform:</strong> Eingetragener Verein <br />
              {/* <strong>Unternehmensgegenstand:</strong> [wird ergänzt] <br /> */}
              <strong>IBAN:</strong> AT26&nbsp;2011&nbsp;1829&nbsp;7052&nbsp;4200 <br />
              {/* <strong>UID-Nummer:</strong> [nicht angegeben] <br />
              <strong>Firmenbuchnummer:</strong> [nicht zutreffend] <br />
              <strong>Firmenbuchgericht:</strong> [nicht zutreffend] <br /> */}
              <br />
              <strong>Sitz:</strong> 1020 Wien, Pazmanitengasse 15/7 <br />
              <strong>Kontakt:</strong> <br />
              Tel: +43 665 6700 9191 (Mo – Fr, 10:00 – 17:00) <br />
              E-Mail: office@oekfb.eu, support@oekfb.eu, strafsenat@oekfb.eu <br />
              <br />
              <strong>ZVR-Nummer:</strong> 046132504 <br />
              <strong>Vorstand:</strong> Avi Ben-Or (Obmann) <br />
              <br />
              <strong>Mitgliedschaften:</strong> Mitglied der WKÖ <br />
              <br />
              <strong>Zuständige Aufsichtsbehörde:</strong> Landespolizeidirektion Wien, Referat
              Vereins-, Versammlungs- und Medienrechtsangelegenheiten <br />
            </p>
          </div>
        </div>

        <Sponsors className="sponsors" vWhite="/img/v-white-1-3.svg" />
      </div>

      <Footer />
    </div>
  );
};
