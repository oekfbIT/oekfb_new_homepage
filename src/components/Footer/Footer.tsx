import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

/**
 * Footer Component
 *
 * This component renders a structured footer with links, logos, and optional sponsor details.
 */
export const Footer = (): JSX.Element => {
  return (
      <div className="footer">
        {/* Left Section: Footer Content */}
        <div className="footer-content">
          <div className="footer-content-2">
            {/* Section: Logo and Links */}
            <div className="footer-content-3">
              {/* Logo */}
              <img
                  className="footer-content-4"
                  alt="Footer Logo"
                  src="/img/footer-content-wrapper-left-logo-7.png"
              />

              {/* Navigation Links */}
              <div className="frame">
                {/* Column 1 */}
                <div className="footer-content-5">
                  <Link className="mobile-menu-item" to="/liga">
                    <FooterItem label="Der Bund" />
                  </Link>

                  <Link className="mobile-menu-item" to="/news">
                    <FooterItem label="News" />
                  </Link>

                  <Link className="mobile-menu-item" to="/kontakt">
                    <FooterItem label="Kontakt" />
                  </Link>

                  <Link className="mobile-menu-item" to="/impressum">
                    <FooterItem label="Impressum" />
                  </Link>

                  <Link className="mobile-menu-item" to="/privacy">
                    <FooterItem label="Datenschutz" />
                  </Link>

                </div>

                {/* Column 2 */}
                <div className="footer-content-5">
                  <Link className="mobile-menu-item" to="/ligaordnung">
                    <FooterItem label="Ligaordnung" />
                  </Link>

                  <Link className="mobile-menu-item" to="/spielregeln">
                    <FooterItem label="Spielregeln" />
                  </Link>

                  <FooterLink
                      href="https://team.oekfb.eu"
                      label="Spieler Login"
                      className="text-wrapper-5"
                  />
                  <FooterLink
                      href="https://ref.oekfb.eu"
                      label="Schiedsrichter Login"
                      className="text-wrapper-6"
                  />
                  <Link className="item" to="/register">
                    <div className="link-3">
                      <div className="text-wrapper-7">Team Registrierung</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sponsors and Social Links */}
            <div className="footer-content-3">
              {/* Sponsors Section */}
              <div className="sponsors-2">
                <div className="title">Sponsored By</div>
                <div className="list">
                  <a href="https://kaddur.at/" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
                    <SponsorLogo imgClass="logo-2"/>
                  </a>
                  <a href="https://at.coca-colahellenic.com/de" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
                    <SponsorLogo imgClass="logo-3"/>
                  </a>
                  <a href="https://aircash.eu/de/" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
                    <SponsorLogo imgClass="logo-4"/>
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bundesliga-footer">
                <SocialLink
                    href="https://www.facebook.com/kleinfeldliga/"
                    src="/img/link-32.svg"
                />
                <SocialLink
                    href="https://www.youtube.com/@OEKFB"
                    src="/img/link-33.svg"
                />
                <img className="link-5" alt="Link" src="/img/link-34.svg" />
                <SocialLink
                    href="https://www.instagram.com/oekfb/?hl=en"
                    src="/img/link-35.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

/**
 * FooterItem Component - A reusable navigation link placeholder.
 */
const FooterItem = ({ label }) => (
    <div className="item">
      <div className="link-2">
        <div className="text-wrapper-3">{label}</div>
      </div>
    </div>
);

/**
 * FooterLink Component - Renders an anchor link.
 */
const FooterLink = ({ href, label, className }) => (
    <a href={href} className="item" target="_blank" rel="noopener noreferrer">
      <div className="link-2">
        <div className={className}>{label}</div>
      </div>
    </a>
);

/**
 * SponsorLogo Component - Renders sponsor logos.
 */
const SponsorLogo = ({ imgClass }) => (
    <div className="item-2">
      <div className="logo-wrapper">
        <div className="logo">
          <div className={imgClass} />
        </div>
      </div>
    </div>
);

/**
 * SocialLink Component - Renders social media icons as links.
 */
const SocialLink = ({ href, src }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img className="link-4" alt="Social Link" src={src} />
    </a>
);

Footer.propTypes = {
  footerContent: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  href: PropTypes.string,
  href1: PropTypes.string,
  href2: PropTypes.string,
};
