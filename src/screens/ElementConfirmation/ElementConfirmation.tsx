import React from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import {Navigation} from "../../components/Navigation";

export const ElementConfirmation = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-confirmation"
      style={{
        height: screenWidth >= 900 ? "710px" : undefined,
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
        overflow: screenWidth >= 900 ? "hidden" : undefined,
      }}
    >
      {screenWidth < 900 && (
        <>
          <Navigation/>
          <div className="thanks-form">
            <div className="main-text">Vielen Dank.</div>

            <p className="subtitle-5">
              Ihre registrierung ist bei uns angekommen und werden in wenigen
              tagen mit ihnen kontakt Aufnehmen.
            </p>

            <button className="submit-button">
              <button className="button">HOME</button>
            </button>
          </div>

          <Footer
            className="footer-19"
            footerContent="/img/footer-content-wrapper-left-logo-26.png"
            footerContentClassNameOverride="footer-20"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-101.svg"
            link="/img/link-100.svg"
            link1="/img/link-102.svg"
            link2="/img/link-103.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="navigation-desktop-15"
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
            mobileBurgerMenu="/img/mobile-burger-menu-30.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-15.svg"
            view="default"
          />
          <div className="thanks-form-wrapper">
            <div className="thanks-form-2">
              <div className="main-text">Vielen Dank.</div>

              <p className="subtitle-5">
                Ihre registrierung ist bei uns angekommen und werden in wenigen
                tagen mit ihnen kontakt Aufnehmen.
              </p>

              <Link to="/liga">
                <button className="submit-button">
                  <button className="button">HOME</button>
                </button>
              </Link>
            </div>
          </div>

          <Footer
            className="footer-19"
            footerContent="/img/footer-content-wrapper-left-logo-26.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-109.svg"
            link="/img/link-108.svg"
            link1="/img/link-110.svg"
            link2="/img/link-111.svg"
          />
        </>
      )}
    </div>
  );
};
