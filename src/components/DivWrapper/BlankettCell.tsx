import React from "react";
import "./style.css";

interface Props {
  className: any;
  frameClassName: any;
  teamDetailSquadClassName: any;
  frameClassNameOverride: any;
  flagiconClassName: any;
  flagiconClassNameOverride: any;
  playerName: any;
  playerImage: any;
  playerNumber: any;
}

// Helper function to capitalize the first letter of a string
const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const splitName = (fullName: string | undefined) => {
  if (!fullName) return { firstName: "Unknown", lastName: "" };

  const [rawFirstName = "Unknown", ...lastNameParts] = fullName.trim().split(" ");
  const firstName = capitalize(rawFirstName);
  const lastName = lastNameParts.map(capitalize).join(" ");
  return { firstName, lastName };
};

export const BlankettCell = ({
                                 className,
                                 frameClassName,
                                 teamDetailSquadClassName,
                                 frameClassNameOverride,
                                 flagiconClassName,
                                 flagiconClassNameOverride,
                                 playerImage,
                                 playerName,
                                 playerNumber,
                             }: Props): JSX.Element => {
    const { firstName, lastName } = splitName(playerName);

    return (
        <div className={`div-wrapper ${className}`}>
            <div className="team-detail-squad-4">
                <div className="team-detail-squad-5">
                    <div className={`frame-3 ${frameClassName}`}>
                        {/* Conditional rendering of the placeholder or the player image */}
                        {playerImage ? (
                            <img className={"image-wrapper"} src={playerImage}/>
                        ) : (
                            <div
                                className={`team-detail-squad-6 ${teamDetailSquadClassName}`}
                            />
                        )}

                        <div className="team-detail-squad-7">
                            <div className="team-detail-squad-8">
                                <div className="team-detail-squad-9">{firstName}</div>
                                <div className="team-detail-squad-10">{lastName}</div>
                            </div>
                        </div>
                    </div>

                    <div className={`frame-4 ${frameClassNameOverride}`}>
                        <div className="nationality-flags-wrapper">
                            {/* Other components */}
                        </div>
                        <div className="team-detail-squad-7">
                            <div className="team-detail-squad-11">{playerNumber}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
