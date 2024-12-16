import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementContactMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-contact-mobile"
      style={{
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
      }}
    >
      {screenWidth < 900 && (
        <>
          <NavigationDesktop
            className="instance-node-13"
            img="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem="/img/league-row-item-content-img-1090.png"
            leagueRowItem1="/img/league-row-item-content-img-1090.png"
            leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem11="/img/league-row-item-content-img-1090.png"
            leagueRowItem12="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem13="/img/league-row-item-content-img-1090.png"
            leagueRowItem14="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem15="/img/league-row-item-content-img-1090.png"
            leagueRowItem16="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem3="/img/league-row-item-content-img-1090.png"
            leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem5="/img/league-row-item-content-img-1090.png"
            leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem7="/img/league-row-item-content-img-1090.png"
            leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem9="/img/league-row-item-content-img-1090.png"
            mobileBurgerMenu="/img/mobile-burger-menu-37.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
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
                  Please mail us your questions and suggestions using the form
                  below. Enter your request together with your name, email
                  address and subject so we can
                  <br />
                  give you feedback as soon as possible.
                  <br />
                  <br />
                  You can also reach out to us via mail: info@bundesliga.de
                  <br />
                  <br />
                  1020 Wien, Pazmanitengasse 15/7
                  <br />
                  ÖKFB
                  <br />
                  office@oekfb.eu
                  <br />
                  support@oekfb.eu
                  <br />
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
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="instance-node-13"
            img="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem="/img/league-row-item-content-img-1090.png"
            leagueRowItem1="/img/league-row-item-content-img-1090.png"
            leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem11="/img/league-row-item-content-img-1090.png"
            leagueRowItem12="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem13="/img/league-row-item-content-img-1090.png"
            leagueRowItem14="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem15="/img/league-row-item-content-img-1090.png"
            leagueRowItem16="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem3="/img/league-row-item-content-img-1090.png"
            leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem5="/img/league-row-item-content-img-1090.png"
            leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem7="/img/league-row-item-content-img-1090.png"
            leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem9="/img/league-row-item-content-img-1090.png"
            mobileBurgerMenu="/img/mobile-burger-menu-41.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-19.svg"
            view="default"
          />
          <div className="page-frame-3">
            <div className="page-content-20">
              <div className="page-frame-3">
                <div className="contact-2">
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
                      Please mail us your questions and suggestions using the
                      form below. Enter your request together with your name,
                      email address and subject so we can
                      <br />
                      give you feedback as soon as possible.
                      <br />
                      <br />
                      You can also reach out to us via mail: info@bundesliga.de
                      <br />
                      <br />
                      1020 Wien, Pazmanitengasse 15/7
                      <br />
                      ÖKFB
                      <br />
                      office@oekfb.eu
                      <br />
                      support@oekfb.eu
                      <br />
                      strafsenat@oekfb.eu
                    </p>
                  </div>
                </div>
              </div>

              <div className="page-frame-3">
                <Sponsors
                  className="instance-node-13"
                  vWhite="/img/v-white-1-5.svg"
                />
              </div>
            </div>
          </div>

          <Footer
            className="footer-28"
            footerContent="/img/footer-content-wrapper-left-logo-8.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-153.svg"
            link="/img/link-152.svg"
            link1="/img/link-154.svg"
            link2="/img/link-155.svg"
          />
        </>
      )}
    </div>
  );
};
