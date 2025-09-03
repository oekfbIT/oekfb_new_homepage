import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className?: string;
  icnArrowRight?: string;
  img?: string;
  data: {
    origin_name: string;
    player_name: string;
    origin_image: string;
    player_image: string;
    team_name: string;
    team_image: string;
  };
}

/**
 * TransferCard
 * - Shows a player and a transfer from origin club → destination club.
 * - Uses a responsive modifier: --desktop / --mobile (via `property1`).
 * - Left: player avatar + name (clickable to player detail)
 * - Middle: origin club (clickable)
 * - Arrow: small arrow icon (asset depends on viewport)
 * - Right: destination club (static block)
 */
export const PropertyDesktopWrapper = ({
  property1,
  className = "",
  icnArrowRight = "/img/icn-arrow-right-15.svg", // mobile asset
  img = "/img/icn-arrow-right-14.svg",          // desktop asset
  data,
}: Props): JSX.Element => {
  const [firstName = "", lastName = ""] = data.player_name?.split(" ") ?? ["", ""];

  return (
    <div className={`transfer-card transfer-card--${property1} ${className}`}>
      {/* Player column */}
      <Link className="transfer-card__player" to="/14u46-player-detail-mobile">
        <div className="transfer-card__player-avatar">
          <img
            src={data.player_image}
            alt={data.player_name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <p className="transfer-card__player-name">
          <span className="h3 transfer-card__player-first">{firstName}</span>
          <span className="h3"> {lastName}</span>
        </p>
      </Link>

      {/* Transfer body: origin → arrow → destination */}
      <div className="transfer-card__body">
        {/* Origin club */}
        <Link className="transfer-card__club" to="/13u46-team-detail-mobile">
          <div className="transfer-card__club-logo">
            <div className="transfer-card__club-logo-img">
              <img
                src={data.origin_image}
                alt={`${data.origin_name} logo`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="transfer-card__club-name-wrap">
            <div className="h3">{data.origin_name}</div>
          </div>
        </Link>

        {/* Direction arrow */}
        <img
          className="transfer-card__arrow"
          alt="Transfer arrow"
          src={property1 === "mobile" ? icnArrowRight : img}
        />

        {/* Destination club */}
        <div className="transfer-card__club">
          <div className="transfer-card__club-logo">
            <div className="transfer-card__club-logo-img">
              <img
                src={data.team_image}
                alt={`${data.team_name} logo`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="transfer-card__club-name-wrap">
            <div className="h3">{data.team_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyDesktopWrapper.propTypes = {
  property1: PropTypes.oneOf(["desktop", "mobile"]),
  icnArrowRight: PropTypes.string,
  img: PropTypes.string,
  data: PropTypes.shape({
    origin_name: PropTypes.string.isRequired,
    player_name: PropTypes.string.isRequired,
    origin_image: PropTypes.string.isRequired,
    player_image: PropTypes.string.isRequired,
    team_name: PropTypes.string.isRequired,
    team_image: PropTypes.string.isRequired,
  }).isRequired,
};
