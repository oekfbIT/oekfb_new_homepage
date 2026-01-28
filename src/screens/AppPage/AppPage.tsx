import { useMemo } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { Sponsors } from "../../components/Sponsors";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";

/**
 * Static hero assets (Firebase)
 */
const HERO_BG =
  "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2FappFiles%2FBACKGROUND.jpg?alt=media&token=ae78230d-5abc-41d6-bfeb-50939a944e6f";

const HERO_HAND =
  "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2FappFiles%2Fhandmockup.png?alt=media&token=3c9341ba-e6cc-4fbc-ae56-cac2bcdd66a1";

type StoreCta = {
  kind: "ios" | "android";
  label: string;
  href?: string;
  disabled?: boolean;
  helperText?: string;
};

export const AppPage = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const STORE_BADGE_IOS =
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"; // replace with your Apple badge/icon image URL

  const STORE_BADGE_ANDROID =
    "https://cdn.freebiesupply.com/logos/large/2x/google-play-store-logo-png-transparent.png"; // replace with your Google Play badge/icon image URL

  /**
   * Single source of truth for store CTAs
   */
  const storeCtas = useMemo<StoreCta[]>(
    () => [
      {
        kind: "ios",
        label: "APP STORE ",
        href: "https://apps.apple.com/us/app/%C3%B6kfb/id6756211638",
      },
      {
        kind: "android",
        label: "GOOGLE PLAY",
        disabled: true,
        helperText: "Coming soon",
      },
    ],
    [],
  );

  /**
   * Shared renderer → guarantees identical buttons everywhere
   */
  const renderStoreButtons = () => (
    <div className="appHero__stores" role="group" aria-label="App Stores">
      {storeCtas.map((cta) => {
        const iconSrc =
          cta.kind === "ios" ? STORE_BADGE_IOS : STORE_BADGE_ANDROID;

        const icon = (
          <img
            className="appHero__storeBadge"
            src={iconSrc}
            alt=""
            aria-hidden="true"
          />
        );

        if (cta.disabled) {
          return (
            <button
              key={cta.kind}
              className="appHero__storeBtn appHero__storeBtn--disabled"
              type="button"
              disabled
              aria-disabled="true"
              title={cta.helperText ?? "Coming soon"}
            >
              <span className="appHero__storeBtnInner">
                {icon}
                <span className="appHero__storeBtnText">{cta.label}</span>
                {cta.helperText && (
                  <span className="appHero__storeBtnPill">
                    {cta.helperText}
                  </span>
                )}
              </span>
            </button>
          );
        }

        return (
          <a
            key={cta.kind}
            className="appHero__storeBtn"
            href={cta.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="appHero__storeBtnInner">
              {icon}
              <span className="appHero__storeBtnText">{cta.label}</span>
            </span>
          </a>
        );
      })}
    </div>
  );

  return (
    <div className="element-app-page">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="page-content">
        {/* =========================
            App Info / Download Section
           ========================= */}
        <section className="appInfo">
          <div className="appInfo__inner">
            <div className="appInfo__content">
              <h2 className="appInfo__title">HOL DIR DIE APP!</h2>

              <h3 className="appInfo__subtitle">
                IMMER LIVE DABEI – EGAL, WO DU BIST!
              </h3>

              <p className="appInfo__text">
                Mit der kostenlosen App bist du ganz nah dran am Geschehen.
                <br />
                <br />
                • Liveticker, Pushes und Statistiken
                <br />
                • Teamverwaltung und Officebereich
                <br />• News, Spielpläne und Tabellen
              </p>

              {/* EXACT SAME BUTTONS AS HERO */}
              {renderStoreButtons()}
            </div>

            <div className="appInfo__imageWrap">
              <img
                className="appInfo__image"
                src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2FappFiles%2FMain.png?alt=media&token=bf62ce25-4ff8-403f-918b-b2160cc8f46c"
                alt="ÖKFB App Screenshots"
              />
            </div>
          </div>
        </section>

        <Sponsors className="sponsors" vWhite="/img/v-white-1-3.svg" />

        {/* =========================
            Hero Section
           ========================= */}
        <section className="appHeroBox" aria-label="ÖKFB App Highlights">
          <div
            className="appHero"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          >
            <div className="appHero__overlay" />

            <div className="appHero__top">
              <h1 className="appHero__title">
                DEINE HIGHLIGHTS -<br />
                KOSTENLOS!
              </h1>

              <p className="appHero__subtitle">
                Deine Highlights der Spiele, alle Tore, Spielpläne,
                Transfermarkt und vieles mehr direkt aus der App.
              </p>

              {renderStoreButtons()}
            </div>

            <div className="appHero__bottom" aria-hidden="true">
              <img className="appHero__hand" src={HERO_HAND} alt="" />
            </div>
          </div>
        </section>

        {/* =========================
    Feature Split (2 phones + left/right text)
   ========================= */}
        <section className="appFeatureSplit" aria-label="App Features">
          <div className="appFeatureSplit__inner">
            {/* Left feature */}
            <div className="appFeatureSplit__side appFeatureSplit__side--left">
              <h2 className="appFeatureSplit__title">
                THE AKTUELLE NEWS IMMER
                <br />
                IN DEINER HAND.
              </h2>
              <p className="appFeatureSplit__text">
                {/* replace later */}
                Bei jedem Spiel und jeder Liga bist du immer up to date – News,
                Updates und Infos direkt in der App.
              </p>
            </div>

            {/* Middle phones */}
            <div className="appFeatureSplit__phones" aria-hidden="true">
              <img
                className="appFeatureSplit__phone appFeatureSplit__phone--left"
                src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2FappFiles%2Fnews.png?alt=media&token=c08f2a7b-91cd-43f4-ad93-6882ab775ced"
                alt=""
              />
              <img
                className="appFeatureSplit__phone appFeatureSplit__phone--right"
                src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2FappFiles%2Fregsiter.png?alt=media&token=209921cf-6639-421e-8784-93a3e46be0c9"
                alt=""
              />
            </div>

            {/* Right feature */}
            <div className="appFeatureSplit__side appFeatureSplit__side--right">
              <h2 className="appFeatureSplit__title">
                NEUE SPIELER
                <br />
                SCHNELLER REGISTRIEREN.
              </h2>
              <p className="appFeatureSplit__text">
                {/* replace later */}
                Spieler anlegen, verwalten und Daten eintragen – einfacher und
                schneller direkt über die App.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};
