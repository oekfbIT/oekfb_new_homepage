import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LeagueTable } from "../../components/LeagueTable";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementTableMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const authService = new AuthService();
  const clientController = new ClientController();
  const [table, setTable] = useState([]);
  const [league, setLeague] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Initialize the navigate function

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

        const league = await clientController.fetchLeagueClubs(leagueCode);
        setTable(league);

      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, []);

  return (
    <div
      className="element-table-mobile"
      style={{ minWidth: isMobile ? "390px" : "900px" }}
    >
      {isMobile ? (
        <>
          <Navigation />
          <div className="league-table">
            <div
              className="league-table-wrapper"
              style={{ paddingTop: "30px", paddingBottom: "30px" }}
            >
              <div className="league-table-2">
                <PageHeader className="instance-node-5" text="Tabelle" />
                <div className="container-2">
                    <LeagueTable/>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-7"
            footerContent="/img/footer-content-wrapper-left-logo-13.png"
            footerContentClassNameOverride="footer-8"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-54.svg"
            link="/img/link-52.svg"
            link1="/img/link-55.svg"
            link2="/img/link-56.svg"
          />
        </>
      ) : (
        <>
          <DesktopNav />
          <div className="content-frame">
            <div className="page-content-wrapper">
              <div className="page-content-5">
                <PageHeader className="instance-node-5" text="Tabelle" />
                <div className="div-wrapper-2">
                    <LeagueTable/>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
