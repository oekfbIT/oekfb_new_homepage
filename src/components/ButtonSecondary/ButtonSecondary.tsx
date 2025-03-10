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

export const ButtonSecondary = ({
  className,
  text = "FORGOT PASSWORD",
}: Props): JSX.Element => {
  return (
    <div className={`button-secondary ${className}`}>
      <div className="authentication-form-6">
        <div className="authentication-form-7">{text}</div>
      </div>
    </div>
  );
};

ButtonSecondary.propTypes = {
  text: PropTypes.string,
};
