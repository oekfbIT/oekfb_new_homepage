// TeamDetailSquad.tsx — refactored for readability, comments added, styles mapped to tokens
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Player {
  id: number;
  number?: number;
  name: string;        // Full name as a single string
  nationality: string;
  sid: string;
  image: string;
  eligibility: string; // "Spielberechtigt" | "Gesperrt" (others possible)
  birthday?: string;   // Accepts plain string; formatting handled upstream if needed
}

interface Props {
  player: Player;
  className?: string;
}

/** Normalize nationality to match zeitzonen.de flag filenames */
const formatNationality = (nationality: string): string =>
  nationality
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ /g, "")
    .replace(/[^a-z]/g, "");

/** Split full name and capitalize each part */
const splitAndCapitalizeName = (name: string): { firstName: string; lastName: string } => {
  const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "");
  const [firstName, ...lastNameParts] = name.trim().split(/\s+/);
  return {
    firstName: capitalize(firstName ?? ""),
    lastName: lastNameParts.map(capitalize).join(" "),
  };
};

export const TeamDetailSquad = ({ player, className = "" }: Props): JSX.Element => {
  const { firstName, lastName } = splitAndCapitalizeName(player.name);
  const formattedNationality = formatNationality(player.nationality);
  const navigate = useNavigate();

  // Static icon sources (kept as-is)
  const BLOCKED =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/2048px-Eo_circle_red_letter-x.svg.png";
  const ALLOWED =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png";
  const eligibilityIcon = player.eligibility === "Spielberechtigt" ? ALLOWED : BLOCKED;

  const [showPopover, setShowPopover] = useState(false);

  // Toggle with auto-hide (preserved behavior)
  const togglePopover = useCallback(() => {
    setShowPopover(true);
    window.setTimeout(() => setShowPopover(false), 3000);
  }, []);

  return (
    <div className={`team-detail-squad ${className}`}>
      <div className="team-detail-squad-wrapper-2">
        <div className="div-10">
          {/* Player image */}
          <div className="image-11">
            <img
              className="player-photo"
              src={player.image}
              alt={`${firstName} ${lastName}`}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Shirt number */}
          <div className="team-detail-squad-wrapper-3">
            <div className="text-number">{player.number ?? "-"}</div>
          </div>

          {/* Name + meta */}
          <div className="team-detail-squad-wrapper-4">
            <div
              className="div-11 clickable"
              onClick={() => navigate(`/player-detail/${player.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/player-detail/${player.id}`)}
              aria-label={`Öffne Profil von ${firstName} ${lastName}`}
            >
              <div className="first-name">{firstName}</div>
              <div className="last-name" title={lastName}>
                {lastName}
              </div>
            </div>

            <div className="div-11 meta">
              <div className="meta-line">SID: {player.sid}</div>
              {player.birthday && <div className="meta-line">Jahrgang: {player.birthday}</div>}
            </div>
          </div>

          {/* Flags + eligibility */}
          <div className="nationality-flags">
            <img
              src={`https://www.zeitzonen.de/build/images/flags/${formattedNationality}.svg`}
              alt={`${player.nationality} Flagge`}
              className="flagicon"
            />
            <img
              src={eligibilityIcon}
              alt={`Status: ${player.eligibility}`}
              className="flagicon-no"
              onClick={togglePopover}
              style={{ cursor: "pointer" }}
            />
            {showPopover && (
              <div className="popover" role="status" aria-live="polite">
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
    birthday: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};
