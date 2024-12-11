/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
  actionButtonClassName: any;
}

export const ActionButton = ({
  className,
  actionButtonClassName,
}: Props): JSX.Element => {
  return (
    <div className={`action-button ${className}`}>
      <div className={`button-title-wrapper ${actionButtonClassName}`}>
        <div className="button-title">TITLE</div>
      </div>
    </div>
  );
};
