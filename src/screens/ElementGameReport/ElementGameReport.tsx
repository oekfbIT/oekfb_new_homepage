import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { BlankettCell } from "../../components/DivWrapper";
import { EventRow } from "../../components/EventRow";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { TeamDetailSquadWrapper } from "../../components/TeamDetailSquadWrapper";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import {
    formatMatchDate,
    formatMatchTime,
    getElapsedTime,
    getMatchStatusText
} from "../../utils/matchUtils";
import "./style.css";

export const ElementGameReport = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const clientController = new ClientController();

  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState("0'");

  useEffect(() => {
    const fetchGameData = async () => {
      if (!id) {
        console.error("No match ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const matchDetail = await clientController.fetchMatchDetail(id);

        let homeScore = 0;
        let awayScore = 0;

        let updatedEvents = matchDetail.events.map((event: any) => {
          const homePlayers = matchDetail.home_blanket?.players.map(
            (p: any) => p.id
          );
          const awayPlayers = matchDetail.away_blanket?.players.map(
            (p: any) => p.id
          );

          let assign = null;
          if (homePlayers.includes(event.player?.id)) assign = "home";
          else if (awayPlayers.includes(event.player?.id)) assign = "away";

          let scoreAtTime = `${homeScore} - ${awayScore}`;
          if (event.type === "goal") {
            if (assign === "home") homeScore++;
            else if (assign === "away") awayScore++;
            scoreAtTime = `${homeScore} - ${awayScore}`;
          }

          return { ...event, assign, scoreAtTime };
        });

        updatedEvents.sort(
          (a: any, b: any) =>
            Number(a.minute?.$numberLong || a.minute) -
            Number(b.minute?.$numberLong || b.minute)
        );

        setGameData({ ...matchDetail, events: updatedEvents });
      } catch (error) {
        console.error("Error fetching Match details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  useEffect(() => {
    if (!gameData) return;
    if (!["first", "second"].includes(gameData.status)) return;

    const updateElapsedTime = () => {
      const offset = gameData.status === "second" ? 25 : 0;
      const halfStartTime =
        gameData.status === "second"
          ? gameData.second_half_date
          : gameData.first_half_date;
      setElapsedTime(getElapsedTime(halfStartTime, offset));
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [gameData]);

  const status = gameData?.status;
  const statusText = getMatchStatusText(
    status || "",
    gameData?.first_half_date,
    gameData?.second_half_date,
    gameData?.details?.date
      ? `${formatMatchDate(gameData.details.date)} - ${formatMatchTime(
          gameData.details.date
        )}`
      : "Datum nicht Zugewiesen"
  );

  if (loading) return  <LoadingIndicator/> ;
  if (!gameData) return <div>No game data available.</div>;

  return (
    <div className="element-game-report">
      {isMobile ? <Navigation /> : <DesktopNav />}

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
                }}
              />
            </div>

            <div className="score-wrapper">
              <div className="margin">
                <div className="background-2">
                  <div className="container-5">
                    <div className="container-6"></div>
                    <div className="container-7">
                      <div className="text-wrapper-106">
                        {gameData.score?.home}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin">
                <div className="background-3">
                  <div className="container-5">
                    <div className="container-8"></div>
                    <div className="container-7">
                      <div className="text-wrapper-108">
                        {gameData.score?.away}
                      </div>
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
                  backgroundSize: "contain",
                }}
              />
              <div className="club-name">{gameData.away_blanket?.name}</div>
            </div>
          </div>

          <div className="game-report-bottom">
            <div className="game-report-match">
              <div className="divider" />

              <div className="game-setting-wrapper">
                <div className="setting-wrapper">
                  <div className="setting-date">
                    {gameData.details?.date
                      ? `${formatMatchDate(gameData.details.date)} - ${formatMatchTime(
                          gameData.details.date
                        )}`
                      : "Datum nicht Zugewiesen"}
                  </div>
                </div>

                <div className="setting-wrapper">
                  <div className="setting-status">{statusText}</div>
                </div>

                <div className="stadium-wrapper">
                  <div className="stadium-img">
                    <div className="dfl-image">
                      <div className="DFL-STA-b-png" />
                    </div>
                  </div>
                  <div className="stadium-text">
                    {gameData.details.location}
                  </div>
                </div>
              </div>

              <div className="divider" />

              <div className="game-report-bottom">
                <div className="game-report-match">
                  {gameData.events.map((ev: any) => (
                    <EventRow
                      key={ev._id}
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
                  trikot={gameData.home_blanket?.dress}
                  teamLogo={gameData.home_blanket?.logo}
                  assign="home"
                />
                <div className="team-detail-squad-20">
                  {gameData.home_blanket?.players?.length > 0 ? (
                    gameData.home_blanket.players.map((player: any) => (
                      <BlankettCell
                        key={player.id}
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                        playerName={player.name}
                        playerImage={player.image}
                        playerNumber={player.number}
                        playerId={player.id}
                      />
                    ))
                  ) : (
                    <div className="empty-squad">Blankett noch nicht ausgefüllt</div>
                  )}
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
                  {gameData.away_blanket?.players?.length > 0 ? (
                    gameData.away_blanket.players.map((player: any) => (
                      <BlankettCell
                        key={player.id}
                        className="design-component-instance-node-2"
                        flagiconClassName="team-detail-squad-22"
                        flagiconClassNameOverride="team-detail-squad-23"
                        frameClassName="team-detail-squad-instance"
                        frameClassNameOverride="team-detail-squad-21"
                        teamDetailSquadClassName="team-detail-squad-cell-instance"
                        playerName={player.name}
                        playerImage={player.image}
                        playerNumber={player.number}
                        playerId={player.id}
                      />
                    ))
                  ) : (
                    <div className="empty-squad">Blankett noch nicht ausgefüllt</div>
                  )}
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
