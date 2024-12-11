/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  view: "mobile" | "default";
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
  navRowWrapper1: string;
  mobileBurgerMenu: string;
  leagueRowItemClassName: any;
  leagueRowItemClassNameOverride: any;
  imgClassName: any;
  imgClassNameOverride: any;
  divClassName: any;
  leagueRowItemClassName1: any;
  leagueRowItemClassName2: any;
  divClassNameOverride: any;
  leagueRowItemClassName3: any;
  mobileBurgerMenu1: string;
  to: string;
}

export const ViewDefaultWrapper = ({
  view,
  className,
  leagueRowItem = "/img/league-row-item-content-img-108.png",
  img = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem1 = "/img/league-row-item-content-img-108.png",
  leagueRowItem2 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem3 = "/img/league-row-item-content-img-108.png",
  leagueRowItem4 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem5 = "/img/league-row-item-content-img-108.png",
  leagueRowItem6 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem7 = "/img/league-row-item-content-img-108.png",
  leagueRowItem8 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem9 = "/img/league-row-item-content-img-108.png",
  leagueRowItem10 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem11 = "/img/league-row-item-content-img-108.png",
  leagueRowItem12 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem13 = "/img/league-row-item-content-img-108.png",
  leagueRowItem14 = "/img/league-row-item-content-seperator-108.svg",
  leagueRowItem15 = "/img/league-row-item-content-img-108.png",
  leagueRowItem16 = "/img/league-row-item-content-seperator-108.svg",
  navRowWrapper = "/img/nav-row-wrapper-content-logo-9.svg",
  navRowWrapper1 = "/img/nav-row-wrapper-content-login-wrapper-image-4.svg",
  mobileBurgerMenu = "/img/mobile-burger-menu-9.svg",
  leagueRowItemClassName,
  leagueRowItemClassNameOverride,
  imgClassName,
  imgClassNameOverride,
  divClassName,
  leagueRowItemClassName1,
  leagueRowItemClassName2,
  divClassNameOverride,
  leagueRowItemClassName3,
  mobileBurgerMenu1 = "/img/mobile-burger-menu-10.svg",
  to,
}: Props): JSX.Element => {
  return (
    <div className={`view-default-wrapper ${view} ${className}`}>
      <div className="main-navigation-2">
        <div className="league-rows-2">
          <div className="leauge-row-wrapper-2">
            <div className="league-row-item-6">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-8"
                      alt="League row item"
                      src={leagueRowItem}
                    />

                    <div className="league-row-item-9">W1</div>
                  </div>

                  <img
                    className="league-row-item-10"
                    alt="League row item"
                    src={img}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-11">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-12"
                      alt="League row item"
                      src={leagueRowItem1}
                    />

                    <div className="league-row-item-13">G1</div>
                  </div>

                  <img
                    className="league-row-item-14"
                    alt="League row item"
                    src={leagueRowItem2}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-15">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-16"
                      alt="League row item"
                      src={leagueRowItem3}
                    />

                    <div className="league-row-item-17">W2A</div>
                  </div>

                  <img
                    className="league-row-item-18"
                    alt="League row item"
                    src={leagueRowItem4}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-19">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-20"
                      alt="League row item"
                      src={leagueRowItem5}
                    />

                    <div className="league-row-item-21">W2B</div>
                  </div>

                  <img
                    className="league-row-item-22"
                    alt="League row item"
                    src={leagueRowItem6}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-23">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-24"
                      alt="League row item"
                      src={leagueRowItem7}
                    />

                    <div className="league-row-item-25">G2</div>
                  </div>

                  <img
                    className="league-row-item-26"
                    alt="League row item"
                    src={leagueRowItem8}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-27">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className="league-row-item-28"
                      alt="League row item"
                      src={leagueRowItem9}
                    />

                    <div className="league-row-item-29">W3A</div>
                  </div>

                  <img
                    className="league-row-item-30"
                    alt="League row item"
                    src={leagueRowItem10}
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-31">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className={`league-row-item-32 ${leagueRowItemClassName}`}
                      alt="League row item"
                      src={
                        view === "mobile"
                          ? "/img/league-row-item-content-seperator-123.png"
                          : leagueRowItem11
                      }
                    />

                    <div
                      className={`league-row-item-33 ${leagueRowItemClassNameOverride}`}
                    >
                      W3B
                    </div>
                  </div>

                  <img
                    className={`league-row-item-34 ${imgClassName}`}
                    alt="League row item"
                    src={
                      view === "mobile"
                        ? "/img/league-row-item-content-seperator-123.png"
                        : leagueRowItem12
                    }
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-35">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className={`league-row-item-36 ${imgClassNameOverride}`}
                      alt="League row item"
                      src={
                        view === "mobile"
                          ? "/img/league-row-item-content-seperator-123.png"
                          : leagueRowItem13
                      }
                    />

                    <div className={`league-row-item-37 ${divClassName}`}>
                      W4A
                    </div>
                  </div>

                  <img
                    className={`league-row-item-38 ${leagueRowItemClassName1}`}
                    alt="League row item"
                    src={
                      view === "mobile"
                        ? "/img/league-row-item-content-seperator-123.png"
                        : leagueRowItem14
                    }
                  />
                </div>
              </div>
            </div>

            <div className="league-row-item-39">
              <div className="league-row-item-wrapper">
                <div className="league-row-item-7">
                  <div className="content-2">
                    <img
                      className={`league-row-item-40 ${leagueRowItemClassName2}`}
                      alt="League row item"
                      src={
                        view === "mobile"
                          ? "/img/league-row-item-content-seperator-123.png"
                          : leagueRowItem15
                      }
                    />

                    <div
                      className={`league-row-item-41 ${divClassNameOverride}`}
                    >
                      W4B
                    </div>
                  </div>

                  <img
                    className={`league-row-item-42 ${leagueRowItemClassName3}`}
                    alt="League row item"
                    src={
                      view === "mobile"
                        ? "/img/league-row-item-content-seperator-123.png"
                        : leagueRowItem16
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-row-wrapper-4">
          <div className="nav-row-wrapper-5">
            <img
              className="nav-row-wrapper-6"
              alt="Nav row wrapper"
              src={navRowWrapper}
            />

            {view === "default" && (
              <>
                <div className="nav-row-wrapper-7">
                  <div className="nav-row-wrapper-8">
                    <Link className="item-3" to="/02u46-homepage-desktop">
                      <div className="link-6">
                        <div className="text-wrapper-8">Startseite</div>
                      </div>
                    </Link>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Clubs</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Tabelle</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Spielplan</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Leaderboards</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">News</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Bund</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-6">
                        <div className="text-wrapper-9">Kontakt</div>
                      </div>
                    </div>

                    <div className="item-3">
                      <div className="link-7" />
                    </div>
                  </div>
                </div>

                <div className="nav-row-wrapper-9">
                  <div className="nav-row-wrapper-10">
                    <img
                      className="nav-row-wrapper-11"
                      alt="Nav row wrapper"
                      src={navRowWrapper1}
                    />

                    <div className="text-wrapper-10">Team Login</div>
                  </div>
                </div>

                <Link to={to}>
                  <img
                    className="mobile-burger-menu-2"
                    alt="Mobile burger menu"
                    src={mobileBurgerMenu}
                  />
                </Link>
              </>
            )}

            {view === "mobile" && (
              <>
                <div className="nav-row-wrapper-12" />

                <Link to={to}>
                  <img
                    className="mobile-burger-menu-3"
                    alt="Mobile burger menu"
                    src={mobileBurgerMenu1}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewDefaultWrapper.propTypes = {
  view: PropTypes.oneOf(["mobile", "default"]),
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
  navRowWrapper1: PropTypes.string,
  mobileBurgerMenu: PropTypes.string,
  mobileBurgerMenu1: PropTypes.string,
  to: PropTypes.string,
};
