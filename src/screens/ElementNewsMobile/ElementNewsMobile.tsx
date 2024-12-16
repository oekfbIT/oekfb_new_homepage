import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementNewsMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-news-mobile"
      style={{
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
        overflow: screenWidth < 900 ? "hidden" : undefined,
      }}
    >
      {screenWidth < 900 && (
        <>
          <NavigationDesktop
            className="instance-node-6"
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
            mobileBurgerMenu="/img/mobile-burger-menu-19.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="page-content-6">
            <PageHeader
              className="instance-node-6"
              text="News &amp; Spielberichte"
            />
            <div className="news">
              <div className="news-container">
                <div className="news-container-grid">
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                  <NewsArticle className="news-article-instance" />
                </div>
              </div>

              <ActionButton
                actionButtonClassName="action-button-2"
                className="action-button-instance"
              />
            </div>
          </div>

          <Footer
            className="footer-9"
            footerContent="/img/footer-content-wrapper-left-logo-16.png"
            footerContentClassNameOverride="footer-10"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-65.svg"
            link="/img/link-64.svg"
            link1="/img/link-66.svg"
            link2="/img/link-67.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="instance-node-6"
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
            mobileBurgerMenu="/img/mobile-burger-menu-20.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-9.svg"
            view="default"
          />
          <div className="page-frame">
            <div className="page-content-7">
              <div className="page-content-8">
                <div className="page-header-instance-wrapper">
                  <PageHeader
                    className="page-header-instance"
                    text="News &amp; Spielberichte"
                  />
                </div>

                <div className="page-frame">
                  <div className="news-2">
                    <div className="news-container">
                      <div className="news-container-grid-2">
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                        <NewsArticle />
                      </div>
                    </div>

                    <ActionButton
                      actionButtonClassName="action-button-2"
                      className="action-button-instance"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-9"
            footerContent="/img/footer-content-wrapper-left-logo-17.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-69.svg"
            link="/img/link-68.svg"
            link1="/img/link-70.svg"
            link2="/img/link-71.svg"
          />
        </>
      )}
    </div>
  );
};
