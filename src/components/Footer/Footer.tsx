/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  className: any;
  footerContentClassName: any;
  footerContent: string;
  footerContentClassNameOverride: any;
  link: string;
  img: string;
  link1: string;
  link2: string;
  href: string;
  href1: string;
  href2: string;
}

export const Footer = ({
  className,
  footerContentClassName,
  footerContent = "/img/footer-content-wrapper-left-logo-7.png",
  footerContentClassNameOverride,
  link = "/img/link-28.svg",
  img = "/img/link-29.svg",
  link1 = "/img/link-30.svg",
  link2 = "/img/link-31.svg",
  href,
  href1,
  href2,
}: Props): JSX.Element => {
  return (
    <div className={`footer ${className}`}>
      <div className={`footer-content ${footerContentClassName}`}>
        <div className="footer-content-2">
          <div className="footer-content-3">
            <img
              className="footer-content-4"
              alt="Footer content"
              src={footerContent}
            />

            <div className="frame">
              <div className="footer-content-5">
                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">Der Bund</div>
                  </div>
                </div>

                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">News</div>
                  </div>
                </div>

                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">Kontakt</div>
                  </div>
                </div>

                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">Impressum</div>
                  </div>
                </div>

                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-4">Datenschutz</div>
                  </div>
                </div>
              </div>

              <div className="footer-content-5">
                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">Ligaordnung</div>
                  </div>
                </div>

                <div className="item">
                  <div className="link-2">
                    <div className="text-wrapper-3">Spielregeln</div>
                  </div>
                </div>

                <a
                  className="item"
                  href="team.oekfb.eu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="link-2">
                    <div className="text-wrapper-5">Spieler Login</div>
                  </div>
                </a>

                <a
                  className="item"
                  href="ref.oekfb.eu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="link-2">
                    <div className="text-wrapper-6">Schiedsrichter Login</div>
                  </div>
                </a>

                <Link className="item" to="/12u465-register-desktop">
                  <div className="link-3">
                    <div className="text-wrapper-7">Team Registrierung</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={`footer-content-3 ${footerContentClassNameOverride}`}>
            <div className="sponsors-2">
              <div className="title">Sponsored By</div>

              <div className="list">
                <div className="item-2">
                  <div className="logo-wrapper">
                    <div className="logo">
                      <div className="logo-2" />
                    </div>
                  </div>
                </div>

                <div className="item-2">
                  <div className="logo-wrapper">
                    <div className="logo">
                      <div className="logo-3" />
                    </div>
                  </div>
                </div>

                <div className="item-2">
                  <div className="logo-wrapper">
                    <div className="logo">
                      <div className="logo-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bundesliga-footer">
              <a href={href} rel="noopener noreferrer" target="_blank">
                <img className="link-4" alt="Link" src={link} />
              </a>

              <a href={href1} rel="noopener noreferrer" target="_blank">
                <img className="link-4" alt="Link" src={img} />
              </a>

              <img className="link-5" alt="Link" src={link1} />

              <a href={href2} rel="noopener noreferrer" target="_blank">
                <img className="link-4" alt="Link" src={link2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
