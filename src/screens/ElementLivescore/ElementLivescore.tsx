import React, { useEffect, useMemo, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { LivescoreCell } from "../../components/LivescoreCell/LivescoreCell";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

export const ElementLivescore = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize the service instances so they're only created once per mount.
  const authService = useMemo(() => new AuthService(), []);
  const clientController = useMemo(() => new ClientController(), []);

  useEffect(() => {
    const fetchData = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const data = await clientController.livescore();
        setLeagues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authService, clientController]);

  return (
    <div className="element-livescore">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-frame-2">
        <PageHeader className="page-header-4" text="Livescore" />
      </div>

      <div className="page-frame-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          [...leagues]
            .sort((a, b) => a.league.localeCompare(b.league))
            .map((league, index) => (
              <div key={index} className="league-section">
                <h2 className="leagueHeader">{league.league}</h2>
                <div className="fixtures">
                  {league.matches.map((fixture: any) => (
                    <div key={fixture.id} className="livescore-header">
                      <LivescoreCell
                        match={fixture}
                        state={isMobile ? "mobile" : "desktop"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      <Footer />
    </div>
  );
};
