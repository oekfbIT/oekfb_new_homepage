// http://localhost:1234/#/14u46-player-detail-mobile

import { useEffect, useState } from "react";
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
        const playerData = await clientController.fetchBlockedPlayers(leagueCode);
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
            <LoadingIndicator />
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
                    playerid: player.player,
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

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className: string;
  player: {
    player_name: string;
    player_image: string;
    team_name: string;
    team_image: string;
    blockdate: string;
    player_sid: string;
    playerid: string;
    teamid: string;
  };
}

export const SingleTransferCell = ({
  property1,
  className,
  player,
}: Props): JSX.Element => {
  const navigate = useNavigate();

// SingleTransferCell.tsx
    const handlePlayerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const id = player?.playerid;
    if (id) navigate(`/player-detail/${id}`); // -> http://localhost:1234/#/player-detail/<id> with HashRouter
    };

    const handleTeamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const id = player?.teamid;
    if (id) navigate(`/team-detail/${id}`);
    };

  return (
    <div className={`single-transfer-cell property-1-${property1} ${className}`}>
      <div className="frame-2">
        {/* Clickable player area */}
        <div className="left-container" onClick={handlePlayerClick} style={{ cursor: "pointer" }}>
          <div className="image-4">
            <img
              src={player.player_image}
              alt={player.player_name}
              className="player-image"
            />
          </div>

          <p className="name-2">
            <span className="text-wrapper-11">
              {player.player_name} (SID - {player.player_sid})
            </span>
          </p>
        </div>

        {/* Clickable team area */}
        <div className="left-container-2" onClick={handleTeamClick} style={{ cursor: "pointer" }}>
          {property1 === "desktop" && (
            <>
              <div className="team-logo">
                <img
                  src={player.team_image}
                  alt={player.team_name}
                  className="team-image"
                />
              </div>
              <div className="team-name">
                <div className="team-name-2">{player.team_name}</div>
              </div>
            </>
          )}

          {property1 === "mobile" && (
            <div className="left-container-3">
              <div className="team-logo">
                <img
                  src={player.team_image}
                  alt={player.team_name}
                  className="team-image"
                />
              </div>
              <div className="team-name">
                <div className="team-name-2">{player.team_name}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="left-container">
        <p className="name-3">
          <span className="text-wrapper-11">Gesperrt bis</span>
          <span className="text-wrapper-12">
            {" "}
            {new Date(player.blockdate).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

SingleTransferCell.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]),
  className: PropTypes.string,
  player: PropTypes.shape({
    player_name: PropTypes.string.isRequired,
    player_image: PropTypes.string.isRequired,
    team_name: PropTypes.string.isRequired,
    team_image: PropTypes.string.isRequired,
    blockdate: PropTypes.string.isRequired,
    player_sid: PropTypes.string.isRequired,
    playerid: PropTypes.string.isRequired,
    teamid: PropTypes.string.isRequired,
  }).isRequired,
};
