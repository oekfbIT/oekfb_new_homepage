import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementGamedayMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-gameday-mobile"
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
            className="instance-node-7"
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
            mobileBurgerMenu="/img/mobile-burger-menu-24.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="livescore">
            <PageHeader
              className="instance-node-7"
              text="News &amp; Spielberichte"
            />
            <Dropdown
              className="instance-node-7"
              dropdownWrapperClassName="dropdown-instance"
              dropdownWrapperClassNameOverride="dropdown-3"
              matLabelSelectAClassName="dropdown-2"
              text="Spieltag"
              text1="Spieltag 2"
            />
            <div className="livescore-header">
              <div className="gameday">
                <div className="gameday-header">
                  <p className="gameday-header-date">
                    <span className="text-wrapper-91">Friday </span>

                    <span className="text-wrapper-92">13 September</span>
                  </p>

                  <p className="gameday-header-time">
                    <span className="text-wrapper-93">18:30 </span>

                    <span className="text-wrapper-94">GMT+0</span>
                  </p>
                </div>

                <FixtureDataCell
                  awayTeamClassName="fixture-data-cell-2"
                  className="instance-node-7"
                  fixtureDataClassName="fixture-data-cell-instance"
                  gamedayLivescoreClassName="fixture-data-cell-3"
                  gamedayLivescoreClassNameOverride="fixture-data-cell-3"
                  homeTeamClassName="fixture-data-cell-2"
                  stadiumImage="/img/stadium-image-2.svg"
                  state="mobile"
                />
                <FixtureDataCell
                  awayTeamClassName="fixture-data-cell-2"
                  className="instance-node-7"
                  fixtureDataClassName="fixture-data-cell-instance"
                  gamedayLivescoreClassName="fixture-data-cell-3"
                  gamedayLivescoreClassNameOverride="fixture-data-cell-3"
                  homeTeamClassName="fixture-data-cell-2"
                  stadiumImage="/img/stadium-image-2.svg"
                  state="mobile"
                />
                <FixtureDataCell
                  awayTeamClassName="fixture-data-cell-2"
                  className="instance-node-7"
                  fixtureDataClassName="fixture-data-cell-instance"
                  gamedayLivescoreClassName="fixture-data-cell-3"
                  gamedayLivescoreClassNameOverride="fixture-data-cell-3"
                  homeTeamClassName="fixture-data-cell-2"
                  stadiumImage="/img/stadium-image-4.svg"
                  state="mobile"
                />
              </div>
            </div>

            <div className="livescore-header">
              <div className="gameday">
                <div className="gameday-header">
                  <p className="gameday-header-date">
                    <span className="text-wrapper-91">Friday </span>

                    <span className="text-wrapper-92">13 September</span>
                  </p>

                  <p className="gameday-header-time">
                    <span className="text-wrapper-93">18:30 </span>

                    <span className="text-wrapper-94">GMT+0</span>
                  </p>
                </div>

                <FixtureDataCell
                  awayTeamClassName="fixture-data-cell-2"
                  className="instance-node-7"
                  fixtureDataClassName="fixture-data-cell-instance"
                  gamedayLivescoreClassName="fixture-data-cell-3"
                  gamedayLivescoreClassNameOverride="fixture-data-cell-3"
                  homeTeamClassName="fixture-data-cell-2"
                  stadiumImage="/img/stadium-image-4.svg"
                  state="mobile"
                />
                <FixtureDataCell
                  awayTeamClassName="fixture-data-cell-2"
                  className="instance-node-7"
                  fixtureDataClassName="fixture-data-cell-instance"
                  gamedayLivescoreClassName="fixture-data-cell-3"
                  gamedayLivescoreClassNameOverride="fixture-data-cell-3"
                  homeTeamClassName="fixture-data-cell-2"
                  stadiumImage="/img/stadium-image-4.svg"
                  state="mobile"
                />
              </div>
            </div>
          </div>

          <Footer
            className="footer-15"
            footerContent="/img/footer-content-wrapper-left-logo-22.png"
            footerContentClassNameOverride="footer-16"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-85.svg"
            link="/img/link-84.svg"
            link1="/img/link-86.svg"
            link2="/img/link-87.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="instance-node-7"
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
            mobileBurgerMenu="/img/mobile-burger-menu-26.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-12.svg"
            view="default"
          />
          <div className="page-frame-2">
            <div className="livescore-2">
              <div className="page-frame-2">
                <PageHeader
                  className="page-header-4"
                  text="News &amp; Spielberichte"
                />
              </div>

              <div className="page-frame-2">
                <Dropdown
                  className="instance-node-7"
                  dropdownWrapper="/img/dropdown-wrapper-icon-3.svg"
                  dropdownWrapperClassName="dropdown-instance"
                  dropdownWrapperClassNameOverride="dropdown-3"
                  matLabelSelectAClassName="dropdown-2"
                  text="Spieltag"
                  text1="Spieltag 2"
                />
              </div>

              <div className="page-frame-2">
                <div className="gamedays">
                  <div className="livescore-header">
                    <div className="gameday">
                      <div className="gameday-header">
                        <p className="gameday-header-date">
                          <span className="text-wrapper-91">Friday </span>

                          <span className="text-wrapper-92">13 September</span>
                        </p>

                        <p className="gameday-header-time">
                          <span className="text-wrapper-93">18:30 </span>

                          <span className="text-wrapper-94">GMT+0</span>
                        </p>
                      </div>

                      <FixtureDataCell
                        className="instance-node-7"
                        img="/img/stadium-image-7.svg"
                        state="desktop"
                      />
                      <FixtureDataCell
                        className="instance-node-7"
                        img="/img/stadium-image-8.svg"
                        state="desktop"
                      />
                      <FixtureDataCell
                        className="instance-node-7"
                        img="/img/stadium-image-8.svg"
                        state="desktop"
                      />
                    </div>
                  </div>

                  <div className="livescore-header">
                    <div className="gameday">
                      <div className="gameday-header">
                        <p className="gameday-header-date">
                          <span className="text-wrapper-91">Friday </span>

                          <span className="text-wrapper-92">13 September</span>
                        </p>

                        <p className="gameday-header-time">
                          <span className="text-wrapper-93">18:30 </span>

                          <span className="text-wrapper-94">GMT+0</span>
                        </p>
                      </div>

                      <FixtureDataCell
                        className="instance-node-7"
                        img="/img/stadium-image-8.svg"
                        state="desktop"
                      />
                      <FixtureDataCell
                        className="instance-node-7"
                        img="/img/stadium-image-11.svg"
                        state="desktop"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-15"
            footerContent="/img/footer-content-wrapper-left-logo-20.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-93.svg"
            link="/img/link-92.svg"
            link1="/img/link-94.svg"
            link2="/img/link-95.svg"
          />
        </>
      )}
    </div>
  );
};
