import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import {useNavigate} from "react-router-dom";

interface Player {
  id: number;
  number: number;
  name: string; // Full name as a single string
  nationality: string;
  sid: string;
  image: string;
  eligibility: string;
  birthday: string;
}

interface Props {
  player: Player;
  className?: string;
}

// Format nationality for flag URL
const formatNationality = (nationality: string): string => {
  return nationality
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/ /g, "")
      .replace(/[^a-z]/g, "");
};

// Split and capitalize first and last names
const splitAndCapitalizeName = (name: string): { firstName: string; lastName: string } => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const [firstName, ...lastNameParts] = name.split(" ");
  return {
    firstName: capitalize(firstName),
    lastName: lastNameParts.map(capitalize).join(" "), // Capitalize each part of the last name
  };
};

export const TeamDetailSquad = ({ player, className = "" }: Props): JSX.Element => {
  const { firstName, lastName } = splitAndCapitalizeName(player.name); // Split and capitalize names
  const formattedNationality = formatNationality(player.nationality);
  const navigate = useNavigate();

  const blocked = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/2048px-Eo_circle_red_letter-x.svg.png`;
  const allowed = `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png`;

  const eligibilityIcon = player.eligibility === "Spielberechtigt" ? allowed : blocked;

  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
    setTimeout(() => setShowPopover(false), 3000); // Auto-hide after 3 seconds
  };

  return (
      <div className={`team-detail-squad ${className}`}>
        <div className={`team-detail-squad-wrapper-2`}>
          <div className="div-10">
            <div className="image-11">
              {/* Placeholder for Player Image */}
              <img
                  style={{ width: "55px", height: "75px", objectFit: "contain" }}
                  src={player.image}
                  alt={`${firstName} ${lastName}`}
              />
            </div>

            <div className="team-detail-squad-wrapper-3">
              <div className="text-wrapper-21">{player.number ?? "-"}</div>
            </div>

            <div className="team-detail-squad-wrapper-4">
              <div className="div-11"
                   onClick={() => navigate(`/player-detail/${player.id}`)}
              >
                <div className="text-wrapper-22">{firstName}</div>
                <div className="text-wrapper-23">{lastName}</div>
              </div>
              <div className="div-11">
                <div className="text-wrapper-22">SID: {player.sid}</div>
                <div className="text-wrapper-22">Jahrgang: {player.birthday}</div>
              </div>

            </div>

            <div className="nationality-flags" style={{ gap: "5px", position: "relative" }}>
              <img
                  src={`https://www.zeitzonen.de/templates/2014/dist/images/flags/${formattedNationality}.svg`}
                  alt={`${player.nationality} flag`}
                  className="flagicon"
              />
              <img
                  src={eligibilityIcon}
                  alt={`Eligibility status: ${player.eligibility}`}
                  className="flagicon-no"
                  onClick={togglePopover} // Add click handler
                  style={{ cursor: "pointer" }} // Indicate clickability
              />
              {showPopover && (
                  <div className="popover">
                    {`Eligibility: ${player.eligibility}`}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

TeamDetailSquad.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    eligibility: PropTypes.string.isRequired,
    sid: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};
