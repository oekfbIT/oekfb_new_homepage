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

  const authService = new AuthService();
  const clientController = new ClientController();

  const [table, setTable] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const code = authService.getLeagueCode();
      if (!code) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const tbl = await clientController.fetchTable(code);
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
    const playboys = teams.find((team) => team.name === "FC Playboys");
    if (!playboys) return teams;

    const rest = teams.filter((team) => team.name !== "FC Playboys");
    return [playboys, ...rest];
  };

  const normalizedLeagueName = (leagueName || "").trim();
  const hideBlue = /1/.test(normalizedLeagueName) || /Master/i.test(normalizedLeagueName);

  const desktopHeaders = ["RANK", "", "TEAM", "Matches", "W-D-L", "+/-", "Points"];
  const mobileHeaders = ["RANK", "", "TEAM", "M", "WDL", "+/-", "P"];

  const renderHeader = () => {
    const headers = isMobile ? mobileHeaders : desktopHeaders;

    return (
      <div className="table-header">
        <div className={`table-cell table-cell--number ${isMobile ? "rank-mobile" : "nil-mobile"}`}>{headers[0]}</div>
        <div className="table-cell table-cell--img">{headers[1]}</div>
        <div className={`table-cell team-name ${isMobile ? "table-cell--team-mobile" : ""}`}>{headers[2]}</div>
        <div className={`table-cell table-cell--number ${isMobile ? "" : "nil-mobile"}`}>{headers[3]}</div>
        <div className="table-cell table-cell--number">{headers[4]}</div>
        <div className="table-cell table-cell--number diff-cell">{headers[5]}</div>
        <div className="table-cell table-cell--number">{headers[6]}</div>
      </div>
    );
  };

const renderRows = () =>
  table.map((team, index) => (
    <div
      key={team.id}
      className="table-row"
      onClick={() => navigate(`/team-detail/${team.id}`)}
    >
      <div className={`table-cell table-cell--number ${isMobile ? "rank-mobile" : "nil-mobile"}`}>
        {index === 0 && (
          <img
            src="https://static-00.iconduck.com/assets.00/trophy-winner-prize-icon-2013x2048-rfqmn1p2.png"
            alt="Trophy"
            width={15}
            height={15}
            style={{ marginRight: "6px" }}
          />
        )}
        {team.ranking}
      </div>
      <div className="table-cell table-cell--img">
        <img src={team.image} alt={team.name} width={24} height={24} />
      </div>
      <div className={`table-cell team-name ${isMobile ? "table-cell--team-mobile" : ""}`}>
        {isMobile ? team.shortName || team.name : team.name}
      </div>
      <div className={`table-cell table-cell--number ${isMobile ? "" : "nil-mobile"}`}>
        {team.wins + team.draws + team.losses}
      </div>
      <div className="table-cell table-cell--number diff-mobile">
        {team.wins}-{team.draws}-{team.losses}
      </div>
      <div className="table-cell table-cell--number diff-cell">
        {isMobile
          ? team.difference > 0
            ? `+${team.difference}`
            : team.difference
          : `${team.scored} : ${team.against}`}
      </div>
      <div className="table-cell table-cell--number">{team.points}</div>
    </div>
  ));


  const renderFooter = () => (
    <div className="tb-footer">
      <p>
        <img
          src="https://static-00.iconduck.com/assets.00/trophy-winner-prize-icon-2013x2048-rfqmn1p2.png"
          alt="Trophy"
          width={14}
          style={{ verticalAlign: "middle", marginRight: "6px" }}
        />
        = Meister
      </p>
      <p><strong>P</strong> = Punkte</p>
      <p><strong>+/-</strong> = Tor Differenz</p>
      <p><strong>W-D-L</strong> = Siege - Unentschieden - Niederlagen</p>
      <p>
        <span className="promotion-marker" />
        Aufsteiger
      </p>
      <p>
        <span className="relegation-marker" />
        Absteiger
      </p>
    </div>
  );

  return (
    <div className="element-table-mobile" style={{ maxWidth: "1200px", width: "100%", background: "white" }}>
      <div className="league-table-wrapper">
        {loading ? (
          <div className="loading-wrapper">
            <LoadingIndicator />
          </div>
        ) : (
          <div className={`table${!hideBlue ? " with-blue" : ""}`}>
            {renderHeader()}
            {renderRows()}
            {renderFooter()}
          </div>
        )}
      </div>
    </div>
  );
};
