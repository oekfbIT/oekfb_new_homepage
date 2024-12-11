/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  leagueRowItem: string;
  img: string;
  leagueRowItem1: string;
  leagueRowItem2: string;
  leagueRowItem3: string;
  leagueRowItem4: string;
  leagueRowItem5: string;
  leagueRowItem6: string;
  leagueRowItem7: string;
  leagueRowItem8: string;
  leagueRowItem9: string;
  leagueRowItem10: string;
  leagueRowItem11: string;
  leagueRowItem12: string;
  leagueRowItem13: string;
  leagueRowItem14: string;
  leagueRowItem15: string;
  leagueRowItem16: string;
  navRowWrapper: string;
  mobileBurgerMenu: string;
  leagueRowItemClassName: any;
  leagueRowItemClassNameOverride: any;
  linkWrapperClassName: any;
  linkWrapperClassNameOverride: any;
}

export const NavigationDesktop = ({
  className,
  leagueRowItem = "/img/league-row-item-content-img-90.png",
  img = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem1 = "/img/league-row-item-content-img-90.png",
  leagueRowItem2 = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem3 = "/img/league-row-item-content-img-90.png",
  leagueRowItem4 = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem5 = "/img/league-row-item-content-img-90.png",
  leagueRowItem6 = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem7 = "/img/league-row-item-content-img-90.png",
  leagueRowItem8 = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem9 = "/img/league-row-item-content-img-90.png",
  leagueRowItem10 = "/img/league-row-item-content-seperator-90.svg",
  leagueRowItem11 = "/img/league-row-item-content-img-90.png",
  leagueRowItem12 = "/img/league-row-item-content-seperator-96.svg",
  leagueRowItem13 = "/img/league-row-item-content-img-90.png",
  leagueRowItem14 = "/img/league-row-item-content-seperator-96.svg",
  leagueRowItem15 = "/img/league-row-item-content-img-90.png",
  leagueRowItem16 = "/img/league-row-item-content-seperator-96.svg",
  navRowWrapper = "/img/nav-row-wrapper-content-logo-7.svg",
  mobileBurgerMenu = "/img/mobile-burger-menu-7.svg",
  leagueRowItemClassName,
  leagueRowItemClassNameOverride,
  linkWrapperClassName,
  linkWrapperClassNameOverride,
}: Props): JSX.Element => {
  return (
    <div className={`navigation-desktop ${className}`}>
      <div className="main-navigation">
        <div className="league-rows">
          <div className="leauge-row-wrapper">
            <div className="league-row-item">
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem}
                    />

                    <div className="text-wrapper">W1</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={img}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item">
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem1}
                    />

                    <div className="text-wrapper">G1</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem2}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item">
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem3}
                    />

                    <div className="text-wrapper">W2A</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem4}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item">
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem5}
                    />

                    <div className="text-wrapper">W2B</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem6}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item">
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem7}
                    />

                    <div className="text-wrapper">G2</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem8}
                  />
                </div>
              </div>
            </div>

            <div className={`link-wrapper ${leagueRowItemClassName}`}>
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem9}
                    />

                    <div className="text-wrapper">W3A</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem10}
                  />
                </div>
              </div>
            </div>

            <div
              className={`league-row-item-3 ${leagueRowItemClassNameOverride}`}
            >
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem11}
                    />

                    <div className="text-wrapper">W3B</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem12}
                  />
                </div>
              </div>
            </div>

            <div className={`league-row-item-4 ${linkWrapperClassName}`}>
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem13}
                    />

                    <div className="text-wrapper">W4A</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem14}
                  />
                </div>
              </div>
            </div>

            <div
              className={`league-row-item-5 ${linkWrapperClassNameOverride}`}
            >
              <div className="link">
                <div className="div">
                  <div className="content">
                    <img
                      className="img"
                      alt="League row item"
                      src={leagueRowItem15}
                    />

                    <div className="text-wrapper">W4B</div>
                  </div>

                  <img
                    className="league-row-item-2"
                    alt="League row item"
                    src={leagueRowItem16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-row-wrapper">
          <div className="nav-row-wrapper-2">
            <img
              className="nav-row-wrapper-3"
              alt="Nav row wrapper"
              src={navRowWrapper}
            />

            <img
              className="mobile-burger-menu"
              alt="Mobile burger menu"
              src={mobileBurgerMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

NavigationDesktop.propTypes = {
  leagueRowItem: PropTypes.string,
  img: PropTypes.string,
  leagueRowItem1: PropTypes.string,
  leagueRowItem2: PropTypes.string,
  leagueRowItem3: PropTypes.string,
  leagueRowItem4: PropTypes.string,
  leagueRowItem5: PropTypes.string,
  leagueRowItem6: PropTypes.string,
  leagueRowItem7: PropTypes.string,
  leagueRowItem8: PropTypes.string,
  leagueRowItem9: PropTypes.string,
  leagueRowItem10: PropTypes.string,
  leagueRowItem11: PropTypes.string,
  leagueRowItem12: PropTypes.string,
  leagueRowItem13: PropTypes.string,
  leagueRowItem14: PropTypes.string,
  leagueRowItem15: PropTypes.string,
  leagueRowItem16: PropTypes.string,
  navRowWrapper: PropTypes.string,
  mobileBurgerMenu: PropTypes.string,
};
