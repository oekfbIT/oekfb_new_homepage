/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  imgContainer: string;
  imgContainerClassName: any;
}

export const ClubCell = ({
  imgContainer = "/img/img-container.svg",
  imgContainerClassName,
}: Props): JSX.Element => {
  return (
    <div className="club-cell">
      <img
        className={`img-container ${imgContainerClassName}`}
        alt="Img container"
        src={imgContainer}
      />

      <div className="text-container">
        <div className="club-cell-name">B04</div>
      </div>
    </div>
  );
};

ClubCell.propTypes = {
  imgContainer: PropTypes.string,
};
