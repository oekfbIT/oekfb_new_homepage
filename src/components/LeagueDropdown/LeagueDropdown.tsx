import PropTypes from "prop-types";
import "./style.css";

type League = {
  code: string;
  id: string | number;
  name?: string;
};

type Props = {
  leagues: League[];
  activeLeague?: string | null;
  onSelect: (code: string, id: string | number) => void;
};

export const LeagueDropdown = ({ leagues, activeLeague, onSelect }: Props): JSX.Element => {
  const selectedCode = activeLeague && leagues.some((league) => league.code === activeLeague)
    ? activeLeague
    : leagues[0]?.code || "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const league = leagues.find((item) => item.code === event.target.value);
    if (league) onSelect(league.code, league.id);
  };

  return (
    <div className="leagueDropdown">
      <label className="leagueDropdown__label" htmlFor="league-selector">
        Liga auswählen
      </label>
      <select
        id="league-selector"
        className="leagueDropdown__select"
        value={selectedCode}
        onChange={handleChange}
        disabled={!leagues.length}
        aria-label="Liga auswählen"
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.code}>
            {league.name || league.code}
          </option>
        ))}
      </select>
      <svg className="leagueDropdown__chevron" viewBox="0 0 16 16" aria-hidden="true">
        <path d="m3.5 6 4.5 4 4.5-4" />
      </svg>
    </div>
  );
};

LeagueDropdown.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
  activeLeague: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
