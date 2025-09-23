import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementContactMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  return (
    <div className="element-contact-mobile">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        <div className="contact">
          <div className="contact-header">
            <div className="title">Kontakt</div>

            <div className="sub_header">
              ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND
            </div>
          </div>

          <div>
            <p className="t">
              Bitte mailen Sie uns Ihre Fragen und Anregungen über das
              untenstehende Formular. Tragen Sie Ihr Anliegen zusammen mit Ihrem
              Namen, Ihrer E-Mail-Adresse und dem Betreff ein, damit wir Ihnen
              schnellstmöglich eine Rückmeldung geben können.
              <br />
              <br />
              Sie erreichen uns per Post bei:
              <br />
              <br />
              1020 Wien, Pazmanitengasse 15/7
              <br />
              <br />
              <br />
              Sie erreichen uns telefonisch (Mo - Fr - 10:00 bis 17:00) unter:
              <br />
              +43 665 6700 9191
              <br />
              <br />
              Oder per Mail unter:
              <br />
              office@oekfb.eu
              <br />
              support@oekfb.eu
              <br />
              strafsenat@oekfb.eu
            </p>
          </div>
        </div>

        <Sponsors className="sponsors" vWhite="/img/v-white-1-3.svg" />
      </div>

      <Footer />
    </div>
  );
};
