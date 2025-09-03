// TeamHeader.jsx — JS version, no TS syntax
import "./style.css";

export const TeamHeader = ({
  team,
  className = "",
  teamDetailClassName = "",
  teamDetailClassNameOverride = "",
}) => {
  if (!team) return null;

  const { team_name, logo, trikot = {} } = team;

  return (
    <div className={`team-header ${className}`}>
      <div className={`team-detail ${teamDetailClassName}`}>
        {/* Top banner / hero */}
        <div className="team-detail-header">
          <div className="team-detail-header-wrapper">
            <div className="team-detail-header-2">
              {/* Club logo */}
              <img
                className="image-2 club-logo"
                alt={`${team_name ?? "Team"} Logo`}
                src={logo}
              />

              {/* Name, meta, and kits */}
              <div className="team-detail-header-3">
                {/* Text block */}
                <div className="team-detail-text">
                  <div className="title white">{team_name?.toUpperCase()}</div>

                  <div className="h3 white">
                    Mitglied Seit:{" "}
                    {team.membership_since?.toUpperCase() || "SAISON 2024/2025"}
                  </div>
                </div>

                {/* Kits */}
                <div className="team-detail-header-4">
                  {trikot.home && (
                    <img
                      className="team-detail-header-5"
                      alt="Heimtrikot"
                      src={trikot.home}
                    />
                  )}
                  {trikot.away && (
                    <img
                      className="team-detail-header-5"
                      alt="Auswärtstrikot"
                      src={trikot.away}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab row – kept commented (legacy) */}
        {/*
        <div className="team-detail-wrapper">
          <div className="team-detail-2">
            <div className="team-detail-scroll u-scrollbar-hidden">
              <div className="team-detail-3">SQUAD</div>
              <div className="team-detail-4">TABLE</div>
              <div className="team-detail-4">FIXTURES &amp; RESULTS</div>
              <div className="team-detail-4">STATS</div>
              <div className={`team-detail-4 ${teamDetailClassNameOverride}`}>NEWS &amp; VIDEOS</div>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};
