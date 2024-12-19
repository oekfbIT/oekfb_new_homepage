import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useNavigate, useParams } from "react-router-dom";
import { BlankettCell } from "../../components/DivWrapper";
import { EventRow } from "../../components/EventRow";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { TeamDetailSquadWrapper } from "../../components/TeamDetailSquadWrapper";
import "./style.css";
import ClientController from "../../network/ClientController";

export const ElementGameReport = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the match ID from the URL
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const clientController = new ClientController();

  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!id) {
        console.error("No match ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const matchDetail = await clientController.fetchMatchDetail(id);

        // Process events to set assign value
        const updatedEvents = matchDetail.events.map((event: any) => {
          const homePlayers = matchDetail.home_blanket?.players.map((p: any) => p.id);
          const awayPlayers = matchDetail.away_blanket?.players.map((p: any) => p.id);

          if (homePlayers.includes(event.player?.id)) {
            return { ...event, assign: "home" };
          }
          if (awayPlayers.includes(event.player?.id)) {
            return { ...event, assign: "away" };
          }
          return { ...event, assign: null }; // Default if not found
        });

        setGameData({
          ...matchDetail,
          events: updatedEvents,
        });
      } catch (error) {
        console.error("Error fetching Match details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!gameData) {
    return <div>No game data available.</div>;
  }

  return (
      <div className="element-game-report">
        <Navigation />
        <div className="game-report-wrapper">
          <div className="game-report-wrapper-2" style={{ paddingTop: "20px" }}>
            <div className="game-report-middle">
              <div className="away-team-2">
                <div className="club-name">{gameData.home_blanket?.name}</div>
                <div
                    className="club-img-2"
                    style={{
                      backgroundImage: `url(${gameData.home_blanket?.logo})`,
                      backgroundPosition: "50% 50%",
                      backgroundSize: "cover",
                      height: "80px",
                      width: "80px",
                    }}
                />
              </div>

              <div className="score-wrapper">
                <div className="margin">
                  <div className="background-2">
                    <div className="container-5">
                      <div className="container-6"></div>
                      <div className="container-7">
                        <div className="text-wrapper-106">{gameData.score?.home}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="margin">
                  <div className="background-3">
                    <div className="container-5">
                      <div className="container-8"></div>
                      <div className="container-7">
                        <div className="text-wrapper-108">{gameData.score?.away}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="away-team-2">
                <div
                    className="club-img-2"
                    style={{
                      backgroundImage: `url(${gameData.away_blanket?.logo})`,
                      backgroundPosition: "50% 50%",
                      backgroundSize: "cover",
                      height: "80px",
                      width: "80px",
                    }}
                />
                <div className="club-name">{gameData.away_blanket?.name}</div>
              </div>
            </div>

            <div className="game-report-bottom">
              <div className="game-report-match">
                <div className="divider" />

                <div className="game-setting-wrapper">
                  <div className="referee-wrapper">
                    <div className="referee-name">{gameData.referee?.name}</div>
                    <img className="img-3" alt="Referee icon" src="/img/referee-icon-7.svg" />
                  </div>

                  <div className="stadium-wrapper">
                    <div className="stadium-img">
                      <div className="dfl-image">
                        <div className="DFL-STA-b-png" />
                      </div>
                    </div>
                    <div className="stadium-text">{gameData.details?.location}</div>
                  </div>
                </div>

                <div className="divider" />

                <div className="game-report-bottom">
                  <div className="game-report-match">
                    {gameData.events.map((ev: any) => (
                        <EventRow
                            key={ev.id}
                            className="design-component-instance-node-2"
                            event={ev}
                            homeID={ev.home}
                            awayID={ev.away}
                        />
                    ))}
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
                      teamName={gameData.home_blanket?.name}
                      teamLogo={gameData.home_blanket?.logo}
                  />
                  <div className="team-detail-squad-20">
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
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
                      teamName={gameData.away_blanket?.name}
                      teamLogo={gameData.away_blanket?.logo}
                  />
                  <div className="team-detail-squad-20">
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                    />
                    <BlankettCell
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

        <Footer />
      </div>
  );
};
