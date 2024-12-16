import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ClubCard } from "../../components/ClubCard";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

export const ElementClubsDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();

  return (
    <div
      className="element-clubs-desktop"
      style={{
        minWidth:
          screenWidth < 900
            ? "390px"
            : screenWidth >= 900
              ? "900px"
              : undefined,
      }}
    >
      <DesktopNav
        className="instance-node-4"
        divClassName={`${screenWidth < 900 && "class-4"}`}
        divClassNameOverride={`${screenWidth < 900 && "class-6"}`}
        img="/img/league-row-item-content-seperator-1080.svg"
        imgClassName={`${screenWidth < 900 && "class-3"}`}
        imgClassNameOverride={`${screenWidth < 900 && "class-9"}`}
        leagueRowItem="/img/league-row-item-content-img-1090.png"
        leagueRowItem1="/img/league-row-item-content-img-1090.png"
        leagueRowItem10="/img/league-row-item-content-seperator-1080.svg"
        leagueRowItem11={
          screenWidth >= 900
            ? "/img/league-row-item-content-img-1090.png"
            : undefined
        }
        leagueRowItem12={
          screenWidth >= 900
            ? "/img/league-row-item-content-seperator-1080.svg"
            : undefined
        }
        leagueRowItem13={
          screenWidth >= 900
            ? "/img/league-row-item-content-img-1090.png"
            : undefined
        }
        leagueRowItem14={
          screenWidth >= 900
            ? "/img/league-row-item-content-seperator-1080.svg"
            : undefined
        }
        leagueRowItem15={
          screenWidth >= 900
            ? "/img/league-row-item-content-img-1090.png"
            : undefined
        }
        leagueRowItem16={
          screenWidth >= 900
            ? "/img/league-row-item-content-seperator-1080.svg"
            : undefined
        }
        leagueRowItem2="/img/league-row-item-content-seperator-1080.svg"
        leagueRowItem3="/img/league-row-item-content-img-1090.png"
        leagueRowItem4="/img/league-row-item-content-seperator-1080.svg"
        leagueRowItem5="/img/league-row-item-content-img-1090.png"
        leagueRowItem6="/img/league-row-item-content-seperator-1080.svg"
        leagueRowItem7="/img/league-row-item-content-img-1090.png"
        leagueRowItem8="/img/league-row-item-content-seperator-1080.svg"
        leagueRowItem9="/img/league-row-item-content-img-1090.png"
        leagueRowItemClassName={`${screenWidth < 900 && "class"}`}
        leagueRowItemClassName1={`${screenWidth < 900 && "class-2"}`}
        leagueRowItemClassName2={`${screenWidth < 900 && "class-5"}`}
        leagueRowItemClassName3={`${screenWidth < 900 && "class-8"}`}
        leagueRowItemClassNameOverride={`${screenWidth < 900 && "class-7"}`}
        mobileBurgerMenu={
          screenWidth >= 900 ? "/img/mobile-burger-menu-17.svg" : undefined
        }
        mobileBurgerMenu1={
          screenWidth < 900 ? "/img/mobile-burger-menu-12.svg" : undefined
        }
        navRowWrapper="/img/nav-row-wrapper-content-logo-9.svg"
        navRowWrapper1={
          screenWidth >= 900
            ? "/img/nav-row-wrapper-content-login-wrapper-image-7.svg"
            : undefined
        }
        view={
          screenWidth < 900
            ? "mobile"
            : screenWidth >= 900
              ? "default"
              : undefined
        }
      />
      <div
        className="page-content-3"
        style={{
          alignItems:
            screenWidth < 900
              ? "center"
              : screenWidth >= 900
                ? "flex-start"
                : undefined,
          flexDirection: screenWidth < 900 ? "column" : undefined,
          gap:
            screenWidth < 900
              ? "20px"
              : screenWidth >= 900
                ? "10px"
                : undefined,
          justifyContent: screenWidth >= 900 ? "center" : undefined,
          maxWidth: screenWidth < 900 ? "1200px" : undefined,
          padding: screenWidth < 900 ? "60px 20px" : undefined,
        }}
      >
        {screenWidth < 900 && (
          <>
            <PageHeader className="instance-node-4" text="Clubs" />
            <div className="club-grid">
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
            </div>
          </>
        )}

        {screenWidth >= 900 && (
          <div className="page-content-4">
            <PageHeader className="instance-node-4" text="Clubs" />
            <div className="club-grid">
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
              <ClubCard className="club-card-instance" />
            </div>
          </div>
        )}
      </div>

      <Footer
        className="footer-6"
        footerContent={
          screenWidth < 900
            ? "/img/footer-content-wrapper-left-logo-10.png"
            : screenWidth >= 900
              ? "/img/footer-content-wrapper-left-logo-14.png"
              : undefined
        }
        footerContentClassNameOverride={`${screenWidth < 900 && "class-10"}`}
        href="https://www.facebook.com/kleinfeldliga/"
        href1="https://www.youtube.com/@OEKFB"
        href2="https://www.instagram.com/oekfb/?hl=en"
        img={
          screenWidth < 900
            ? "/img/link-41.svg"
            : screenWidth >= 900
              ? "/img/link-57.svg"
              : undefined
        }
        link={
          screenWidth < 900
            ? "/img/link-40.svg"
            : screenWidth >= 900
              ? "/img/link-53.svg"
              : undefined
        }
        link1={
          screenWidth < 900
            ? "/img/link-42.svg"
            : screenWidth >= 900
              ? "/img/link-58.svg"
              : undefined
        }
        link2={
          screenWidth < 900
            ? "/img/link-43.svg"
            : screenWidth >= 900
              ? "/img/link-59.svg"
              : undefined
        }
      />
    </div>
  );
};
