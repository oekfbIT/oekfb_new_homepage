import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Player {
  id: number;
  number: number;
  name: string; // Full name as a single string
  nationality: string;
  sid: string;
  image: string;
}

interface Props {
  player: Player;
  className?: string;
}

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

const splitAndCapitalizeName = (name: string): { firstName: string; lastName: string } => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const [firstName, ...lastNameParts] = name.split(" ");
  return {
    firstName: capitalize(firstName),
    lastName: lastNameParts.map(capitalize).join(" "), // Capitalize each part of the last name
  };
};
export const TeamDetailSquad = ({ player, className = "" }: Props): JSX.Element => {
  const { firstName, lastName } = splitAndCapitalizeName(player.name); // Split the name
  const formattedNationality = formatNationality(player.nationality);


  const blocked = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/2048px-Eo_circle_red_letter-x.svg.png`
  const allowed = `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png`

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
              <div className="div-11">
                <div className="text-wrapper-22">{firstName}</div>
                <div className="text-wrapper-23">{lastName}</div>
              </div>
              <div className="div-11">
                <div className="text-wrapper-22">SID: {player.sid}</div>
              </div>

            </div>

            <div className="nationality-flags" style={{gap: '5px'}}
            >
              <img
                  src={`https://www.zeitzonen.de/templates/2014/dist/images/flags/${formattedNationality}.svg`}
                  alt={`${player.nationality} flag`}
                  className="flagicon"
              />
              <img
                  src={blocked}
                  alt={`${player.nationality} flag`}
                  className="flagicon-no"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

TeamDetailSquad.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, // Full name
    nationality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};
