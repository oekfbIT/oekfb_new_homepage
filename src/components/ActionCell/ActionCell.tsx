/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  className: any;
  text: string;
}

export const ActionCell = ({
  className,
  text = "Strafsenat Urteile",
}: Props): JSX.Element => {
  return (
    <Link className={`action-cell ${className}`} to="/20u46-sperren-desktop">
      <img className="image-wrapper-2" alt="Image wrapper" />

      <div className="textwrapper">
        <div className="title-4">{text}</div>

        <p className="subtitle-4">
          Keep track of all five early kick-offs prior to Bayern taking on Kiel
          later
          <br />
          this evening.
        </p>
      </div>
    </Link>
  );
};

ActionCell.propTypes = {
  text: PropTypes.string,
};
