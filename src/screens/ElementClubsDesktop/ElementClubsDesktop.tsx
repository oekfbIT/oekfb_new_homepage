// ElementClubsDesktop.tsx
// -------------------------------------------------------------
// Clubs index page
// - Uses Navigation (mobile) and DesktopNav (desktop)
// - Fetches clubs for the current league (from AuthService)
// - Token-driven layout + responsive grid
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ClubCard } from "../../components/ClubCard";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type Club = {
  id: string | number;
  sid?: string | number;
  [key: string]: any;
};

export const ElementClubsDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  const authService = new AuthService();
  const clientController = new ClientController();

  // Fetch clubs on mount
  useEffect(() => {
    const fetchClubs = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        const data = await clientController.fetchLeagueClubs(leagueCode);
        const sorted = [...data].sort(
          (a, b) => Number(a.sid ?? 0) - Number(b.sid ?? 0)
        );
        setClubs(sorted);
      } catch (error) {
        console.error("Error fetching club data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`page page--clubs ${isMobile ? "is-mobile" : "is-desktop"}`}>
      {/* Header / Navigation */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* Main content */}
      <main className="page__main" role="main">
        <PageHeader className="page__header" text="Mannschaften" />

        <section className="clubs" aria-labelledby="clubs-heading">
          {loading ? (
            <div className="clubs__loading">
              <LoadingIndicator />
            </div>
          ) : clubs.length === 0 ? (
            <p className="clubs__empty">No clubs available for this league.</p>
          ) : (
            <div className="clubs__grid">
              {clubs.map((club) => (
                <ClubCard key={club.id} className="clubs__card" club={club} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
