import { HashRouter, Route, Routes } from "react-router-dom";

// Screens
import { ElementBund } from "./screens/ElementBund";
import { ElementClubsDesktop } from "./screens/ElementClubsDesktop";
import { ElementContactMobile } from "./screens/ElementContactMobile";
import { ElementGameReport } from "./screens/ElementGameReport";
import { ElementGamedayMobile } from "./screens/ElementGamedayMobile";
import { ElementLeaderboard } from "./screens/ElementLeaderboard";
import { ElementLeagueSelection } from "./screens/ElementLeagueSelection";
import { ElementLigaordnung } from "./screens/ElementLigaordnung";
import { ElementLivescore } from "./screens/ElementLivescore";
import { ElementMobilenav } from "./screens/ElementMobilenav";
import { ElementNewsDetail } from "./screens/ElementNewsDetail";
import { ElementNewsMobile } from "./screens/ElementNewsMobile";
import { ElementPlayerDetail } from "./screens/ElementPlayerDetail";
import { ElementPostpone } from "./screens/ElementPostpone/ElementPostpone";
import { ElementRegeln } from "./screens/ElementRegeln";
import { ElementRegister } from "./screens/ElementRegister";
import { ElementSperrenDesktop } from "./screens/ElementSperrenDesktop";
import { ElementTableMobile } from "./screens/ElementTableMobile";
import { ElementTeamDetail } from "./screens/ElementTeamDetail";
import { ElementTransfer } from "./screens/ElementTransfer";
import { ElementTransfersDesktop } from "./screens/ElementTransfersDesktop";
import { Homepage } from "./screens/Homepage";
import { Strafsenat } from "./screens/Strafsenat";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<ElementLeagueSelection />} />
      <Route path="/liga" element={<Homepage />} />
      <Route path="/mobilenav" element={<ElementMobilenav />} />
      <Route path="/match/:id" element={<ElementGameReport />} />
      <Route path="/spielplan" element={<ElementGamedayMobile />} />
      <Route path="/livescore" element={<ElementLivescore />} />
      <Route path="/team-detail/:id" element={<ElementTeamDetail />} />
      <Route path="/player-detail/:id" element={<ElementPlayerDetail />} />
      <Route path="/news" element={<ElementNewsMobile />} />
      <Route path="/strafsenat" element={<Strafsenat />} />
      <Route path="/leaderboards" element={<ElementLeaderboard />} />
      <Route path="/kontakt" element={<ElementContactMobile />} />
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
  </HashRouter>
);

export { App };
