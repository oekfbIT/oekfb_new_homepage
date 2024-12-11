/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  dropdownWrapperClassName: any;
  matLabelSelectAClassName: any;
  text: string;
  dropdownWrapperClassNameOverride: any;
  text1: string;
  dropdownWrapper: string;
}

export const Dropdown = ({
  className,
  dropdownWrapperClassName,
  matLabelSelectAClassName,
  text = "Select a region",
  dropdownWrapperClassNameOverride,
  text1 = "Wien",
  dropdownWrapper = "/img/dropdown-wrapper-icon.svg",
}: Props): JSX.Element => {
  return (
    <div className={`dropdown ${className}`}>
      <div className="dropdown-wrapper">
        <div className="dropdown-wrapper-2">
          <div
            className={`mat-label-select-a-wrapper ${dropdownWrapperClassName}`}
          >
            <div className={`mat-label-select-a ${matLabelSelectAClassName}`}>
              {text}
            </div>
          </div>

          <div className="dropdown-wrapper-3">
            <div
              className={`dropdown-wrapper-4 ${dropdownWrapperClassNameOverride}`}
            >
              {text1}
            </div>

            <img
              className="dropdown-wrapper-5"
              alt="Dropdown wrapper"
              src={dropdownWrapper}
            />
          </div>
        </div>
      </div>

      <div className="dropdown-wrapper-6" />
    </div>
  );
};

Dropdown.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  dropdownWrapper: PropTypes.string,
};
