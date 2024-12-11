import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import { NavigationDesktopWrapper } from "../../components/NavigationDesktopWrapper";
import { NewsArticle } from "../../components/NewsArticle";
import { StatCell } from "../../components/StatCell";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementTeamDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-team-detail"
      style={{
        minWidth:
          screenWidth < 1200
            ? "390px"
            : screenWidth >= 1200
              ? "1200px"
              : undefined,
        overflow: screenWidth < 1200 ? "hidden" : undefined,
      }}
    >
      {screenWidth < 1200 && (
        <>
          <NavigationDesktopWrapper
            className="instance-node-12"
            divClassName="navigation-desktop-24"
            divClassNameOverride="navigation-desktop-24"
            img="/img/league-row-item-content-seperator-1080.svg"
            imgClassName="navigation-desktop-25"
            imgClassNameOverride="navigation-desktop-26"
            leagueRowItem="/img/league-row-item-content-img-1090.png"
            leagueRowItem1="/img/league-row-item-content-img-1090.png"
            leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem11="/img/league-row-item-content-seperator-123.png"
            leagueRowItem12="/img/league-row-item-content-seperator-123.png"
            leagueRowItem13="/img/league-row-item-content-seperator-123.png"
            leagueRowItem14="/img/league-row-item-content-seperator-123.png"
            leagueRowItem15="/img/league-row-item-content-seperator-123.png"
            leagueRowItem16="/img/league-row-item-content-seperator-123.png"
            leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem3="/img/league-row-item-content-img-1090.png"
            leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem5="/img/league-row-item-content-img-1090.png"
            leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem7="/img/league-row-item-content-img-1090.png"
            leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem9="/img/league-row-item-content-img-1090.png"
            leagueRowItemClassName="navigation-desktop-23"
            leagueRowItemClassName1="navigation-desktop-27"
            leagueRowItemClassName2="navigation-desktop-28"
            leagueRowItemClassName3="navigation-desktop-29"
            leagueRowItemClassNameOverride="navigation-desktop-24"
            mobileBurgerMenu="/img/mobile-burger-menu-34.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="team-detail-top">
            <div className="team-detail">
              <div className="team-detail-header">
                <div className="team-detail-header-wrapper">
                  <div className="team-detail-header-2">
                    <img
                      className="image-13"
                      alt="Image"
                      src="/img/image-9.png"
                    />

                    <div className="team-detail-header-3">
                      <div className="team-detail-text">
                        <div className="team-detail-text-2">
                          FC Bayern München
                        </div>

                        <div className="team-detail-text-3">Allianz Arena</div>
                      </div>

                      <div className="team-detail-header-4">
                        <img
                          className="team-detail-header-5"
                          alt="Team detail header"
                          src="/img/team-detail-header-content-trikot-home.png"
                        />

                        <img
                          className="team-detail-header-5"
                          alt="Team detail header"
                          src="/img/team-detail-header-content-trikot-away.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="team-detail-2">
                <div className="team-detail-3">
                  <div className="team-detail-4">SQUAD</div>

                  <div className="team-detail-5">TABLE</div>

                  <div className="team-detail-5">FIXTURES &amp; RESULTS</div>

                  <div className="team-detail-5">STATS</div>

                  <div className="team-detail-6">NEWS &amp; VIDEOS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-content-15">
            <div className="page-content-section-3">
              <div className="page-content-16">
                <div className="page-content-17">FC BAYERN MÜNCHEN SQUAD</div>
              </div>

              <div className="team-detail-squad-12">
                <div className="team-detail-squad-13">
                  <div className="row-header">GOALKEEPER</div>

                  <div className="team-detail-squad-14">
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                  </div>
                </div>

                <div className="team-detail-squad-15">
                  <div className="row-header">FIELD PLAYERS</div>

                  <div className="team-detail-squad-14">
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                    <TeamDetailSquad
                      className="team-detail-squad-cell"
                      property1="no-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="page-content-section-4">
              <div className="page-content-16">
                <div className="page-content-17">FC BAYERN MÜNCHEN STATS</div>
              </div>

              <div className="club-stats-container-wrapper">
                <div className="club-stats-content-wrapper">
                  <div className="club-stats-content-2">
                    <StatCell className="stat-cell-2" />
                    <StatCell className="stat-cell-2" />
                    <StatCell className="stat-cell-2" />
                    <StatCell className="stat-cell-2" />
                    <StatCell className="stat-cell-2" />
                    <StatCell className="stat-cell-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="page-content-section-3">
              <div className="page-content-16">
                <p className="page-content-17">
                  FC BAYERN MÜNCHEN FIXTURES &amp; RESULTS
                </p>
              </div>

              <div className="livescore-header-2">
                <div className="gameday-4">
                  <div className="gameday-header-3">
                    <p className="gameday-header-date-3">
                      <span className="text-wrapper-99">Friday </span>

                      <span className="text-wrapper-100">13 September</span>
                    </p>

                    <p className="gameday-header-time-3">
                      <span className="text-wrapper-101">18:30 </span>

                      <span className="text-wrapper-102">GMT+0</span>
                    </p>
                  </div>

                  <FixtureDataCell
                    className="instance-node-12"
                    fixtureDataClassName="fixture-data-cell-4"
                    stadiumImage="/img/stadium-image-14.svg"
                    state="mobile"
                  />
                  <FixtureDataCell
                    className="instance-node-12"
                    fixtureDataClassName="fixture-data-cell-4"
                    stadiumImage="/img/stadium-image-14.svg"
                    state="mobile"
                  />
                </div>
              </div>

              <ActionButton
                actionButtonClassName="action-button-7"
                className="action-button-6"
              />
            </div>

            <div className="news-5">
              <div className="news-container-4">
                <div className="news-container-5">
                  <div className="title-8">NEWS &amp; SPIELBERICHTE</div>
                </div>

                <div className="news-container-grid-5">
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-2" />
                  <NewsArticle className="news-article-3" />
                </div>
              </div>

              <ActionButton
                actionButtonClassName="action-button-7"
                className="action-button-6"
              />
            </div>
          </div>

          <Footer
            className="footer-26"
            footerContent="/img/footer-content-wrapper-left-logo-30.png"
            footerContentClassNameOverride="footer-27"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-126.svg"
            link="/img/link-124.svg"
            link1="/img/link-127.svg"
            link2="/img/link-128.svg"
          />
        </>
      )}

      {screenWidth >= 1200 && (
        <>
          <ViewDefaultWrapper
            className="instance-node-12"
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
            mobileBurgerMenu="/img/mobile-burger-menu-35.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-17.svg"
            view="default"
          />
          <div className="team-detail-wrapper">
            <div className="team-detail-2">
              <div className="team-detail-header">
                <div className="team-detail-header-6">
                  <div className="team-detail-header-7">
                    <img
                      className="image-14"
                      alt="Image"
                      src="/img/image-9.png"
                    />

                    <div className="team-detail-header-8">
                      <div className="team-detail-text-4">
                        <div className="team-detail-text-5">
                          FC Bayern München
                        </div>

                        <div className="team-detail-text-6">Allianz Arena</div>
                      </div>

                      <div className="team-detail-header-4">
                        <img
                          className="team-detail-header-5"
                          alt="Team detail header"
                          src="/img/team-detail-header-content-trikot-home.png"
                        />

                        <img
                          className="team-detail-header-5"
                          alt="Team detail header"
                          src="/img/team-detail-header-content-trikot-away.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-frame-wrapper">
                <div className="div-wrapper-4">
                  <div className="team-detail-7">
                    <div className="team-detail-4">SQUAD</div>

                    <div className="team-detail-5">TABLE</div>

                    <div className="team-detail-5">FIXTURES &amp; RESULTS</div>

                    <div className="team-detail-5">STATS</div>

                    <div className="team-detail-5">NEWS &amp; VIDEOS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-content-framer-3">
            <div className="page-content-18">
              <div className="div-wrapper-4">
                <div className="page-content-section-5">
                  <div className="page-content-16">
                    <div className="page-content-17">
                      FC BAYERN MÜNCHEN SQUAD
                    </div>
                  </div>

                  <div className="team-detail-squad-12">
                    <div className="team-detail-squad-13">
                      <div className="row-header">GOALKEEPER</div>

                      <div className="team-detail-squad-16">
                        <TeamDetailSquad property1="image" />
                        <TeamDetailSquad property1="no-image" />
                      </div>
                    </div>

                    <div className="team-detail-squad-13">
                      <div className="row-header">FIELD PLAYERS</div>

                      <div className="team-detail-squad-16">
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                        <TeamDetailSquad property1="no-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="page-content-section-4">
                <div className="page-content-16">
                  <div className="page-content-17">FC BAYERN MÜNCHEN STATS</div>
                </div>

                <div className="club-stats-container-wrapper">
                  <div className="club-stats-content-wrapper">
                    <div className="club-stats-content-2">
                      <StatCell className="stat-cell-3" />
                      <StatCell className="stat-cell-3" />
                      <StatCell className="stat-cell-3" />
                      <StatCell className="stat-cell-3" />
                      <StatCell className="stat-cell-3" />
                      <StatCell className="stat-cell-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-4">
                <div className="page-content-section-6">
                  <div className="page-content-16">
                    <p className="page-content-17">
                      FC BAYERN MÜNCHEN FIXTURES &amp; RESULTS
                    </p>
                  </div>

                  <div className="livescore-header-2">
                    <div className="gameday-4">
                      <div className="gameday-header-3">
                        <p className="gameday-header-date-3">
                          <span className="text-wrapper-99">Friday </span>

                          <span className="text-wrapper-100">13 September</span>
                        </p>

                        <p className="gameday-header-time-3">
                          <span className="text-wrapper-101">18:30 </span>

                          <span className="text-wrapper-102">GMT+0</span>
                        </p>
                      </div>

                      <FixtureDataCell
                        className="instance-node-12"
                        img="/img/stadium-image-16.svg"
                        state="desktop"
                      />
                      <FixtureDataCell
                        className="instance-node-12"
                        img="/img/stadium-image-16.svg"
                        state="desktop"
                      />
                    </div>
                  </div>

                  <ActionButton
                    actionButtonClassName="action-button-7"
                    className="action-button-6"
                  />
                </div>
              </div>

              <div className="page-content-framer-3">
                <div className="news-6">
                  <div className="news-container-4">
                    <div className="page-content-16">
                      <div className="page-content-17">
                        NEWS UND SPIELBERICHTE
                      </div>
                    </div>

                    <div className="news-container-grid-6">
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
                    actionButtonClassName="action-button-7"
                    className="action-button-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-26"
            footerContent="/img/footer-content-wrapper-left-logo-35.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-129.svg"
            link="/img/link-125.svg"
            link1="/img/link-130.svg"
            link2="/img/link-131.svg"
          />
        </>
      )}
    </div>
  );
};
