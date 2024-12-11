/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  text: string;
}

export const PageHeader = ({
  className,
  text = "Clubs",
}: Props): JSX.Element => {
  return (
    <div className={`page-header ${className}`}>
      <div className="header-wrapper">
        <div className="title-2">{text}</div>

        <div className="subtitle-2">SEASON 2024-2025</div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string,
};
