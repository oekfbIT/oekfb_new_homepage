import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

/**
 * Footer Component
 * new
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
                  src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ffooterlogo.png?alt=media&token=a7353143-33df-4a6b-9f82-db7bcbd8bb0b"
              />

              {/* Navigation Links */}
              <div className="frame">
                {/* Column 1 */}
                <div className="footer-content-5">
                  <Link className="mobile-menu-item" to="/bund">
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

                  <Link className="mobile-menu-item" to="/transfers">
                    <FooterItem label="Transfer Liste" />
                  </Link>

                  <Link className="mobile-menu-item" to="/strafsenat">
                    <FooterItem label="Strafsenat" />
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
                      label="Team Login"
                      className="text-wrapper-5"
                  />
                  <FooterLink
                      href="https://ref.oekfb.eu"
                      label="Schiedsrichter Login"
                      className="text-wrapper-6"
                  />
                  <Link className="item" to="/register">
                    <div className="link-3">
                      <div className="text-wrapper-7">Team Neuanmeldungen</div>
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
                  <a href="https://www.erima.at/" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
                    <SponsorLogo imgClass="logo-5"/>
                  </a>
                  <a href="https://radosport.at/" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
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
                    src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Ffb.svg?alt=media&token=3d87d1eb-ea05-4343-ab47-1716f82d5bbc"
                />
                <SocialLink
                    href="https://www.youtube.com/@OEKFB"
                    src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Fyt.svg?alt=media&token=fb8143da-2498-44d0-bc1e-743d44c112c1"
                />
                <SocialLink
                    href="https://www.instagram.com/oekfb/?hl=en"
                    src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Flinks%2Fig.svg?alt=media&token=a4af766c-5a4f-473a-b7ec-cb5f8f06c028"
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
