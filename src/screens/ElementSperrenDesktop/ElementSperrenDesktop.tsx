import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { SingleTransferCell } from "../../components/SingleTransferCell";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementSperrenDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authService = new AuthService();
  const clientController = new ClientController();

  useEffect(() => {
    const fetchPlayers = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const playerData = await clientController.fetchBlockedPlayers(
          leagueCode
        );
        setPlayers(playerData);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div
      className="element-leaderboard"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-control-4">
        <PageHeader className="instance-node-10" text="Sperren" />

        <div className="single-stat-cells">
          {loading ? (
            <LoadingIndicator/>
          ) : players && players.length > 0 ? (
            players.map((player, index) => (
              <div key={index} className="player-container">
                <SingleTransferCell
                  className="single-transfer-cell-instance"
                  property1={isMobile ? "mobile" : "desktop"}
                  player={{
                    player_name: player.player_name,
                    player_image: player.player_image,
                    player_sid: player.player_sid,
                    playerid: player.playerid,
                    teamid: player.teamid,
                    team_name: player.team_name,
                    team_image: player.team_image,
                    blockdate: player.blockdate,
                  }}
                />
              </div>
            ))
          ) : (
            <p className={"subtitle-2"}>
              Aktuell gibt es keine gesperrten Spieler in dieser Liga
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
