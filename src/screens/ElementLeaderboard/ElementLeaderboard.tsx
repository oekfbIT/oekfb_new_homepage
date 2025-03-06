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

export const ElementLeaderboard = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGoals, setShowGoals] = useState(true); // State to toggle between goals and yellow cards

  const authService = new AuthService();
  const clientController = new ClientController();

  useEffect(() => {
    const fetchPlayers = async () => {
      const leagueCode = authService.getLeagueID();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const playerData = showGoals
          ? await clientController.fetchGoalLeaderBoard(leagueCode)
          : await clientController.fetchYellowCardLeaderBoard(leagueCode);
        setPlayers(playerData.sort((a, b) => b.count - a.count));
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [showGoals]);

  return (
    <div
      className="element-leaderboard"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-control-4">
        <PageHeader
          className="instance-node-10"
          text={showGoals ? "Torschützenkönig" : "Kartenkönig"}
        />

        <div className="leaderboard-highligh-2">
          <button
            onClick={() => setShowGoals(true)}
            className={showGoals ? "segButtonActive" : "segButton"}
          >
            TORE
          </button>

          <button
            onClick={() => setShowGoals(false)}
            className={showGoals ? "segButton" : "segButtonActive"}
          >
            GELBE KARTEN
          </button>
        </div>

        <div className="leaderboard-highligh-2">
          {players.slice(0, 3).map((player, index) => (
            <LeaderboardHighligh
              key={index}
              className={`${screenWidth < 900 ? "class-11" : "class-12"}`}
              title={`${index + 1}. Platz - ${player.count} ${
                showGoals ? "Tore" : "Gelbe Karten"
              }`}
              team={{
                image: player.teamimg,
                name: player.team_name,
                id: player.team_id,
              }}
              player={{
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
              goal={showGoals}
              property1={
                screenWidth < 900
                  ? "mobile"
                  : screenWidth >= 900
                  ? "desktop"
                  : undefined
              }
              team={{
                image: player.teamimg,
                name: player.team_name,
                id: player.team_id,
              }}
              player={{
                image: player.image,
                number: player.number,
                name: player.name,
                count: player.count,
                teamName: "", // Add team name here if available
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
