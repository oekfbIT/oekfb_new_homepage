import React from "react";
import { DivWrapper } from "../../components/DivWrapper";
import { EventRow } from "../../components/EventRow";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { TeamDetailSquadWrapper } from "../../components/TeamDetailSquadWrapper";
import "./style.css";

export const ElementGameReport = (): JSX.Element => {
  return (
    <div className="element-game-report">
      <NavigationDesktop
        className="design-component-instance-node-2"
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
        mobileBurgerMenu="/img/mobile-burger-menu-83.svg"
        navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
      />
      <div className="game-report-wrapper">
        <div className="game-report-wrapper-2">
          <div className="game-report-top-row">
            <div className="left-wrapper">
              <img
                className="img-3"
                alt="Container"
                src="/img/container-6.svg"
              />

              <div className="game-report-back">
                <div className="game-report-back-2">Match List</div>
              </div>
            </div>

            <div className="middle-wrapper">
              <div className="middle-wrapper-game">FINAL</div>
            </div>

            <div className="right-wrapper">
              <div className="right-wrapper-text">Allianz Arena</div>
            </div>
          </div>

          <div className="game-report-middle">
            <div className="away-team-2">
              <div className="club-name">FC Bayern München</div>

              <div className="club-img-2" />
            </div>

            <div className="score-wrapper">
              <div className="margin">
                <div className="background-2">
                  <div className="container-5">
                    <div className="container-6">
                      <div className="link-10">
                        <div className="text-wrapper-105">FCB</div>
                      </div>
                    </div>

                    <div className="container-7">
                      <div className="text-wrapper-106">2</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin">
                <div className="background-3">
                  <div className="container-5">
                    <div className="container-8">
                      <div className="link-11">
                        <div className="text-wrapper-107">SCF</div>
                      </div>
                    </div>

                    <div className="container-7">
                      <div className="text-wrapper-108">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="away-team-2">
              <div className="club-img-2" />

              <div className="club-name">FC Bayern München</div>
            </div>
          </div>

          <div className="game-report-bottom">
            <div className="game-report-match">
              <div className="divider" />

              <div className="game-setting-wrapper">
                <div className="referee-wrapper">
                  <div className="referee-name">C. Dingert</div>

                  <img
                    className="img-3"
                    alt="Referee icon"
                    src="/img/referee-icon-7.svg"
                  />
                </div>

                <div className="stadium-wrapper">
                  <div className="stadium-img">
                    <div className="dfl-image">
                      <div className="DFL-STA-b-png" />
                    </div>
                  </div>

                  <div className="stadium-text">Allianz Arena</div>
                </div>
              </div>

              <div className="divider" />

              <div className="game-report-bottom">
                <div className="game-report-match">
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassName="event-row-3"
                    eventCardPlayerClassName="event-row-instance"
                    eventCardTeamImgClassName="event-row-2"
                    eventCardTypeImg="/img/event-card-type-img-119.svg"
                    property1="goal-home"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassNameOverride="event-row-3"
                    eventCardPlayerClassNameOverride="event-row-instance"
                    eventCardTeamImgClassNameOverride="event-row-2"
                    img="/img/event-card-type-img-120.svg"
                    property1="goal-away"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassName="event-row-3"
                    eventCardPlayerClassName="event-row-instance"
                    eventCardTeamImgClassName="event-row-2"
                    eventCardTypeImg1="/img/event-card-type-img-107.svg"
                    property1="yellow-home"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassNameOverride="event-row-3"
                    eventCardNameClassName="event-row-4"
                    eventCardPlayerClassNameOverride="event-row-instance"
                    eventCardTeamImgClassNameOverride="event-row-2"
                    eventCardTypeImg2="/img/event-card-type-img-108.svg"
                    property1="yellow-away"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassName="event-row-3"
                    eventCardNameClassNameOverride="event-row-4"
                    eventCardPlayerClassName="event-row-instance"
                    eventCardTeamImgClassName="event-row-2"
                    eventCardTypeImg3="/img/event-card-type-img-115.svg"
                    property1="red-home"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassNameOverride="event-row-3"
                    eventCardNameClassName="event-row-4"
                    eventCardPlayerClassNameOverride="event-row-instance"
                    eventCardTeamImgClassNameOverride="event-row-2"
                    eventCardTypeImg4="/img/event-card-type-img-116.svg"
                    property1="red-away"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassName="event-row-3"
                    eventCardNameClassNameOverride="event-row-4"
                    eventCardPlayerClassName="event-row-instance"
                    eventCardTeamImgClassName="event-row-2"
                    eventCardTypeImg5="/img/event-card-type-img-110.svg"
                    property1="yellowred-home"
                  />
                  <EventRow
                    className="design-component-instance-node-2"
                    eventCardLastNameClassNameOverride="event-row-3"
                    eventCardNameClassName="event-row-4"
                    eventCardPlayerClassNameOverride="event-row-instance"
                    eventCardTeamImgClassNameOverride="event-row-2"
                    eventCardTypeImg5="/img/event-card-type-img-110.svg"
                    property1="yellowred-away"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-detail-squad-17">
        <div className="team-detail-team-5">
          <div className="team-detail-squad-18">
            <div className="container-9">
              <div className="team-detail-squad-19">
                <TeamDetailSquadWrapper
                  className="design-component-instance-node-2"
                  clubImgClassName="team-detail-squad-header"
                />
                <div className="team-detail-squad-20">
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="team-detail-squad-18">
            <div className="container-9">
              <div className="team-detail-squad-19">
                <TeamDetailSquadWrapper
                  className="design-component-instance-node-2"
                  clubImgClassName="team-detail-squad-header"
                />
                <div className="team-detail-squad-20">
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                  <DivWrapper
                    className="design-component-instance-node-2"
                    flagiconClassName="team-detail-squad-22"
                    flagiconClassNameOverride="team-detail-squad-23"
                    frameClassName="team-detail-squad-instance"
                    frameClassNameOverride="team-detail-squad-21"
                    teamDetailSquadClassName="team-detail-squad-cell-instance"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        className="footer-37"
        footerContent="/img/footer-content-wrapper-left-logo-114.png"
        footerContentClassNameOverride="footer-38"
        href="https://www.facebook.com/kleinfeldliga/"
        href1="https://www.youtube.com/@OEKFB"
        href2="https://www.instagram.com/oekfb/?hl=en"
        img="/img/link-464.svg"
        link="/img/link-461.svg"
        link1="/img/link-468.svg"
        link2="/img/link-469.svg"
      />
    </div>
  );
};
