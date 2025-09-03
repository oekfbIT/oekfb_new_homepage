import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./style.css";

export const LeagueTable = () => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const hideDiff = screenWidth < 480; // remove +/- on very small screens

  const authService = new AuthService();
  const clientController = new ClientController();

  const [table, setTable] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const desktopHeaders = ["RANK", "", "TEAM", "Matches", "W-D-L", "+/-", "Points"];
  const mobileHeaders  = ["RANK", "", "TEAM", "M", "WDL", "+/-", "P"];
  const compactHeaders = ["RANK", "", "TEAM", "M", "WDL", "P"]; // without +/-
  const headers = hideDiff
    ? compactHeaders
    : (isMobile ? mobileHeaders : desktopHeaders);

  useEffect(() => {
    const fetchData = async () => {
      const code = authService.getLeagueCode();
      if (!code) { setLoading(false); return; }

      try {
        const tbl = await clientController.fetchCurrentSeasonTable(code);
        setTable(applyPlayboysRule(tbl));
        const league = await clientController.fetchLeague(code);
        setLeagueName(league.name || "");
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyPlayboysRule = (teams) => {
    const playboys = teams.find((t) => t.name === "FC Playboys");
    if (!playboys) return teams;
    const rest = teams.filter((t) => t.name !== "FC Playboys");
    return [playboys, ...rest].map((t, i) => ({ ...t, ranking: i + 1 }));
  };

  if (loading) {
    return (
      <div className="lt">
        <div className="lt__container">
          <div className="lt__loading"><LoadingIndicator /></div>
        </div>
      </div>
    );
  }

  return (
    <section className="lt" aria-label={leagueName || "League table"}>
      <div className={`lt__container ${hideDiff ? "lt--hideDiff" : ""}`}>
        {/* Header */}
        <div className="lt__header" role="row">
          <div className="h3-table">{headers[0]}</div>
          <div className="h3-table h3start">{headers[1]}</div>
          <div className="h3-table h3start">{headers[2]}</div>
          <div className="h3-table">{headers[3]}</div>
          <div className="h3-table">{headers[4]}</div>
          {!hideDiff && <div className="h3-table center">{headers[5]}</div>}
          <div className="h3-table center">{headers[hideDiff ? 5 : 6]}</div>
        </div>

        {/* Body */}
        <div className="lt__body">
          {table.map((team, index) => {
            const matches = team.wins + team.draws + team.losses;
            const goals = `${team.scored} : ${team.against}`;
            const diff = team.difference > 0 ? `+${team.difference}` : team.difference;

            const promo = index < 3;
            const relega = index >= table.length - 2;

            return (
              <button
                key={team.id}
                className={`lt__row${promo ? " lt__row--promo" : ""}${relega ? " lt__row--relega" : ""}`}
                onClick={() => navigate(`/team-detail/${team.id}`)}
              >
                <div className="lt__leftStripe" />

                <div className="lt__cell lt__cell--rank">
                  <span className="lt__rankBadge">{team.ranking}</span>
                </div>

                <div className="lt__cell lt__cell--crest">
                  <img src={team.image} alt="" />
                </div>

                <div className="pb lt__cell lt__cell--team">
                  {isMobile ? team.shortName || team.name : team.name}
                </div>

                <div className="lt__cell lt__cell--num">{matches}</div>
                <div className="lt__cell lt__cell--num">
                  {team.wins}-{team.draws}-{team.losses}
                </div>

                {!hideDiff && (
                  <div className="lt__cell lt__cell--num">
                    {isMobile ? diff : goals}
                  </div>
                )}

                <div className="lt__cell lt__cell--num">{team.points}</div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <footer className="lt__legend" aria-label="Legende">
          <h3 className="h2 lt__legendTitle">Legende</h3>

          <div className="lt__legendItem">
            <span className="lt__legendIcon lt__legendIcon--trophy" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <path d="M5 5h14v2a4 4 0 0 1-4 4h-1a4 4 0 0 1-8 0H6a4 4 0 0 1-4-4V5h3zm0 0V3h14v2" fill="currentColor"></path>
                <path d="M10 15h4v3h3v2H7v-2h3v-3z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Meister</span>
          </div>

          <div className="lt__legendItem">
            <span className="lt__legendIcon lt__legendIcon--points" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
            <span>Punkte</span>
          </div>

          {!hideDiff && (
            <div className="lt__legendItem">
              <span className="lt__legendIcon lt__legendIcon--diff" aria-hidden>
                <svg viewBox="0 0 24 24" width="1em" height="1em">
                  <path d="M5 12h14M9 7h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <span>Tor Differenz</span>
            </div>
          )}

          <div className="lt__legendItem">
            <span className="lt__legendIcon lt__legendIcon--wdl" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <rect x="3" y="6" width="5" height="12" rx="2" fill="currentColor" />
                <rect x="10" y="6" width="5" height="12" rx="2" fill="currentColor" opacity="0.6" />
                <rect x="17" y="6" width="4" height="12" rx="2" fill="currentColor" opacity="0.35" />
              </svg>
            </span>
            <span>Siege/Niederlagen</span>
          </div>

          <div className="lt__legendItem">
            <span className="lt__legendIcon lt__legendIcon--up" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <path d="M12 5l6 6h-4v8H10v-8H6l6-6z" fill="currentColor"/>
              </svg>
            </span>
            <span>Aufsteiger</span>
          </div>

          <div className="lt__legendItem">
            <span className="lt__legendIcon lt__legendIcon--down" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <path d="M12 19l-6-6h4V5h4v8h4l-6 6z" fill="currentColor"/>
              </svg>
            </span>
            <span>Absteiger</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
