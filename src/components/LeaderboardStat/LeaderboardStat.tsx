import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";

type StatType = "goals" | "yellow" | "red" | "yellowRed";

interface Props {
  property1: "desktop" | "mobile";
  statType: StatType;
  className?: string;
  team: { image: string; name: string; id: string };
  player: { id: string; image: string; number: string; name: string; count: number; teamName: string };
}

export const LeaderboardStat = ({ property1, statType, className = "", player, team }: Props): JSX.Element => {
  const iconMap: Record<StatType, string> = {
    goals: "/img/goal.svg",
    yellow: "/img/yellowCard.svg",
    red: "/img/redCard.svg",
    yellowRed: "/img/yellowRedCard.svg",
  };
  const labelMap: Record<StatType, string> = {
    goals: "Tore",
    yellow: "Gelbe Karten",
    red: "Rote Karten",
    yellowRed: "Gelb + Rot",
  };

  const navigate = useNavigate();
  const goPlayer = () => player?.id && navigate(`/player-detail/${player.id}`);
  const goTeam = () => team?.id && navigate(`/team-detail/${team.id}`);

  const [first, last = ""] = player.name.split(" ");

  return (
    <div className={`lb-stat lb-stat--${property1} ${className}`}>
      <div className="lb-stat__left">
        <img className="lb-stat__avatar" src={player.image} alt={player.name} onClick={goPlayer} />
        <p className="lb-stat__name" onClick={goPlayer}>
          <span className="h3 lb-stat__first">{first}</span>
          <span className="h3 lb-stat__last"> {last}</span>
        </p>
        <button className="lb-stat__teamLogo" onClick={goTeam} aria-label={`${team.name}`}>
          <span style={{ backgroundImage: `url(${team.image})` }} />
        </button>
      </div>

      <div className="lb-stat__right">
        <div className="lb-stat__teamName">{player.teamName}</div>
        <div className="lb-stat__count">
          <img className="h3 lb-stat__icon" src={iconMap[statType]} alt={labelMap[statType]} />
          {player.count} {labelMap[statType]}
        </div>
      </div>
    </div>
  );
};

LeaderboardStat.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
  statType: PropTypes.oneOf(["goals", "yellow", "red", "yellowRed"]).isRequired,
  className: PropTypes.string,
  team: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    teamName: PropTypes.string.isRequired,
  }).isRequired,
};
