/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const Hero = ({ className }: Props): JSX.Element => {
  return (
    <div className={`hero ${className}`}>
      <div className="img-2" />

      <div className="overlay">
        <p className="subheader">
          Will Xabi Alonso&#39;s side return to winning ways after suffering a
          rare defeat prior to the international break?
        </p>

        <div className="header-2">Hoffenheim 0-0 Leverkusen: LIVE!</div>
      </div>
    </div>
  );
};
