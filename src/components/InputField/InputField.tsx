/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const InputField = ({ className }: Props): JSX.Element => {
  return (
    <div className={`input-field ${className}`}>
      <div className="authentication-form">
        <div className="authentication-form-wrapper">
          <div className="authentication-form-2">
            <div className="authentication-form-3">
              <div className="authentication-form-4">Placeholder Text</div>

              <div className="authentication-form-4">*</div>
            </div>

            <div className="authentication-form-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
