import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { UploadRequest } from "../../components/UploadRequest";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementRegistration = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-registration"
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
            className="instance-node-8"
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
            mobileBurgerMenu="/img/mobile-burger-menu-25.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="upload-request-form-wrapper">
            <div className="upload-request-form">
              <UploadRequest className="instance-node-8" />
              <UploadRequest className="instance-node-8" />
              <UploadRequest className="instance-node-8" />
              <UploadRequest className="instance-node-8" />
              <UploadRequest className="instance-node-8" />
            </div>
          </div>

          <Footer
            className="footer-17"
            footerContent="/img/footer-content-wrapper-left-logo-23.png"
            footerContentClassNameOverride="footer-18"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-89.svg"
            link="/img/link-88.svg"
            link1="/img/link-90.svg"
            link2="/img/link-91.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <ViewDefaultWrapper
            className="instance-node-8"
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
            mobileBurgerMenu="/img/mobile-burger-menu-27.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-13.svg"
            view="default"
          />
          <div className="page-content-framer-2">
            <div className="page-content-9">
              <div className="upload-request-form">
                <UploadRequest className="instance-node-8" />
                <UploadRequest className="instance-node-8" />
                <UploadRequest className="instance-node-8" />
                <UploadRequest className="instance-node-8" />
                <UploadRequest className="instance-node-8" />
              </div>
            </div>
          </div>

          <Footer
            className="footer-17"
            footerContent="/img/footer-content-wrapper-left-logo-25.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-97.svg"
            link="/img/link-96.svg"
            link1="/img/link-98.svg"
            link2="/img/link-99.svg"
          />
        </>
      )}
    </div>
  );
};
