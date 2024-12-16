import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { NewsArticle } from "../../components/NewsArticle";
import { StatCell } from "../../components/StatCell";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementPlayerDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-player-detail"
      style={{
        gap: screenWidth >= 768 && screenWidth < 900 ? "40px" : undefined,
        minWidth:
          screenWidth < 768
            ? "390px"
            : screenWidth >= 768 && screenWidth < 900
              ? "768px"
              : screenWidth >= 900
                ? "900px"
                : undefined,
        overflow: screenWidth < 768 ? "hidden" : undefined,
      }}
    >
      {((screenWidth >= 768 && screenWidth < 900) || screenWidth < 768) && (
        <NavigationDesktop
          className="instance-node-11"
          img="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem="/img/league-row-item-content-img-1090.png"
          leagueRowItem1="/img/league-row-item-content-img-1090.png"
          leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem11="/img/league-row-item-content-img-1090.png"
          leagueRowItem12={
            screenWidth < 768
              ? "/img/league-row-item-content-seperator-1104.png"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/league-row-item-content-seperator-1080.svg"
                : undefined
          }
          leagueRowItem13="/img/league-row-item-content-img-1090.png"
          leagueRowItem14={
            screenWidth < 768
              ? "/img/league-row-item-content-seperator-1104.png"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/league-row-item-content-seperator-1080.svg"
                : undefined
          }
          leagueRowItem15="/img/league-row-item-content-img-1090.png"
          leagueRowItem16={
            screenWidth < 768
              ? "/img/league-row-item-content-seperator-1104.png"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/league-row-item-content-seperator-1080.svg"
                : undefined
          }
          leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem3="/img/league-row-item-content-img-1090.png"
          leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem5="/img/league-row-item-content-img-1090.png"
          leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem7="/img/league-row-item-content-img-1090.png"
          leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
          leagueRowItem9="/img/league-row-item-content-img-1090.png"
          leagueRowItemClassName={`${screenWidth >= 768 && screenWidth < 900 && "class-13"}`}
          leagueRowItemClassNameOverride={`${screenWidth >= 768 && screenWidth < 900 && "class-13"}`}
          linkWrapperClassName={`${screenWidth >= 768 && screenWidth < 900 && "class-13"}`}
          linkWrapperClassNameOverride={`${screenWidth >= 768 && screenWidth < 900 && "class-13"}`}
          mobileBurgerMenu={
            screenWidth < 768
              ? "/img/mobile-burger-menu-33.svg"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/mobile-burger-menu-36.svg"
                : undefined
          }
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        />
      )}

      {screenWidth >= 900 && (
        <DesktopNav
          className="instance-node-11"
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
          mobileBurgerMenu="/img/mobile-burger-menu-39.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-18.svg"
          view="default"
        />
      )}

      <div className="player-detail-header">
        <div
          className="player-detail-header-2"
          style={{
            alignItems:
              screenWidth < 768
                ? "flex-end"
                : (screenWidth >= 768 && screenWidth < 900) ||
                    screenWidth >= 900
                  ? "center"
                  : undefined,
            padding:
              screenWidth < 768
                ? "0px 10px"
                : (screenWidth >= 768 && screenWidth < 900) ||
                    screenWidth >= 900
                  ? "0px 32px"
                  : undefined,
          }}
        >
          <div className="player-detail-header-3">
            <div className="large-text-container">
              <div className="large-text-container-2">1</div>

              <div
                className="large-text-container-3"
                style={{
                  marginRight: screenWidth < 768 ? "-24.61px" : undefined,
                }}
              >
                <div className="large-text-container-wrapper">
                  <div className="large-text-container-4">Manuel</div>
                </div>

                <div className="large-text-container-wrapper">
                  <div className="large-text-container-5">Neuer</div>
                </div>
              </div>
            </div>

            <div
              className="small-text-container"
              style={{
                alignSelf: screenWidth < 768 ? "stretch" : undefined,
                marginRight:
                  screenWidth >= 768 && screenWidth < 900
                    ? "-168.00px"
                    : screenWidth >= 900
                      ? "-100.00px"
                      : undefined,
                width:
                  screenWidth < 768
                    ? "100%"
                    : (screenWidth >= 768 && screenWidth < 900) ||
                        screenWidth >= 900
                      ? "600px"
                      : undefined,
              }}
            >
              <div className="small-text-container-2">
                <div
                  className="small-text-cell"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>

                  <div className="de-png" />
                </div>

                <div
                  className="small-text-cell-3"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>
                </div>

                <div
                  className="small-text-cell-4"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>
                </div>

                <div
                  className="small-text-cell-5"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>
                </div>

                <div
                  className="small-text-cell-6"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>
                </div>

                <div
                  className="small-text-cell-7"
                  style={{
                    marginRight: screenWidth < 768 ? "-132.00px" : undefined,
                  }}
                >
                  <div className="small-text-cell-key">Club</div>

                  <div className="small-text-cell-2">FC Bayern München</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="player-detail-header-4"
            style={{
              alignSelf:
                (screenWidth >= 768 && screenWidth < 900) || screenWidth >= 900
                  ? "stretch"
                  : undefined,
              justifyContent:
                screenWidth < 768
                  ? "flex-end"
                  : (screenWidth >= 768 && screenWidth < 900) ||
                      screenWidth >= 900
                    ? "center"
                    : undefined,
              minHeight: screenWidth < 768 ? "410px" : undefined,
            }}
          >
            {screenWidth < 768 && (
              <>
                <img
                  className="player-detail-2"
                  alt="Player detail"
                  src="/img/player-detail-background-container-player-2.png"
                />

                <div className="player-detail-3">
                  <img
                    className="player-detail-4"
                    alt="Player detail"
                    src="/img/image-9.png"
                  />
                </div>
              </>
            )}

            {((screenWidth >= 768 && screenWidth < 900) ||
              screenWidth >= 900) && (
              <>
                <div className="player-detail-5">
                  <img
                    className="player-detail-4"
                    alt="Player detail"
                    src="/img/image-9.png"
                  />
                </div>

                <img
                  className="player-detail-6"
                  alt="Player detail"
                  src="/img/player-detail-background-container-player-3.png"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="page-content-10"
        style={{
          padding:
            screenWidth >= 900 || screenWidth < 768
              ? "32px"
              : screenWidth >= 768 && screenWidth < 900
                ? "32px 10px"
                : undefined,
        }}
      >
        <div className="page-content-section">
          <div className="page-content-11">
            <div className="page-content-12">FC BAYERN MÜNCHEN STATS</div>
          </div>

          <div className="club-stats">
            <div className="club-stats-container">
              <div className="club-stats-content">
                <StatCell className="stat-cell-instance" />
                <StatCell className="stat-cell-instance" />
                <StatCell className="stat-cell-instance" />
                <StatCell className="stat-cell-instance" />
                <StatCell className="stat-cell-instance" />
                <StatCell className="stat-cell-instance" />
              </div>
            </div>
          </div>
        </div>

        <div className="page-content-section-2">
          <div className="page-content-11">
            <p className="page-content-12">
              FC BAYERN MÜNCHEN FIXTURES &amp; RESULTS
            </p>
          </div>

          <div
            className="gameday-wrapper"
            style={{
              maxWidth:
                (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                  ? "1400px"
                  : undefined,
            }}
          >
            <div
              className="gameday-2"
              style={{
                alignItems:
                  (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                    ? "flex-start"
                    : screenWidth >= 900
                      ? "center"
                      : undefined,
                maxWidth: screenWidth >= 900 ? "1400px" : undefined,
              }}
            >
              {((screenWidth >= 768 && screenWidth < 900) ||
                screenWidth < 768) && (
                <>
                  <div className="gameday-header-2">
                    <p className="gameday-header-date-2">
                      <span className="text-wrapper-95">Friday </span>

                      <span className="text-wrapper-96">13 September</span>
                    </p>

                    <p className="gameday-header-time-2">
                      <span className="text-wrapper-97">18:30 </span>

                      <span className="text-wrapper-98">GMT+0</span>
                    </p>
                  </div>

                  <FixtureDataCell
                    className="instance-node-11"
                    fixtureDataClassName={`${screenWidth >= 768 && screenWidth < 900 && "class-14"}`}
                    stadiumImage={
                      screenWidth < 768
                        ? "/img/stadium-image-2.svg"
                        : screenWidth >= 768 && screenWidth < 900
                          ? "/img/stadium-image-4.svg"
                          : undefined
                    }
                    state="mobile"
                  />
                  <FixtureDataCell
                    className="instance-node-11"
                    fixtureDataClassName={`${screenWidth >= 768 && screenWidth < 900 && "class-14"}`}
                    stadiumImage={
                      screenWidth < 768
                        ? "/img/stadium-image-13.svg"
                        : screenWidth >= 768 && screenWidth < 900
                          ? "/img/stadium-image-4.svg"
                          : undefined
                    }
                    state="mobile"
                  />
                </>
              )}

              {screenWidth >= 900 && (
                <div className="gameday-3">
                  <div className="gameday-header-2">
                    <p className="gameday-header-date-2">
                      <span className="text-wrapper-95">Friday </span>

                      <span className="text-wrapper-96">13 September</span>
                    </p>

                    <p className="gameday-header-time-2">
                      <span className="text-wrapper-97">18:30 </span>

                      <span className="text-wrapper-98">GMT+0</span>
                    </p>
                  </div>

                  <FixtureDataCell
                    className="instance-node-11"
                    img="/img/stadium-image-20.svg"
                    state="desktop"
                  />
                  <FixtureDataCell
                    className="instance-node-11"
                    img="/img/stadium-image-20.svg"
                    state="desktop"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="action-button-wrapper">
            <div className="action-button-3">
              <div className="button-title-3">ALL FIXTURES</div>
            </div>
          </div>
        </div>

        <div
          className="news-3"
          style={{
            alignItems:
              (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                ? "center"
                : screenWidth >= 900
                  ? "flex-start"
                  : undefined,
            flexDirection:
              (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                ? "column"
                : undefined,
            gap:
              (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                ? "25px"
                : screenWidth >= 900
                  ? "10px"
                  : undefined,
            justifyContent: screenWidth >= 900 ? "center" : undefined,
            maxWidth:
              (screenWidth >= 768 && screenWidth < 900) || screenWidth < 768
                ? "1200px"
                : undefined,
          }}
        >
          {(screenWidth >= 900 || screenWidth < 768) && (
            <div
              className="news-4"
              style={{
                alignSelf: screenWidth < 768 ? "stretch" : undefined,
                flex:
                  screenWidth < 768
                    ? "0 0 auto"
                    : screenWidth >= 900
                      ? "1"
                      : undefined,
                flexGrow: screenWidth >= 900 ? "1" : undefined,
                width: screenWidth < 768 ? "100%" : undefined,
              }}
            >
              <div className="news-container-2">
                <div
                  className="page-content-13"
                  style={{
                    alignItems:
                      screenWidth >= 900
                        ? "center"
                        : screenWidth < 768
                          ? "flex-start"
                          : undefined,
                    gap: screenWidth >= 900 ? "10px" : undefined,
                    justifyContent: screenWidth >= 900 ? "center" : undefined,
                    padding: screenWidth >= 900 ? "0px 32px" : undefined,
                  }}
                >
                  <div
                    className="page-content-14"
                    style={{
                      fontFamily:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-font-family)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-font-family)"
                            : undefined,
                      fontSize:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-font-size)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-font-size)"
                            : undefined,
                      fontStyle:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-font-style)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-font-style)"
                            : undefined,
                      fontWeight:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-font-weight)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-font-weight)"
                            : undefined,
                      letterSpacing:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-letter-spacing)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-letter-spacing)"
                            : undefined,
                      lineHeight:
                        screenWidth >= 900
                          ? "var(--theme-inter-bold-27-63-upper-line-height)"
                          : screenWidth < 768
                            ? "var(--theme-inter-bold-16-03-upper-line-height)"
                            : undefined,
                      textAlign: screenWidth >= 900 ? "center" : undefined,
                    }}
                  >
                    {screenWidth >= 900 && <>NEWS UND SPIELBERICHTE</>}

                    {screenWidth < 768 && <>NEWS &amp; SPIELBERICHTE</>}
                  </div>
                </div>

                <div
                  className="news-container-grid-3"
                  style={{
                    justifyContent: screenWidth >= 900 ? "center" : undefined,
                  }}
                >
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                  <NewsArticle
                    className={`${screenWidth < 768 && "class-15"}`}
                  />
                </div>
              </div>

              {screenWidth < 768 && (
                <div className="action-button-instance-wrapper">
                  <ActionButton actionButtonClassName="action-button-4" />
                </div>
              )}

              {screenWidth >= 900 && (
                <ActionButton
                  actionButtonClassName="action-button-4"
                  className="action-button-5"
                />
              )}
            </div>
          )}

          {screenWidth >= 768 && screenWidth < 900 && (
            <>
              <div className="news-container-2">
                <div className="news-container-3">
                  <div className="title-7">NEWS &amp; SPIELBERICHTE</div>
                </div>

                <div className="news-container-grid-4">
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
                actionButtonClassName="action-button-4"
                className="action-button-5"
              />
            </>
          )}
        </div>
      </div>

      {screenWidth >= 900 && (
        <Footer
          className="footer-25"
          footerContent="/img/footer-content-wrapper-left-logo-32.png"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-145.svg"
          link="/img/link-144.svg"
          link1="/img/link-146.svg"
          link2="/img/link-147.svg"
        />
      )}

      {((screenWidth >= 768 && screenWidth < 900) || screenWidth < 768) && (
        <Footer
          className="footer-25"
          footerContent={
            screenWidth < 768
              ? "/img/footer-content-wrapper-left-logo-30.png"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/footer-content-wrapper-left-logo-32.png"
                : undefined
          }
          footerContentClassNameOverride={`${screenWidth < 768 && "class-16"}`}
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img={
            screenWidth < 768
              ? "/img/link-121.svg"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/link-133.svg"
                : undefined
          }
          link={
            screenWidth < 768
              ? "/img/link-120.svg"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/link-132.svg"
                : undefined
          }
          link1={
            screenWidth < 768
              ? "/img/link-122.svg"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/link-134.svg"
                : undefined
          }
          link2={
            screenWidth < 768
              ? "/img/link-123.svg"
              : screenWidth >= 768 && screenWidth < 900
                ? "/img/link-135.svg"
                : undefined
          }
        />
      )}
    </div>
  );
};
