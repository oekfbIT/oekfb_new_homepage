import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavigationDesktop } from "../../components/Navigation";
import { ViewDefaultWrapper } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementNewsDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-news-detail"
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
            className="navigation-desktop-14"
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
            mobileBurgerMenu="/img/mobile-burger-menu-22.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
          />
          <div className="news-detail">
            <div className="news-detail-wrapper">
              <div className="news-detail-content">
                <div className="news-detail-content-2">
                  <div className="news-detail-content-3">
                    <div className="news-detail-content-4">BUNDESLIGA</div>

                    <p className="news-detail-content-5">
                      Benjamin Šeško on his title dreams,
                      <br />
                      partnering Openda and NBA
                      <br />
                      allegiances
                    </p>

                    <div className="news-detail-content-6">14.09.2024</div>
                  </div>

                  <div className="hero-img">
                    <div className="image-12" />
                  </div>
                </div>
              </div>

              <div className="news-detail-content-wrapper">
                <div className="news-detail-content-7">
                  <p className="news-detail-content-8">
                    <span className="text-wrapper-89">
                      The striker was in confident mood as he gave an interview
                      to bundesliga.com in
                      <br />
                      which he outlined his ambitions for the season and spoke
                      about the mood in Leipzig
                      <br />
                      after ending Bayer Leverkusen&#39;s long unbeaten run.
                      <br />
                      <br />
                      Šeško: &#34;It was actually an amazing feeling after the
                      last whistle from the referee. It felt like
                      <br />
                      winning a major tournament. We know what we achieved that
                      night was unbelievable. We
                      <br />
                      showed that we can do it and that we have the quality to
                      beat a sensational team like that. I<br />
                      think this match showed we can really aim as high as
                      possible this season.&#34;
                      <br />
                      <br />
                    </span>

                    <span className="text-wrapper-90">
                      would be a tough achievement, but we believe we can do it.
                      We also want to go as far as
                      <br />
                      possible in the Champions League and of course to try to
                      win the DFB Cup again.&#34;
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-13"
            footerContent="/img/footer-content-wrapper-left-logo-20.png"
            footerContentClassNameOverride="footer-14"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-77.svg"
            link="/img/link-76.svg"
            link1="/img/link-78.svg"
            link2="/img/link-79.svg"
          />
        </>
      )}

      {screenWidth >= 900 && (
        <>
          <ViewDefaultWrapper
            className="navigation-desktop-14"
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
            mobileBurgerMenu="/img/mobile-burger-menu-23.svg"
            navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
            navRowWrapper1="/img/nav-row-wrapper-content-login-wrapper-image-11.svg"
            view="default"
          />
          <div className="content-frame-2">
            <div className="news-detail-2">
              <div className="news-detail-wrapper">
                <div className="news-detail-content">
                  <div className="news-detail-content-2">
                    <div className="news-detail-content-3">
                      <div className="news-detail-content-4">BUNDESLIGA</div>

                      <p className="news-detail-content-5">
                        Benjamin Šeško on his title dreams,
                        <br />
                        partnering Openda and NBA
                        <br />
                        allegiances
                      </p>

                      <div className="news-detail-content-6">14.09.2024</div>
                    </div>

                    <div className="hero-img">
                      <div className="image-12" />
                    </div>
                  </div>
                </div>

                <div className="news-detail-content-wrapper">
                  <div className="news-detail-content-7">
                    <p className="news-detail-content-8">
                      <span className="text-wrapper-89">
                        The striker was in confident mood as he gave an
                        interview to bundesliga.com in
                        <br />
                        which he outlined his ambitions for the season and spoke
                        about the mood in Leipzig
                        <br />
                        after ending Bayer Leverkusen&#39;s long unbeaten run.
                        <br />
                        <br />
                        Šeško: &#34;It was actually an amazing feeling after the
                        last whistle from the referee. It felt like
                        <br />
                        winning a major tournament. We know what we achieved
                        that night was unbelievable. We
                        <br />
                        showed that we can do it and that we have the quality to
                        beat a sensational team like that. I<br />
                        think this match showed we can really aim as high as
                        possible this season.&#34;
                        <br />
                        <br />
                      </span>

                      <span className="text-wrapper-90">
                        would be a tough achievement, but we believe we can do
                        it. We also want to go as far as
                        <br />
                        possible in the Champions League and of course to try to
                        win the DFB Cup again.&#34;
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            className="footer-13"
            footerContent="/img/footer-content-wrapper-left-logo-14.png"
            href="https://www.facebook.com/kleinfeldliga/"
            href1="https://www.youtube.com/@OEKFB"
            href2="https://www.instagram.com/oekfb/?hl=en"
            img="/img/link-81.svg"
            link="/img/link-80.svg"
            link1="/img/link-82.svg"
            link2="/img/link-83.svg"
          />
        </>
      )}
    </div>
  );
};
