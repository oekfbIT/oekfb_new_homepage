// LeagueSelection.tsx
// -------------------------------------------------------------
// Small clickable card used in the league grid.
// - No layout hacks, uses tokens + BEM classes
// - Kept your title + "X TEAMS" subtitle
// -------------------------------------------------------------

import "./style.css";

type Props = {
  className?: string;
  name: string;
  teams: number;
  onClick?: () => void;
};

export const LeagueSelection = ({ className = "", name, teams, onClick }: Props): JSX.Element => {
  return (
    <button type="button" className={`leagueCard ${className}`} onClick={onClick}>
      <div className="leagueCard__name">{name}</div>
      <div className="leagueCard__meta">{teams} TEAMS</div>
    </button>
  );
};
