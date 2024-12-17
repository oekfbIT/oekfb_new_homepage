import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
    team: {
        logo: string;
        team_name: string;
    };
    imgContainerClassName?: string; // Optional for styling
}

export const ClubCell = ({ team, imgContainerClassName = "" }: Props): JSX.Element => {
    return (
        <div className="club-cell">
            <img
                className={`img-container ${imgContainerClassName}`}
                alt={team.team_name}
                src={team.logo}
            />
            <div className="text-container">
                <div className="club-cell-name">{team.team_name}</div>
            </div>
        </div>
    );
};

ClubCell.propTypes = {
    team: PropTypes.shape({
        logo: PropTypes.string.isRequired,
        team_name: PropTypes.string.isRequired,
    }).isRequired,
};
