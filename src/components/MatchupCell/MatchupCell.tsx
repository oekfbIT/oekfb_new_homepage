/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  state: "fixture-w-top" | "fixture-no-top" | "live-top" | "live-w-top";
  className: any;
}

export const MatchupCell = ({ state, className }: Props): JSX.Element => {
  return (
    <div className={`matchup-cell ${className}`}>
      <div className="matchup-cell-top">
        <div className={`line ${state}`} />

        {["fixture-w-top", "live-w-top"].includes(state) && (
          <div className="txt-overlay">
            <div className="date-txt">13.09 - 16:00</div>
          </div>
        )}
      </div>

      <div className="matchup-cell-bottom">
        <div className="matchup-cell-bottom-2">
          <div className="link-9">
            <div className="matchup-cell-bottom-wrapper">
              <div className="matchup-cell-bottom-3" />
            </div>

            <div className="matchup-cell-bottom-4">
              <div className="matchup-cell-bottom-5">
                <div className={`matchup-cell-bottom-6 state-${state}`}>
                  <div className="matchup-cell-bottom-7">0</div>
                </div>
              </div>

              <div className="matchup-cell-bottom-5">
                <div className={`matchup-cell-bottom-8 state-1-${state}`}>
                  <div className="matchup-cell-bottom-9">0</div>
                </div>
              </div>
            </div>

            <div className="matchup-cell-bottom-wrapper">
              <div className="matchup-cell-bottom-10" />
            </div>
          </div>

          <div className={`background state-3-${state}`}>
            <div className="container">
              <div className="vorschau">
                {["fixture-no-top", "fixture-w-top"].includes(state) && (
                  <>Vorschau</>
                )}

                {["live-top", "live-w-top"].includes(state) && (
                  <>Live - 16:24</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MatchupCell.propTypes = {
  state: PropTypes.oneOf([
    "fixture-w-top",
    "fixture-no-top",
    "live-top",
    "live-w-top",
  ]),
};
