import { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LeagueTable } from "../../components/LeagueTable";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type TableRow = Record<string, unknown>;
type LeagueInfo = Record<string, unknown>;

export const ElementTableMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const authService = new AuthService();
  const clientController = new ClientController();

  const [table, setTable] = useState<TableRow[]>([]);
  const [league, setLeague] = useState<LeagueInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const tableData = await clientController.fetchTable(leagueCode);
        setTable(Array.isArray(tableData) ? tableData : []);

        // ⬇️ this used to call setTable by mistake; set league info instead
        const leagueClubs = await clientController.fetchLeagueClubs(leagueCode);
        setLeague(Array.isArray(leagueClubs) ? leagueClubs : []);
      } catch (err) {
        console.error("Error fetching table data:", err);
        setTable([]);
        setLeague([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="element-table-mobile"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="league-table">
        <div className="league-table-wrapper" style={{ paddingTop: 30, paddingBottom: 30 }}>
          <div className="league-table-2">
            <PageHeader className="instance-node-5" text="Tabelle" />
            <div className="container-2">
              {/* LeagueTable reads from its own store/requests; if you want,
                 pass `table` and `league` via props instead */}
              {loading ? (
                <div className="table-loading">Laden…</div>
              ) : (
                <LeagueTable />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
