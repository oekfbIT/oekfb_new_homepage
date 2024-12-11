import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/NavigationDesktop";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementLoginMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-login-mobile"
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
        <NavigationDesktop
          className="navigation-desktop-30"
          img="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem="/img/league-row-item-content-img-108.png"
          leagueRowItem1="/img/league-row-item-content-img-108.png"
          leagueRowItem10="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem11="/img/league-row-item-content-img-108.png"
          leagueRowItem12="/img/league-row-item-content-seperator-1104.png"
          leagueRowItem13="/img/league-row-item-content-img-108.png"
          leagueRowItem14="/img/league-row-item-content-seperator-1104.png"
          leagueRowItem15="/img/league-row-item-content-img-108.png"
          leagueRowItem16="/img/league-row-item-content-seperator-1104.png"
          leagueRowItem2="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem3="/img/league-row-item-content-img-108.png"
          leagueRowItem4="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem5="/img/league-row-item-content-img-108.png"
          leagueRowItem6="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem7="/img/league-row-item-content-img-108.png"
          leagueRowItem8="/img/league-row-item-content-seperator-108.svg"
          leagueRowItem9="/img/league-row-item-content-img-108.png"
          mobileBurgerMenu="/img/mobile-burger-menu-43.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        />
      )}

      {screenWidth >= 900 && (
        <ViewDefaultWrapper
          className="navigation-desktop-30"
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
          mobileBurgerMenu="/img/mobile-burger-menu-45.svg"
          navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-21.svg"
          view="default"
        />
      )}

      <div
        className="content-frame-4"
        style={{
          padding:
            screenWidth < 900
              ? "60px 5px"
              : screenWidth >= 900
                ? "60px 0px"
                : undefined,
        }}
      >
        <div className="authentication-form-16">
          <div className="div-16">
            <div
              className="authentication-state-12"
              style={{
                justifyContent: screenWidth >= 900 ? "center" : undefined,
              }}
            >
              <div className="authentication-state-13">
                <div
                  className="authentication-state-14"
                  style={{
                    marginLeft:
                      screenWidth < 900
                        ? "-135.00px"
                        : screenWidth >= 900
                          ? "-40.00px"
                          : undefined,
                    marginRight:
                      screenWidth < 900
                        ? "-103.00px"
                        : screenWidth >= 900
                          ? "-8.00px"
                          : undefined,
                  }}
                >
                  <div className="authentication-state-15" />
                </div>

                <div
                  className="authentication-state-16"
                  style={{
                    marginLeft:
                      screenWidth < 900
                        ? "-103.00px"
                        : screenWidth >= 900
                          ? "-8.00px"
                          : undefined,
                    marginRight:
                      screenWidth < 900
                        ? "-135.00px"
                        : screenWidth >= 900
                          ? "-40.00px"
                          : undefined,
                  }}
                >
                  <div className="authentication-state-17" />
                </div>
              </div>
            </div>

            <div className="div-wrapper-7">
              <div className="authentication-5">
                <div className="authentication-6">Login to Account</div>

                <p className="authentication-7">
                  Please enter your e-mail address and choose a password.
                </p>
              </div>
            </div>

            <div className="authentication-state-18">
              <div className="authentication-state-19">
                <div className="authentication-state-20">
                  <div className="authentication-state-21">
                    <div className="title-11">LOGIN</div>
                  </div>

                  <div className="authentication-state-22">
                    <div className="title-12">SIGNUP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="authentication-form-17">
            <div className="div-wrapper-7">
              <div className="authentication-form-18">
                <div className="div-16">
                  <div className="authentication-form-19">
                    <div className="authentication-form-20">
                      <div className="authentication-form-21">Email</div>

                      <div className="authentication-form-21">*</div>
                    </div>

                    <div className="authentication-form-22" />
                  </div>
                </div>
              </div>
            </div>

            <div className="div-wrapper-7">
              <div className="authentication-form-18">
                <div className="div-16">
                  <div className="authentication-form-19">
                    <div className="authentication-form-20">
                      <div className="authentication-form-21">Passwort</div>

                      <div className="authentication-form-21">*</div>
                    </div>

                    <div className="authentication-form-22" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="authentication-8">
            <div className="authentication-form-23">* REQUIRED</div>

            <ActionButton
              actionButtonClassName="action-button-9"
              className="action-button-8"
            />
            <div className="div-wrapper-7">
              <div className="authentication-form-24">
                <div className="authentication-form-25">FORGOT PASSWORD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {screenWidth >= 900 && (
        <Footer
          className="footer-32"
          footerContent="/img/footer-content-wrapper-left-logo-124.png"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-169.svg"
          link="/img/link-168.svg"
          link1="/img/link-170.svg"
          link2="/img/link-171.svg"
        />
      )}

      {screenWidth < 900 && (
        <Footer
          className="footer-32"
          footerContent="/img/footer-content-wrapper-left-logo-124.png"
          footerContentClassNameOverride="footer-33"
          href="https://www.facebook.com/kleinfeldliga/"
          href1="https://www.youtube.com/@OEKFB"
          href2="https://www.instagram.com/oekfb/?hl=en"
          img="/img/link-161.svg"
          link="/img/link-160.svg"
          link1="/img/link-162.svg"
          link2="/img/link-163.svg"
        />
      )}
    </div>
  );
};
