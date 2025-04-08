import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const LeagueTable = () => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const authService = new AuthService();
  const clientController = new ClientController();
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTable = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const tableData = await clientController.fetchTable(leagueCode);
        setTable(tableData);
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, []);

  const renderMobileTable = () => (
    <>
      <div className="container-2">
        <div className="div-wrapper-2">
          <div className="table">
            <header className="row-wrapper">
              <div className="row">
                <div className="filler" style={{ minWidth: "140px" }} />
                {["M", "W", "D", "L", "G", "P"].map((label, idx) => (
                  <div key={idx} className={`cell${idx ? `-${idx + 1}` : ""}`}>
                    <div className={`text-wrapper-2${5 + idx}`}>{label}</div>
                  </div>
                ))}
              </div>
            </header>
            <div className="body">
              {loading ? (
                <div>Loading...</div>
              ) : (
                table.map((team) => (
                  <div className="row-2" key={team.id}>
                    <div className="data-2">
                      <div className="text-wrapper-31">{team.ranking}</div>
                    </div>
                    <img
                      className="data-3"
                      alt={team.name}
                      src={team.image}
                      onClick={() => navigate(`/team-detail/${team.id}`)}
                    />
                    <div className="container-wrapper">
                      <div className="container-3">
                        <div
                          className="text-wrapper-32"
                          onClick={() => navigate(`/team-detail/${team.id}`)}
                        >
                          {team.shortName || team.name}
                        </div>
                      </div>
                    </div>
                    <div className="data-4">
                      <div className="text-wrapper-33">
                        {team.wins + team.draws + team.losses}
                      </div>
                    </div>
                    <div className="data-5">
                      <div className="text-wrapper-34">{team.wins}</div>
                    </div>
                    <div className="data-6">
                      <div className="text-wrapper-34">{team.draws}</div>
                    </div>
                    <div className="data-7">
                      <div className="text-wrapper-34">{team.losses}</div>
                    </div>
                    <div className="data-8">
                      <div className="text-wrapper-35">
                        {team.scored}:{team.against}
                      </div>
                    </div>
                    <div className="data-9">
                      <div className="text-wrapper-36">{team.points}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderDesktopTable = () => (
    <>
      <div className="div-wrapper-2">
        <div className="league-table-content">
          <div className="row-wrapper">
            <div className="row-4">
              {["Matches", "W", "D", "L", "Tore", "+/-", "Punkte"].map(
                (label, idx) => (
                  <div key={idx} className={`cell-${7 + idx}`}>
                    <div className={`text-wrapper-${51 + idx}`}>{label}</div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="league-table-cells">
            {loading ? (
              <div>Loading...</div>
            ) : (
              table.map((team) => (
                <div className="row-5" key={team.id}>
                  <div className="data-20">
                    <div className="text-wrapper-55">{team.ranking}</div>
                  </div>
                  <div className="data-30">
                    <img
                      className="mask-group"
                      alt={team.name}
                      src={team.image}
                      onClick={() => navigate(`/team-detail/${team.id}`)}
                    />
                  </div>
                  <div className="data-22">
                    <div className="container-4">
                      <div
                        className="text-wrapper-56"
                        onClick={() => navigate(`/team-detail/${team.id}`)}
                      >
                        {team.name}
                      </div>
                    </div>
                  </div>
                  <div className="data-23">
                    <div className="text-wrapper-57">
                      {team.wins + team.draws + team.losses}
                    </div>
                  </div>
                  <div className="data-24">
                    <div className="text-wrapper-58">{team.wins}</div>
                  </div>
                  <div className="data-25">
                    <div className="text-wrapper-58">{team.draws}</div>
                  </div>
                  <div className="data-26">
                    <div className="text-wrapper-59">{team.losses}</div>
                  </div>
                  <div className="data-27">
                    <div className="text-wrapper-60">
                      {team.scored}:{team.against}
                    </div>
                  </div>
                  <div className="data-28">
                    <div className="text-wrapper-61">
                      {team.difference > 0
                        ? `+${team.difference}`
                        : team.difference}
                    </div>
                  </div>
                  <div className="data-29">
                    <div className="text-wrapper-62">{team.points}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="element-table-mobile"
      style={{ minWidth: isMobile ? "390px" : "1130px" }}
    >
      {isMobile ? renderMobileTable() : renderDesktopTable()}
    </div>
  );
};
