import { ReactNode, useEffect, useMemo, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import { SponsorProvider } from "./context/SponsorContext";
import ApiService from "./network/ApiService";
import AuthService from "./network/AuthService";

// Screens
import { AppPage } from "./screens/AppPage";
import { ElementBund } from "./screens/ElementBund";
import { ElementClubsDesktop } from "./screens/ElementClubsDesktop";
import { ElementContactMobile } from "./screens/ElementContactMobile";
import { ElementGameReport } from "./screens/ElementGameReport";
import { ElementGamedayMobile } from "./screens/ElementGamedayMobile";
import { ElementImpressiumMobile } from "./screens/ElementImpressiumMobile/ElementImpressiumMobile";
import { ElementLeaderboard } from "./screens/ElementLeaderboard";
import { ElementLeagueSelection } from "./screens/ElementLeagueSelection";
import { ElementLigaordnung } from "./screens/ElementLigaordnung";
import { ElementLivescore } from "./screens/ElementLivescore";
import { ElementMobilenav } from "./screens/ElementMobilenav";
import { ElementNewsDetail } from "./screens/ElementNewsDetail";
import { ElementNewsMobile } from "./screens/ElementNewsMobile";
import { ElementPlayerDetail } from "./screens/ElementPlayerDetail";
import { ElementPostpone } from "./screens/ElementPostpone/ElementPostpone";
import { ElementPrivacy } from "./screens/ElementPrivacy/ElementPrivacy";
import { ElementRegeln } from "./screens/ElementRegeln";
import { ElementRegister } from "./screens/ElementRegister";
import { ElementSperrenDesktop } from "./screens/ElementSperrenDesktop";
import { ElementTableMobile } from "./screens/ElementTableMobile";
import { ElementTeamDetail } from "./screens/ElementTeamDetail";
import { ElementTransfer } from "./screens/ElementTransfer";
import { ElementTransfersDesktop } from "./screens/ElementTransfersDesktop";
import { Homepage } from "./screens/Homepage";
import { SearchResults } from "./screens/SearchResults";
import { Strafsenat } from "./screens/Strafsenat";
import { VerifyPage } from "./screens/VerifyPage/VerifyPage";

const LeagueBootstrap = ({ children }: { children: ReactNode }): JSX.Element => {
  const apiService = useMemo(() => new ApiService(), []);
  const authService = useMemo(() => new AuthService(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ensureLeagueCookie = async () => {
      try {
        const hasLeagueCookies = authService.getLeagueCode() && authService.getLeagueID();
        if (!hasLeagueCookies) {
          const response = await apiService.get("client/leagueList?per=25");
          const firstLeague = Array.isArray(response)
            ? response.find((league) => league?.code && league.code !== "NONE" && league?.id)
            : null;

          if (firstLeague) {
            authService.setLeagueData(firstLeague.code, firstLeague.id);
          }
        }
      } catch (error) {
        console.error("Failed to initialize the default league:", error);
      } finally {
        setReady(true);
      }
    };

    ensureLeagueCookie();
  }, [apiService, authService]);

  return ready ? <>{children}</> : <LoadingIndicator />;
};

const App = () => (
  <SponsorProvider>
    <HashRouter>
      <LeagueBootstrap>
        <Routes>
      <Route path="/" element={<ElementLeagueSelection />} />
      <Route path="/liga" element={<Homepage />} />
      <Route path="/app" element={<AppPage />} />
      {/* <Route path="/gala-night" element={<EventRegistration />} /> */}
      <Route path="/app/user/verify/:id" element={<VerifyPage />} />
      <Route path="/mobilenav" element={<ElementMobilenav />} />
      <Route path="/match/:id" element={<ElementGameReport />} />
      <Route path="/spielplan" element={<ElementGamedayMobile />} />
      <Route path="/livescore" element={<ElementLivescore />} />
      <Route path="/team-detail/:id" element={<ElementTeamDetail />} />
      <Route path="/player-detail/:id" element={<ElementPlayerDetail />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/news" element={<ElementNewsMobile />} />
      <Route path="/strafsenat" element={<Strafsenat />} />
      <Route path="/leaderboards" element={<ElementLeaderboard />} />
      <Route path="/kontakt" element={<ElementContactMobile />} />
      <Route path="/impressum" element={<ElementImpressiumMobile />} />
      <Route path="/privacy" element={<ElementPrivacy />} />
      <Route path="/sperren" element={<ElementSperrenDesktop />} />
      <Route path="/transfers" element={<ElementTransfersDesktop />} />
      <Route path="/transfer/:id" element={<ElementTransfer />} />
      <Route path="/postpone/:id" element={<ElementPostpone />} />
      <Route path="/register" element={<ElementRegister />} />
      <Route path="/ligaordnung" element={<ElementLigaordnung />} />
      <Route path="/spielregeln" element={<ElementRegeln />} />
      <Route path="/bund" element={<ElementBund />} />
      <Route path="/teams" element={<ElementClubsDesktop />} />
      <Route path="/tabelle" element={<ElementTableMobile />} />
      <Route path="/news-detail/:id" element={<ElementNewsDetail />} />
      <Route path="*" element={<ElementLeagueSelection />} />
        </Routes>
      </LeagueBootstrap>
    </HashRouter>
  </SponsorProvider>
);

export { App };
