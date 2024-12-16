import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation/Navigation"; // Unified component
import { PageHeader } from "../../components/PageHeader";
import { SingleTransferCell } from "../../components/SingleTransferCell";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementSperrenDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-sperren-desktop"
      style={{
        gap: screenWidth < 900 ? "60px" : undefined,
        height: screenWidth >= 900 ? "1000px" : undefined,
        justifyContent: screenWidth >= 900 ? "space-between" : undefined,
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
      }}
    >
        {/* Unified Navigation Component */}
        <Navigation />

      {screenWidth >= 900 && (
        <>
          <ViewDefaultWrapper
            className="instance-node-3"
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
            mobileBurgerMenu="/img/mobile-burger-menu-11.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-5.svg"
            view="default"
          />
          <div className="page-content-framer">
            <div className="page-control-2">
              <PageHeader
                className="instance-node-3"
                text="Strafsenat Urteile"
              />
              <div className="single-transfer">
                <SingleTransferCell
                  className="single-transfer-cell-instance"
                  property1="desktop"
                />
                <SingleTransferCell
                  className="single-transfer-cell-instance"
                  property1="desktop"
                />
                <SingleTransferCell
                  className="single-transfer-cell-instance"
                  property1="desktop"
                />
              </div>
            </div>
          </div>

          <Footer
            className="footer-4"
            footerContent="/img/footer-content-wrapper-left-logo-11.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-37.svg"
            link="/img/link-36.svg"
            link1="/img/link-38.svg"
            link2="/img/link-39.svg"
          />
        </>
      )}
    </div>
  );
};
