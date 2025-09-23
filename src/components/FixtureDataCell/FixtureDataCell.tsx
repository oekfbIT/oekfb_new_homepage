// FixtureDataCell.tsx
// -------------------------------------------------------------
// Match row used in Spielplan/Livescore.
// - Mobile-first; desktop tweaks via .fixture--desktop
// - Uses a single "meta row" that holds Spieltag + time
//   (on mobile they are side-by-side as requested)
// -------------------------------------------------------------

import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";

type TeamBlanket = {
  id?: string | number;
  name: string;
  logo: string;
};

type Match = {
  id: string | number;
  home_blanket: TeamBlanket;
  away_blanket: TeamBlanket;
  details: {
    date: string;
    location?: string;
    gameday?: number;
  };
  score: { home: number; away: number };
  status: string;
};

type Props = {
  match: Match;
  state: "desktop" | "mobile";
};

export const FixtureDataCell = ({ match, state }: Props): JSX.Element => {
  const { id, home_blanket, away_blanket, details, score, status } = match;
  const navigate = useNavigate();

  // Format kickoff time (UTC → HH:mm)
  const formattedTime = DateTime.fromISO(details.date, { zone: "gmt" }).toFormat("HH:mm");

  const goMatch = () => navigate(`/match/${id}`);
  const goTeam = (teamId?: string | number) => {
    if (teamId != null) navigate(`/team-detail/${teamId}`);
  };

  const getButtonText = (s: string) => {
    switch (s) {
      case "pending":
        return "Spielvorschau";
      case "first":
        return "Live - 1. HZ";
      case "second":
        return "Live - 2. HZ";
      case "halftime":
        return "Halbzeit";
      case "completed":
      case "submitted":
      case "done":
        return "Spielbericht";
      case "abgebrochen":
        return "Spiel Abgebrochen";
      case "cancelled":
        return "Spiel Abgesagt";
      default:
        return "Details";
    }
  };

  return (
    <section className={`fixture ${state === "mobile" ? "fixture--mobile" : "fixture--desktop"}`}>
      {/* Teams + score */}
      <div className="fixture__teams">
        <button className="team team--home" onClick={() => goTeam(home_blanket.id)} aria-label={home_blanket.name}>
          <span className="team__nameR">{home_blanket.name}</span>
          <img className="team__logo" src={home_blanket.logo} alt="" />
        </button>

        <div className="score" aria-label={`Spielstand ${score.home} zu ${score.away}`}>
          <span className="score__value">{score.home}:{score.away}</span>
        </div>

        <button className="team team--away" onClick={() => goTeam(away_blanket.id)} aria-label={away_blanket.name}>
          <img className="team__logo" src={away_blanket.logo} alt="" />
          <span className="team__nameL">{away_blanket.name}</span>
        </button>
      </div>

      {/* Venue */}
      <div className="fixture__venue">
        <img
          className="fixture__venueIcon"
          src="https://cdn-icons-png.flaticon.com/512/88/88961.png"
          alt=""
          aria-hidden="true"
        />
        <span className="fixture__venueName">{details.location || "Unbekanntes Stadium"}</span>
      </div>

      {/* Meta row: Spieltag + time (side-by-side on mobile) */}
      <div className="fixture__metaRow">
        <div className="chip">Spieltag: {details.gameday ?? "-"}</div>
        <div className="chip">{formattedTime}</div>
      </div>

      {/* CTA */}
      <div className="fixture__cta">
        <button className="btn" onClick={goMatch}>
          <span className="btn__label">{getButtonText(status)}</span>
        </button>
      </div>
    </section>
  );
};

FixtureDataCell.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    home_blanket: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }).isRequired,
    away_blanket: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }).isRequired,
    details: PropTypes.shape({
      date: PropTypes.string.isRequired,
      location: PropTypes.string,
      gameday: PropTypes.number,
    }).isRequired,
    score: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  state: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
};

export default FixtureDataCell;
