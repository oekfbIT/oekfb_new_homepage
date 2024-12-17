import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import {Navigation} from "../../components/Navigation";

export const ElementTableMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-table-mobile"
      style={{
        gap: screenWidth < 900 ? "20px" : undefined,
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
        overflow: screenWidth < 900 ? "hidden" : undefined,
      }}
    >
      {screenWidth < 900 && (
        <>

          <Navigation/>
          <div className="league-table">
            <div className="league-table-wrapper">
              <div className="league-table-2">
                <PageHeader className="instance-node-5" text="Table" />
                <div className="container-2">
                  <div className="div-wrapper-2">
                    <div className="table">
                      <header className="row-wrapper">
                        <div className="row">
                          <div className="cell">
                            <div className="text-wrapper-25">M</div>
                          </div>

                          <div className="cell-2">
                            <div className="text-wrapper-26">W</div>
                          </div>

                          <div className="cell-3">
                            <div className="text-wrapper-27">D</div>
                          </div>

                          <div className="cell-4">
                            <div className="text-wrapper-28">L</div>
                          </div>

                          <div className="cell-5">
                            <div className="text-wrapper-29">G</div>
                          </div>

                          <div className="cell-6">
                            <div className="text-wrapper-30">P</div>
                          </div>
                        </div>
                      </header>

                      <div className="body">
                        <div className="row-2">
                          <div className="data" />

                          <div className="data-2">
                            <div className="text-wrapper-31">1</div>
                          </div>

                          <img
                            className="data-3"
                            alt="Data"
                            src="/img/data.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-32">FCB</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">20:7</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">14</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data" />

                          <div className="data-2">
                            <div className="text-wrapper-33">2</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-1.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-37">RBL</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-11">
                            <div className="text-wrapper-38">9:2</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">14</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data" />

                          <div className="data-2">
                            <div className="text-wrapper-33">3</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-1.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-2.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-32">SGE</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">14:9</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">13</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data" />

                          <div className="data-2">
                            <div className="text-wrapper-33">4</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-2.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-3.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-40">SCF</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-11">
                            <div className="text-wrapper-41">9:7</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">12</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data-12" />

                          <div className="data-2">
                            <div className="text-wrapper-33">5</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-3.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-4.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-37">B04</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-13">
                            <div className="text-wrapper-35">16:12</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">11</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data-14" />

                          <div className="data-2">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-4.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-5.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-42">FCU</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-11">
                            <div className="text-wrapper-43">6:4</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">11</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-2">
                            <div className="text-wrapper-31">7</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-5.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-6.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-37">BVB</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-13">
                            <div className="text-wrapper-35">12:11</div>
                          </div>

                          <div className="data-9">
                            <div className="text-wrapper-36">10</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-2">
                            <div className="text-wrapper-33">9</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-6.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-7.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-42">FCH</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">10:8</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">9</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">10</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-7.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-8.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-37">M05</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-13">
                            <div className="text-wrapper-35">11:10</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">8</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">11</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-8.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-9.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-45">SVW</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">8:12</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">8</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">12</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-9.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-10.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-37">WOB</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-13">
                            <div className="text-wrapper-35">13:12</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-36">7</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">13</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-10.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-11.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-42">FCA</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">3</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">9:15</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-36">7</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">14</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-11.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-12.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-46">BMG</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">7:10</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">6</div>
                          </div>
                        </div>

                        <div className="row-3">
                          <div className="data-16">
                            <div className="text-wrapper-31">15</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-12.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-13.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-32">STP</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-11">
                            <div className="text-wrapper-43">4:9</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">4</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data-17" />

                          <div className="data-16">
                            <div className="text-wrapper-31">16</div>
                          </div>

                          <img
                            className="data-3"
                            alt="Data"
                            src="/img/data-14.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-40">TSG</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-13">
                            <div className="text-wrapper-35">10:16</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">4</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data-18" />

                          <div className="data-16">
                            <div className="text-wrapper-31">17</div>
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-13.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-15.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-47">KSV</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-34">2</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">4</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">9:19</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-44">2</div>
                          </div>
                        </div>

                        <div className="row-2">
                          <div className="data-18" />

                          <div className="data-16">
                            <div className="text-wrapper-31">18</div>
                          </div>

                          <div className="img-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-14.svg"
                            />
                          </div>

                          <img
                            className="data-10"
                            alt="Data"
                            src="/img/data-16.svg"
                          />

                          <div className="container-wrapper">
                            <div className="container-3">
                              <div className="text-wrapper-48">BOC</div>
                            </div>
                          </div>

                          <div className="data-4">
                            <div className="text-wrapper-33">6</div>
                          </div>

                          <div className="data-5">
                            <div className="text-wrapper-34">0</div>
                          </div>

                          <div className="data-6">
                            <div className="text-wrapper-39">1</div>
                          </div>

                          <div className="data-7">
                            <div className="text-wrapper-34">5</div>
                          </div>

                          <div className="data-8">
                            <div className="text-wrapper-35">6:14</div>
                          </div>

                          <div className="data-15">
                            <div className="text-wrapper-36">1</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-legend">
                    <div className="list-2">
                      <div className="legend-wrapper">
                        <div className="legend">LEGEND</div>
                      </div>

                      <div className="overlap">
                        <div className="item-4">
                          <p className="m-matches">
                            <span className="text-wrapper-49">M </span>

                            <span className="text-wrapper-50">Matches</span>
                          </p>
                        </div>

                        <div className="item-5">
                          <p className="goal-difference">
                            <span className="text-wrapper-49">+/- </span>

                            <span className="text-wrapper-50">
                              Goal Difference
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="overlap-group">
                        <div className="item-4">
                          <p className="w-won">
                            <span className="text-wrapper-49">W </span>

                            <span className="text-wrapper-50">Won</span>
                          </p>
                        </div>

                        <div className="item-5">
                          <p className="p-points">
                            <span className="text-wrapper-49">P </span>

                            <span className="text-wrapper-50">Points</span>
                          </p>
                        </div>
                      </div>

                      <div className="overlap-group-2">
                        <div className="item-4">
                          <p className="d-draw">
                            <span className="text-wrapper-49">D </span>

                            <span className="text-wrapper-50">Draw</span>
                          </p>
                        </div>

                        <div className="item-5">
                          <p className="g-goals">
                            <span className="text-wrapper-49">G </span>

                            <span className="text-wrapper-50">Goals</span>
                          </p>
                        </div>
                      </div>

                      <div className="l-lost-wrapper">
                        <p className="l-lost">
                          <span className="text-wrapper-49">L </span>

                          <span className="text-wrapper-50">Lost</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-7"
            footerContent="/img/footer-content-wrapper-left-logo-13.png"
            footerContentClassNameOverride="footer-8"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-54.svg"
            link="/img/link-52.svg"
            link1="/img/link-55.svg"
            link2="/img/link-56.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="instance-node-5"
            img="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem="/img/league-row-item-content-img-1090.png"
            leagueRowItem1="/img/league-row-item-content-img-1090.png"
            leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem11="/img/league-row-item-content-img-1090.png"
            leagueRowItem12="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem13="/img/league-row-item-content-img-1090.png"
            leagueRowItem14="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem15="/img/league-row-item-content-img-1090.png"
            leagueRowItem16="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem3="/img/league-row-item-content-img-1090.png"
            leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem5="/img/league-row-item-content-img-1090.png"
            leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem7="/img/league-row-item-content-img-1090.png"
            leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem9="/img/league-row-item-content-img-1090.png"
            mobileBurgerMenu="/img/mobile-burger-menu-18.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-8.svg"
            view="default"
          />
          <div className="content-frame">
            <div className="page-content-wrapper">
              <div className="page-content-5">
                <PageHeader className="instance-node-5" text="Table" />
                <div className="div-wrapper-2">
                  <div className="league-table-content">
                    <div className="row-wrapper">
                      <div className="row-4">
                        <div className="cell-7">
                          <div className="text-wrapper-51">Matches</div>
                        </div>

                        <div className="cell-8">
                          <div className="text-wrapper-26">W</div>
                        </div>

                        <div className="cell-9">
                          <div className="text-wrapper-27">D</div>
                        </div>

                        <div className="cell-10">
                          <div className="text-wrapper-28">L</div>
                        </div>

                        <div className="cell-11">
                          <div className="text-wrapper-52">Goals</div>
                        </div>

                        <div className="cell-12">
                          <div className="text-wrapper-53">+/-</div>
                        </div>

                        <div className="cell-13">
                          <div className="text-wrapper-54">Points</div>
                        </div>
                      </div>
                    </div>

                    <div className="league-table-cells">
                      <div className="row-5">
                        <div className="data-19" />

                        <div className="data-20">
                          <div className="text-wrapper-55">1</div>
                        </div>

                        <img
                          className="data-21"
                          alt="Data"
                          src="/img/data-17.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-56">
                              FC Bayern München
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-60">20:7</div>
                        </div>

                        <div className="data-28">
                          <div className="text-wrapper-61">+13</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">14</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-19" />

                        <div className="data-20">
                          <div className="text-wrapper-57">2</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-15.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-18.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-63">RB Leipzig</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-32">
                          <div className="text-wrapper-64">9:2</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-65">+7</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">14</div>
                        </div>
                      </div>

                      <div className="row-6">
                        <div className="data-19" />

                        <div className="data-20">
                          <div className="text-wrapper-57">3</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-16.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-19.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-66">
                              Eintracht Frankfurt
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-68">14:9</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-69">+5</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">13</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-19" />

                        <div className="data-20">
                          <div className="text-wrapper-57">4</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-17.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-20.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-70">SC Freiburg</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-32">
                          <div className="text-wrapper-71">9:7</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-72">+2</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">12</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-35" />

                        <div className="data-20">
                          <div className="text-wrapper-57">5</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-18.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-21.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-66">
                              Bayer 04 Leverkusen
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-36">
                          <div className="text-wrapper-73">16:12</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-74">+4</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">11</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-37" />

                        <div className="data-20">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-19.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-22.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-75">
                              1. FC Union Berlin
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-32">
                          <div className="text-wrapper-76">6:4</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-72">+2</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">11</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-20">
                          <div className="text-wrapper-77">7</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-20.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-23.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-75">
                              Borussia Dortmund
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-36">
                          <div className="text-wrapper-73">12:11</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-78">+1</div>
                        </div>

                        <div className="data-29">
                          <div className="text-wrapper-62">10</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-20">
                          <div className="text-wrapper-57">9</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-21.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-24.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-79">
                              1. FC Heidenheim 1846
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-80">10:8</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-72">+2</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">9</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">10</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-22.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-25.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-75">
                              1. FSV Mainz 05
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-36">
                          <div className="text-wrapper-73">11:10</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-78">+1</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">8</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">11</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-23.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-26.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-63">
                              SV Werder Bremen
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-68">8:12</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-82">-4</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">8</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">12</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-24.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-27.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-75">VfL Wolfsburg</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-36">
                          <div className="text-wrapper-73">13:12</div>
                        </div>

                        <div className="data-33">
                          <div className="text-wrapper-78">+1</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-83">7</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">13</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-25.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-28.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-84">FC Augsburg</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">3</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-68">9:15</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-85">-6</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-83">7</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">14</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-26.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-29.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-66">
                              Borussia Mönchengladbach
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-73">7:10</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-85">-3</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">6</div>
                        </div>
                      </div>

                      <div className="row-7">
                        <div className="data-39">
                          <div className="text-wrapper-55">15</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-27.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-30.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-86">FC St. Pauli</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-32">
                          <div className="text-wrapper-76">4:9</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-87">-5</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">4</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-41" />

                        <div className="data-39">
                          <div className="text-wrapper-55">16</div>
                        </div>

                        <img
                          className="data-21"
                          alt="Data"
                          src="/img/data-31.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-56">
                              TSG Hoffenheim
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-36">
                          <div className="text-wrapper-73">10:16</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-85">-6</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">4</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-42" />

                        <div className="data-39">
                          <div className="text-wrapper-55">17</div>
                        </div>

                        <div className="data-30">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-28.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-32.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-66">Holstein Kiel</div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-58">2</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">4</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-68">9:19</div>
                        </div>

                        <div className="data-43">
                          <div className="text-wrapper-88">-10</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-81">2</div>
                        </div>
                      </div>

                      <div className="row-5">
                        <div className="data-42" />

                        <div className="data-39">
                          <div className="text-wrapper-55">18</div>
                        </div>

                        <div className="data-34">
                          <img
                            className="mask-group"
                            alt="Mask group"
                            src="/img/mask-group-29.svg"
                          />
                        </div>

                        <img
                          className="data-31"
                          alt="Data"
                          src="/img/data-33.svg"
                        />

                        <div className="data-22">
                          <div className="container-4">
                            <div className="text-wrapper-79">
                              VfL Bochum 1848
                            </div>
                          </div>
                        </div>

                        <div className="data-23">
                          <div className="text-wrapper-57">6</div>
                        </div>

                        <div className="data-24">
                          <div className="text-wrapper-59">0</div>
                        </div>

                        <div className="data-25">
                          <div className="text-wrapper-67">1</div>
                        </div>

                        <div className="data-26">
                          <div className="text-wrapper-58">5</div>
                        </div>

                        <div className="data-27">
                          <div className="text-wrapper-68">6:14</div>
                        </div>

                        <div className="data-40">
                          <div className="text-wrapper-87">-8</div>
                        </div>

                        <div className="data-38">
                          <div className="text-wrapper-62">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="list-margin-wrapper">
                  <div className="list-margin">
                    <div className="list-3">
                      <div className="item-6">
                        <div className="legend">LEGEND</div>
                      </div>

                      <div className="m-matches-wrapper">
                        <p className="m-matches">
                          <span className="text-wrapper-49">M </span>

                          <span className="text-wrapper-50">Matches</span>
                        </p>
                      </div>

                      <div className="w-won-wrapper">
                        <p className="w-won">
                          <span className="text-wrapper-49">W </span>

                          <span className="text-wrapper-50">Won</span>
                        </p>
                      </div>

                      <div className="d-draw-wrapper">
                        <p className="d-draw">
                          <span className="text-wrapper-49">D </span>

                          <span className="text-wrapper-50">Draw</span>
                        </p>
                      </div>

                      <div className="item-7">
                        <p className="l-lost">
                          <span className="text-wrapper-49">L </span>

                          <span className="text-wrapper-50">Lost</span>
                        </p>
                      </div>

                      <div className="goal-difference-wrapper">
                        <p className="goal-difference">
                          <span className="text-wrapper-49">+/- </span>

                          <span className="text-wrapper-50">
                            Goal Difference
                          </span>
                        </p>
                      </div>

                      <div className="p-points-wrapper">
                        <p className="p-points">
                          <span className="text-wrapper-49">P </span>

                          <span className="text-wrapper-50">Points</span>
                        </p>
                      </div>

                      <div className="g-goals-wrapper">
                        <p className="g-goals">
                          <span className="text-wrapper-49">G </span>

                          <span className="text-wrapper-50">Goals</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-7"
            footerContent="/img/footer-content-wrapper-left-logo-15.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-61.svg"
            link="/img/link-60.svg"
            link1="/img/link-62.svg"
            link2="/img/link-63.svg"
          />
        </>
      )}
    </div>
  );
};
