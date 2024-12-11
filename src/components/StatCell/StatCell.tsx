/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const StatCell = ({ className }: Props): JSX.Element => {
  return (
    <div className={`stat-cell ${className}`}>
      <div className="stat-cell-key">
        <div className="stat-cell-key-text">Duels won</div>
      </div>

      <div className="stat-cell-value">
        <div className="stat-cell-value-text">198</div>
      </div>
    </div>
  );
};
