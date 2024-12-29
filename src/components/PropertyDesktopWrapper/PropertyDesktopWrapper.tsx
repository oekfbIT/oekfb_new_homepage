import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  property1: "desktop" | "mobile";
  className: any;
  icnArrowRight: string;
  img: string;
  data: {
    origin_name: string;
    player_name: string;
    origin_image: string;
    player_image: string;
    team_name: string;
    team_image: string;
  };
}

export const PropertyDesktopWrapper = ({
                                         property1,
                                         className,
                                         icnArrowRight = "/img/icn-arrow-right-15.svg",
                                         img = "/img/icn-arrow-right-14.svg",
                                         data,
                                       }: Props): JSX.Element => {
  return (
      <div
          className={`property-desktop-wrapper property-1-2-${property1} ${className}`}
      >
        <Link className="left-container-4" to="/14u46-player-detail-mobile">
          <div className="image-7">
            <img style={{width: "100%", height: "100%", objectFit: "contain"}}
                src={data.player_image} alt={`${data.player_name}`} />
          </div>

          <p className="name-4">
            <span className="text-wrapper-13">{data.player_name.split(" ")[0]}</span>
            <span className="text-wrapper-14"> {data.player_name.split(" ")[1]}</span>
          </p>
        </Link>

        <div className="transfer-details">
          <Link className="div-4" to="/13u46-team-detail-mobile">
            <div className="team-logo-2">
              <div className="image-8">
                <img style={{width: "100%", height: "100%", objectFit: "contain"}}
                     src={data.origin_image} alt={`${data.origin_name} logo`} />
              </div>
            </div>

            <div className="team-name-wrapper">
              <div className="team-name-3">{data.origin_name}</div>
            </div>
          </Link>

          <img
              className="icn-arrow-right"
              alt="Icn arrow right"
              src={property1 === "mobile" ? icnArrowRight : img}
          />

          <div className="div-4">
            <div className="team-logo-2">
              <div className="image-9">
                <img style={{width: "100%", height: "100%", objectFit: "contain"}}
                     src={data.team_image} alt={`${data.team_name} logo`} />
              </div>
            </div>

            <div className="team-name-wrapper">
              <div className="team-name-3">{data.team_name}</div>
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
