// Navigation.jsx
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../network/ApiService";
import AuthService from "../../network/AuthService";
import { ElementMobilenav } from "../../screens/ElementMobilenav";
import "./style.css";

const EXCLUDED_CODES = ["NONE", "W2A"];
const MOBILE_MAX_WIDTH = 800;

const DEFAULT_BURGER_ICON =
  "https://cdn-icons-png.flaticon.com/512/5259/5259008.png";
const DEFAULT_CLOSE_ICON =
  "https://cdn-icons-png.flaticon.com/512/2961/2961937.png";

export const Navigation = ({
  className = "",
  logoSrc = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fnav-row-wrapper-content-logo-9.svg?alt=media&token=c6df6440-75af-4ee3-8f20-3b76ddab00d0",
  burgerIconSrc = DEFAULT_BURGER_ICON,
  closeIconSrc = DEFAULT_CLOSE_ICON,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_MAX_WIDTH);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);

  // drag state
  const [dragX, setDragX] = useState(0);       // how far panel is dragged (0..panelWidth)
  const dragStartXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const panelRef = useRef(null);

  const authService = new AuthService();
  const apiService = new ApiService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await apiService.get("client/leagueList?per=25");
        const filtered = Array.isArray(res)
          ? res.filter((l) => !EXCLUDED_CODES.includes(l.code))
          : [];
        setLeagues(filtered);
      } catch (e) {
        console.error("Failed to fetch leagues:", e);
        setLeagues([]);
      }
    };
    fetchLeagues();

    const saved = authService.getLeagueCode();
    if (saved) setActiveLeague(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ESC + body scroll lock
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setIsDrawerOpen(false);
    if (isDrawerOpen) {
      document.body.classList.add("u-no-scroll");
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.classList.remove("u-no-scroll");
      window.removeEventListener("keydown", onKeyDown);
      setDragX(0); // reset drag
    }
    return () => {
      document.body.classList.remove("u-no-scroll");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen]);

  const handleLeagueClick = (code, id) => {
    authService.setLeagueData(code, id);
    if (
      window.location.hash === "#/liga" ||
      window.location.href === "https://oekfb.eu/#/liga"
    ) {
      window.location.reload();
    } else {
      navigate("/liga");
    }
  };

  // ---- Drag handlers (touch only; optional to support mouse if you want) ----
  const onTouchStart = (e) => {
    if (!isDrawerOpen) return;
    const x = e.touches[0].clientX;
    dragStartXRef.current = x;
    lastXRef.current = x;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDrawerOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const x = e.touches[0].clientX;
    const dx = Math.max(0, dragStartXRef.current - x); // dragging left increases dx
    const panelWidth = panel.getBoundingClientRect().width;

    // update velocity estimate
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    velocityRef.current = (lastXRef.current - x) / dt; // px/ms, positive when moving left
    lastXRef.current = x;
    lastTimeRef.current = now;

    // clamp to panel width
    setDragX(Math.min(dx, panelWidth));
  };

  const onTouchEnd = () => {
    if (!isDrawerOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const panelWidth = panel.getBoundingClientRect().width;
    const progress = dragX / panelWidth;
    const speed = velocityRef.current; // px/ms

    // Close if dragged over 35% OR quick swipe (speed > 0.6 px/ms ~ 600px/s)
    if (progress > 0.35 || speed > 0.6) {
      setIsDrawerOpen(false);
    } else {
      // snap back
      setDragX(0);
    }
  };

  // Translate value for panel while dragging (base open pos is 0, translate right by dragX)
  const panelTransform = isDrawerOpen
    ? `translateX(${dragX}px)`
    : `translateX(100%)`;

  return (
    <header className={`nav ${className}`}>
      {/* ===== League Strip ===== */}
      <div className="nav__leagues">
        <div className="nav__leagues-track u-scrollbar-hidden">
          {leagues.map((l) => (
            <LeaguePill
              key={l.id}
              code={l.code}
              id={l.id}
              text={l.code}
              isActive={l.code === activeLeague}
              onClick={handleLeagueClick}
            />
          ))}
        </div>
      </div>

      {/* ===== Main Bar ===== */}
      <div className="nav__bar">
        <div className="nav__bar-inner">
          <Link to="/" className="nav__brand" aria-label="Startseite">
            <img className="nav__brand-logo" src={logoSrc} alt="Logo" />
          </Link>

          {isMobile ? (
            <button
              type="button"
              className="nav__burger"
              aria-label="Menü öffnen"
              onClick={() => setIsDrawerOpen(true)}
            >
              <img className="nav__burger-icon" src={burgerIconSrc} alt="" />
            </button>
          ) : (
            <button
              type="button"
              className="nav__login"
              aria-label="Team Login"
              onClick={() => (window.location.href = "https://team.oekfb.eu")}
            >
              <span className="nav__login-label">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* ===== Drawer ===== */}
      <div className={`drawer ${isDrawerOpen ? "drawer--open" : ""}`} aria-hidden={!isDrawerOpen}>
        <div className="drawer__backdrop" onClick={() => setIsDrawerOpen(false)} />
        <aside
          ref={panelRef}
          className="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          style={{ transform: panelTransform }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="drawer__close"
            aria-label="Schließen"
            onClick={() => setIsDrawerOpen(false)}
            // Use mask to render icon as solid white
            data-icon={closeIconSrc}
          />
          <ElementMobilenav />
        </aside>
      </div>
    </header>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  burgerIconSrc: PropTypes.string,
  closeIconSrc: PropTypes.string,
};

// Reusable league pill
const LeaguePill = ({ text, isActive, code, id, onClick }) => (
  <Link
    to="/liga"
    onClick={() => onClick(code, id)}
    reloadDocument
    className={`league ${isActive ? "league--active" : ""}`}
    aria-label={`Liga ${text}`}
  >
    <span className="league__code">{text}</span>
  </Link>
);
