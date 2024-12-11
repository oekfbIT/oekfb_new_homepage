import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const ElementMobilenav = (): JSX.Element => {
  return (
    <div className="element-mobilenav">
      <div className="div-13">
        <div className="nav-row-wrapper-16">
          <div className="nav-row-wrapper-17">
            <div className="filler" />

            <img className="close" alt="Close" src="/img/close.svg" />
          </div>
        </div>

        <div className="mobile-menu-items">
          <div className="mobile-menu-item">
            <div className="mobile-menu-item-2">Startseite</div>
          </div>

          <Link className="mobile-menu-item" to="/03u46-clubs-desktop-1">
            <div className="mobile-menu-item-2">Clubs</div>
          </Link>

          <Link className="mobile-menu-item" to="/04u46-table-mobile">
            <div className="mobile-menu-item-2">Tabelle</div>
          </Link>

          <Link className="mobile-menu-item" to="/07u46-gameday-mobile">
            <div className="mobile-menu-item-2">Spielplan</div>
          </Link>

          <Link className="mobile-menu-item" to="/17u46-leaderboard-mobile">
            <div className="mobile-menu-item-2">Leaderboards</div>
          </Link>

          <Link className="mobile-menu-item" to="/05u46-news-mobile">
            <div className="mobile-menu-item-2">News</div>
          </Link>

          <div className="mobile-menu-item">
            <div className="mobile-menu-item-2">Bund</div>
          </div>

          <Link className="mobile-menu-item-wrapper" to="/08u46-contact-mobile">
            <div className="mobile-menu-item-2">Kontakt</div>
          </Link>
        </div>

        <a
          className="mobile-menu-login"
          href="team.oekfb.eu"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="text-wrapper-24">Team Login</div>

          <img
            className="dfl-simple-icon-user"
            alt="Dfl simple icon user"
            src="/img/dfl-simple-icon-user-loggedout-svg.svg"
          />
        </a>
      </div>
    </div>
  );
};
