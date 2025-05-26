import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  team: {
    id: string;
    logo: string;
    team_name: string;
  };
  imgContainerClassName?: string;
}

export const ClubCell = ({ team, imgContainerClassName = "" }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team-detail/${team.id}`);
  };

  return (
    <div className="club-cell" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        className={`club-cell-logo ${imgContainerClassName}`}
        alt={team.team_name}
        src={team.logo}
      />
      <div className="club-cell-name">{team.team_name}</div>
    </div>
  );
};

ClubCell.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    team_name: PropTypes.string.isRequired,
  }).isRequired,
  imgContainerClassName: PropTypes.string,
};
