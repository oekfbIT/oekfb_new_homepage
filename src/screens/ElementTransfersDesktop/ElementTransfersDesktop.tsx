import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { PropertyDesktopWrapper } from "../../components/PropertyDesktopWrapper";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementTransfersDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-transfers-desktop"
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
        <NavigationDesktop
          className="instance-node-9"
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
          mobileBurgerMenu="/img/mobile-burger-menu-38.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        />
      )}

      {screenWidth >= 900 && (
        <ViewDefaultWrapper
          className="instance-node-9"
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
          mobileBurgerMenu="/img/mobile-burger-menu-29.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-14.svg"
          view="default"
        />
      )}

      <div className="page-control-3">
        <PageHeader className="instance-node-9" text="Transfers" />
        <div className="single-transfer-2">
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-22.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-16.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-23.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-17.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-24.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-18.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-25.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-19.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-26.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-20.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <PropertyDesktopWrapper
            className="instance-node-9"
            icnArrowRight={
              screenWidth < 900 ? "/img/icn-arrow-right-27.svg" : undefined
            }
            img={screenWidth >= 900 ? "/img/icn-arrow-right-21.svg" : undefined}
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
        </div>
      </div>

      {screenWidth >= 900 && (
        <Footer
          className="footer-21"
          footerContent="/img/footer-content-wrapper-left-logo-18.png"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-105.svg"
          link="/img/link-104.svg"
          link1="/img/link-106.svg"
          link2="/img/link-107.svg"
        />
      )}

      {screenWidth < 900 && (
        <Footer
          className="footer-21"
          footerContent="/img/footer-content-wrapper-left-logo-38.png"
          footerContentClassNameOverride="footer-22"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-141.svg"
          link="/img/link-137.svg"
          link1="/img/link-142.svg"
          link2="/img/link-143.svg"
        />
      )}
    </div>
  );
};
