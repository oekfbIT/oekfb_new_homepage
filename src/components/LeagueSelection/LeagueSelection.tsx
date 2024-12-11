/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  className: any;
}

export const LeagueSelection = ({ className }: Props): JSX.Element => {
  return (
    <Link
      className={`league-selection ${className}`}
      to="/02u46-homepage-desktop"
    >
      <div className="name">Wiener Liga 1</div>

      <div className="subtitle">14 TEAMS</div>
    </Link>
  );
};
