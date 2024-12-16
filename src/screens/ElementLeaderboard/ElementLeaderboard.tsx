import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LeaderboardHighligh } from "../../components/LeaderboardHighligh";
import { LeaderboardStat } from "../../components/LeaderboardStat";
import { NavigationDesktop } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementLeaderboard = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-leaderboard"
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
          className="instance-node-10"
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
          mobileBurgerMenu="/img/mobile-burger-menu-31.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        />
      )}

      {screenWidth >= 900 && (
        <DesktopNav
          className="instance-node-10"
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
          mobileBurgerMenu="/img/mobile-burger-menu-32.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-16.svg"
          view="default"
        />
      )}

      <div className="page-control-4">
        <PageHeader className="instance-node-10" text="Leaderboards" />
        <div className="leaderboard">
          <div className="leaderboard-wrapper">
            <div className="leaderboard-2">
              <div className="leaderboard-3">
                <div className="leaderboard-4">CARDS</div>
              </div>
            </div>
          </div>

          <div className="leaderboard-wrapper">
            <div className="leaderboard-2">
              <div className="leaderboard-5">
                <div className="leaderboard-6">
                  <div className="leaderboard-7">GOALS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leaderboard-highligh-2">
          <LeaderboardHighligh
            className={`${screenWidth < 900 && "class-11"} ${screenWidth >= 900 && "class-12"}`}
          />
          <LeaderboardHighligh
            className={`${screenWidth < 900 && "class-11"} ${screenWidth >= 900 && "class-12"}`}
          />
          <LeaderboardHighligh
            className={`${screenWidth < 900 && "class-11"} ${screenWidth >= 900 && "class-12"}`}
          />
        </div>

        <div className="single-stat-cells">
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
            property1={
              screenWidth < 900
                ? "mobile"
                : screenWidth >= 900
                  ? "desktop"
                  : undefined
            }
          />
          <LeaderboardStat
            className="instance-node-10"
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
          className="footer-23"
          footerContent="/img/footer-content-wrapper-left-logo-23.png"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-117.svg"
          link="/img/link-116.svg"
          link1="/img/link-118.svg"
          link2="/img/link-119.svg"
        />
      )}

      {screenWidth < 900 && (
        <Footer
          className="footer-23"
          footerContent="/img/footer-content-wrapper-left-logo-23.png"
          footerContentClassNameOverride="footer-24"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-113.svg"
          link="/img/link-112.svg"
          link1="/img/link-114.svg"
          link2="/img/link-115.svg"
        />
      )}
    </div>
  );
};
