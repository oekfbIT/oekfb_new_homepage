/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const UploadRequest = ({ className }: Props): JSX.Element => {
  return (
    <div className={`upload-request ${className}`}>
      <div className="upload-request-data">
        <p className="upload-request-data-2">
          Bitte laden sie ihr Wappen/Logo für ihre Mannschaft hoch
        </p>

        <p className="upload-request-data-3">
          FÜR OPTIMALE QUALITÄT BITTE LADEN SIE EINE PDF ODER JPEG/PNG DATEI
        </p>
      </div>

      <div className="button-container">
        <div className="button-title-2">BROWSE</div>
      </div>
    </div>
  );
};
