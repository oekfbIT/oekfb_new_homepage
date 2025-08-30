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
          <Link className="mobile-menu-item" to="/liga">
            <div className="mobile-menu-item-2">Liga</div>
          </Link>

          <Link className="mobile-menu-item" to="/teams">
            <div className="mobile-menu-item-2">Teams</div>
          </Link>

          <Link className="mobile-menu-item" to="/tabelle">
            <div className="mobile-menu-item-2">Tabelle</div>
          </Link>

          <Link className="mobile-menu-item" to="/spielplan">
            <div className="mobile-menu-item-2">Spielplan</div>
          </Link>

          <Link className="mobile-menu-item" to="/livescore">
            <div className="mobile-menu-item-2">Livescore</div>
          </Link>

          <Link className="mobile-menu-item" to="/leaderboards">
            <div className="mobile-menu-item-2">Spielerstatistik</div>
          </Link>

          <Link className="mobile-menu-item" to="/sperren">
            <div className="mobile-menu-item-2">Sperren</div>
          </Link>

          <Link className="mobile-menu-item" to="/strafsenat">
            <div className="mobile-menu-item-2">Strafsenat</div>
          </Link>

          <Link className="mobile-menu-item" to="/transfers">
            <div className="mobile-menu-item-2">Transfers</div>
          </Link>


          <Link className="mobile-menu-item" to="/news">
            <div className="mobile-menu-item-2">News</div>
          </Link>

          <div className="mobile-menu-item">
            <div className="mobile-menu-item-2">Bund</div>
          </div>

          <Link className="mobile-menu-item-wrapper" to="/kontakt">
            <div className="mobile-menu-item-2">Kontakt</div>
          </Link>
        </div>

        <a
          className="mobile-menu-login"
          href="https://team.oekfb.eu"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="text-wrapper-24">Team Login</div>

          <img
            className="dfl-simple-icon-user"
            alt="Dfl simple icon user"
            src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fwhitelogin.svg?alt=media&token=fda570f5-1c8c-41a3-99d1-132c3d6e7331"
          />
        </a>
      </div>
    </div>
  );
};
