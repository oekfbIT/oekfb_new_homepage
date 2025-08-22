import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementImpressiumMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-impressium-mobile"
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
            className="instance-node-14"
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
            mobileBurgerMenu="/img/mobile-burger-menu-40.svg"
            navRowWrapper="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0"
          />
          <div className="impressium">
            <div className="impressium-header">
              <div className="title-10">Impressium</div>

              <div className="div-wrapper-6">
                <div className="subtitle-6">SUBTITLE</div>
              </div>
            </div>

            <div className="div-wrapper-6">
              <div className="paragraph-wrapper">
                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper-2">Address:</div>
                </div>

                <div className="div-wrapper-6">
                  <p className="paragraph-wrapper-3">
                    DFL Deutsche Fußball Liga GmbH
                    <br />
                    Guiollettstraße 44-46
                    <br />
                    D-60325 Frankfurt/Main
                    <br />
                    Germany
                    <br />
                    Tel. +49 (0)69/65005-0
                    <br />
                    Fax +49 (0)69/65005-555
                  </p>
                </div>
              </div>
            </div>

            <div className="div-wrapper-6">
              <div className="paragraph-wrapper">
                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper-4">Email address:</div>
                </div>

                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper-5">info@bundesliga.com</div>
                </div>
              </div>
            </div>

            <div className="div-wrapper-6">
              <div className="paragraph-wrapper">
                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper-6">CEOs:</div>
                </div>

                <div className="div-wrapper-6">
                  <p className="paragraph-wrapper-7">
                    {" "}
                    Dr. Marc Lenz, Dr. Steffen Merkel
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Sponsors
            className="instance-node-14"
            vWhite="/img/v-white-1-4.svg"
          />
          <Footer
            className="footer-30"
            footerContent="/img/footer-content-wrapper-left-logo-114.png"
            footerContentClassNameOverride="footer-31"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-149.svg"
            link="/img/link-148.svg"
            link1="/img/link-150.svg"
            link2="/img/link-151.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <DesktopNav
            className="instance-node-14"
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
            mobileBurgerMenu="/img/mobile-burger-menu-42.svg"
            navRowWrapper="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-20.svg"
            view="default"
          />
          <div className="frame-6">
            <div className="content-frame-3">
              <div className="impressium">
                <div className="impressium-header">
                  <div className="title-10">Impressium</div>

                  <div className="div-wrapper-6">
                    <div className="subtitle-6">SUBTITLE</div>
                  </div>
                </div>

                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper">
                    <div className="div-wrapper-6">
                      <div className="paragraph-wrapper-2">Address:</div>
                    </div>

                    <div className="div-wrapper-6">
                      <p className="paragraph-wrapper-3">
                        DFL Deutsche Fußball Liga GmbH
                        <br />
                        Guiollettstraße 44-46
                        <br />
                        D-60325 Frankfurt/Main
                        <br />
                        Germany
                        <br />
                        Tel. +49 (0)69/65005-0
                        <br />
                        Fax +49 (0)69/65005-555
                      </p>
                    </div>
                  </div>
                </div>

                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper">
                    <div className="div-wrapper-6">
                      <div className="paragraph-wrapper-4">Email address:</div>
                    </div>

                    <div className="div-wrapper-6">
                      <div className="paragraph-wrapper-5">
                        info@bundesliga.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className="div-wrapper-6">
                  <div className="paragraph-wrapper">
                    <div className="div-wrapper-6">
                      <div className="paragraph-wrapper-6">CEOs:</div>
                    </div>

                    <div className="div-wrapper-6">
                      <p className="paragraph-wrapper-7">
                        {" "}
                        Dr. Marc Lenz, Dr. Steffen Merkel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-frame-3">
              <Sponsors className="sponsors-4" vWhite="https://www.minifootball.eu/wp-content/uploads/2024/09/cropped-v_blue.png" />
            </div>
          </div>

          <Footer
            className="footer-30"
            footerContent="/img/footer-content-wrapper-left-logo-8.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-157.svg"
            link="/img/link-156.svg"
            link1="/img/link-158.svg"
            link2="/img/link-159.svg"
          />
        </>
      )}
    </div>
  );
};
