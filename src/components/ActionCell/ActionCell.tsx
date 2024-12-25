import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  className?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkTo: string;
}

export const ActionCell = ({
                             className = "",
                             title,
                             subtitle,
                             imageUrl,
                             linkTo = "#",
                           }: Props): JSX.Element => {
  return (
      <Link className={`action-cell ${className}`} to={linkTo}>
        <img className="image-wrapper-2" src={imageUrl} alt={title} />

        <div className="textwrapper">
          <div className="title-4">{title}</div>

          <p className="subtitle-4">{subtitle}</p>
        </div>
      </Link>
  );
};

ActionCell.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};
