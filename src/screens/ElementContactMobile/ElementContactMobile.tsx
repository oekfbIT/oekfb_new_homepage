import React from "react";
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
    <div
      className="element-contact-mobile"
    >
        {isMobile ? <Navigation /> : <DesktopNav />}


          <div className="page-content-19">
            <div className="contact">
              <div className="contact-header">
                <div className="title-9">Kontakt</div>

                <div className="div-wrapper-5">
                  <div className="sterreichischer">
                    ÖSTERREICHISCHER KLEINFELD FUSSBALL BUND
                  </div>
                </div>
              </div>

              <div className="div-wrapper-5">
                  <p className="contact-content-text">
                      Bitte mailen Sie uns Ihre Fragen und Anregungen über das untenstehende Formular.
                      Tragen Sie Ihr Anliegen zusammen mit Ihrem Namen, Ihrer E-Mail-Adresse und dem Betreff ein, damit
                      wir Ihnen schnellstmöglich eine Rückmeldung geben können.
                      <br/>
                      <br/>
                      Sie erreichen uns per post bei:
                      <br/>
                      <br/>
                      1020 Wien, Pazmanitengasse 15/7
                      <br/>
                      <br/>
                      <br/>
                      Sie erreichen uns Telefonisch (Mo - Fr - 10:00 bis 17:00) unter:
                      <br/>
                      +43 665 6700 9191
                      <br/>
                      <br/>
                      Oder per mail unter:
                      <br/>

                      office@oekfb.eu
                      <br/>
                      support@oekfb.eu
                      <br/>
                      strafsenat@oekfb.eu
                  </p>
              </div>
            </div>

              <Sponsors
                  className="instance-node-13"
              vWhite="/img/v-white-1-3.svg"
            />
          </div>

          <Footer
            className="footer-28"
            footerContent="/img/footer-content-wrapper-left-logo-8.png"
            footerContentClassNameOverride="footer-29"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-138.svg"
            link="/img/link-136.svg"
            link1="/img/link-139.svg"
            link2="/img/link-140.svg"
          />
    </div>
  );
};
