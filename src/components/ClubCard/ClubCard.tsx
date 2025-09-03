// ClubCard.tsx
// -------------------------------------------------------------
// Small clickable card for a club/team.
// - Uses BEM-ish class names
// - Token-driven styles (colors, spacing, radius, shadows)
// - Keyboard accessible (enter/space)
// -------------------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

type Club = {
  id: string;
  logo: string;
  team_name: string;
  sid: string;
};

type ClubCardProps = {
  className?: string;
  club: Club;
};

export const ClubCard = ({ className = "", club }: ClubCardProps): JSX.Element => {
  const navigate = useNavigate();

  const goToTeam = () => navigate(`/team-detail/${club.id}`);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToTeam();
    }
  };

  return (
    <div
      className={`card ${className}`}
      role="button"
      tabIndex={0}
      onClick={goToTeam}
      onKeyDown={onKeyDown}
      aria-label={`Open ${club.team_name}`}
    >
      <div className="card__inner">
        <div className="card__logo">
          {/* Use object-fit: contain so all crests render nicely */}
          <img src={club.logo} alt="" aria-hidden="true" />
        </div>

        <div className="card__meta">
          <h3 className="card__title">{club.team_name}</h3>
          <p className="card__sub">ID: {club.sid}</p>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
