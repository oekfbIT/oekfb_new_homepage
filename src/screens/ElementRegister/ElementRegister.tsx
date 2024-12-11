import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/NavigationDesktop";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementRegister = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-register"
      style={{
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
      }}
    >
      {screenWidth < 900 && (
        <>
          <NavigationDesktop
            className="navigation-desktop-13"
            img="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem="/img/league-row-item-content-img-1090.png"
            leagueRowItem1="/img/league-row-item-content-img-1090.png"
            leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem11="/img/league-row-item-content-img-1090.png"
            leagueRowItem12="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem13="/img/league-row-item-content-img-1090.png"
            leagueRowItem14="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem15="/img/league-row-item-content-img-1090.png"
            leagueRowItem16="/img/league-row-item-content-seperator-1104.png"
            leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem3="/img/league-row-item-content-img-1090.png"
            leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem5="/img/league-row-item-content-img-1090.png"
            leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem7="/img/league-row-item-content-img-1090.png"
            leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
            leagueRowItem9="/img/league-row-item-content-img-1090.png"
            mobileBurgerMenu="/img/mobile-burger-menu-97.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="authentication-form">
            <div className="div-15">
              <div className="authentication-state">
                <div className="authentication-state-2">
                  <div className="authentication-state-wrapper">
                    <div className="authentication-state-3" />
                  </div>

                  <div className="authentication-state-4">
                    <div className="authentication-state-5" />
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication">
                  <div className="authentication-2">Create Member Account</div>

                  <p className="authentication-3">
                    Please enter your e-mail address and choose a password.
                  </p>
                </div>
              </div>

              <div className="authentication-state-6">
                <div className="authentication-state-7">
                  <div className="authentication-state-8">
                    <div className="title-wrapper">
                      <div className="title-5">LOGIN</div>
                    </div>

                    <div className="authentication-state-9">
                      <div className="title-6">SIGNUP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="authentication-form-2">
              <div className="authentication-form-3">
                PRIMÄRER ANSPRECHPARTNER
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Name</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-8">
                        <div className="authentication-form-6">Email</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Phone</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="authentication-form-2">
              <div className="authentication-form-3">
                SEKUNDARER ANSPRECHPARTNER
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Name</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-8">
                        <div className="authentication-form-6">Email</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Phone</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="authentication-form-2">
              <div className="authentication-form-3">MATCH DETAILS</div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Name</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-8">
                        <div className="authentication-form-6">Email</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Phone</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-wrapper">
                  <div className="div-15">
                    <div className="authentication-form-4">
                      <div className="authentication-form-5">
                        <div className="authentication-form-6">Phone</div>

                        <div className="authentication-form-6">*</div>
                      </div>

                      <div className="authentication-form-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="authentication-4">
              <div className="authentication-form-9">* REQUIRED</div>

              <div className="authentication-form-10">
                <div className="authentication-form-11">LOGIN</div>
              </div>

              <div className="div-wrapper-3">
                <div className="authentication-form-12">
                  <div className="authentication-form-13">FORGOT PASSWORD</div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-11"
            footerContent="/img/footer-content-wrapper-left-logo-124.png"
            footerContentClassNameOverride="footer-12"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-522.svg"
            link="/img/link-516.svg"
            link1="/img/link-520.svg"
            link2="/img/link-521.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <ViewDefaultWrapper
            className="navigation-desktop-13"
            img="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem="/img/league-row-item-content-img-108.png"
            leagueRowItem1="/img/league-row-item-content-img-108.png"
            leagueRowItem10="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem11="/img/league-row-item-content-img-108.png"
            leagueRowItem12="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem13="/img/league-row-item-content-img-108.png"
            leagueRowItem14="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem15="/img/league-row-item-content-img-108.png"
            leagueRowItem16="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem2="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem3="/img/league-row-item-content-img-108.png"
            leagueRowItem4="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem5="/img/league-row-item-content-img-108.png"
            leagueRowItem6="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem7="/img/league-row-item-content-img-108.png"
            leagueRowItem8="/img/league-row-item-content-seperator-108.svg"
            leagueRowItem9="/img/league-row-item-content-img-108.png"
            mobileBurgerMenu="/img/mobile-burger-menu-21.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-10.svg"
            view="default"
          />
          <div className="frame-wrapper">
            <div className="frame-5">
              <div className="authentication-form-14">
                <div className="div-15">
                  <div className="authentication-state">
                    <div className="authentication-state-2">
                      <div className="authentication-state-10">
                        <div className="authentication-state-3" />
                      </div>

                      <div className="authentication-state-11">
                        <div className="authentication-state-5" />
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication">
                      <div className="authentication-2">
                        Create Member Account
                      </div>

                      <p className="authentication-3">
                        Please enter your e-mail address and choose a password.
                      </p>
                    </div>
                  </div>

                  <div className="authentication-state-6">
                    <div className="authentication-state-7">
                      <div className="authentication-state-8">
                        <div className="title-wrapper">
                          <div className="title-5">LOGIN</div>
                        </div>

                        <div className="authentication-state-9">
                          <div className="title-6">SIGNUP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="authentication-form-2">
                  <div className="authentication-form-15">
                    PRIMÄRER ANSPRECHPARTNER
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Name</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-8">
                            <div className="authentication-form-6">Email</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Phone</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="authentication-form-2">
                  <div className="authentication-form-15">
                    SEKUNDARER ANSPRECHPARTNER
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Name</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-8">
                            <div className="authentication-form-6">Email</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Phone</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="authentication-form-2">
                  <div className="authentication-form-15">MATCH DETAILS</div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Name</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-8">
                            <div className="authentication-form-6">Email</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Phone</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <div className="authentication-form-5">
                            <div className="authentication-form-6">Phone</div>

                            <div className="authentication-form-6">*</div>
                          </div>

                          <div className="authentication-form-7" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="authentication-4">
                  <div className="authentication-form-9">* REQUIRED</div>

                  <div className="authentication-form-10">
                    <div className="authentication-form-11">LOGIN</div>
                  </div>

                  <div className="div-wrapper-3">
                    <div className="authentication-form-12">
                      <div className="authentication-form-13">
                        FORGOT PASSWORD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-11"
            footerContent="/img/footer-content-wrapper-left-logo-19.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-73.svg"
            link="/img/link-72.svg"
            link1="/img/link-74.svg"
            link2="/img/link-75.svg"
          />
        </>
      )}
    </div>
  );
};
