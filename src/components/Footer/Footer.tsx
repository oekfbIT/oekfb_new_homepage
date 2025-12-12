// Footer.tsx
// -------------------------------------------------------------
// Structured footer with logo, nav links, sponsors, and socials
// Layout unchanged, just renamed classes + polished styling
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import "./style.css";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* === Left: Logo + Nav === */}
        <div className="footer__section">
          <img
            className="footer__logo"
            alt="ÖKFB Logo"
            loading="lazy"
            src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ffooterlogo.png?alt=media&token=a7353143-33df-4a6b-9f82-db7bcbd8bb0b"
          />

          <div className="footer__links">
            <div className="footer__linksCol">
            <span className="h3 footer__title">Navigation</span>
              <Link to="/bund">Der Bund</Link>
              <Link to="/news">News</Link>
              <Link to="/kontakt">Kontakt</Link>
              <Link to="/impressum">Impressum</Link>
              <Link to="/privacy">Datenschutz</Link>
              <Link to="/transfers">Transfer Liste</Link>
              <Link to="/strafsenat">Strafsenat</Link>
            </div>

            <div className="footer__linksCol">
              <span className="h3 blank footer__title">0</span>
              <Link to="/ligaordnung">Ligaordnung</Link>
              <Link to="/spielregeln">Spielregeln</Link>
              <a href="https://team.oekfb.eu" target="_blank" rel="noopener noreferrer">
                Team Login
              </a>
              <a href="https://ref.oekfb.eu" target="_blank" rel="noopener noreferrer">
                Schiedsrichter Login
              </a>
              <Link to="/register">Team Neuanmeldungen</Link>
            </div>
          </div>
        </div>

        {/* === Right: Sponsors + Socials === */}
        <div className="footer__section">
          <div className="footer__sponsors">
            <span className="h3 footer__title">Sponsored By</span>
            <div className="footer__sponsorList">
              <a href="https://radosport.at/" target="_blank" rel="noopener noreferrer">
                <div className="footer__sponsor footer__sponsor--radosport" />
              </a>
              <a href="https://erima.shop/oekfb" target="_blank" rel="noopener noreferrer">
                <div className="footer__sponsor footer__sponsor--erima" />
              </a>
              <a href="https://at.coca-colahellenic.com/de" target="_blank" rel="noopener noreferrer">
                <div className="footer__sponsor footer__sponsor--cocacola" />
              </a>
              <a href="https://aircash.eu/de/" target="_blank" rel="noopener noreferrer">
                <div className="footer__sponsor footer__sponsor--aircash" />
              </a>
            </div>
          </div>

          <div className="footer__socials">
            <a href="https://www.facebook.com/kleinfeldliga/" target="_blank" rel="noopener noreferrer">
              <img src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Ffb.svg?alt=media&token=3d87d1eb-ea05-4343-ab47-1716f82d5bbc" alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/@OEKFB" target="_blank" rel="noopener noreferrer">
              <img src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Fyt.svg?alt=media&token=fb8143da-2498-44d0-bc1e-743d44c112c1" alt="YouTube" />
            </a>
            <a href="https://www.instagram.com/oekfb/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Fig.svg?alt=media&token=a4af766c-5a4f-473a-b7ec-cb5f8f06c028" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
