import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  className?: string;
  title: string;
  team: { image: string; name: string; id: string };
  player: { id: string; image: string; number: string; name: string; score: number };
}

export const LeaderboardHighligh = ({ className = "", title, player, team }: Props): JSX.Element => {
  const navigate = useNavigate();

  const goPlayer = () => player?.id && navigate(`/player-detail/${player.id}`);
  const goTeam = () => team?.id && navigate(`/team-detail/${team.id}`);

  const [first, last = ""] = player.name.split(" ");

  return (
    <div className={`lb-highlight ${className}`} onClick={goPlayer} role="button" tabIndex={0}>
      <div className="lb-highlight__card">
        <header className="lb-highlight__header">
          <div className="h3">{title}</div>
        </header>

        <div className="lb-highlight__player">
          <img className="lb-highlight__playerImg" alt={player.name} src={player.image} />
        </div>

        <footer className="lb-highlight__footer">
          <div className="lb-highlight__meta">
            <div className="lb-highlight__teamLogo" onClick={(e) => { e.stopPropagation(); goTeam(); }}>
              <img src={team.image} alt={team.name} />
            </div>

            <div className="lb-highlight__nameBlock">
              <div className="h3 lb-highlight__number">{player.number}</div>
              <div className="lb-highlight__name">
                <span className="h3 lb-highlight__nameFirst">{first}</span>
                <span className="h3 lb-highlight__nameLast"> {last}</span>
              </div>
            </div>
          </div>
          {/* score bubble if you want later */}
        </footer>
      </div>
    </div>
  );
};
