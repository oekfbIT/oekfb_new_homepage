import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LeaderboardHighligh } from "../../components/LeaderboardHighligh";
import { LeaderboardStat } from "../../components/LeaderboardStat";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";

type StatType = "goals" | "yellow" | "red";

export const ElementLeaderboard = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStat, setActiveStat] = useState<StatType>("goals");

  const authService = new AuthService();
  const clientController = new ClientController();

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const leagueCode = authService.getLeagueID();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        let playerData = [];
        switch (activeStat) {
          case "goals":
            playerData = await clientController.fetchGoalLeaderBoard(
              leagueCode
            );
            break;
          case "yellow":
            playerData = await clientController.fetchYellowCardLeaderBoard(
              leagueCode
            );
            break;
          case "red":
            playerData = await clientController.fetchRedCardLeaderBoard(
              leagueCode
            );
            break;
        }

        setPlayers(playerData.sort((a, b) => b.count - a.count));
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [activeStat]);

  const getHeaderText = () => {
    switch (activeStat) {
      case "goals":
        return "Torschützenkönig";
      case "yellow":
        return "Kartenkönig (Gelb)";
      case "red":
        return "Kartenkönig (Rot)";
    }
  };

  const handleStatChange = (type: StatType) => {
    if (!loading && activeStat !== type) {
      setActiveStat(type);
    }
  };

  return (
    <div
      className="element-leaderboard"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-control-4">
        <PageHeader className="instance-node-10" text={getHeaderText()} />

        <div className="leaderboard-highligh-2">
          <button
            onClick={() => handleStatChange("goals")}
            className={activeStat === "goals" ? "segButtonActive" : "segButton"}
            disabled={loading}
          >
            TORE
          </button>

          <button
            onClick={() => handleStatChange("yellow")}
            className={
              activeStat === "yellow" ? "segButtonActive" : "segButton"
            }
            disabled={loading}
          >
            GELBE KARTEN
          </button>

          <button
            onClick={() => handleStatChange("red")}
            className={activeStat === "red" ? "segButtonActive" : "segButton"}
            disabled={loading}
          >
            ROTE KARTEN
          </button>
        </div>

        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <div className="loader" />
          </div>
        ) : (
          <>
            <div className="leaderboard-highligh-2">
              {players.slice(0, 3).map((player, index) => (
                <LeaderboardHighligh
                  key={index}
                  className={`${isMobile ? "class-11" : "class-12"}`}
                  title={`${index + 1}. Platz - ${player.count} ${
                    activeStat === "goals"
                      ? "Tore"
                      : activeStat === "yellow"
                      ? "Gelbe Karten"
                      : "Rote Karten"
                  }`}
                  team={{
                    image: player.teamimg,
                    name: player.team_name,
                    id: player.team_id,
                  }}
                  player={{
                    id: player.playerid,
                    image: player.image,
                    number: player.number,
                    name: player.name,
                    score: player.count,
                  }}
                />
              ))}
            </div>

            <div className="single-stat-cells">
              {players.slice(3).map((player, index) => (
                <LeaderboardStat
                  key={index}
                  className="instance-node-10"
                  property1={isMobile ? "mobile" : "desktop"}
                  statType={activeStat}
                  team={{
                    image: player.teamimg,
                    name: player.team_name,
                    id: player.team_id,
                  }}
                  player={{
                    id: player.playerid,
                    image: player.image,
                    number: player.number,
                    name: player.name,
                    count: player.count,
                    teamName: "",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};
