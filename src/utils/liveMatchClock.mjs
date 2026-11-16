export const normalizeDate = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "$date" in value) return value["$date"];
  return null;
};

export const HALF_DURATION_MINUTES = 25;

export const getElapsedTime = (
  startTime,
  offsetMinutes = 0,
  now = Date.now()
) => {
  const startDateStr = normalizeDate(startTime);
  if (!startDateStr) return "0'";
  const start = new Date(startDateStr).getTime();
  // Half-start dates are real UTC instants, unlike scheduled kickoff wall times.
  const diff = Math.floor((now - start) / 60000);
  const total = Math.max(0, diff) + offsetMinutes;
  return !isNaN(total) && total >= 0 ? `${total}'` : "0'";
};

export const getMatchStatusText = (
  status,
  firstHalfDate,
  secondHalfDate,
  fallbackFormattedDate,
  now = Date.now()
) => {
  switch (status) {
    case "pending":
      return "Spielvorschau";
    case "first":
      return firstHalfDate
        ? `LIVE - 1. HB: ${getElapsedTime(firstHalfDate, 0, now)}`
        : fallbackFormattedDate || "";
    case "second":
      return secondHalfDate
        ? `LIVE - 2. HB: ${getElapsedTime(secondHalfDate, HALF_DURATION_MINUTES, now)}`
        : fallbackFormattedDate || "";
    case "halftime":
      return "Halbzeit";
    case "completed":
    case "submitted":
    case "done":
      return "Spiel Abgeschlossen";
    case "abgebrochen":
      return "Spiel Abgebrochen";
    case "cancelled":
      return "Spiel Abgesagt";
    default:
      return fallbackFormattedDate || "";
  }
};
