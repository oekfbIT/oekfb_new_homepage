import PropTypes from "prop-types";
import { useEffect, useId, useMemo, useState } from "react";
import "./style.css";

type League = {
  code: string;
  id: string | number;
  name?: string;
  state?: string;
};

type Props = {
  leagues: League[];
  activeLeague?: string | null;
  onSelect: (code: string, id: string | number) => void;
};

const AUSTRIAN_STATES = [
  { name: "Wien", value: "wien" },
  { name: "Niederösterreich", value: "niederoesterreich" },
  { name: "Oberösterreich", value: "oberoesterreich" },
  { name: "Steiermark", value: "steiermark" },
  { name: "Kärnten", value: "kaernten" },
  { name: "Salzburg", value: "salzburg" },
  { name: "Tirol", value: "tirol" },
  { name: "Vorarlberg", value: "vorarlberg" },
  { name: "Burgenland", value: "burgenland" },
];

const normalizeState = (state = "") =>
  state
    .trim()
    .toLocaleLowerCase("de-AT")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z]/g, "");

export const LeagueDropdown = ({ leagues, activeLeague, onSelect }: Props): JSX.Element => {
  const stateSelectId = useId();
  const leagueSelectId = useId();
  const activeLeagueState = leagues.find((league) => league.code === activeLeague)?.state;
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    if (activeLeagueState) setSelectedState(normalizeState(activeLeagueState));
  }, [activeLeagueState]);

  const filteredLeagues = useMemo(
    () => leagues.filter((league) => normalizeState(league.state) === selectedState),
    [leagues, selectedState]
  );

  const selectedCode = activeLeague && filteredLeagues.some((league) => league.code === activeLeague)
    ? activeLeague
    : "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const league = filteredLeagues.find((item) => item.code === event.target.value);
    if (league) onSelect(league.code, league.id);
  };

  return (
    <div className="leagueFilters">
      <div className="leagueDropdown">
        <label className="leagueDropdown__label" htmlFor={stateSelectId}>Bundesland auswählen</label>
        <select
          id={stateSelectId}
          className="leagueDropdown__select"
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
          aria-label="Bundesland auswählen"
        >
          <option value="">Bundesland auswählen</option>
          {AUSTRIAN_STATES.map((state) => (
            <option key={state.value} value={state.value}>{state.name}</option>
          ))}
        </select>
        <Chevron />
      </div>

      <div className="leagueDropdown">
        <label className="leagueDropdown__label" htmlFor={leagueSelectId}>Liga auswählen</label>
        <select
          id={leagueSelectId}
          className="leagueDropdown__select"
          value={selectedCode}
          onChange={handleChange}
          disabled={!selectedState || !filteredLeagues.length}
          aria-label="Liga auswählen"
        >
          <option value="">Liga auswählen</option>
          {filteredLeagues.map((league) => (
            <option key={league.id} value={league.code}>{league.name || league.code}</option>
          ))}
        </select>
        <Chevron />
      </div>

      {selectedState && !filteredLeagues.length && (
        <span className="leagueFilters__empty" role="status">
          Aktuell gibt es in diesem Bundesland keine Liga.
        </span>
      )}
    </div>
  );
};

const Chevron = () => (
  <svg className="leagueDropdown__chevron" viewBox="0 0 16 16" aria-hidden="true">
    <path d="m3.5 6 4.5 4 4.5-4" />
  </svg>
);

LeagueDropdown.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      state: PropTypes.string,
    }).isRequired
  ).isRequired,
  activeLeague: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
