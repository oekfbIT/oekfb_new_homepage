import React from "react";
import { Link } from "react-router-dom";
import { ActionButton } from "../../components/ActionButton";
import { ActionCell } from "../../components/ActionCell";
import { ClubCell } from "../../components/ClubCell";
import { Footer } from "../../components/Footer";
import { Hero } from "../../components/Hero";
import { MatchupCell } from "../../components/MatchupCell";
import { NewsArticle } from "../../components/NewsArticle";
import { Sponsors } from "../../components/Sponsors";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementHomepageDesktop = (): JSX.Element => {
  return (
    <div className="element-homepage-desktop">
      <ViewDefaultWrapper
        className="design-component-instance-node"
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
        mobileBurgerMenu="/img/mobile-burger-menu-47.svg"
        navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-23.svg"
        view="default"
      />
      <div className="content-frame-6">
        <div className="page-content-22">
          <div className="div-17">
            <div className="matchup-row-list">
              <MatchupCell
                className="matchup-cell-instance"
                state="live-w-top"
              />
              <MatchupCell className="matchup-cell-2" state="live-top" />
              <MatchupCell className="matchup-cell-2" state="live-top" />
              <MatchupCell className="matchup-cell-2" state="live-top" />
              <MatchupCell className="matchup-cell-2" state="live-top" />
              <MatchupCell className="matchup-cell-2" state="fixture-w-top" />
              <MatchupCell className="matchup-cell-2" state="fixture-no-top" />
              <MatchupCell className="matchup-cell-2" state="fixture-no-top" />
            </div>
          </div>

          <Hero className="hero-instance" />
          <Sponsors
            className="design-component-instance-node"
            vWhite="/img/v-white-1-9.svg"
          />
          <div className="div-17">
            <div className="club-carousel-header">
              <div className="club-carousel-title">CLUBS</div>

              <div className="club-carousel-action">ALL CLUBS</div>
            </div>

            <div className="club-carousel-list">
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell />
              <ClubCell imgContainer="/img/img-container-8.svg" />
              <ClubCell
                imgContainer="/img/league-row-item-content-seperator-123.png"
                imgContainerClassName="club-cell-instance"
              />
              <ClubCell
                imgContainer="/img/league-row-item-content-seperator-123.png"
                imgContainerClassName="club-cell-2"
              />
            </div>
          </div>

          <div className="action-cell-2">
            <ActionCell className="action-cell-instance" />
            <ActionCell className="action-cell-instance" text="Youtube" />
          </div>

          <Link className="banner" to="/12u465-register-desktop">
            <div className="banner-wrapper">
              <div className="banner-content">
                <div className="banner-content-left">
                  <div className="title-14">Melde deine Mannschaft an!</div>

                  <div className="button-text-wrapper">
                    <div className="button-text">MEHR INFOS</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="news-7">
            <div className="news-container-6">
              <div className="page-content-23">
                <div className="page-content-24">NEWS UND SPIELBERICHTE</div>
              </div>

              <div className="news-container-grid-7">
                <NewsArticle className="news-article-4" />
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
              actionButtonClassName="action-button-11"
              className="action-button-10"
            />
          </div>
        </div>
      </div>

      <Footer
        className="footer-36"
        footerContent="/img/footer-content-wrapper-left-logo-41.png"
        href="https://www.facebook.com/kleinfeldliga/"
        href1="https://www.youtube.com/@OEKFB"
        href2="https://www.instagram.com/oekfb/?hl=en"
        img="/img/link-178.svg"
        link="/img/link-177.svg"
        link1="/img/link-179.svg"
        link2="/img/link-176.svg"
      />
    </div>
  );
};
