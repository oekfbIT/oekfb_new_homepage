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
        setTable(tbl);

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

  const normalizedLeagueName = (leagueName || "").trim();
  const hideBlue = /1/.test(normalizedLeagueName) || /Master/i.test(normalizedLeagueName);

  const headers = [
    "",       // Rank #
    "Team",   // Team Name
    "Matches",
    "W-D-L",
    "+/-",
    "Points",
  ];

  const renderRows = () =>
    table.map((team) => (
      <div
        key={team.id}
        className="table-row"
        onClick={() => navigate(`/team-detail/${team.id}`)}
      >
        <div className="table-cell table-cell--number nil-mobile">{team.ranking}</div>
        <div className="table-cell table-cell--img">
          <img src={team.image} alt={team.name} width={24} height={24} />
        </div>
        <div className={`table-cell team-name ${isMobile ? "table-cell--team-mobile" : ""}`}>
          {isMobile ? team.shortName || team.name : team.name}
        </div>
        <div className="table-cell table-cell--number nil-mobile">
          {team.wins + team.draws + team.losses}
        </div>
        <div className="table-cell table-cell--number">
          {team.wins}-{team.draws}-{team.losses}
        </div>
        <div className="table-cell table-cell--number diff-cell">
          {team.difference > 0 ? `+${team.difference}` : team.difference}
        </div>
        <div className="table-cell table-cell--number">{team.points}</div>
      </div>
    ));

const renderHeader = () => (
  <div className="table-header">
    <div className="table-cell table-cell--number nil-mobile"></div> {/* Rank */}
    <div className="table-cell table-cell--img"></div>                {/* Image */}
    <div className={`table-cell team-name ${isMobile ? "table-cell--team-mobile" : ""}`}>Team</div>
    <div className="table-cell table-cell--number nil-mobile">Matches</div>
    <div className="table-cell table-cell--number">W-D-L</div>
    <div className="table-cell table-cell--number diff-cell">+/-</div>
    <div className="table-cell table-cell--number">Points</div>
  </div>
);

   const renderFooter = () => (
    <div className="tb-footer">

        <p>Tore </p>
    </div>
  );
  return (
    <div className="element-table-mobile" style={{ maxWidth: "1200px", width: "100%", background: "white"}}>
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
