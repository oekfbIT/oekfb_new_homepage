import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface Team {
  id?: string;
  name?: string;
  logo?: string;
}

type ISODate = string | { $date: string };

interface Matchup {
  id?: string;
  home_blanket?: Team;
  away_blanket?: Team;
  first_half_date: ISODate;
  second_half_date: ISODate;
  status?: string;
  details?: {
    location?: string;
    date?: ISODate;
    gameday?: number;
  };
  score?: {
    home?: number;
    away?: number;
  };
}

interface Props {
  matchup?: Matchup;
  state: "fixture-w-top" | "fixture-no-top" | "live-top" | "live-w-top";
  className?: string;
}

const fallbackLogo = "/img/fallback-logo.png";

const normalizeDate = (value?: ISODate): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "$date" in value) return value["$date"];
  return null;
};

const formatMatchDate = (dateValue: ISODate) => {
  const dateStr = normalizeDate(dateValue)?.replace(/Z$/, "");
  const date = new Date(dateStr || "");
  if (isNaN(date.getTime())) return "Ungültiges Datum";

  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Vienna",
    day: "2-digit",
    month: "2-digit",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;

  return `${day}.${month}.`;
};

const formatMatchTime = (dateValue: ISODate) => {
  const dateStr = normalizeDate(dateValue)?.replace(/Z$/, "");
  const date = new Date(dateStr || "");
  if (isNaN(date.getTime())) return "Ungültiges Datum";

  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Vienna",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;

  return `${hour}:${minute}`;
};

const getViennaNow = (): Date => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Vienna",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(new Date())
    .reduce((acc: Record<string, string>, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  return new Date(
    Date.UTC(
      parseInt(parts.year),
      parseInt(parts.month) - 1,
      parseInt(parts.day),
      parseInt(parts.hour),
      parseInt(parts.minute),
      parseInt(parts.second)
    )
  );
};

const getElapsedTime = (
  startTime: ISODate | undefined,
  label: string,
  offsetMinutes = 0
): string => {
  const startDateStr = normalizeDate(startTime);
  if (!startDateStr) return "0'";

  const start = new Date(startDateStr).getTime();
  const now = getViennaNow().getTime();
  const diff = Math.floor((now - start) / 60000);
  const total = diff + offsetMinutes;

  console.log(`🕒 [${label}]`);
  console.log("Raw:", startTime);
  console.log("Normalized:", startDateStr);
  console.log("Start Date:", new Date(start).toISOString());
  console.log("Now Vienna:", new Date(now).toISOString());
  console.log("Elapsed:", diff, "min (+ offset:", offsetMinutes, ")");
  console.log("▶️ Total shown:", total);

  return !isNaN(total) && total >= 0 ? `${total}'` : "0'";
};

export const MatchupCell = ({
  matchup,
  state,
  className,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = React.useState("0'");

  const status = matchup?.status;
  const isLive = status === "first" || status === "second";
  const isHalftime = status === "halftime";
  const isPending = status === "pending";

  const firstHalfDate = matchup?.first_half_date;
  const secondHalfDate = matchup?.second_half_date;

  const halfStartTime =
    status === "second"
      ? secondHalfDate
      : status === "first"
      ? firstHalfDate
      : null;

  React.useEffect(() => {
    if (!isLive || !halfStartTime) return;

    const update = () => {
      const offset = status === "second" ? 25 : 0;
      const time = getElapsedTime(halfStartTime, status || "", offset);
      setElapsedTime(time);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [halfStartTime, isLive, status]);

  const formattedDate = matchup?.details?.date
    ? `${formatMatchDate(matchup.details.date)} - ${formatMatchTime(
        matchup.details.date
      )}`
    : "Datum nicht Zugewiesen";

  const backgroundColorClass = isPending
    ? "state-gray"
    : ["first", "second", "halftime"].includes(status || "")
    ? "state-red"
    : "";

  const matchStatusText = isPending
    ? "Vorschau"
    : isHalftime
    ? "HALBZEIT"
    : isLive && halfStartTime && parseInt(elapsedTime) > 0
    ? `LIVE - ${status === "first" ? "1." : "2."} HB: ${elapsedTime}`
    : formattedDate;

  return (
    <div className={`matchup-cell ${className || ""}`}>
      <div className="matchup-cell-top">
        <div className={`line ${state}`} />
        {["fixture-w-top", "live-w-top"].includes(state) && (
          <div className="txt-overlay">
            <div className="date-txt">{formattedDate}</div>
          </div>
        )}
      </div>

      <div className="matchup-cell-bottom">
        <div className="matchup-cell-bottom-2">
          <div className="link-9">
            <div className="matchup-cell-bottom-wrapper">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${
                    matchup?.home_blanket?.logo || fallbackLogo
                  })`,
                }}
              />
            </div>

            <div className="matchup-cell-bottom-4">
              <div className={`matchup-cell-bottom-6 state-${state}`}>
                <div className="matchup-cell-bottom-7">
                  {matchup?.score?.home ?? 0}
                </div>
              </div>
              <div className={`matchup-cell-bottom-8 state-1-${state}`}>
                <div className="matchup-cell-bottom-9">
                  {matchup?.score?.away ?? 0}
                </div>
              </div>
            </div>

            <div className="matchup-cell-bottom-wrapper">
              <img
                src={matchup?.away_blanket?.logo || fallbackLogo}
                alt={matchup?.away_blanket?.name || "Away Team"}
                className="team-logo"
              />
            </div>
          </div>

          <div className={`background ${backgroundColorClass}`}>
            <div className="container">
              <div
                className="vorschau"
                onClick={() => navigate(`/match/${matchup?.id}`)}
              >
                {matchStatusText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MatchupCell.propTypes = {
  matchup: PropTypes.shape({
    id: PropTypes.string,
    home_blanket: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    away_blanket: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    status: PropTypes.string,
    first_half_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $date: PropTypes.string }),
    ]),
    second_half_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $date: PropTypes.string }),
    ]),
    details: PropTypes.shape({
      location: PropTypes.string,
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ $date: PropTypes.string }),
      ]),
      gameday: PropTypes.number,
    }),
    score: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }),
  }),
  state: PropTypes.oneOf([
    "fixture-w-top",
    "fixture-no-top",
    "live-top",
    "live-w-top",
  ]).isRequired,
  className: PropTypes.string,
};
