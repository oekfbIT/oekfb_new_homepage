import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface Props {
    team: {
        id: string; // Add id to the team object
        logo: string;
        team_name: string;
    };
    imgContainerClassName?: string; // Optional for styling
}

export const ClubCell = ({ team, imgContainerClassName = "" }: Props): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/team-detail/${team.id}`); // Navigate to team detail page
    };

    return (
        <div className="club-cell" onClick={handleClick} style={{ cursor: "pointer" }}>
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
        id: PropTypes.string.isRequired, // Add id as a required prop
        logo: PropTypes.string.isRequired,
        team_name: PropTypes.string.isRequired,
    }).isRequired,
    imgContainerClassName: PropTypes.string,
};
