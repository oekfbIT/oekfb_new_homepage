import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.css";

interface Event {
  own_goal: boolean;
  type: "goal" | "redCard" | "yellowCard" | "yellowRedCard";
  minute: number;
  id: string;
  assign: "home" | "away";
  name: string;
  player: {
    id: string;
  };
  match: {
    id: string;
  };
  number: string;
  image: string;
}

interface Props {
  event: Event;
  homeID?: string;
  awayID?: string;
  className?: string;
  eventCardPlayerClassName?: string;
  eventCardTeamImgClassName?: string;
  eventCardLastNameClassName?: string;
  eventCardPlayerClassNameOverride?: string;
  eventCardTeamImgClassNameOverride?: string;
  eventCardLastNameClassNameOverride?: string;
  eventCardNameClassName?: string;
  eventCardNameClassNameOverride?: string;
}

export const EventRow = ({
  event,
  homeID,
  awayID,
  className,
  eventCardPlayerClassName,
  eventCardTeamImgClassName,
  eventCardLastNameClassName,
  eventCardPlayerClassNameOverride,
  eventCardTeamImgClassNameOverride,
  eventCardLastNameClassNameOverride,
  eventCardNameClassName,
  eventCardNameClassNameOverride,
}: Props): JSX.Element => {
  const navigate = useNavigate(); // Initialize useNavigate

  const typeMap: Record<string, Record<string, string>> = {
    goal: {
      home: "goal-home",
      away: "goal-away",
    },
    yellowCard: {
      home: "yellow-home",
      away: "yellow-away",
    },
    redCard: {
      home: "red-home",
      away: "red-away",
    },
    yellowRedCard: {
      home: "yellowred-home",
      away: "yellowred-away",
    },
  };

  const redCard = "/img/redCard.svg";
  const yellowCard = "/img/yellowCard.svg";
  const yellowredCard = "/img/yellowRedCard.svg";
  const goal = "/img/goal.svg";

  const property1 =
    typeMap[event.type] && typeMap[event.type][event.assign]
      ? typeMap[event.type][event.assign]
      : "goal-home";

  let eventTypeImg = goal;
  if (event.type === "redCard") {
    eventTypeImg = redCard;
  } else if (event.type === "yellowCard") {
    eventTypeImg = yellowCard;
  } else if (event.type === "yellowRedCard") {
    eventTypeImg = yellowredCard;
  }

  const nameParts = event.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const showHomeSide = [
    "goal-home",
    "red-home",
    "yellow-home",
    "yellowred-home",
  ].includes(property1);
  const showAwaySide = [
    "goal-away",
    "red-away",
    "yellow-away",
    "yellowred-away",
  ].includes(property1);

  const navigateToPlayerDetail = () => {
    if (event.player?.id) {
      navigate(`/player-detail/${event.player.id}`);
    } else {
      console.error("Player ID is undefined");
    }
  };

  return (
    <div className={`event-row ${className}`}>
      <div className="event-card-bottom">
        <div className="playerdata-home">
          {showHomeSide && (
            <div className="event-card-container">
              <div className="player-data-wrapper">
                <div className={`player-data ${property1}`}>
                  <div className="event-card-data">
                    <div className="event-card-data-2">
                      <div
                        className={`event-card-player ${eventCardPlayerClassName}`}
                        style={{
                          backgroundImage: `url(${event.image})`,
                          cursor: "pointer",
                        }}
                        onClick={navigateToPlayerDetail} // Navigate on image click
                      />
                      <div className="event-card-team">
                        <div
                          className={`event-card-team-img ${eventCardTeamImgClassName}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`event-card-name ${eventCardNameClassNameOverride}`}
                  >
                    <div
                      className="event-card-first"
                      style={{ cursor: "pointer" }}
                      onClick={navigateToPlayerDetail} // Navigate on name click
                    >
                      {firstName}
                    </div>
                    <div
                      className={`event-card-last-name ${eventCardLastNameClassName}`}
                      style={{ cursor: "pointer" }}
                      onClick={navigateToPlayerDetail} // Navigate on name click
                    >
                      {lastName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="event-card-score">
          <div className="event-card-minute">
            <div className="event-card-minute-2">{event.minute}&#39;</div>
          </div>
          <img
            className="event-card-type-img"
            alt="Event card type img"
            src={eventTypeImg}
          />
          {event.own_goal && event.type === "goal" && (
            <div className="event-card-minute-2">(ET)</div>
          )}
        </div>

        <div className="playerdata-away">
          {showAwaySide && (
            <div className="event-card-bottom-wrapper">
              <div className="event-card-bottom-2">
                <div className="player-data-2">
                  <div className="event-card-data">
                    <div className="event-card-data-2">
                      <div
                        className={`event-card-player ${eventCardPlayerClassNameOverride}`}
                        style={{
                          backgroundImage: `url(${event.image})`,
                          cursor: "pointer",
                        }}
                        onClick={navigateToPlayerDetail} // Navigate on image click
                      />
                      <div className="event-card-team">
                        <div
                          className={`event-card-team-img ${eventCardTeamImgClassNameOverride}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`event-card-name-2 property-1-0-${property1} ${eventCardNameClassName}`}
                  >
                    <div
                      className="event-card-first"
                      style={{ cursor: "pointer" }}
                      onClick={navigateToPlayerDetail} // Navigate on name click
                    >
                      {firstName}
                    </div>
                    <div
                      className={`event-card-last-name ${eventCardLastNameClassNameOverride}`}
                      style={{ cursor: "pointer" }}
                      onClick={navigateToPlayerDetail} // Navigate on name click
                    >
                      {lastName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

EventRow.propTypes = {
  event: PropTypes.shape({
    own_goal: PropTypes.bool,
    type: PropTypes.oneOf(["goal", "redCard", "yellowCard", "yellowRedCard"])
      .isRequired,
    minute: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    assign: PropTypes.oneOf(["home", "away"]).isRequired,
    name: PropTypes.string.isRequired,
    player: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    number: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
