import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/*",
    element: <ElementLeagueSelection />,
  },
  {
    path: "/league-selection",
    element: <ElementLeagueSelection />,
  },
  {
    path: "/mobilenav",
    element: <ElementMobilenav />,
  },
  // {
  //   path: "/sperren",
  //   element: <ElementSperrenDesktop />,
  // },
  {
    path: "/teams",
    element: <ElementClubsDesktop />,
  },
  // {
  //   path: "/tabelle",
  //   element: <ElementTableMobile />,
  // },
  // {
  //   path: "/news",
  //   element: <ElementNewsMobile />,
  // },
  // {
  //   path: "/register",
  //   element: <ElementRegister />,
  // },
  // {
  //   path: "/news-detail",
  //   element: <ElementNewsDetail />,
  // },
  // {
  //   path: "/spielplan",
  //   element: <ElementGamedayMobile />,
  // },
  // {
  //   path: "/registration-upload",
  //   element: <ElementRegistration />,
  // },
  // {
  //   path: "/confirmation",
  //   element: <ElementConfirmation />,
  // },
  // {
  //   path: "/transfers",
  //   element: <ElementTransfersDesktop />,
  // },
  // {
  //   path: "/leaderboards",
  //   element: <ElementLeaderboard />,
  // },
  // {
  //   path: "/player-detail",
  //   element: <ElementPlayerDetail />,
  // },
  // {
  //   path: "/team-detail",
  //   element: <ElementTeamDetail />,
  // },
  // {
  //   path: "/kontakt",
  //   element: <ElementContactMobile />,
  // },
  // {
  //   path: "/impressium",
  //   element: <ElementImpressiumMobile />,
  // },
  // {
  //   path: "/login",
  //   element: <ElementLoginMobile />,
  // },
  // {
  //   path: "/terms",
  //   element: <ElementTermsMobile />,
  // },
  {
    path: "/homepage",
    element: <ElementHomepageDesktop />,
  },
  // {
  //   path: "/game-report",
  //   element: <ElementGameReport />,
  // },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
