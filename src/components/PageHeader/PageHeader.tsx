/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

interface Props {
  className: any;
  text: string;
}

export const PageHeader = ({
  className,
  text = "Clubs",
}: Props): JSX.Element => {
  const authService = useMemo(() => new AuthService(), []);
  const clientController = useMemo(() => new ClientController(), []);
  const [seasonName, setSeasonName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const leagueCode = authService.getLeagueCode();

    if (!leagueCode) return;

    clientController.fetchCurrentSeason(leagueCode)
      .then((season) => {
        if (!cancelled && typeof season?.name === "string") {
          setSeasonName(season.name);
        }
      })
      .catch((error) => {
        console.error("Failed to load the active season:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [authService, clientController]);

  return (
    <div className={`page-header ${className}`}>
      <div className="header-wrapper">
        <div className="title left">{text}</div>

        {seasonName && <div className="p">SEASON {seasonName}</div>}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string,
};
