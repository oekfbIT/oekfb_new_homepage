import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Importing all screen components
import { ElementClubsDesktop } from "./screens/ElementClubsDesktop";
import { ElementConfirmation } from "./screens/ElementConfirmation";
import { ElementContactMobile } from "./screens/ElementContactMobile";
import { ElementGameReport } from "./screens/ElementGameReport";
import { ElementGamedayMobile } from "./screens/ElementGamedayMobile";
import { ElementHomepageDesktop } from "./screens/ElementHomepageDesktop";
import { ElementImpressiumMobile } from "./screens/ElementImpressiumMobile";
import { ElementLeaderboard } from "./screens/ElementLeaderboard";
import { ElementLeagueSelection } from "./screens/ElementLeagueSelection";
import { ElementLoginMobile } from "./screens/ElementLoginMobile";
import { ElementMobilenav } from "./screens/ElementMobilenav";
import { ElementNewsDetail } from "./screens/ElementNewsDetail";
import { ElementNewsMobile } from "./screens/ElementNewsMobile";
import { ElementPlayerDetail } from "./screens/ElementPlayerDetail";
import { ElementRegister } from "./screens/ElementRegister";
import { ElementRegistration } from "./screens/ElementRegistration";
import { ElementSperrenDesktop } from "./screens/ElementSperrenDesktop";
import { ElementTableMobile } from "./screens/ElementTableMobile";
import { ElementTeamDetail } from "./screens/ElementTeamDetail";
import { ElementTermsMobile } from "./screens/ElementTermsMobile";
import { ElementTransfersDesktop } from "./screens/ElementTransfersDesktop";
import { Strafsenat } from "./screens/Strafsenat";
import { ElementTransfer } from "./screens/ElementTransfer";
import { ElementTransfers } from "./screens/ElementTransfers";
import { ElementLigaordnung } from "./screens/ElementLigaordnung";
import { ElementRegeln } from "./screens/ElementRegeln";
import { ElementBund } from "./screens/ElementBund";
import { Transfer } from "./components/Transfer";

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Specific Routes */}
        <Route path="/" element={<ElementLeagueSelection />} />
        <Route path="/liga" element={<ElementHomepageDesktop />} />
        <Route path="/mobilenav" element={<ElementMobilenav />} />
        <Route path="/match/:id" element={<ElementGameReport />} />
        <Route path="/spielplan" element={<ElementGamedayMobile />} />
        <Route path="/team-detail/:id" element={<ElementTeamDetail />} />
        <Route path="/player-detail/:id" element={<ElementPlayerDetail />} />
        <Route path="/news" element={<ElementNewsMobile />} />
        <Route path="/strafsenat" element={<Strafsenat />} />

        <Route path="/leaderboards" element={<ElementLeaderboard />} />
        <Route path="/kontakt" element={<ElementContactMobile />} />
        <Route path="/sperren" element={<ElementSperrenDesktop />} />
        <Route path="/transfers" element={<ElementTransfersDesktop />} />
        <Route path="/transfer/:transferID" element={<ElementTransfer />} />
        <Route path="/register" element={<ElementRegister />} />
        <Route path="/ligaordnung" element={<ElementLigaordnung />} />
        <Route path="/spielregeln" element={<ElementRegeln />} />
        <Route path="/bund" element={<ElementBund />} />

        {/*
          <Route path="/news" element={<Strafsenat />} />
          <Route path="/registration-upload" element={<ElementRegistration />} />
          <Route path="/confirmation" element={<ElementConfirmation />} />
          <Route path="/transfers" element={<ElementTransfersDesktop />} />
          <Route path="/player-detail" element={<ElementPlayerDetail />} />
          <Route path="/kontakt" element={<ElementContactMobile />} />
          <Route path="/impressium" element={<ElementImpressiumMobile />} />
          <Route path="/login" element={<ElementLoginMobile />} />
          <Route path="/terms" element={<ElementTermsMobile />} />
        */}
        <Route path="/teams" element={<ElementClubsDesktop />} />
        <Route path="/tabelle" element={<ElementTableMobile />} />
        <Route path="/news-detail/:id" element={<ElementNewsDetail />} />

        {/* Fallback Route */}
        <Route path="*" element={<ElementLeagueSelection />} />
      </Routes>
    </HashRouter>
  );
};
