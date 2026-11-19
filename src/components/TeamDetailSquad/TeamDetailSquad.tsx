// TeamDetailSquad.tsx — refactored for readability, comments added, styles mapped to tokens
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../network/AuthService";
import "./style.css";

interface Player {
  id: string | number;
  number?: string | number;
  is_captain?: boolean;
  name: string;        // Full name as a single string
  nationality: string;
  sid: string;
  image: string;
  eligibility: string; // "Spielberechtigt" | "Gesperrt" (others possible)
  blockdate?: string | null;
  birthday?: string;   // Accepts plain string; formatting handled upstream if needed
  teamId?: string;
  teamName?: string;
  teamLogo?: string;
  leagueId?: string;
  leagueCode?: string;
  leagueName?: string;
}

export interface Trainer {
  name: string;
  nationality?: string | null;
  image?: string | null;
}

type Props = {
  className?: string;
} & (
  | { player: Player; trainer?: never; trainerRole?: never }
  | { player?: never; trainer: Trainer; trainerRole: string }
);

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

export const TeamDetailSquad = ({ player, trainer, trainerRole, className = "" }: Props): JSX.Element => {
  const person = player ?? trainer;
  const { firstName, lastName } = splitAndCapitalizeName(person.name);
  const nationality = person.nationality?.trim();
  const formattedNationality = nationality ? formatNationality(nationality) : "";
  const image = person.image?.trim();
  const [failedTrainerImage, setFailedTrainerImage] = useState<string>();
  const showTrainerPlaceholder = trainer && (!image || image === failedTrainerImage);
  const navigate = useNavigate();
  const authService = new AuthService();

  const openPlayer = () => {
    if (!player) return;
    if (player.leagueCode && player.leagueId) {
      authService.setLeagueData(player.leagueCode, player.leagueId);
    }
    navigate(`/player-detail/${player.id}`);
  };

  const isEligible = player?.eligibility === "Spielberechtigt";
  const blockDate = player?.blockdate ? new Date(player.blockdate) : null;
  const formattedBlockDate = blockDate && !Number.isNaN(blockDate.getTime())
    ? new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(blockDate)
    : null;

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
          <div className={trainer ? "image-11 trainer-photo-slot" : "image-11"}>
            {showTrainerPlaceholder ? (
              <div className="trainer-photo-placeholder" aria-hidden="true" />
            ) : image && (
              <img
                className="player-photo"
                src={image}
                alt={person.name}
                loading="lazy"
                decoding="async"
                onError={trainer ? () => setFailedTrainerImage(image) : undefined}
              />
            )}
          </div>

          {/* Shirt number */}
          {player && (
            <div className="team-detail-squad-wrapper-3">
              <div className="text-number">{player.number ?? "-"}</div>
            </div>
          )}

          {/* Name + meta */}
          <div className="team-detail-squad-wrapper-4">
            <div
              className={player ? "div-11 clickable" : "div-11"}
              onClick={player ? openPlayer : undefined}
              role={player ? "button" : undefined}
              tabIndex={player ? 0 : undefined}
              onKeyDown={player ? (e) => (e.key === "Enter" || e.key === " ") && openPlayer() : undefined}
              aria-label={player ? `Öffne Profil von ${firstName} ${lastName}` : undefined}
            >
              <div className="first-name">{firstName}{player?.is_captain && <span className="captain-badge" title="Kapitän" aria-label="Kapitän">C</span>}</div>
              <div className="last-name" title={lastName}>
                {lastName}
              </div>
            </div>

            <div className="div-11 meta">
              {player ? (
                <>
                  <div className="meta-line">
                    SID: {player.sid}
                    {!isEligible && formattedBlockDate && ` (Gesperrt bis ${formattedBlockDate})`}
                  </div>
                  {player.birthday && <div className="meta-line">Jahrgang: {player.birthday}</div>}
                  {player.leagueName && <div className="meta-line meta-line--league">Liga: {player.leagueName}</div>}
                </>
              ) : (
                <div className="meta-line">{trainerRole}</div>
              )}
            </div>
          </div>

          {/* Nationality + team/eligibility */}
          <div className="nationality-flags">
            {formattedNationality && (
              <img
                src={`https://www.zeitzonen.de/build/images/flags/${formattedNationality}.svg`}
                alt={`${nationality} Flagge`}
                title={nationality}
                className="flagicon"
              />
            )}
            {player?.teamLogo ? (
              <button
                type="button"
                className="team-detail-squad__team"
                onClick={() => player.teamId && navigate(`/team-detail/${player.teamId}`)}
                aria-label={player.teamName ? `Öffne ${player.teamName}` : "Team öffnen"}
              >
                <img src={player.teamLogo} alt="" className="team-detail-squad__team-logo" />
              </button>
            ) : player && (
              <>
                <button
                  type="button"
                  className={`eligibility-icon ${isEligible ? "eligibility-icon--allowed" : "eligibility-icon--blocked"}`}
                  onClick={togglePopover}
                  aria-label={`Status: ${player.eligibility}`}
                  title={`Status: ${player.eligibility}`}
                >
                  {isEligible ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  )}
                </button>
                {showPopover && (
                  <div className="popover" role="status" aria-live="polite">
                    {`Eligibility: ${player.eligibility}`}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TeamDetailSquad.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    eligibility: PropTypes.string.isRequired,
    blockdate: PropTypes.string,
    sid: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    teamId: PropTypes.string,
    teamName: PropTypes.string,
    teamLogo: PropTypes.string,
    leagueId: PropTypes.string,
    leagueCode: PropTypes.string,
    leagueName: PropTypes.string,
  }),
  trainer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    image: PropTypes.string,
  }),
  trainerRole: PropTypes.string,
  className: PropTypes.string,
};
