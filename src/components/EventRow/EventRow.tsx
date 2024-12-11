/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1:
    | "yellow-home"
    | "goal-away"
    | "red-away"
    | "goal-home"
    | "yellow-away"
    | "yellowred-away"
    | "red-home"
    | "yellowred-home";
  className: any;
  eventCardPlayerClassName: any;
  eventCardTeamImgClassName: any;
  eventCardLastNameClassName: any;
  eventCardTypeImg: string;
  img: string;
  eventCardPlayerClassNameOverride: any;
  eventCardTeamImgClassNameOverride: any;
  eventCardLastNameClassNameOverride: any;
  eventCardTypeImg1: string;
  eventCardTypeImg2: string;
  eventCardNameClassName: any;
  eventCardNameClassNameOverride: any;
  eventCardTypeImg3: string;
  eventCardTypeImg4: string;
  eventCardTypeImg5: string;
}

export const EventRow = ({
  property1,
  className,
  eventCardPlayerClassName,
  eventCardTeamImgClassName,
  eventCardLastNameClassName,
  eventCardTypeImg = "/img/event-card-type-img-12.svg",
  img = "/img/event-card-type-img-13.svg",
  eventCardPlayerClassNameOverride,
  eventCardTeamImgClassNameOverride,
  eventCardLastNameClassNameOverride,
  eventCardTypeImg1 = "/img/event-card-type-img.svg",
  eventCardTypeImg2 = "/img/event-card-type-img-1.svg",
  eventCardNameClassName,
  eventCardNameClassNameOverride,
  eventCardTypeImg3 = "/img/event-card-type-img-8.svg",
  eventCardTypeImg4 = "/img/event-card-type-img-9.svg",
  eventCardTypeImg5 = "/img/event-card-type-img-4.svg",
}: Props): JSX.Element => {
  return (
    <div className={`event-row ${className}`}>
      <div className="event-card-bottom">
        <div className="div-12">
          {["goal-home", "red-home", "yellow-home", "yellowred-home"].includes(
            property1,
          ) && (
            <div className="event-card-container">
              <div className="player-data-wrapper">
                <div className={`player-data ${property1}`}>
                  <div className="event-card-data">
                    <div className="event-card-data-2">
                      <div
                        className={`event-card-player ${eventCardPlayerClassName}`}
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
                    <div className="event-card-first">Shavkhat</div>

                    <div
                      className={`event-card-last-name ${eventCardLastNameClassName}`}
                    >
                      Rakmahnov
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="event-card-score">
          <div className="event-card-minute">
            <div className="event-card-minute-2">31&#39;</div>
          </div>

          <img
            className="event-card-type-img"
            alt="Event card type img"
            src={
              property1 === "goal-home"
                ? eventCardTypeImg
                : property1 === "goal-away"
                  ? img
                  : property1 === "yellow-home"
                    ? eventCardTypeImg1
                    : property1 === "yellow-away"
                      ? eventCardTypeImg2
                      : property1 === "red-home"
                        ? eventCardTypeImg3
                        : property1 === "red-away"
                          ? eventCardTypeImg4
                          : eventCardTypeImg5
            }
          />

          {["goal-away", "goal-home", "yellow-home"].includes(property1) && (
            <div className="event-card-score-2">
              {["goal-home", "yellow-home"].includes(property1) && <>1 - 0</>}

              {property1 === "goal-away" && <>1 - 1</>}
            </div>
          )}
        </div>

        <div className="div-12">
          {["goal-away", "red-away", "yellow-away", "yellowred-away"].includes(
            property1,
          ) && (
            <div className="event-card-bottom-wrapper">
              <div className="event-card-bottom-2">
                <div className="player-data-2">
                  <div className="event-card-data">
                    <div className="event-card-data-2">
                      <div
                        className={`event-card-player ${eventCardPlayerClassNameOverride}`}
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
                    <div className="event-card-first">Shavkhat</div>

                    <div
                      className={`event-card-last-name ${eventCardLastNameClassNameOverride}`}
                    >
                      Rakmahnov
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
  property1: PropTypes.oneOf([
    "yellow-home",
    "goal-away",
    "red-away",
    "goal-home",
    "yellow-away",
    "yellowred-away",
    "red-home",
    "yellowred-home",
  ]),
  eventCardTypeImg: PropTypes.string,
  img: PropTypes.string,
  eventCardTypeImg1: PropTypes.string,
  eventCardTypeImg2: PropTypes.string,
  eventCardTypeImg3: PropTypes.string,
  eventCardTypeImg4: PropTypes.string,
  eventCardTypeImg5: PropTypes.string,
};
