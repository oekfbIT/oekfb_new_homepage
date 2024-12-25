import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
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
  };
}

export const SingleTransferCell = ({
                                     property1,
                                     className,
                                     player,
                                   }: Props): JSX.Element => {
  return (
      <div className={`single-transfer-cell property-1-${property1} ${className}`}>
        <div className="frame-2">
          {/* Link for the left container */}
          <Link
              to={`/player-detail/${player.player_sid}`}
              className="left-container"
          >
            <div className="image-4">
              <img
                  src={player.player_image}
                  alt={player.player_name}
                  className="player-image"
              />
            </div>

            <p className="name-2">
              <span className="text-wrapper-11">{player.player_name} (SID - {player.player_sid}) </span>
            </p>
          </Link>

          {/* Link for team details */}
          <Link className="left-container-2" to={`/team/${player.team_name}`}>
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
          </Link>
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
  }).isRequired,
};
