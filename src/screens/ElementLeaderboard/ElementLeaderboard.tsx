import { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LeaderboardHighligh } from "../../components/LeaderboardHighligh";
import { LeaderboardStat } from "../../components/LeaderboardStat";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type StatType = "goals" | "yellow" | "red" | "yellowRed";

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
            playerData = await clientController.fetchGoalLeaderBoard(leagueCode);
            break;
          case "yellow":
            playerData = await clientController.fetchYellowCardLeaderBoard(leagueCode);
            break;
          case "red":
            playerData = await clientController.fetchRedCardLeaderBoard(leagueCode);
            break;
          case "yellowRed":
            playerData = await clientController.fetchYellowRedCardLeaderBoard(leagueCode);
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

  const headerText = {
    goals: "Torschützenkönig",
    yellow: "Kartenkönig (Gelb)",
    red: "Kartenkönig (Rot)",
    yellowRed: "Kartenkönig (Gelb/Rot)",
  }[activeStat];

  return (
    <div className="leaderboard-page" style={{ minWidth: isMobile ? "390px" : "900px" }}>
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Controls + content wrapper */}
      <div className="leaderboard__controls">
        <PageHeader className="leaderboard__header" text={headerText} />

        {/* Segmented selector */}
        <div className="h3 leaderboard__segments">
          <button
            onClick={() => !loading && setActiveStat("goals")}
            className={`seg-btn ${activeStat === "goals" ? "seg-btn--active" : ""}`}
            disabled={loading}
          >
            TORE
          </button>
          <button
            onClick={() => !loading && setActiveStat("yellow")}
            className={`h3 seg-btn ${activeStat === "yellow" ? "seg-btn--active" : ""}`}
            disabled={loading}
          >
            GELBE KARTEN
          </button>
          <button
            onClick={() => !loading && setActiveStat("red")}
            className={`seg-btn ${activeStat === "red" ? "seg-btn--active" : ""}`}
            disabled={loading}
          >
            ROTE KARTEN
          </button>
          <button
            onClick={() => !loading && setActiveStat("yellowRed")}
            className={`seg-btn ${activeStat === "yellowRed" ? "seg-btn--active" : ""}`}
            disabled={loading}
          >
            GELB/ROT
          </button>
        </div>

        {loading ? (
          <div className="leaderboard__loader">
            <div className="spinner" />
          </div>
        ) : (
          <>
            {/* Top 3 cards */}
            <div className="leaderboard__top3">
              {players.slice(0, 3).map((player, i) => (
                <LeaderboardHighligh
                  key={i}
                  className="leaderboard__top3Item"
                  title={`${i + 1}. Platz - ${player.count} ${
                    activeStat === "goals"
                      ? "Tore"
                      : activeStat === "yellow"
                      ? "Gelbe Karten"
                      : activeStat === "red"
                      ? "Rote Karten"
                      : "Gelb/Rote Karten"
                  }`}
                  team={{ image: player.teamimg, name: player.team_name, id: player.team_id }}
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

            {/* Remaining rows */}
            <div className="leaderboard__list">
              {players.slice(3).map((player, i) => (
                <LeaderboardStat
                  key={i}
                  className="leaderboard__row"
                  property1={isMobile ? "mobile" : "desktop"}
                  statType={activeStat}
                  team={{ image: player.teamimg, name: player.team_name, id: player.team_id }}
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
