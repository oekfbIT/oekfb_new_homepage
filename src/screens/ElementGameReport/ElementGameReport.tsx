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

        // Initialize scores
        let homeScore = 0;
        let awayScore = 0;

        // Process events to set assign value and calculate dynamic score
        let updatedEvents = matchDetail.events.map((event: any) => {
          const homePlayers = matchDetail.home_blanket?.players.map(
            (p: any) => p.id
          );
          const awayPlayers = matchDetail.away_blanket?.players.map(
            (p: any) => p.id
          );

          // Determine the assign value
          let assign = null;
          if (homePlayers.includes(event.player?.id)) {
            assign = "home";
          } else if (awayPlayers.includes(event.player?.id)) {
            assign = "away";
          }

          // Update score dynamically for goals
          let scoreAtTime = `${homeScore} - ${awayScore}`;
          if (event.type === "goal") {
            if (assign === "home") {
              homeScore++;
            } else if (assign === "away") {
              awayScore++;
            }
            scoreAtTime = `${homeScore} - ${awayScore}`;
          }

          return { ...event, assign, scoreAtTime };
        });

        // ✅ Sort events by minute (lowest first)
        updatedEvents.sort(
          (a: any, b: any) =>
            Number(a.minute?.$numberLong || a.minute) -
            Number(b.minute?.$numberLong || b.minute)
        );

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

  const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Ungültiges Datum";

    return date.toISOString().substring(11, 16); // Extract HH:mm in UTC
  };

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
                {/*<div className="referee-wrapper">*/}
                {/*  <div className="referee-name">*/}
                {/*    {gameData.referee?.name?.trim() ? gameData.referee?.name : "Schiedrichter Nicht Zugewiesen"}*/}
                {/*  </div>*/}
                {/*  <img className="img-3" alt="Referee icon" src="/img/referee-icon-7.svg"/>*/}
                {/*</div>*/}

                <div className="setting-wrapper">
                  <div className="setting-date">
                    {gameData.details?.date
                      ? `${new Date(gameData.details.date).toLocaleDateString(
                          "de-DE",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )} - ${formatMatchTime(gameData.details.date)}`
                      : "Datum nicht Zugewiesen"}
                  </div>
                </div>

                <div className="stadium-wrapper">
                  <div className="stadium-img">
                    <div className="dfl-image">
                      <div className="DFL-STA-b-png" />
                    </div>
                  </div>
                  <div className="stadium-text">
                    {gameData.details?.location?.trim()
                      ? gameData.details.location
                      : "Nicht Zugewiesen"}
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
                  teamLogo={gameData.home_blanket?.logo}
                  assign="home"
                />
                <div className="team-detail-squad-20">
                  {gameData.home_blanket?.players &&
                  gameData.home_blanket.players.length > 0 ? (
                    gameData.home_blanket.players.map((player: any) => (
                      <BlankettCell
                        key={player.id} // Ensure each key is unique
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
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#555",
                      }}
                    >
                      Blankett noch nicht ausgefüllt
                    </div>
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
                  {gameData.away_blanket?.players &&
                  gameData.away_blanket.players.length > 0 ? (
                    gameData.away_blanket.players.map((player: any) => (
                      <BlankettCell
                        key={player.id} // Ensure each key is unique
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
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#555",
                      }}
                    >
                      Blankett noch nicht ausgefüllt
                    </div>
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
